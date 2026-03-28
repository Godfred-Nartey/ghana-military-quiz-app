-- Sample Questions for Ghana Military Quiz
-- 10 questions per difficulty level per category (30 questions per category)
-- Total: 180 questions across 6 categories

USE ghana_military_quiz;

-- ============================================
-- Category 1: Military History
-- ============================================

-- Easy Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(1, 'In what year did Ghana gain independence?', '1955', '1957', '1960', '1963', 'B', 'Ghana gained independence from British colonial rule on March 6, 1957.', 'EASY', 10),
(1, 'What is the name of Ghana''s independence day?', 'June 6', 'March 6', 'July 1', 'August 4', 'B', 'Ghana celebrates its Independence Day on March 6th each year.', 'EASY', 10),
(1, 'Which country colonized Ghana before independence?', 'France', 'Portugal', 'Britain', 'Netherlands', 'C', 'Ghana was colonized by Britain and known as the Gold Coast before independence.', 'EASY', 10),
(1, 'Who was Ghana''s first President?', 'John Atta Mills', 'Kwame Nkrumah', 'Jerry Rawlings', 'John Kufuor', 'B', 'Kwame Nkrumah was Ghana''s first President after independence in 1957.', 'EASY', 10),
(1, 'What was Ghana called before independence?', 'Gold Coast', 'British Ghana', 'Colonial Ghana', 'Ashanti Empire', 'A', 'Ghana was formerly known as the Gold Coast during British colonial rule.', 'EASY', 10),
(1, 'Which river is named after Ghana''s first President?', 'Volta', 'Niger', 'Congo', 'Zambezi', 'A', 'Lake Volta is named after the Volta River, not directly after the President.', 'EASY', 10),
(1, 'What is Ghana''s national motto?', 'Freedom and Justice', 'Unity and Progress', 'God and Our Cause', 'Liberty and Prosperity', 'A', 'Ghana''s national motto is "Freedom and Justice".', 'EASY', 10),
(1, 'Which city was Ghana''s capital at independence?', 'Kumasi', 'Accra', 'Cape Coast', 'Tamale', 'B', 'Accra became Ghana''s capital at independence and remains so today.', 'EASY', 10),
(1, 'What year did Ghana become a republic?', '1957', '1960', '1965', '1970', 'B', 'Ghana became a republic on July 1, 1960.', 'EASY', 10),
(1, 'Which neighboring country shares borders with Ghana?', 'Nigeria', 'Togo', 'All of the above', 'None', 'C', 'Ghana borders Togo, Burkina Faso, and Côte d''Ivoire.', 'EASY', 10);

-- Medium Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(1, 'Who was the first Chief of Defence Staff of Ghana?', 'Major General H.T. Alexander', 'Lieutenant General S.J.A. Otu', 'Major General C.M. Barwah', 'Lieutenant General E.K. Kotoka', 'A', 'Major General H.T. Alexander served as the first Chief of Defence Staff after independence.', 'MEDIUM', 15),
(1, 'What was the name of Ghana''s first military coup?', 'April Revolution', 'February Revolution', 'December Revolution', 'June Coup', 'A', 'The April Revolution of 1966 overthrew President Kwame Nkrumah''s government.', 'MEDIUM', 15),
(1, 'Which year did Ghana join the United Nations?', '1957', '1958', '1959', '1960', 'A', 'Ghana became a member of the United Nations in 1957, the same year it gained independence.', 'MEDIUM', 15),
(1, 'What was Ghana''s first currency after independence?', 'Cedi', 'Pound', 'Dollar', 'Franc', 'A', 'The Ghanaian Cedi was introduced in 1965, replacing the Ghanaian pound.', 'MEDIUM', 15),
(1, 'Which African country was the first to gain independence?', 'Ghana', 'Nigeria', 'Kenya', 'South Africa', 'A', 'Ghana was the first sub-Saharan African country to gain independence.', 'MEDIUM', 15),
(1, 'What is the name of Ghana''s independence monument?', 'Kwame Nkrumah Mausoleum', 'Independence Arch', 'Freedom Tower', 'Victory Monument', 'A', 'The Kwame Nkrumah Mausoleum in Accra commemorates Ghana''s first President and independence.', 'MEDIUM', 15),
(1, 'Which year did Ghana host the Organization of African Unity?', '1963', '1965', '1970', '1975', 'B', 'Ghana hosted the OAU in 1965.', 'MEDIUM', 15),
(1, 'What was the name of Ghana''s first indigenous warship?', 'GNS Keta', 'GNS Accra', 'GNS Volta', 'GNS Dzata', 'C', 'GNS Volta was Ghana''s first indigenous warship built in 1970.', 'MEDIUM', 15),
(1, 'Which military leader was known as "The Napoleon"?', 'General Akwasi Afrifa', 'Lt General E.K. Kotoka', 'General Acheampong', 'Colonel K. A. O.', 'B', 'Lt General E.K. Kotoka was famously known as "The Napoleon" of Ghanaian military.', 'MEDIUM', 15),
(1, 'What was the main export during colonial Ghana?', 'Gold', 'Cocoa', 'Timber', 'Coffee', 'A', 'Gold was the main export during colonial times, hence the name "Gold Coast".', 'MEDIUM', 15);

