-- Accommodation Tables Creation
-- This script creates tables for accommodation management

-- Accommodations table (hotels, apartments, etc.)
CREATE TABLE accommodations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type accommodation_type NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'Rwanda',
    star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
    amenities TEXT[],
    images TEXT[],
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accommodation rooms/units table
CREATE TABLE accommodation_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    accommodation_id UUID REFERENCES accommodations(id) ON DELETE CASCADE,
    unit_name VARCHAR(255) NOT NULL, -- Room 101, Apartment A, etc.
    unit_type VARCHAR(100) NOT NULL, -- Single, Double, Suite, 1BR, 2BR, etc.
    max_occupancy INTEGER NOT NULL,
    number_of_bedrooms INTEGER DEFAULT 1,
    number_of_bathrooms INTEGER DEFAULT 1,
    size_sqm DECIMAL(8,2),
    amenities TEXT[],
    images TEXT[],
    base_price_per_night DECIMAL(10,2) NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accommodation pricing (seasonal pricing)
CREATE TABLE accommodation_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID REFERENCES accommodation_units(id) ON DELETE CASCADE,
    season_name VARCHAR(100) NOT NULL, -- High Season, Low Season, etc.
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    minimum_stay_nights INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
