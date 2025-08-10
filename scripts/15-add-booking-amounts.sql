-- Migration: Add missing columns to bookings table
-- This enables the new manual payment workflow with all required fields

-- Add price column to bookings table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookings' AND column_name = 'price') THEN
        ALTER TABLE bookings ADD COLUMN price DECIMAL(10,2) DEFAULT 0.00;
    END IF;
END $$;

-- Add deposit column to bookings table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookings' AND column_name = 'deposit') THEN
        ALTER TABLE bookings ADD COLUMN deposit DECIMAL(10,2) DEFAULT 0.00;
    END IF;
END $$;

-- Add total column to bookings table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'bookings' AND column_name = 'total') THEN
        ALTER TABLE bookings ADD COLUMN total DECIMAL(10,2) DEFAULT 0.00;
    END IF;
END $$;

-- Add index for better query performance when filtering by amounts (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_bookings_total') THEN
        CREATE INDEX idx_bookings_total ON bookings(total);
    END IF;
END $$;

-- Add index for deposit queries (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_bookings_deposit') THEN
        CREATE INDEX idx_bookings_deposit ON bookings(deposit);
    END IF;
END $$;

-- Add index for price queries (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_bookings_price') THEN
        CREATE INDEX idx_bookings_price ON bookings(price);
    END IF;
END $$;