-- Hard Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(1, 'What was the codename of the 1966 coup that overthrew Nkrumah?', 'Operation Cold Chop', 'Operation Sunshine', 'Operation Arrow', 'Operation Freedom', 'A', 'The April 1966 coup was codenamed "Operation Cold Chop" led by the National Liberation Council.', 'HARD', 20),
(1, 'Which Ghanaian military leader led the 1972 coup?', 'General Acheampong', 'General Akwasi Afrifa', 'Flight Lieutenant Jerry Rawlings', 'General Kutu Acheampong', 'A', 'General Ignatius Kutu Acheampong led the January 1972 coup.', 'HARD', 20),
(1, 'What year did Ghana experience "Saturday Night" coup?', '1975', '1979', '1981', '1972', 'B', 'The "Saturday Night" coup occurred in June 1979.', 'HARD', 20),
(1, 'Which military ruler established the "Super Maximum" prisons?', 'Jerry Rawlings', 'General Acheampong', 'General Akwasi Afrifa', 'Kwame Nkrumah', 'B', 'General Acheampong established the "Super Maximum" security prisons.', 'HARD', 20),
(1, 'What was Ghana''s GDP percentage for defense in 2020?', '0.5%', '1.5%', '2.5%', '3.5%', 'B', 'Ghana''s defense budget was approximately 1.5% of GDP in 2020.', 'HARD', 20),
(1, 'Which UN mission did Ghana first participate in?', 'UNEF I', 'ONUC', 'UNIFIL', 'UNOSOM', 'B', 'Ghana first participated in UN peacekeeping through ONUC in Congo in 1960.', 'HARD', 20),
(1, 'What was the name of Ghana''s economic recovery program in the 1980s?', 'ERP', 'SAP', 'Ghana First', 'Economic Miracle', 'B', 'The Structural Adjustment Program (SAP) was implemented in the 1980s.', 'HARD', 20),
(1, 'Which year did Ghana adopt a multi-party system?', '1992', '1960', '1979', '1981', 'A', 'Ghana adopted a multi-party system in 1992 with the new constitution.', 'HARD', 20),
(1, 'What was the maximum duration of military rule in Ghana?', '10 years', '15 years', '20 years', '25 years', 'C', 'Ghana experienced about 20 years of military rule from 1966 to 1992.', 'HARD', 20),
(1, 'Which international tribunal did Ghana ratify in 1998?', 'ICC', 'ICJ', 'ECOWAS Court', 'African Court', 'A', 'Ghana ratified the Rome Statute and joined the ICC in 1998.', 'HARD', 20);

-- ============================================
-- Category 2: Ranks and Structure
-- ============================================

-- Easy Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(2, 'What is the highest rank in the Ghana Army?', 'Colonel', 'General', 'Lieutenant General', 'Major General', 'B', 'General is the highest rank in the Ghana Army.', 'EASY', 10),
(2, 'How many stars does a Brigadier General wear?', 'One', 'Two', 'Three', 'Four', 'A', 'A Brigadier General wears one star as their rank insignia.', 'EASY', 10),
(2, 'What is the rank below Captain?', 'Lieutenant', 'Major', 'Colonel', 'Sergeant', 'A', 'Lieutenant is the rank immediately below Captain.', 'EASY', 10),
(2, 'How many branches form the Ghana Armed Forces?', 'Two', 'Three', 'Four', 'Five', 'B', 'The Ghana Armed Forces consist of Army, Navy, and Air Force.', 'EASY', 10),
(2, 'What is the lowest rank in the Ghana Army?', 'Private', 'Corporal', 'Lance Corporal', 'Recruit', 'A', 'Private is the lowest enlisted rank in the Ghana Army.', 'EASY', 10),
(2, 'How many chevrons does a Sergeant wear?', 'Two', 'Three', 'Four', 'Five', 'B', 'A Sergeant typically wears three chevrons.', 'EASY', 10),
(2, 'What is the rank above Lieutenant Colonel?', 'Colonel', 'Major', 'Captain', 'Brigadier', 'A', 'Colonel is the rank above Lieutenant Colonel.', 'EASY', 10),
(2, 'What title is used for the head of Ghana''s military?', 'President', 'Commander-in-Chief', 'Chief of Defence Staff', 'Minister', 'B', 'The President serves as Commander-in-Chief of the Ghana Armed Forces.', 'EASY', 10),
(2, 'What is the rank of a Warrant Officer?', 'Enlisted', 'Officer', 'Senior Officer', 'Field Officer', 'B', 'Warrant Officers hold a unique officer status in the military.', 'EASY', 10),
(2, 'How many stripes does a Master Corporal wear?', 'One', 'Two', 'Three', 'Four', 'B', 'A Master Corporal wears two stripes in the Ghana Army.', 'EASY', 10);

-- Medium Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(2, 'What is the title of the head of the Ghana Armed Forces?', 'President', 'Commander-in-Chief', 'Minister of Defence', 'Chief of Defence Staff', 'B', 'The President of Ghana serves as Commander-in-Chief.', 'MEDIUM', 15),
(2, 'How many service branches make up the Ghana Armed Forces?', 'Two', 'Three', 'Four', 'Five', 'B', 'The Ghana Armed Forces consist of three branches.', 'MEDIUM', 15),
(2, 'What rank insignia does a Colonel wear?', 'One star', 'Two stars', 'Eagle', 'Crossed swords', 'B', 'A Colonel in the Ghana Army wears two stars.', 'MEDIUM', 15),
(2, 'What is the full title of the highest-ranking military officer?', 'Chief of Army Staff', 'Chief of Defence Staff', 'Commander of Armed Forces', 'National Security Coordinator', 'B', 'The Chief of Defence Staff (CDS) is the highest-ranking military officer.', 'MEDIUM', 15),
(2, 'Which rank is equivalent to Brigadier General in the Navy?', 'Commodore', 'Rear Admiral', 'Vice Admiral', 'Captain', 'A', 'Commodore is equivalent to Brigadier General in the Ghana Navy.', 'MEDIUM', 15),
(2, 'What is the Ghana Army organized into?', 'Battalions only', 'Divisions and Brigades', 'Corps and Divisions only', 'Commands, Divisions, and Brigades', 'D', 'The Ghana Army is organized into Commands, Divisions, and Brigades.', 'MEDIUM', 15),
(2, 'How many divisions does the Ghana Army currently have?', 'One', 'Two', 'Three', 'Four', 'C', 'The Ghana Army has three operational divisions.', 'MEDIUM', 15),
(2, 'What is the role of the Ghana Army Headquarters?', 'Operational command', 'Administrative and strategic', 'Logistics only', 'Training only', 'B', 'Army Headquarters handles administrative and strategic functions.', 'MEDIUM', 15),
(2, 'Which body approves military promotions in Ghana?', 'President', 'Parliament', 'National Security Council', 'Military Council', 'C', 'The National Security Council approves military promotions.', 'MEDIUM', 15),
(2, 'What is the term for a military officer who commands a brigade?', 'Brigadier', 'Colonel', 'General', 'Commander', 'A', 'A Brigadier commands a brigade in the Ghana Army.', 'MEDIUM', 15);

