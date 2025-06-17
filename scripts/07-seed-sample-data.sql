-- Sample Data Insertion
-- This script inserts sample data for testing and development

-- Insert sample tours
INSERT INTO tours (title, slug, description, short_description, duration_days, max_group_size, difficulty, price_per_person, featured_image, gallery_images, included_items, excluded_items) VALUES
('Gorilla Trekking Adventure', 'gorilla-trekking-adventure', 'Experience the thrill of encountering mountain gorillas in their natural habitat in Volcanoes National Park. This unforgettable journey takes you through lush forests and steep terrain to witness these magnificent creatures up close.', 'Trek through Volcanoes National Park to meet mountain gorillas in their natural habitat.', 3, 8, 'challenging', 1200.00, '/images/tours/gorilla-trekking-hero.jpg', ARRAY['/images/tours/gorilla-1.jpg', '/images/tours/gorilla-2.jpg', '/images/tours/gorilla-3.jpg'], ARRAY['Gorilla trekking permit', 'Professional guide', 'Transportation', 'Accommodation', 'All meals'], ARRAY['International flights', 'Visa fees', 'Personal expenses', 'Tips']),

('Lake Kivu Relaxation', 'lake-kivu-relaxation', 'Unwind by the serene shores of Lake Kivu, one of Africa''s Great Lakes. Enjoy water activities, visit local fishing villages, and experience the peaceful atmosphere of this beautiful lake.', 'Relax and rejuvenate by the beautiful shores of Lake Kivu.', 4, 12, 'easy', 800.00, '/images/tours/lake-kivu-hero.jpg', ARRAY['/images/tours/kivu-1.jpg', '/images/tours/kivu-2.jpg', '/images/tours/kivu-3.jpg'], ARRAY['Boat trips', 'Accommodation', 'All meals', 'Transportation', 'Local guide'], ARRAY['International flights', 'Alcoholic beverages', 'Personal expenses']),

('Cultural Heritage Tour', 'cultural-heritage-tour', 'Immerse yourself in Rwanda''s rich cultural heritage. Visit traditional villages, learn about local customs, participate in traditional dances, and discover the country''s fascinating history.', 'Discover Rwanda''s rich cultural heritage and traditions.', 5, 10, 'moderate', 950.00, '/images/tours/culture-hero.jpg', ARRAY['/images/tours/culture-1.jpg', '/images/tours/culture-2.jpg', '/images/tours/culture-3.jpg'], ARRAY['Cultural site visits', 'Traditional performances', 'Local guide', 'Transportation', 'Accommodation'], ARRAY['International flights', 'Personal shopping', 'Tips']);

-- Insert sample tour itineraries
INSERT INTO tour_itinerary (tour_id, day_number, title, description, activities, accommodation, meals_included) VALUES
((SELECT id FROM tours WHERE slug = 'gorilla-trekking-adventure'), 1, 'Arrival in Kigali', 'Arrive at Kigali International Airport and transfer to your hotel. City tour of Kigali including the Genocide Memorial.', ARRAY['Airport transfer', 'Kigali city tour', 'Genocide Memorial visit'], 'Hotel des Mille Collines', 'Dinner'),
((SELECT id FROM tours WHERE slug = 'gorilla-trekking-adventure'), 2, 'Transfer to Volcanoes National Park', 'Early morning transfer to Volcanoes National Park. Afternoon visit to the Iby''Iwacu Cultural Village.', ARRAY['Transfer to Volcanoes NP', 'Cultural village visit', 'Traditional performances'], 'Mountain Gorilla View Lodge', 'Breakfast, Lunch, Dinner'),
((SELECT id FROM tours WHERE slug = 'gorilla-trekking-adventure'), 3, 'Gorilla Trekking & Departure', 'Early morning gorilla trekking experience. Afternoon transfer back to Kigali for departure.', ARRAY['Gorilla trekking', 'Transfer to Kigali', 'Airport drop-off'], 'Day use only', 'Breakfast, Lunch');

