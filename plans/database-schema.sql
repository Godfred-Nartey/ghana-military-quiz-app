-- Ghana Military Quiz Application - Database Schema
-- MySQL 8.x

-- Create database
CREATE DATABASE IF NOT EXISTS ghana_military_quiz;
USE ghana_military_quiz;

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Categories table
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Questions table
CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(500) NOT NULL,
    option_b VARCHAR(500) NOT NULL,
    option_c VARCHAR(500) NOT NULL,
    option_d VARCHAR(500) NOT NULL,
    correct_answer ENUM('A', 'B', 'C', 'D') NOT NULL,
    explanation TEXT,
    difficulty_level ENUM('EASY', 'MEDIUM', 'HARD') DEFAULT 'MEDIUM',
    points INT DEFAULT 10,
    is_active BOOLEAN DEFAULT TRUE,
    times_answered INT DEFAULT 0,
    times_correct INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quiz attempts table
CREATE TABLE quiz_attempts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    score INT DEFAULT 0,
    total_questions INT NOT NULL,
    correct_answers INT DEFAULT 0,
    time_taken INT DEFAULT 0, -- in seconds
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_category (category_id),
    INDEX idx_completed (is_completed),
    INDEX idx_score (score),
    INDEX idx_completed_at (completed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quiz answers table
CREATE TABLE quiz_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_attempt_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    user_answer ENUM('A', 'B', 'C', 'D') NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    time_spent INT DEFAULT 0, -- in seconds
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    INDEX idx_attempt (quiz_attempt_id),
    INDEX idx_question (question_id),
    INDEX idx_correct (is_correct)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Achievements table
CREATE TABLE achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    criteria_type VARCHAR(50) NOT NULL, -- e.g., 'QUIZ_COUNT', 'PERFECT_SCORE', 'STREAK', 'TOTAL_POINTS'
    criteria_value INT NOT NULL,
    points INT DEFAULT 0,
    badge_color VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_criteria (criteria_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User achievements table
CREATE TABLE user_achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    achievement_id BIGINT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_achievement (user_id, achievement_id),
    INDEX idx_user (user_id),
    INDEX idx_achievement (achievement_id),
    INDEX idx_earned_at (earned_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User progress table
CREATE TABLE user_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    total_attempts INT DEFAULT 0,
    best_score INT DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0.00,
    total_time_spent INT DEFAULT 0, -- in seconds
    total_points INT DEFAULT 0,
    last_attempt_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_category (user_id, category_id),
    INDEX idx_user (user_id),
    INDEX idx_category (category_id),
    INDEX idx_best_score (best_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User statistics table (aggregated data)
CREATE TABLE user_statistics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_quizzes INT DEFAULT 0,
    total_questions_answered INT DEFAULT 0,
    total_correct_answers INT DEFAULT 0,
    total_points INT DEFAULT 0,
    total_time_spent INT DEFAULT 0, -- in seconds
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_quiz_date DATE NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_stats (user_id),
    INDEX idx_total_points (total_points),
    INDEX idx_current_streak (current_streak)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default categories
INSERT INTO categories (name, description, icon, display_order) VALUES
('Military History', 'Questions about Ghana Military history, independence, and major operations', 'history', 1),
('Ranks and Structure', 'Military ranks, command structure, and organizational hierarchy', 'ranks', 2),
('Military Equipment', 'Weapons, vehicles, aircraft, and naval vessels', 'equipment', 3),
('Training and Doctrine', 'Military training programs, academies, and operational procedures', 'training', 4),
('Notable Figures', 'Military leaders, war heroes, and Chiefs of Defence Staff', 'figures', 5),
('International Relations', 'UN peacekeeping, regional cooperation, and military alliances', 'international', 6);

-- Insert default achievements
INSERT INTO achievements (name, description, icon, criteria_type, criteria_value, points, badge_color) VALUES
('First Steps', 'Complete your first quiz', 'star', 'QUIZ_COUNT', 1, 10, 'bronze'),
('Quiz Master', 'Complete 10 quizzes', 'trophy', 'QUIZ_COUNT', 10, 50, 'silver'),
('Quiz Legend', 'Complete 50 quizzes', 'crown', 'QUIZ_COUNT', 50, 200, 'gold'),
('Perfect Score', 'Get 100% on any quiz', 'perfect', 'PERFECT_SCORE', 1, 25, 'gold'),
('Speed Demon', 'Complete a quiz in under 2 minutes', 'lightning', 'SPEED', 120, 30, 'silver'),
('Category Expert', 'Complete all questions in a category', 'expert', 'CATEGORY_COMPLETE', 1, 100, 'gold'),
('Point Collector', 'Earn 1000 total points', 'coins', 'TOTAL_POINTS', 1000, 50, 'gold'),
('Streak Master', 'Maintain a 7-day streak', 'fire', 'STREAK', 7, 75, 'gold'),
('Knowledge Seeker', 'Answer 100 questions correctly', 'book', 'CORRECT_ANSWERS', 100, 100, 'silver'),
('Dedicated Learner', 'Spend 1 hour total on quizzes', 'clock', 'TIME_SPENT', 3600, 40, 'bronze');

-- Insert sample admin user (password: admin123 - should be changed)
-- Note: This is a bcrypt hash of 'admin123' - change in production
INSERT INTO users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@ghanamilitaryquiz.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'System Administrator', 'ADMIN');

-- Insert sample questions for Military History category
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(1, 'In what year did Ghana gain independence?', '1955', '1957', '1960', '1963', 'B', 'Ghana gained independence from British colonial rule on March 6, 1957, becoming the first sub-Saharan African country to do so.', 'EASY', 10),
(1, 'Who was the first Chief of Defence Staff of the Ghana Armed Forces?', 'Major General H.T. Alexander', 'Lieutenant General S.J.A. Otu', 'Major General C.M. Barwah', 'Lieutenant General E.K. Kotoka', 'A', 'Major General H.T. Alexander served as the first Chief of Defence Staff of the Ghana Armed Forces after independence.', 'MEDIUM', 15),
(1, 'Which UN peacekeeping mission was Ghana first involved in?', 'UNEF I in Egypt', 'ONUC in Congo', 'UNIFIL in Lebanon', 'UNOSOM in Somalia', 'B', 'Ghana first participated in UN peacekeeping through ONUC (United Nations Operation in the Congo) in 1960.', 'HARD', 20);

-- Insert sample questions for Ranks and Structure category
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty_level, points) VALUES
(2, 'What is the highest rank in the Ghana Armed Forces?', 'Lieutenant General', 'General', 'Field Marshal', 'Chief of Defence Staff', 'B', 'General is the highest rank in the Ghana Armed Forces, typically held by the Chief of Defence Staff.', 'EASY', 10),
(2, 'How many stars does a Brigadier General wear?', 'One', 'Two', 'Three', 'Four', 'A', 'A Brigadier General wears one star as their rank insignia.', 'MEDIUM', 15),
(2, 'Which of these is NOT a branch of the Ghana Armed Forces?', 'Ghana Army', 'Ghana Navy', 'Ghana Air Force', 'Ghana Marines', 'D', 'The Ghana Armed Forces consists of the Army, Navy, and Air Force. There is no separate Marines branch.', 'EASY', 10);

-- Create views for common queries

-- Leaderboard view
CREATE VIEW leaderboard_view AS
SELECT 
    u.id,
    u.username,
    u.full_name,
    us.total_points,
    us.total_quizzes,
    us.total_correct_answers,
    us.current_streak,
    COUNT(DISTINCT ua.achievement_id) as total_achievements
FROM users u
LEFT JOIN user_statistics us ON u.id = us.user_id
LEFT JOIN user_achievements ua ON u.id = ua.user_id
WHERE u.is_active = TRUE
GROUP BY u.id, u.username, u.full_name, us.total_points, us.total_quizzes, us.total_correct_answers, us.current_streak
ORDER BY us.total_points DESC;

-- Category performance view
CREATE VIEW category_performance_view AS
SELECT 
    c.id as category_id,
    c.name as category_name,
    COUNT(DISTINCT qa.id) as total_attempts,
    COUNT(DISTINCT q.id) as total_questions,
    AVG(qa.score) as average_score,
    SUM(qa.time_taken) as total_time_spent
FROM categories c
LEFT JOIN questions q ON c.id = q.category_id
LEFT JOIN quiz_attempts qa ON c.id = qa.category_id AND qa.is_completed = TRUE
GROUP BY c.id, c.name;

-- Question statistics view
CREATE VIEW question_statistics_view AS
SELECT 
    q.id,
    q.question_text,
    q.category_id,
    c.name as category_name,
    q.difficulty_level,
    q.times_answered,
    q.times_correct,
    CASE 
        WHEN q.times_answered > 0 THEN ROUND((q.times_correct * 100.0 / q.times_answered), 2)
        ELSE 0 
    END as success_rate
FROM questions q
JOIN categories c ON q.category_id = c.id
WHERE q.is_active = TRUE;

-- Stored procedures

-- Procedure to update user statistics after quiz completion
DELIMITER //
CREATE PROCEDURE update_user_statistics(IN p_user_id BIGINT, IN p_quiz_attempt_id BIGINT)
BEGIN
    DECLARE v_score INT;
    DECLARE v_correct_answers INT;
    DECLARE v_time_taken INT;
    DECLARE v_quiz_date DATE;
    
    -- Get quiz attempt details
    SELECT score, correct_answers, time_taken, DATE(completed_at)
    INTO v_score, v_correct_answers, v_time_taken, v_quiz_date
    FROM quiz_attempts
    WHERE id = p_quiz_attempt_id;
    
    -- Update or insert user statistics
    INSERT INTO user_statistics (
        user_id, 
        total_quizzes, 
        total_questions_answered, 
        total_correct_answers, 
        total_points, 
        total_time_spent,
        last_quiz_date
    )
    VALUES (
        p_user_id, 
        1, 
        (SELECT total_questions FROM quiz_attempts WHERE id = p_quiz_attempt_id),
        v_correct_answers, 
        v_score, 
        v_time_taken,
        v_quiz_date
    )
    ON DUPLICATE KEY UPDATE
        total_quizzes = total_quizzes + 1,
        total_questions_answered = total_questions_answered + VALUES(total_questions_answered),
        total_correct_answers = total_correct_answers + v_correct_answers,
        total_points = total_points + v_score,
        total_time_spent = total_time_spent + v_time_taken,
        last_quiz_date = v_quiz_date;
        
    -- Update streak
    CALL update_user_streak(p_user_id, v_quiz_date);
END //

-- Procedure to update user streak
CREATE PROCEDURE update_user_streak(IN p_user_id BIGINT, IN p_quiz_date DATE)
BEGIN
    DECLARE v_last_quiz_date DATE;
    DECLARE v_current_streak INT;
    DECLARE v_longest_streak INT;
    
    SELECT last_quiz_date, current_streak, longest_streak
    INTO v_last_quiz_date, v_current_streak, v_longest_streak
    FROM user_statistics
    WHERE user_id = p_user_id;
    
    IF v_last_quiz_date IS NULL THEN
        -- First quiz
        UPDATE user_statistics
        SET current_streak = 1, longest_streak = 1
        WHERE user_id = p_user_id;
    ELSEIF DATEDIFF(p_quiz_date, v_last_quiz_date) = 1 THEN
        -- Consecutive day
        SET v_current_streak = v_current_streak + 1;
        SET v_longest_streak = GREATEST(v_longest_streak, v_current_streak);
        UPDATE user_statistics
        SET current_streak = v_current_streak, longest_streak = v_longest_streak
        WHERE user_id = p_user_id;
    ELSEIF DATEDIFF(p_quiz_date, v_last_quiz_date) > 1 THEN
        -- Streak broken
        UPDATE user_statistics
        SET current_streak = 1
        WHERE user_id = p_user_id;
    END IF;
END //

-- Procedure to update question statistics
CREATE PROCEDURE update_question_statistics(IN p_question_id BIGINT, IN p_is_correct BOOLEAN)
BEGIN
    UPDATE questions
    SET 
        times_answered = times_answered + 1,
        times_correct = times_correct + IF(p_is_correct, 1, 0)
    WHERE id = p_question_id;
END //

DELIMITER ;

-- Triggers

-- Trigger to update user progress after quiz completion
DELIMITER //
CREATE TRIGGER after_quiz_completion
AFTER UPDATE ON quiz_attempts
FOR EACH ROW
BEGIN
    IF NEW.is_completed = TRUE AND OLD.is_completed = FALSE THEN
        -- Update user progress
        INSERT INTO user_progress (
            user_id,
            category_id,
            total_attempts,
            best_score,
            average_score,
            total_time_spent,
            total_points,
            last_attempt_at
        )
        VALUES (
            NEW.user_id,
            NEW.category_id,
            1,
            NEW.score,
            NEW.score,
            NEW.time_taken,
            NEW.score,
            NEW.completed_at
        )
        ON DUPLICATE KEY UPDATE
            total_attempts = total_attempts + 1,
            best_score = GREATEST(best_score, NEW.score),
            average_score = (average_score * total_attempts + NEW.score) / (total_attempts + 1),
            total_time_spent = total_time_spent + NEW.time_taken,
            total_points = total_points + NEW.score,
            last_attempt_at = NEW.completed_at;
            
        -- Update user statistics
        CALL update_user_statistics(NEW.user_id, NEW.id);
    END IF;
END //

DELIMITER ;

-- Indexes for performance optimization
CREATE INDEX idx_quiz_attempts_user_completed ON quiz_attempts(user_id, is_completed, completed_at);
CREATE INDEX idx_quiz_answers_attempt_correct ON quiz_answers(quiz_attempt_id, is_correct);
CREATE INDEX idx_user_achievements_user_earned ON user_achievements(user_id, earned_at);
CREATE INDEX idx_questions_category_active ON questions(category_id, is_active, difficulty_level);

-- Full-text search index for questions