-- Hard Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(2, 'What is the full title of the highest-ranking military officer in Ghana?', 'Chief of Army Staff', 'Chief of Defence Staff', 'Commander of Armed Forces', 'National Security Coordinator', 'B', 'The Chief of Defence Staff (CDS) is the highest-ranking military officer.', 'HARD', 20),
(2, 'Which rank is equivalent to Brigadier General in the Ghana Navy?', 'Commodore', 'Rear Admiral', 'Vice Admiral', 'Captain', 'A', 'In the Ghana Navy, Commodore is equivalent to Brigadier General.', 'HARD', 20),
(2, 'What is the organizational structure of the Ghana Army?', 'Battalions only', 'Divisions and Brigades', 'Corps and Divisions only', 'Commands, Divisions, and Brigades', 'D', 'The Ghana Army is organized into Commands, Divisions, and Brigades.', 'HARD', 20),
(2, 'What is the role of the General Staff in Ghana Army?', 'Field operations', 'Strategic planning', 'Training only', 'Logistics only', 'B', 'The General Staff handles strategic planning and policy.', 'HARD', 20),
(2, 'How many Corps make up the Ghana Army?', 'One', 'Two', 'Three', 'Four', 'C', 'The Ghana Army has three Corps: Infantry, Artillery, and Engineers.', 'HARD', 20),
(2, 'What is the chain of command below the CDS?', 'Service Chiefs', 'Division Commanders', 'Brigade Commanders', 'All of the above', 'D', 'All service chiefs, division and brigade commanders report to the CDS.', 'HARD', 20),
(2, 'Which committee oversees military budget in Ghana?', 'Finance Committee', 'Defense Committee', 'Public Accounts', 'Security Committee', 'B', 'Parliament''s Defense Committee oversees military budget.', 'HARD', 20),
(2, 'What is the maximum age for retirement for senior officers?', '55 years', '60 years', '65 years', '70 years', 'C', 'Senior officers in Ghana typically retire at 65 years.', 'HARD', 20),
(2, 'What is the role of the Military Intelligence Directorate?', 'Counter-intelligence', 'Public affairs', 'Logistics', 'Training', 'A', 'The Military Intelligence Directorate handles counter-intelligence.', 'HARD', 20),
(2, 'How are Ghana''s regional military commands organized?', 'By region', 'By theater', 'By function', 'All of the above', 'B', 'Regional commands are organized by theater of operation.', 'HARD', 20);

-- ============================================
-- Category 3: Military Equipment
-- ============================================

-- Easy Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(3, 'What type of aircraft is the Kifaru used by Ghana?', 'Fighter jet', 'Attack helicopter', 'Transport aircraft', 'Surveillance drone', 'B', 'The Kifaru is an attack helicopter used by the Ghana Air Force.', 'EASY', 10),
(3, 'Which armored vehicle is commonly used by the Ghana Army?', 'Leopard', 'M113', 'T-72', 'Abrams', 'B', 'The M113 armored personnel carrier is widely used by the Ghana Army.', 'EASY', 10),
(3, 'What is the primary role of the Ghana Navy?', 'Air defense', 'Maritime security', 'Border patrol', 'Intelligence', 'B', 'The Ghana Navy''s primary role is maritime security.', 'EASY', 10),
(3, 'Which aircraft does Ghana use for transport?', 'C-130', 'F-16', 'MiG', 'Rafale', 'A', 'Ghana uses C-130 Hercules for military transport.', 'EASY', 10),
(3, 'What is the main rifle used by Ghana soldiers?', 'AK-47', 'M16', 'G3', 'SA-80', 'A', 'The AK-47 is the standard rifle used by Ghanaian soldiers.', 'EASY', 10),
(3, 'Which vehicle is used for patrol by Ghana Navy?', 'Patrol boat', 'Submarine', 'Destroyer', 'Aircraft carrier', 'A', 'Patrol boats are used for coastal surveillance by Ghana Navy.', 'EASY', 10),
(3, 'What type of missile does Ghana possess?', 'Ballistic missiles', 'Surface-to-air missiles', 'Anti-ship missiles', 'All of the above', 'B', 'Ghana has surface-to-air missiles for air defense.', 'EASY', 10),
(3, 'Which country supplies most of Ghana''s military equipment?', 'USA', 'China', 'Britain', 'Russia', 'C', 'Britain has been Ghana''s primary military supplier.', 'EASY', 10),
(3, 'What is the primary tank used by Ghana?', 'M1 Abrams', 'T-55', 'Leopard 2', 'Challenger', 'B', 'The T-55 is the main battle tank used by Ghana.', 'EASY', 10),
(3, 'How many offshore patrol vessels does Ghana have?', 'One', 'Two', 'Three', 'Four', 'C', 'Ghana has three offshore patrol vessels.', 'EASY', 10);

