-- Ghana Military Quiz - Sample Questions
-- This SQL matches the existing database schema

USE ghana_military_quiz;

-- First, delete existing questions to avoid duplicates
DELETE FROM questions;

-- Insert sample questions for each category
-- Category 1: Ghana Military History
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points, is_active) VALUES
(1, 'In what year did Ghana gain independence?', '1955', '1957', '1960', '1963', 'B', 'Ghana gained independence on March 6, 1957.', 'EASY', 10, 1),
(1, 'Which country colonized Ghana before independence?', 'France', 'Portugal', 'Britain', 'Netherlands', 'C', 'Ghana was colonized by Britain.', 'EASY', 10, 1),
(1, 'Who was Ghana''s first President?', 'John Atta Mills', 'Kwame Nkrumah', 'Jerry Rawlings', 'John Kufuor', 'B', 'Kwame Nkrumah was Ghana''s first President.', 'EASY', 10, 1),
(1, 'Who was the first Chief of Defence Staff?', 'Major General H.T. Alexander', 'Lieutenant General S.J.A. Otu', 'Major General C.M. Barwah', 'Lieutenant General E.K. Kotoka', 'A', 'Major General H.T. Alexander was the first CDS.', 'MEDIUM', 15, 1),
(1, 'What was the name of Ghana''s first military coup?', 'April Revolution', 'February Revolution', 'December Revolution', 'June Coup', 'A', 'The April Revolution of 1966 overthrew Nkrumah.', 'MEDIUM', 15, 1),
(1, 'Which year did Ghana join the United Nations?', '1955', '1957', '1959', '1960', 'B', 'Ghana joined the UN in 1957.', 'MEDIUM', 15, 1),
(1, 'What was the codename of the 1966 coup?', 'Operation Cold Chop', 'Operation Sunshine', 'Operation Arrow', 'Operation Freedom', 'A', 'It was codenamed Operation Cold Chop.', 'HARD', 20, 1),
(1, 'Which Ghanaian led the 1972 coup?', 'General Acheampong', 'General Akwasi Afrifa', 'Jerry Rawlings', 'General Kutu', 'A', 'General Acheampong led the 1972 coup.', 'HARD', 20, 1),
(1, 'What year did Ghana experience the "Saturday Night" coup?', '1975', '1979', '1981', '1972', 'B', 'The Saturday Night coup was in June 1979.', 'HARD', 20, 1),
(1, 'What was Ghana''s GDP percentage for defense?', '0.5%', '1.5%', '2.5%', '3.5%', 'B', 'Ghana''s defense budget is about 1.5% of GDP.', 'HARD', 20, 1);

-- Category 2: Ghana Military Ranks
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points, is_active) VALUES
(2, 'What is the highest rank in the Ghana Army?', 'Colonel', 'General', 'Lieutenant General', 'Major General', 'B', 'General is the highest rank.', 'EASY', 10, 1),
(2, 'How many stars does a Brigadier General wear?', 'One', 'Two', 'Three', 'Four', 'A', 'A Brigadier General wears one star.', 'EASY', 10, 1),
(2, 'What is the rank below Captain?', 'Lieutenant', 'Major', 'Colonel', 'Sergeant', 'A', 'Lieutenant is below Captain.', 'EASY', 10, 1),
(2, 'How many branches form the Ghana Armed Forces?', 'Two', 'Three', 'Four', 'Five', 'B', 'Army, Navy, and Air Force.', 'MEDIUM', 15, 1),
(2, 'What is the title of the head of Ghana''s military?', 'President', 'Commander-in-Chief', 'Minister of Defence', 'Chief', 'B', 'The President is Commander-in-Chief.', 'MEDIUM', 15, 1),
(2, 'What rank insignia does a Colonel wear?', 'One star', 'Two stars', 'Eagle', 'Crossed swords', 'B', 'A Colonel wears two stars.', 'MEDIUM', 15, 1),
(2, 'What is the full title of the highest-ranking officer?', 'Chief of Army Staff', 'Chief of Defence Staff', 'Commander', 'Coordinator', 'B', 'Chief of Defence Staff is the highest.', 'HARD', 20, 1),
(2, 'Which rank is equivalent to Brigadier in the Navy?', 'Commodore', 'Rear Admiral', 'Vice Admiral', 'Captain', 'A', 'Commodore equals Brigadier General.', 'HARD', 20, 1),
(2, 'What is the Ghana Army organized into?', 'Battalions only', 'Divisions and Brigades', 'Corps only', 'Commands, Divisions, and Brigades', 'D', 'All three form the structure.', 'HARD', 20, 1),
(2, 'How many divisions does the Ghana Army have?', 'One', 'Two', 'Three', 'Four', 'C', 'The Ghana Army has three divisions.', 'HARD', 20, 1);