-- Insert sample cars
INSERT INTO cars (name, slug, brand, model, year, category, passenger_capacity, luggage_capacity, fuel_type, transmission, features, price_per_day, images) VALUES
('Toyota Land Cruiser V8', 'toyota-land-cruiser-v8', 'Toyota', 'Land Cruiser', 2022, 'SUV', 7, 5, 'Petrol', 'Automatic', ARRAY['4WD', 'Air Conditioning', 'GPS Navigation', 'Leather Seats', 'Sunroof'], 120.00, ARRAY['/images/cars/land-cruiser-1.jpg', '/images/cars/land-cruiser-2.jpg']),
('Toyota Hiace Van', 'toyota-hiace-van', 'Toyota', 'Hiace', 2021, 'Van', 14, 8, 'Diesel', 'Manual', ARRAY['Air Conditioning', 'Comfortable Seating', 'Large Luggage Space'], 80.00, ARRAY['/images/cars/hiace-1.jpg', '/images/cars/hiace-2.jpg']),
('Toyota RAV4', 'toyota-rav4', 'Toyota', 'RAV4', 2023, 'SUV', 5, 4, 'Hybrid', 'Automatic', ARRAY['AWD', 'Fuel Efficient', 'Modern Interior', 'Safety Features'], 90.00, ARRAY['/images/cars/rav4-1.jpg', '/images/cars/rav4-2.jpg']);

-- Insert sample events
INSERT INTO events (title, slug, description, short_description, event_date, start_time, end_time, location, max_attendees, price_per_person, featured_image, category) VALUES
('Kwita Izina Gorilla Naming Ceremony', 'kwita-izina-2024', 'Join Rwanda''s annual gorilla naming ceremony, a celebration of conservation efforts and cultural heritage. Experience traditional performances, meet conservationists, and witness the naming of baby gorillas.', 'Annual gorilla naming ceremony celebrating conservation and culture.', '2024-09-06', '09:00:00', '17:00:00', 'Volcanoes National Park', 500, 150.00, '/images/events/kwita-izina.jpg', 'Cultural'),
('Rwanda Cultural Festival', 'rwanda-cultural-festival', 'A vibrant celebration of Rwandan culture featuring traditional music, dance, art exhibitions, and local cuisine. Experience the rich heritage of Rwanda through performances and interactive activities.', 'Celebrate Rwandan culture with music, dance, and traditional arts.', '2024-07-15', '10:00:00', '22:00:00', 'Kigali Convention Centre', 1000, 50.00, '/images/events/cultural-festival.jpg', 'Cultural'),
('East African Business Summit', 'east-african-business-summit', 'Premier business networking event bringing together entrepreneurs, investors, and business leaders from across East Africa. Featuring keynote speakers, panel discussions, and networking opportunities.', 'Premier business networking event for East African entrepreneurs.', '2024-08-20', '08:00:00', '18:00:00', 'Kigali Marriott Hotel', 300, 200.00, '/images/events/business-summit.jpg', 'Business');