-- Medium Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(3, 'What type of main battle tank does the Ghana Army operate?', 'M1 Abrams', 'T-55', 'Leopard 2', 'Challenger 2', 'B', 'The Ghana Army operates T-55 main battle tanks.', 'MEDIUM', 15),
(3, 'Which radar system is used by Ghana Air Force?', 'AN/TPQ-36', 'Ground Master 403', 'Flycatcher', 'M3R', 'B', 'The Ground Master 403 radar is used for airspace surveillance.', 'MEDIUM', 15),
(3, 'What is the maximum speed of the M113 APC?', '40 km/h', '56 km/h', '70 km/h', '80 km/h', 'B', 'The M113 APC has a maximum speed of approximately 56 km/h.', 'MEDIUM', 15),
(3, 'Which artillery system does Ghana use?', 'M109', 'D-30', 'PLZ-45', 'M777', 'B', 'The D-30 122mm howitzer is used for indirect fire support.', 'MEDIUM', 15),
(3, 'What is the range of Ghana''s surveillance drones?', '50 km', '100 km', '150 km', '200 km', 'B', 'Ghana''s surveillance drones have a range of approximately 100 km.', 'MEDIUM', 15),
(3, 'Which missile is equipped on Ghana Navy''s OPVs?', 'Exocet MM40', 'Harpoon', 'Sea Sparrow', 'C-802', 'A', 'The Ghana Navy''s OPVs are equipped with Exocet MM40 missiles.', 'MEDIUM', 15),
(3, 'What is the combat range of the Kifaru helicopter?', '200 km', '400 km', '600 km', '800 km', 'C', 'The Kifaru has a combat range of approximately 600 km.', 'MEDIUM', 15),
(3, 'How many helicopters are in Ghana''s aviation unit?', '5', '10', '15', '20', 'B', 'Ghana''s aviation unit has approximately 10 helicopters.', 'MEDIUM', 15),
(3, 'What anti-tank weapon does Ghana use?', 'RPG-7', 'M72 LAW', 'Both A and B', 'None', 'C', 'Ghana uses both RPG-7 and M72 LAW anti-tank weapons.', 'MEDIUM', 15),
(3, 'What is the displacement of Ghana''s largest warship?', '1,000 tons', '1,500 tons', '2,000 tons', '3,000 tons', 'C', 'Ghana''s largest warships have a displacement of about 2,000 tons.', 'MEDIUM', 15);

-- Hard Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(3, 'Which missile system is equipped on Ghana Navy''s offshore patrol vessels?', 'Exocet MM40', 'Harpoon', 'Sea Sparrow', 'C-802', 'A', 'Ghana Navy''s OPVs are equipped with Exocet MM40 missiles.', 'HARD', 20),
(3, 'What is the range of the SA-18 surface-to-air missile?', '5 km', '10 km', '15 km', '25 km', 'A', 'The SA-18 missile system has a range of approximately 5 km.', 'HARD', 20),
(3, 'Which artillery system provides indirect fire support?', 'M109', 'D-30', 'PLZ-45', 'All of the above', 'B', 'The D-30 122mm howitzer is used for indirect fire support.', 'HARD', 20),
(3, 'What is the maximum firing range of D-30 howitzer?', '15 km', '20 km', '25 km', '30 km', 'B', 'The D-30 has a maximum firing range of 20 km.', 'HARD', 20),
(3, 'Which navies has Ghana signed defense agreements with?', 'USA', 'China', 'Britain', 'All of the above', 'D', 'Ghana has defense agreements with multiple countries.', 'HARD', 20),
(3, 'What is the service ceiling of Ghana''s fighter aircraft?', '10,000 m', '15,000 m', '20,000 m', '25,000 m', 'B', 'Ghana''s fighter aircraft have a service ceiling of about 15,000 m.', 'HARD', 20),
(3, 'Which sensor systems are integrated in Ghana''s surveillance?', 'Radar only', 'EO/IR only', 'Both radar and EO/IR', 'None', 'C', 'Ghana uses both radar and electro-optical/infrared sensors.', 'HARD', 20),
(3, 'What is the cruise speed of Ghana''s transport aircraft?', '400 km/h', '500 km/h', '600 km/h', '700 km/h', 'B', 'The C-130 has a cruise speed of approximately 500 km/h.', 'HARD', 20),
(3, 'Which type of torpedo does Ghana Navy use?', ' heavyweight', 'Lightweight', 'Both types', 'None', 'C', 'Ghana Navy operates both heavyweight and lightweight torpedoes.', 'HARD', 20),
(3, 'What is the radar range of Ghana''s early warning system?', '100 km', '250 km', '500 km', '1000 km', 'C', 'Ghana''s early warning radar has a range of approximately 500 km.', 'HARD', 20);

-- ============================================
-- Category 4: Training and Doctrine
-- ============================================

