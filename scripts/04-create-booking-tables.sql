-- Booking Tables Creation
-- This script creates tables for managing all types of bookings

-- Main bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    booking_type VARCHAR(50) NOT NULL, -- 'tour', 'car', 'event', 'accommodation'
    status booking_status DEFAULT 'pending',
    
    -- Customer information (for non-registered users)
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_nationality VARCHAR(100),
    
    -- Booking details
    start_date DATE NOT NULL,
    end_date DATE,
    number_of_people INTEGER NOT NULL DEFAULT 1,
    special_requests TEXT,
    
    -- Pricing
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    
    -- Timestamps
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tour bookings (specific details for tour bookings)
CREATE TABLE tour_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    tour_id UUID REFERENCES tours(id),
    number_of_adults INTEGER NOT NULL DEFAULT 1,
    number_of_children INTEGER DEFAULT 0,
    dietary_requirements TEXT,
    fitness_level VARCHAR(50),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Car rental bookings
CREATE TABLE car_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    car_id UUID REFERENCES cars(id),
    pickup_location VARCHAR(255) NOT NULL,
    dropoff_location VARCHAR(255),
    pickup_time TIME,
    dropoff_time TIME,
    driver_required BOOLEAN DEFAULT false,
    driver_license_number VARCHAR(100),
    additional_equipment TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event bookings
CREATE TABLE event_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id),
    ticket_type VARCHAR(100),
    dietary_requirements TEXT,
    accessibility_needs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accommodation bookings
CREATE TABLE accommodation_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    accommodation_id UUID REFERENCES accommodations(id),
    unit_id UUID REFERENCES accommodation_units(id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_rooms INTEGER DEFAULT 1,
    number_of_adults INTEGER NOT NULL,
    number_of_children INTEGER DEFAULT 0,
    transport_required BOOLEAN DEFAULT false,
    pickup_location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