-- Category 3: Special Forces
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points, is_active) VALUES
(3, 'Which Ghanaian unit is known for peacekeeping?', 'Ghanaian Army Infantry', 'Ghanaian Airborne', 'Ghana Gulf Regiment', 'UN FPU', 'D', 'UN Formed Police Unit is known.', 'EASY', 10, 1),
(3, 'What is the basic military training duration?', '3 months', '6 months', '9 months', '1 year', 'B', 'Basic training is 6 months.', 'EASY', 10, 1),
(3, 'Where is the Ghana Defence Academy located?', 'Accra', 'Kumasi', 'Tema', 'Takoradi', 'A', 'It is located in Accra.', 'EASY', 10, 1),
(3, 'Which country provides most military training?', 'Russia', 'United States', 'Britain', 'Israel', 'C', 'Britain provides most training.', 'MEDIUM', 15, 1),
(3, 'What is Ghana''s main peacekeeping focus?', 'Africa only', 'Global', 'Regional only', 'None', 'B', 'Ghana participates globally.', 'MEDIUM', 15, 1),
(3, 'What percentage of GDP for defense?', '1-2%', '3-4%', '5-6%', '8-10%', 'A', 'Ghana allocates 1-2% of GDP.', 'MEDIUM', 15, 1),
(3, 'What is Ghana''s military doctrine?', 'Air-land battle', 'Defence in depth', 'Maneuver warfare', 'Guerrilla', 'C', 'Maneuver warfare is the doctrine.', 'HARD', 20, 1),
(3, 'How long is the Junior Command Course?', '3 months', '6 months', '9 months', '1 year', 'B', 'The course lasts 6 months.', 'HARD', 20, 1),
(3, 'What is the retirement age for officers?', '50 years', '55 years', '60 years', '65 years', 'C', 'Officers retire at 60.', 'HARD', 20, 1),
(3, 'How does Ghana integrate reserve forces?', 'Separate units', 'Embedded with regulars', 'Independent', 'No integration', 'B', 'Reserves are embedded for training.', 'HARD', 20, 1);