-- Easy Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(4, 'What is the name of the main military academy in Ghana?', 'Ghana Military Academy', 'Kamapla Military Academy', 'Ghana Defence Academy', 'Kumasi Military Academy', 'C', 'The Ghana Defence Academy (GDA) is the premier military training institution.', 'EASY', 10),
(4, 'How long is the basic military training course?', '3 months', '6 months', '9 months', '1 year', 'B', 'The basic military training course typically lasts 6 months.', 'EASY', 10),
(4, 'What is the primary language used for training?', 'French', 'English', 'Arabic', 'Twi', 'B', 'English is the official language for military training in Ghana.', 'EASY', 10),
(4, 'Where is the Ghana Defence Academy located?', 'Accra', 'Kumasi', 'Tema', 'Kumasi', 'A', 'The Ghana Defence Academy is located in Accra.', 'EASY', 10),
(4, 'What is the minimum education requirement for enlistment?', 'JHS', 'SHS', 'University', 'None', 'A', 'Junior High School (JHS) is the minimum requirement.', 'EASY', 10),
(4, 'Which training is mandatory for all soldiers?', 'Basic training', 'Advanced training', 'Specialized training', 'Leadership training', 'A', 'Basic training is mandatory for all enlisted personnel.', 'EASY', 10),
(4, 'What physical test is required for recruitment?', '1.5 mile run', '100m sprint', 'Long jump', 'Swimming', 'A', 'The 1.5 mile run is part of the physical fitness test.', 'EASY', 10),
(4, 'How often does Ghana conduct military exercises?', 'Monthly', 'Quarterly', 'Annually', 'Every 5 years', 'C', 'Major military exercises are conducted annually.', 'EASY', 10),
(4, 'What is the retirement age for Ghanaian soldiers?', '50', '55', '60', '65', 'C', 'The standard retirement age is 60 years.', 'EASY', 10),
(4, 'Which organization conducts international training with Ghana?', 'NATO', 'US AFRICOM', 'UN', 'All of the above', 'D', 'Ghana conducts training with multiple international organizations.', 'EASY', 10);

-- Medium Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(4, 'Which country has Ghana received training from historically?', 'Russia', 'United States', 'Britain', 'Israel', 'C', 'Ghana has historically received military training from Britain.', 'MEDIUM', 15),
(4, 'What is Ghana Army''s jungle warfare training called?', 'Jungle Warfare School', 'Kumasi Training School', 'Ghana Army Training Centre', 'Battle School', 'A', 'The Jungle Warfare School trains soldiers in jungle combat.', 'MEDIUM', 15),
(4, 'What percentage of GDP does Ghana allocate to defense?', '1-2%', '3-4%', '5-6%', '8-10%', 'A', 'Ghana allocates about 1-2% of its GDP to defense.', 'MEDIUM', 15),
(4, 'How long is the Officer Cadet training program?', '6 months', '1 year', '2 years', '4 years', 'D', 'The Officer Cadet program takes approximately 4 years.', 'MEDIUM', 15),
(4, 'What is the name of Ghana''s peacekeeping training center?', 'Kofi Annan Centre', 'Ghana Peacekeeping Centre', 'Accra Training Centre', 'UN Training Centre', 'B', 'Ghana has a dedicated peacekeeping training center.', 'MEDIUM', 15),
(4, 'Which specialized training does Ghana offer?', 'Parachuting', 'Diving', 'Both A and B', 'None', 'C', 'Ghana offers both parachute and diving training.', 'MEDIUM', 15),
(4, 'What is the Ghana Army''s doctrinal approach?', 'Air-land battle', 'Defence in depth', 'Maneuver warfare', 'Popular defense', 'C', 'Ghana Army doctrine emphasizes maneuver warfare.', 'MEDIUM', 15),
(4, 'How many weeks is the pre-deployment training for peacekeepers?', '4 weeks', '8 weeks', '12 weeks', '16 weeks', 'C', 'Pre-deployment training for peacekeepers lasts 12 weeks.', 'MEDIUM', 15),
(4, 'What certification has Ghana achieved for peacekeeping?', 'Blue Helmet Level 3', 'UN Peacekeeping Ready', 'Pre-deployment Certification', 'Strategic Deployment Training', 'B', 'Ghana has achieved "UN Peacekeeping Ready" certification.', 'MEDIUM', 15),
(4, 'Which language is emphasized in Ghana''s military diplomacy?', 'French', 'English', 'Arabic', 'Portuguese', 'B', 'English is emphasized for military diplomacy.', 'MEDIUM', 15);

-- Hard Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(4, 'What is the Ghana Army''s doctrinal approach to warfare?', 'Air-land battle', 'Defence in depth', 'Maneuver warfare', 'Popular defense', 'C', 'Ghana Army doctrine emphasizes maneuver warfare and rapid deployment.', 'HARD', 20),
(4, 'Which UN certification has Ghana achieved?', 'Blue Helmet Level 3', 'UN Peacekeeping Ready', 'Pre-deployment Training Certification', 'Strategic Deployment Training', 'B', 'Ghana has achieved "UN Peacekeeping Ready" certification.', 'HARD', 20),
(4, 'What is the duration of the Junior Command Course?', '3 months', '6 months', '9 months', '1 year', 'B', 'The Junior Command Course at GDA lasts for 6 months.', 'HARD', 20),
(4, 'What is Ghana''s military strategic doctrine based on?', 'Defensive only', 'Offensive only', 'Combined Arms', 'Guerrilla warfare', 'C', 'Ghana''s doctrine is based on combined arms operations.', 'HARD', 20),
(4, 'How does Ghana integrate air and ground forces?', 'Separate commands', 'Joint operations', 'No integration', 'Limited integration', 'B', 'Ghana emphasizes joint operations between air and ground forces.', 'HARD', 20),
(4, 'What is the role of the Ghana Armed Forces Staff College?', 'Basic training', 'Senior officer education', 'Technical training', 'Civil-military relations', 'B', 'The Staff College provides senior officer education.', 'HARD', 20),
(4, 'Which countries participate in Ghana''s annual exercises?', 'USA only', 'UK only', 'Regional only', 'Multiple international', 'D', 'Multiple countries participate in Ghana''s annual exercises.', 'HARD', 20),
(4, 'What is Ghana''s approach to UN peacekeeping doctrine?', 'Traditional', 'Peace enforcement', 'Protection of civilians', 'All of the above', 'D', 'Ghana follows all aspects of UN peacekeeping doctrine.', 'HARD', 20),
(4, 'What is the focus of Ghana''s counter-terrorism training?', 'Intelligence', 'Special operations', 'Both A and B', 'None', 'C', 'Ghana focuses on both intelligence and special operations.', 'HARD', 20),
(4, 'How does Ghana integrate reserve forces?', 'Separate units', 'Embedded with regulars', 'Independent commands', 'No integration', 'B', 'Reserve forces are embedded with regular units for training.', 'HARD', 20);