-- Insert sample accommodations
INSERT INTO accommodations (name, slug, type, description, short_description, address, city, star_rating, amenities, images, contact_phone, contact_email) VALUES
('Hotel des Mille Collines', 'hotel-des-mille-collines', 'hotel', 'Iconic luxury hotel in the heart of Kigali, known for its historical significance and exceptional service. Features elegant rooms, multiple dining options, and stunning city views.', 'Iconic luxury hotel in the heart of Kigali with exceptional service.', 'KN 5 Rd, Kigali', 'Kigali', 5, ARRAY['Swimming Pool', 'Spa', 'Fitness Center', 'Business Center', 'Free WiFi', 'Restaurant', 'Bar', 'Room Service'], ARRAY['/images/hotels/mille-collines-1.jpg', '/images/hotels/mille-collines-2.jpg'], '+250 788 123 456', 'info@millecollines.rw'),
('Kigali Serena Hotel', 'kigali-serena-hotel', 'hotel', 'Elegant hotel offering panoramic views of Kigali. Features modern amenities, excellent dining, and is conveniently located near the city center and business district.', 'Elegant hotel with panoramic views of Kigali city.', 'KN 3 Ave, Kigali', 'Kigali', 5, ARRAY['Swimming Pool', 'Spa', 'Fitness Center', 'Conference Facilities', 'Free WiFi', 'Restaurant', 'Bar'], ARRAY['/images/hotels/serena-1.jpg', '/images/hotels/serena-2.jpg'], '+250 788 234 567', 'reservations@serena.rw'),
('Nyungwe Forest Lodge', 'nyungwe-forest-lodge', 'lodge', 'Luxury eco-lodge nestled in the heart of Nyungwe Forest. Offers an immersive nature experience with comfortable accommodations and guided forest activities.', 'Luxury eco-lodge in the heart of Nyungwe Forest.', 'Nyungwe National Park', 'Rusizi', 4, ARRAY['Forest Views', 'Guided Nature Walks', 'Restaurant', 'Bar', 'Free WiFi', 'Spa Services'], ARRAY['/images/lodges/nyungwe-1.jpg', '/images/lodges/nyungwe-2.jpg'], '+250 788 345 678', 'info@nyungwelodge.rw');

-- Insert sample accommodation units
INSERT INTO accommodation_units (accommodation_id, unit_name, unit_type, max_occupancy, number_of_bedrooms, number_of_bathrooms, amenities, base_price_per_night) VALUES
((SELECT id FROM accommodations WHERE slug = 'hotel-des-mille-collines'), 'Deluxe Room', 'Deluxe', 2, 1, 1, ARRAY['King Bed', 'City View', 'Mini Bar', 'Safe', 'Air Conditioning'], 250.00),
((SELECT id FROM accommodations WHERE slug = 'hotel-des-mille-collines'), 'Executive Suite', 'Suite', 4, 2, 2, ARRAY['Separate Living Area', 'City View', 'Mini Bar', 'Safe', 'Air Conditioning'], 450.00),
((SELECT id FROM accommodations WHERE slug = 'kigali-serena-hotel'), 'Standard Room', 'Standard', 2, 1, 1, ARRAY['Queen Bed', 'Garden View', 'Mini Bar', 'Safe'], 200.00),
((SELECT id FROM accommodations WHERE slug = 'nyungwe-forest-lodge'), 'Forest Chalet', 'Chalet', 2, 1, 1, ARRAY['Forest View', 'Private Balcony', 'Mini Bar', 'Safe'], 300.00);

-- Insert sample users
INSERT INTO users (email, full_name, phone, nationality) VALUES
('john.doe@email.com', 'John Doe', '+1-555-0123', 'United States'),
('jane.smith@email.com', 'Jane Smith', '+44-20-7946-0958', 'United Kingdom'),
('pierre.martin@email.com', 'Pierre Martin', '+33-1-42-86-83-26', 'France');

-- Insert sample contact submissions
INSERT INTO contact_submissions (name, email, phone, subject, message) VALUES
('Alice Johnson', 'alice.johnson@email.com', '+1-555-0199', 'Gorilla Trekking Inquiry', 'Hi, I am interested in booking a gorilla trekking tour for next month. Could you please provide more details about availability and pricing?'),
('David Wilson', 'david.wilson@email.com', '+44-20-7946-0999', 'Car Rental Question', 'I need to rent a car for a week-long trip around Rwanda. What vehicles do you have available and what are your rates?'),
('Maria Garcia', 'maria.garcia@email.com', '+34-91-123-4567', 'Accommodation Booking', 'Looking for hotel recommendations in Kigali for a business trip. Need something centrally located with good conference facilities.');

-- Insert sample newsletter subscriptions
INSERT INTO newsletter_subscriptions (email, name) VALUES
('subscriber1@email.com', 'Travel Enthusiast'),
('subscriber2@email.com', 'Adventure Seeker'),
('subscriber3@email.com', 'Culture Explorer');
