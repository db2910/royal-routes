-- Database Indexes Creation
-- This script creates indexes for better query performance

-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Tours table indexes
CREATE INDEX idx_tours_slug ON tours(slug);
CREATE INDEX idx_tours_is_active ON tours(is_active);
CREATE INDEX idx_tours_price ON tours(price_per_person);
CREATE INDEX idx_tours_difficulty ON tours(difficulty);

-- Tour itinerary indexes
CREATE INDEX idx_tour_itinerary_tour_id ON tour_itinerary(tour_id);
CREATE INDEX idx_tour_itinerary_day ON tour_itinerary(tour_id, day_number);

-- Cars table indexes
CREATE INDEX idx_cars_slug ON cars(slug);
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_category ON cars(category);
CREATE INDEX idx_cars_price ON cars(price_per_day);

-- Events table indexes
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_category ON events(category);

-- Accommodations table indexes
CREATE INDEX idx_accommodations_slug ON accommodations(slug);
CREATE INDEX idx_accommodations_type ON accommodations(type);
CREATE INDEX idx_accommodations_city ON accommodations(city);
CREATE INDEX idx_accommodations_rating ON accommodations(star_rating);

-- Accommodation units indexes
CREATE INDEX idx_accommodation_units_accommodation_id ON accommodation_units(accommodation_id);
CREATE INDEX idx_accommodation_units_available ON accommodation_units(is_available);
CREATE INDEX idx_accommodation_units_price ON accommodation_units(base_price_per_night);

-- Bookings table indexes
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_type ON bookings(booking_type);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_start_date ON bookings(start_date);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);

-- Specific booking table indexes
CREATE INDEX idx_tour_bookings_booking_id ON tour_bookings(booking_id);
CREATE INDEX idx_tour_bookings_tour_id ON tour_bookings(tour_id);
CREATE INDEX idx_car_bookings_booking_id ON car_bookings(booking_id);
CREATE INDEX idx_car_bookings_car_id ON car_bookings(car_id);
CREATE INDEX idx_event_bookings_booking_id ON event_bookings(booking_id);
CREATE INDEX idx_event_bookings_event_id ON event_bookings(event_id);
CREATE INDEX idx_accommodation_bookings_booking_id ON accommodation_bookings(booking_id);
CREATE INDEX idx_accommodation_bookings_accommodation_id ON accommodation_bookings(accommodation_id);

-- Content table indexes
CREATE INDEX idx_media_category ON media(category);
CREATE INDEX idx_media_featured ON media(is_featured);
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_published ON reviews(is_published);
CREATE INDEX idx_reviews_featured ON reviews(is_featured);
CREATE INDEX idx_contact_submissions_read ON contact_submissions(is_read);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at);
CREATE INDEX idx_newsletter_active ON newsletter_subscriptions(is_active);
CREATE INDEX idx_trip_requests_processed ON trip_planning_requests(is_processed);
CREATE INDEX idx_trip_requests_created ON trip_planning_requests(created_at);