-- ============================================
-- Category 5: Notable Figures
-- ============================================

-- Easy Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(5, 'Who was Ghana''s first Chief of Defence Staff?', 'General Kutu Acheampong', 'Major General H.T. Alexander', 'General Akwasi Afrifa', 'Lt General E.K. Kotoka', 'B', 'Major General H.T. Alexander was Ghana''s first CDS after independence.', 'EASY', 10),
(5, 'Who is the current Chief of Defence Staff?', 'General Thomas O. N. Q.', 'Lt General Obed Akwa', 'Major General Yaw Ofori', 'Brigadier General Steve O. O.', 'A', 'General Thomas O. N. Q. is the current CDS.', 'EASY', 10),
(5, 'Which Ghanaian leader was known as "The Napoleon"?', 'General Akwasi Afrifa', 'Lt General E.K. Kotoka', 'General Acheampong', 'Colonel K. A. O.', 'B', 'Lt General E.K. Kotoka was known as "The Napoleon".', 'EASY', 10),
(5, 'Who led the 1979 "Saturday Night" coup?', 'Flight Lieutenant Jerry Rawlings', 'General Acheampong', 'General Akwasi Afrifa', 'Flight Lieutenant Kojo Tsikata', 'A', 'Flight Lieutenant Jerry Rawlings led the 1979 coup.', 'EASY', 10),
(5, 'Who was Ghana''s first President after independence?', 'Kwame Nkrumah', 'John Atta Mills', 'Jerry Rawlings', 'John Kufuor', 'A', 'Kwame Nkrumah was Ghana''s first President.', 'EASY', 10),
(5, 'Which military figure founded Ghana''s Air Force?', 'Air Vice Marshal Yaw Ofori', 'General Kutu Acheampong', 'Lt General E.K. Kotoka', 'Colonel R. A. K.', 'A', 'Air Vice Marshal Yaw Ofori founded the Ghana Air Force.', 'EASY', 10),
(5, 'Who was Ghana''s longest-serving military ruler?', 'Jerry Rawlings', 'General Acheampong', 'General Akwasi Afrifa', 'Kwame Nkrumah', 'A', 'Jerry Rawlings was Ghana''s longest-serving military ruler.', 'EASY', 10),
(5, 'Which Ghanaian led ECOWAS forces in Liberia?', 'General Acheampong', 'General Utilities', 'General Dan Abodak', 'Colonel M. K.', 'C', 'General Dan Abodak led ECOWAS forces in Liberia.', 'EASY', 10),
(5, 'Who was the first Ghanaian to command UN peacekeepers?', 'Major General D. K. Osei', 'Brigadier General K. A. Ofori', 'Colonel H. K. Akufo', 'Lt General M. Y. Oti', 'B', 'Brigadier General K. A. Ofori was the first Ghanaian UN commander.', 'EASY', 10),
(5, 'Which figure is credited with modernizing Ghana''s military?', 'General Kutu Acheampong', 'Jerry Rawlings', 'All of the above', 'None', 'C', 'Both leaders contributed to military modernization.', 'EASY', 10);

-- Medium Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(5, 'Who led the 1979 "Saturday Night" coup?', 'Flight Lieutenant Jerry Rawlings', 'General Acheampong', 'General Akwasi Afrifa', 'Flight Lieutenant Kojo Tsikata', 'A', 'Flight Lieutenant Jerry Rawlings led the 1979 "Saturday Night" coup.', 'MEDIUM', 15),
(5, 'Which Ghanaian military figure was instrumental in UN peacekeeping?', 'General M. Y. Oti', 'General C. M. Barwah', 'Colonel R. K. Osei', 'All of the above', 'D', 'All these Ghanaian figures contributed to UN peacekeeping.', 'MEDIUM', 15),
(5, 'Who was the first Ghanaian to command a UN peacekeeping mission?', 'Major General D. K. Osei', 'Brigadier General K. A. Ofori', 'Colonel H. K. Akufo', 'Lt General M. Y. Oti', 'B', 'Brigadier General K. A. Ofori was the first Ghanaian to command UN peacekeepers.', 'MEDIUM', 15),
(5, 'Which military leader established the 1972 coup?', 'General Acheampong', 'General Akwasi Afrifa', 'Jerry Rawlings', 'General Kutu', 'A', 'General Acheampong led the 1972 coup.', 'MEDIUM', 15),
(5, 'Who became President after the 1979 coup?', 'Jerry Rawlings', 'General Acheampong', 'General Akwasi Afrifa', 'Hilla Limann', 'D', 'Hilla Limann became President after the 1979 coup.', 'MEDIUM', 15),
(5, 'Which Ghanaian leader established the "Revolutionary Armed Forces"?', 'Jerry Rawlings', 'General Acheampong', 'Kwame Nkrumah', 'General Kotoka', 'A', 'Jerry Rawlings established the Revolutionary Armed Forces.', 'MEDIUM', 15),
(5, 'Who was Ghana''s first Commander of the Navy?', 'Rear Admiral A. K. N.', 'Rear Admiral Amartei', 'Commodore K. R.', 'Captain M. K.', 'B', 'Rear Admiral Amartei was Ghana''s first Navy Commander.', 'MEDIUM', 15),
(5, 'Which leader instituted the "Accountancy" system in military?', 'General Acheampong', 'Jerry Rawlings', 'General Akwasi Afrifa', 'Kwame Nkrumah', 'A', 'General Acheampong instituted the accountancy system.', 'MEDIUM', 15),
(5, 'Who led Ghana''s intervention in the 1960 Congo crisis?', 'Lt General E.K. Kotoka', 'Major General H.T. Alexander', 'General Kutu Acheampong', 'Colonel R. K.', 'B', 'Major General H.T. Alexander led Ghana''s Congo intervention.', 'MEDIUM', 15),
(5, 'Which Ghanaian was instrumental in forming ECOWAS?', 'Kwame Nkrumah', 'Jerry Rawlings', 'General Acheampong', 'All of the above', 'D', 'Multiple Ghanaian leaders contributed to ECOWAS formation.', 'MEDIUM', 15);

