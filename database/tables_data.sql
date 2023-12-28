INSERT INTO educational_resources (title, topic, resource_type, author, publication_date, pdf_link)
VALUES 
  ('Introduction to Sustainable Practices', 'Environmental Awareness', 'Article', 'John Doe', '2023-01-01', 'https://example.com/path/to/your.pdf'),
  ('Guide to Eco-Friendly Living', 'Sustainability', 'Guide', 'Jane Smith', '2023-02-15', 'https://example.com/path/to/another.pdf'),
  ('Renewable Energy Explained', 'Energy', 'Article', 'Sam Green', '2023-03-10', 'https://example.com/path/to/yetanother.pdf'),
  ('Recycling Basics', 'Waste Management', 'Guide', 'Alice Green', '2023-04-05', 'https://example.com/path/to/recycling.pdf'),
  ('Biodiversity Conservation Strategies', 'Conservation', 'Article', 'Chris Johnson', '2023-05-20', 'https://example.com/path/to/biodiversity.pdf'),
  ('Green Transportation Options', 'Sustainability', 'Guide', 'Emily White', '2023-06-15', 'https://example.com/path/to/transportation.pdf'),
  ('Climate Change Impacts on Ecosystems', 'Climate Change', 'Article', 'Michael Brown', '2023-07-01', 'https://example.com/path/to/climatechange.pdf'),
  ('Energy-Efficient Home Practices', 'Energy', 'Guide', 'Olivia Taylor', '2023-08-10', 'https://example.com/path/to/energyefficient.pdf');

INSERT INTO community_report (user_id, report_type, description, location, time_stamp)
VALUES
  (1, 'Pollution', 'Air pollution in the city center', 'City Center', '2023-01-01T12:00:00'),
  (1, 'Accident', 'Car accident on Main Street', 'Main Street', '2023-01-02T14:30:00'),
  (1, 'Vandalism', 'Graffiti on public property', 'Downtown Area', '2023-01-04T15:45:00'),
  (1, 'Traffic Jam', 'Heavy traffic congestion on Highway 101', 'Highway 101', '2023-01-05T08:30:00'),
  (1, 'Fire Hazard', 'Unattended fire in the open field', 'Open Field', '2023-01-07T17:20:00'),
  (2, 'Noise', 'Loud construction noise near the park', 'Park Area', '2023-01-03T09:00:00'),
  (2, 'Garbage', 'Overflowing trash bins in the neighborhood', 'Residential Area', '2023-01-06T11:00:00'),
  (2, 'Street Lighting Issue', 'Street lights not working on Elm Street', 'Elm Street', '2023-01-08T19:15:00');

INSERT INTO `data` (`user_id`, `data_type`, `value`, `location`)
VALUES
  (2, 'air quality', '25', '32.203950,35.299910'),
  (2, 'temperature', '30', '32.223330,35.234320'),
  (2, 'humidity', '50', '32.223330,35.234320'),
  (2, 'water quality', 'Good', '32.223330,35.234320'),
  (2, 'biodiversity', 'High', '32.203950,35.299910'),
  (6, 'air quality', '18', '32.203950,35.299910'),
  (6, 'temperature', '28', '32.203950,35.299910'),
  (6, 'humidity', '45', '32.223330,35.234320'),
  (6, 'water quality', 'Moderate', '32.223330,35.234320'),
  (6, 'biodiversity', 'Medium', '32.223330,35.234320');

INSERT INTO `concerns` (`name`) 
VALUES
  ('Air Pollution'),
  ('Water Contamination'),
  ('Deforestation'),
  ('Climate Change'),
  ('Endangered Species'),
  ('Waste Management'),
  ('Ocean Pollution'),
  ('Soil Erosion'),
  ('Noise Pollution'),
  ('Loss of Biodiversity'),
  ('Habitat Destruction'),
  ('Overfishing'),
  ('Resource Depletion'),
  ('Industrial Pollution'),
  ('Chemical Spills'),
  ('Urbanization Impact'),
  ('Plastic Pollution'),
  ('Renewable Energy Transition'),
  ('Land Degradation'),
  ('Pesticide Usage'),
  ('Genetically Modified Organisms (GMOs)'),
  ('Nuclear Waste Disposal'),
  ('Wildlife Trafficking');