-- Migration: Add status column to bookings table
-- This enables the new manual payment workflow with 'pending' and 'paid' statuses

-- Add status column to bookings table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookings' AND column_name = 'status') THEN
        ALTER TABLE bookings ADD COLUMN status VARCHAR(20) DEFAULT 'pending' NOT NULL;
    END IF;
END $$;

-- Add constraint to ensure only valid statuses (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'check_booking_status') THEN
        ALTER TABLE bookings ADD CONSTRAINT check_booking_status 
        CHECK (status IN ('pending', 'paid'));
    END IF;
END $$;

-- Update existing bookings to have 'paid' status if they have payment information
-- This assumes existing bookings with payment data are already paid
UPDATE bookings 
SET status = 'paid' 
WHERE (payment_status IS NOT NULL 
   OR stripe_session_id IS NOT NULL 
   OR payment_amount > 0)
   AND status = 'pending';

-- Add index for better query performance when filtering by status (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_bookings_status') THEN
        CREATE INDEX idx_bookings_status ON bookings(status);
    END IF;
END $$;

-- Add index for combined queries (status + created_at) (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_bookings_status_created') THEN
        CREATE INDEX idx_bookings_status_created ON bookings(status, created_at);
    END IF;
END $$;