-- Hard Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(5, 'Which Ghanaian military leader was executed after the 1979 coup?', 'General Acheampong', 'General Akwasi Afrifa', 'Both A and B', 'None', 'C', 'Both General Acheampong and General Akwasi Afrifa were executed.', 'HARD', 20),
(5, 'What was Kwame Nkrumah''s military rank before becoming President?', 'Colonel', 'Brigadier', 'General', 'He was a civilian', 'C', 'Kwame Nkrumah held the rank of General before becoming President.', 'HARD', 20),
(5, 'Who was the longest-serving Chief of Defence Staff?', 'General Thomas O.N.Q.', 'General Kutu Acheampong', 'General Emmanuel Kotoka', 'Lt General Obed Akwa', 'B', 'General Kutu Acheampong served as CDS for an extended period.', 'HARD', 20),
(5, 'Which military figure established Ghana''s intelligence service?', 'Lt General Kotoka', 'General Acheampong', 'Jerry Rawlings', 'Colonel R. K.', 'C', 'Jerry Rawlings established Ghana''s intelligence service.', 'HARD', 20),
(5, 'Who was Ghana''s first indigenous military strategist?', 'General H.T. Alexander', 'Lt General E.K. Kotoka', 'General C.M. Barwah', 'Colonel J.A. O.', 'B', 'Lt General E.K. Kotoka was Ghana''s first indigenous strategist.', 'HARD', 20),
(5, 'Which Ghanaian leader established the "State of Emergency" governance?', 'Jerry Rawlings', 'General Acheampong', 'General Akwasi Afrifa', 'Kwame Nkrumah', 'B', 'General Acheampong established the "State of Emergency" governance.', 'HARD', 20),
(5, 'Who was the first Ghanaian to attend the US War College?', 'General M.Y. Oti', 'General C.M. Barwah', 'Colonel R.K. Osei', 'Brigadier K.A. Ofori', 'A', 'General M.Y. Oti was the first Ghanaian to attend the US War College.', 'HARD', 20),
(5, 'Which figure established Ghana''s military academy system?', 'Lt General E.K. Kotoka', 'Major General H.T. Alexander', 'General Kutu Acheampong', 'Colonel J.A. O.', 'B', 'Major General H.T. Alexander established the academy system.', 'HARD', 20),
(5, 'Who led Ghana''s peacekeeping in Angola?', 'General Dan Abodak', 'General Acheampong', 'Colonel R.K.', 'Major General D.K.', 'A', 'General Dan Abodak led Ghana''s peacekeeping mission in Angola.', 'HARD', 20),
(5, 'Which Ghanaian leader established the first military zone system?', 'General Acheampong', 'Jerry Rawlings', 'General Kotoka', 'Kwame Nkrumah', 'C', 'General Kotoka established the first military zone system.', 'HARD', 20);

-- ============================================
-- Category 6: International Relations
-- ============================================

-- Easy Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(6, 'Which international organization has Ghana contributed peacekeepers to?', 'NATO', 'African Union', 'United Nations', 'European Union', 'C', 'Ghana contributes significantly to United Nations peacekeeping.', 'EASY', 10),
(6, 'What is Ghana''s regional military organization called?', 'ECOWAS Monitoring Group', 'ECOWAS Standby Force', 'African Standby Force', 'COMESA Security', 'B', 'Ghana participates in the ECOWAS Standby Force.', 'EASY', 10),
(6, 'Which country is Ghana''s primary military supplier?', 'China', 'Russia', 'United States', 'Britain', 'D', 'Britain has been Ghana''s primary military equipment supplier.', 'EASY', 10),
(6, 'In which country did Ghana first deploy peacekeepers?', 'Congo', 'Lebanon', 'Somalia', 'Rwanda', 'A', 'Ghana first deployed peacekeepers in the Congo (ONUC) in 1960.', 'EASY', 10),
(6, 'What is Ghana''s role in ECOWAS?', 'Observer', 'Full member', 'Former member', 'Not a member', 'B', 'Ghana is a full member of ECOWAS.', 'EASY', 10),
(6, 'Which country signed ACSA with Ghana?', 'USA', 'China', 'Russia', 'France', 'A', 'Ghana signed Acquisition and Cross-Servicing Agreement (ACSA) with USA.', 'EASY', 10),
(6, 'How many troops does Ghana typically contribute to UN missions?', '500-1000', '1000-3000', '3000-5000', 'Below 500', 'B', 'Ghana contributes between 1000-3000 troops to UN peacekeeping.', 'EASY', 10),
(6, 'What is Ghana''s ranking in African peacekeeping?', 'Top 3', 'Top 5', 'Top 10', 'Top 20', 'A', 'Ghana is among the top 3 African peacekeeping contributors.', 'EASY', 10),
(6, 'Which UN mission did Ghana participate in Lebanon?', 'UNIFIL', 'UNOCI', 'UNMIS', 'UNAMID', 'A', 'Ghana participated in UNIFIL in Lebanon.', 'EASY', 10),
(6, 'What type of partnership does Ghana have with NATO?', 'Member', 'Enhanced Opportunity Partner', 'Global Partner', 'Not a partner', 'C', 'Ghana is a NATO Global Partner through the PfP program.', 'EASY', 10);