-- Category 4: Equipment & Gear
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points, is_active) VALUES
(4, 'What is the standard issue rifle of Ghana Army?', 'AK-47 variant', 'M16A2', 'SA80', 'FAMAS', 'A', 'AK-47 is the standard issue.', 'EASY', 10, 1),
(4, 'What type of aircraft is the Kifaru?', 'Fighter jet', 'Attack helicopter', 'Transport aircraft', 'Drone', 'B', 'Kifaru is an attack helicopter.', 'EASY', 10, 1),
(4, 'Which armored vehicle is used?', 'Leopard', 'M113', 'T-72', 'Abrams', 'B', 'M113 is widely used.', 'EASY', 10, 1),
(4, 'What is the main battle tank used?', 'M1 Abrams', 'T-55', 'Leopard 2', 'Challenger', 'B', 'T-55 is the main tank.', 'MEDIUM', 15, 1),
(4, 'What is the Ghana Navy''s primary role?', 'Air defense', 'Maritime security', 'Border patrol', 'Intelligence', 'B', 'Maritime security is primary.', 'MEDIUM', 15, 1),
(4, 'How many OPVs does Ghana have?', 'One', 'Two', 'Three', 'Four', 'C', 'Ghana has three OPVs.', 'MEDIUM', 15, 1),
(4, 'What missile is on Ghana Navy''s OPVs?', 'Exocet MM40', 'Harpoon', 'Sea Sparrow', 'C-802', 'A', 'Exocet MM40 is equipped.', 'HARD', 20, 1),
(4, 'What is the range of SA-18 missile?', '5 km', '10 km', '15 km', '25 km', 'A', 'SA-18 has 5 km range.', 'HARD', 20, 1),
(4, 'What artillery does Ghana use?', 'M109', 'D-30', 'PLZ-45', 'M777', 'B', 'D-30 is used for fire support.', 'HARD', 20, 1),
(4, 'What is max speed of M113 APC?', '40 km/h', '56 km/h', '70 km/h', '80 km/h', 'B', 'M113 max speed is 56 km/h.', 'HARD', 20, 1);

-- Category 5: Peacekeeping Missions
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points, is_active) VALUES
(5, 'In which UN mission did Ghana first serve?', 'UNEF', 'ONUC', 'UNIFIL', 'UNOSOM', 'B', 'Ghana first served in ONUC (Congo).', 'EASY', 10, 1),
(5, 'How many troops does Ghana contribute to UN?', '500-1000', '1000-3000', '3000-5000', 'Below 500', 'B', 'Ghana contributes 1000-3000 troops.', 'EASY', 10, 1),
(5, 'What is Ghana''s ranking in African peacekeeping?', 'Top 3', 'Top 5', 'Top 10', 'Top 20', 'A', 'Ghana is in the top 3.', 'EASY', 10, 1),
(5, 'What was Ghana''s role in Liberia?', 'Observer only', 'Lead nation', 'Logistical support', 'Did not join', 'B', 'Ghana was a lead nation in ECOMOG.', 'MEDIUM', 15, 1),
(5, 'Which countries has Ghana signed ACSA with?', 'USA', 'China', 'Russia', 'All of above', 'A', 'Ghana signed ACSA with USA.', 'MEDIUM', 15, 1),
(5, 'What is Ghana''s regional force called?', 'ECOWAS MG', 'ECOWAS Standby Force', 'African SF', 'COMESA', 'B', 'It is the ECOWAS Standby Force.', 'MEDIUM', 15, 1),
(5, 'What was Ghana''s role in Sierra Leone?', 'Observer', 'Peace enforcer', 'Both roles', 'No role', 'C', 'Ghana played both roles.', 'HARD', 20, 1),
(5, 'What percentage of military deployed abroad?', '1%', '5%', '10%', '15%', 'C', 'About 10% is deployed abroad.', 'HARD', 20, 1),
(5, 'How many peacekeepers has Ghana deployed total?', '10,000', '20,000', '30,000', '50,000', 'C', 'Over 30,000 historically.', 'HARD', 20, 1),
(5, 'What is Ghana''s strategic priority?', 'Regional only', 'Global only', 'Counter-terrorism', 'All of above', 'D', 'Ghana prioritizes all areas.', 'HARD', 20, 1);

-- Verify the questions
SELECT 
    c.name AS Category,
    COUNT(q.id) AS Total_Questions,
    SUM(CASE WHEN q.difficulty_level = 'EASY' THEN 1 ELSE 0 END) AS Easy,
    SUM(CASE WHEN q.difficulty_level = 'MEDIUM' THEN 1 ELSE 0 END) AS Medium,
    SUM(CASE WHEN q.difficulty_level = 'HARD' THEN 1 ELSE 0 END) AS Hard
FROM categories c
LEFT JOIN questions q ON c.id = q.category_id AND q.is_active = 1
GROUP BY c.id, c.name
ORDER BY c.id;
