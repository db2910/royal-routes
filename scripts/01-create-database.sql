-- Royal Routes Database Setup
-- This script creates the main database and sets up basic configuration

-- Create database (uncomment the line below if creating a new database)
-- CREATE DATABASE royal_routes;

-- Use the database
-- USE royal_routes;

-- Enable UUID extension (for PostgreSQL)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET timezone = 'UTC';

-- Create enum types for better data integrity
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE car_status AS ENUM ('available', 'rented', 'maintenance', 'retired');
CREATE TYPE accommodation_type AS ENUM ('hotel', 'apartment', 'resort', 'lodge');
CREATE TYPE tour_difficulty AS ENUM ('easy', 'moderate', 'challenging', 'extreme');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');