-- Medium Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(6, 'In which country did Ghana first deploy troops for UN peacekeeping?', 'Congo', 'Lebanon', 'Somalia', 'Rwanda', 'A', 'Ghana first deployed troops for UN peacekeeping in Congo (ONUC) in 1960.', 'MEDIUM', 15),
(6, 'What is the size of Ghana''s UN peacekeeping contribution?', '500-1000 troops', '1000-3000 troops', '3000-5000 troops', 'Below 500 troops', 'B', 'Ghana typically contributes 1000-3000 troops to UN operations.', 'MEDIUM', 15),
(6, 'Which military agreement exists between Ghana and the United States?', 'ACSA', 'DCA', 'BHA', 'FMS', 'A', 'The Acquisition and Cross-Servicing Agreement (ACSA) exists between Ghana and the US.', 'MEDIUM', 15),
(6, 'What was Ghana''s role in the ECOWAS intervention in Liberia?', 'Observer only', 'Lead nation', 'Logistical support', 'Did not participate', 'B', 'Ghana was a lead nation in the ECOWAS intervention in Liberia (ECOMOG).', 'MEDIUM', 15),
(6, 'Which UN mission in Somalia did Ghana participate in?', 'UNOSOM I', 'UNOSOM II', 'Both', 'Neither', 'C', 'Ghana participated in both UNOSOM I and UNOSOM II in Somalia.', 'MEDIUM', 15),
(6, 'What is Ghana''s standing in Africa for peacekeeping?', 'Top 3', 'Top 5', 'Top 10', 'Top 20', 'A', 'Ghana is consistently ranked among the top 3 African contributors.', 'MEDIUM', 15),
(6, 'Which country hosts Ghana''s military training exercises?', 'USA only', 'UK only', 'Multiple countries', 'None', 'C', 'Ghana conducts exercises with multiple countries including USA and UK.', 'MEDIUM', 15),
(6, 'What is Ghana''s defense cooperation focus?', 'Intelligence sharing', 'Training', 'Equipment', 'All of the above', 'D', 'Ghana cooperates in all these areas with partners.', 'MEDIUM', 15),
(6, 'How many peacekeepers has Ghana deployed total?', '10,000', '20,000', '30,000', '50,000', 'C', 'Ghana has deployed over 30,000 peacekeepers historically.', 'MEDIUM', 15),
(6, 'Which regional body does Ghana lead in security?', 'ECOWAS', 'AU', 'UN', 'None', 'A', 'Ghana holds leadership positions in ECOWAS security initiatives.', 'MEDIUM', 15);

-- Hard Questions (10)
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(6, 'What was Ghana''s role in the ECOWAS intervention in Liberia?', 'Observer only', 'Lead nation', 'Logistical support', 'Did not participate', 'B', 'Ghana was a lead nation in the ECOWAS intervention in Liberia (ECOMOG).', 'HARD', 20),
(6, 'Which UN mission in Somalia did Ghana participate in?', 'UNOSOM I', 'UNOSOM II', 'Both', 'Neither', 'C', 'Ghana participated in both UNOSOM I and UNOSOM II missions.', 'HARD', 20),
(6, 'What is Ghana''s standing in Africa for peacekeeping?', 'Top 3', 'Top 5', 'Top 10', 'Top 20', 'A', 'Ghana is consistently ranked among the top 3 African contributors.', 'HARD', 20),
(6, 'What was Ghana''s role in the Sierra Leone civil war?', 'Observer', 'Peace enforcer', 'Both roles', 'No role', 'C', 'Ghana played both observer and peace enforcer roles.', 'HARD', 20),
(6, 'Which country has Ghana''s longest military partnership?', 'USA', 'UK', 'China', 'Russia', 'B', 'The UK has Ghana''s longest military partnership due to colonial ties.', 'HARD', 20),
(6, 'What is Ghana''s contribution to AU peace support operations?', 'Less than 500', '500-1000', '1000-2000', 'Over 2000', 'D', 'Ghana contributes over 2000 troops to AU operations.', 'HARD', 20),
(6, 'Which defense framework guides Ghana''s international cooperation?', 'NATO framework', 'AU framework', 'National security strategy', 'ECOWAS protocols', 'C', 'Ghana''s national security strategy guides international cooperation.', 'HARD', 20),
(6, 'What percentage of Ghana''s military is deployed abroad?', '1%', '5%', '10%', '15%', 'C', 'About 10% of Ghana''s military is typically deployed abroad for peacekeeping.', 'HARD', 20),
(6, 'Which country did Ghana conduct joint exercises with recently?', 'USA', 'UK', 'China', 'All of the above', 'D', 'Ghana conducts joint exercises with multiple countries.', 'HARD', 20),
(6, 'What is Ghana''s strategic priority in international defense?', 'Regional security', 'Global peacekeeping', 'Counter-terrorism', 'All of the above', 'D', 'Ghana prioritizes all these areas in its defense strategy.', 'HARD', 20);

-- ============================================
-- Verify the questions were added
-- ============================================

SELECT 
    c.name AS Category,
    COUNT(q.id) AS Total_Questions,
    SUM(CASE WHEN q.difficulty_level = 'EASY' THEN 1 ELSE 0 END) AS Easy,
    SUM(CASE WHEN q.difficulty_level = 'MEDIUM' THEN 1 ELSE 0 END) AS Medium,
    SUM(CASE WHEN q.difficulty_level = 'HARD' THEN 1 ELSE 0 END) AS Hard
FROM categories c
LEFT JOIN questions q ON c.id = q.category_id AND q.is_active = TRUE
GROUP BY c.id, c.name
ORDER BY c.display_order;
