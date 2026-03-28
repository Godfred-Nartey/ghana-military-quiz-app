package com.ghanamilitaryquiz.service;

import com.ghanamilitaryquiz.model.*;
import com.ghanamilitaryquiz.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizService {
    
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAnswerRepository quizAnswerRepository;
    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final UserStatisticsRepository userStatisticsRepository;
    private final UserProgressRepository userProgressRepository;
    private final AchievementService achievementService;
    
    @Transactional
    public QuizAttempt startQuiz(Long userId, Long categoryId, Integer numberOfQuestions) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        List<Question> questions = questionRepository.findRandomQuestionsByCategory(categoryId);
        if (questions.isEmpty()) {
            throw new RuntimeException("No questions available for this category");
        }
        
        int actualQuestions = Math.min(numberOfQuestions, questions.size());
        List<Question> selectedQuestions = questions.subList(0, actualQuestions);
        
        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setCategory(category);
        attempt.setTotalQuestions(actualQuestions);
        attempt.setScore(0);
        attempt.setCorrectAnswers(0);
        attempt.setIsCompleted(false);
        
        return quizAttemptRepository.save(attempt);
    }
    
    @Transactional
    public QuizAnswer submitAnswer(Long attemptId, Long questionId, Question.Answer userAnswer, Integer timeSpent) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found"));
        
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        boolean isCorrect = question.getCorrectAnswer() == userAnswer;
        
        // Update question statistics
        question.setTimesAnswered(question.getTimesAnswered() + 1);
        if (isCorrect) {
            question.setTimesCorrect(question.getTimesCorrect() + 1);
        }
        questionRepository.save(question);
        
        // Create answer record
        QuizAnswer answer = new QuizAnswer();
        answer.setQuizAttempt(attempt);
        answer.setQuestion(question);
        answer.setUserAnswer(userAnswer);
        answer.setIsCorrect(isCorrect);
        answer.setTimeSpent(timeSpent);
        
        return quizAnswerRepository.save(answer);
    }
    
    @Transactional
    public QuizAttempt completeQuiz(Long attemptId) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found"));
        
        List<QuizAnswer> answers = quizAnswerRepository.findByQuizAttemptId(attemptId);
        
        int correctAnswers = 0;
        int totalTimeSpent = 0;
        int totalPoints = 0;
        
        for (QuizAnswer answer : answers) {
            if (answer.getIsCorrect()) {
                correctAnswers++;
                totalPoints += answer.getQuestion().getPoints();
            }
            totalTimeSpent += answer.getTimeSpent();
        }
        
        int score = attempt.getTotalQuestions() > 0 
                ? (int) ((correctAnswers * 100.0) / attempt.getTotalQuestions()) 
                : 0;
        
        attempt.setScore(score);
        attempt.setCorrectAnswers(correctAnswers);
        attempt.setTimeTaken(totalTimeSpent);
        attempt.setCompletedAt(LocalDateTime.now());
        attempt.setIsCompleted(true);
        
        QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);
        
        // Update user statistics
        updateUserStatistics(attempt.getUser().getId(), savedAttempt);
        
        // Update user progress
        updateUserProgress(attempt.getUser().getId(), attempt.getCategory().getId(), savedAttempt);
        
        // Check for achievements
        achievementService.checkAndAwardAchievements(attempt.getUser().getId());
        
        return savedAttempt;
    }
    
    private void updateUserStatistics(Long userId, QuizAttempt attempt) {
        UserStatistics stats = userStatisticsRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserStatistics newStats = new UserStatistics();
                    newStats.setUser(userRepository.getReferenceById(userId));
                    return newStats;
                });
        
        stats.setTotalQuizzes(stats.getTotalQuizzes() + 1);
        stats.setTotalQuestionsAnswered(stats.getTotalQuestionsAnswered() + attempt.getTotalQuestions());
        stats.setTotalCorrectAnswers(stats.getTotalCorrectAnswers() + attempt.getCorrectAnswers());
        stats.setTotalPoints(stats.getTotalPoints() + attempt.getScore());
        stats.setTotalTimeSpent(stats.getTotalTimeSpent() + attempt.getTimeTaken());
        
        // Update streak
        LocalDate today = LocalDate.now();
        if (stats.getLastQuizDate() == null) {
            stats.setCurrentStreak(1);
        } else if (stats.getLastQuizDate().equals(today.minusDays(1))) {
            stats.setCurrentStreak(stats.getCurrentStreak() + 1);
        } else if (!stats.getLastQuizDate().equals(today)) {
            stats.setCurrentStreak(1);
        }
        
        if (stats.getCurrentStreak() > stats.getLongestStreak()) {
            stats.setLongestStreak(stats.getCurrentStreak());
        }
        
        stats.setLastQuizDate(today);
        
        userStatisticsRepository.save(stats);
    }
    
    private void updateUserProgress(Long userId, Long categoryId, QuizAttempt attempt) {
        UserProgress progress = userProgressRepository.findByUserIdAndCategoryId(userId, categoryId)
                .orElseGet(() -> {
                    UserProgress newProgress = new UserProgress();
                    newProgress.setUser(userRepository.getReferenceById(userId));
                    newProgress.setCategory(categoryRepository.getReferenceById(categoryId));
                    return newProgress;
                });
        
        progress.setTotalAttempts(progress.getTotalAttempts() + 1);
        
        if (attempt.getScore() > progress.getBestScore()) {
            progress.setBestScore(attempt.getScore());
        }
        
        // Calculate new average
        BigDecimal newTotal = BigDecimal.valueOf(progress.getAverageScore().doubleValue() * (progress.getTotalAttempts() - 1) + attempt.getScore());
        progress.setAverageScore(newTotal.divide(BigDecimal.valueOf(progress.getTotalAttempts()), 2, RoundingMode.HALF_UP));
        
        progress.setTotalTimeSpent(progress.getTotalTimeSpent() + attempt.getTimeTaken());
        progress.setTotalPoints(progress.getTotalPoints() + attempt.getScore());
        progress.setLastAttemptAt(LocalDateTime.now());
        
        userProgressRepository.save(progress);
    }
    
    public Optional<QuizAttempt> getQuizAttemptById(Long id) {
        return quizAttemptRepository.findById(id);
    }
    
    public List<QuizAttempt> getUserQuizAttempts(Long userId) {
        return quizAttemptRepository.findByUserIdOrderByStartedAtDesc(userId);
    }
    
    public List<QuizAttempt> getTopScores(int limit) {
        List<QuizAttempt> attempts = quizAttemptRepository.findTopScores();
        return attempts.stream().limit(limit).collect(java.util.stream.Collectors.toList());
    }
    
    public List<QuizAttempt> getTopScoresByCategory(Long categoryId, int limit) {
        List<QuizAttempt> attempts = quizAttemptRepository.findTopScoresByCategory(categoryId);
        return attempts.stream().limit(limit).collect(java.util.stream.Collectors.toList());
    }
    
    public List<QuizAnswer> getQuizAnswers(Long attemptId) {
        return quizAnswerRepository.findByQuizAttemptId(attemptId);
    }
    
    @Transactional
    public QuizAttempt createQuizAttempt(Long userId, Long categoryId, int numberOfQuestions) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setCategory(category);
        attempt.setTotalQuestions(numberOfQuestions);
        attempt.setScore(0);
        attempt.setCorrectAnswers(0);
        attempt.setIsCompleted(false);
        
        return quizAttemptRepository.save(attempt);
    }
    
    @Transactional
    public QuizAnswer saveQuizAnswer(Long attemptId, Long questionId, String userAnswer, boolean isCorrect, Integer timeSpent) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found"));
        
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        QuizAnswer answer = new QuizAnswer();
        answer.setQuizAttempt(attempt);
        answer.setQuestion(question);
        answer.setUserAnswer(Question.Answer.valueOf(userAnswer));
        answer.setIsCorrect(isCorrect);
        answer.setTimeSpent(timeSpent);
        
        return quizAnswerRepository.save(answer);
    }
    
    @Transactional
    public QuizAttempt updateQuizAttempt(Long attemptId, int score, int correctAnswers, boolean isCompleted) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found"));
        
        attempt.setScore(score);
        attempt.setCorrectAnswers(correctAnswers);
        attempt.setIsCompleted(isCompleted);
        
        if (isCompleted) {
            attempt.setCompletedAt(LocalDateTime.now());
            
            // Update user statistics
            updateUserStatistics(attempt.getUser().getId(), attempt);
            
            // Update user progress
            updateUserProgress(attempt.getUser().getId(), attempt.getCategory().getId(), attempt);
            
            // Check for achievements
            achievementService.checkAndAwardAchievements(attempt.getUser().getId());
        }
        
        return quizAttemptRepository.save(attempt);
    }
    
    public List<QuizAttempt> getQuizAttemptsByUser(Long userId, int page, int size) {
        List<QuizAttempt> attempts = quizAttemptRepository.findByUserIdOrderByStartedAtDesc(userId);
        int start = page * size;
        int end = Math.min(start + size, attempts.size());
        if (start >= attempts.size()) {
            return new ArrayList<>();
        }
        return attempts.subList(start, end);
    }
    
    public List<QuizAttempt> getQuizAttemptsByUserAndCategory(Long userId, Long categoryId, int page, int size) {
        List<QuizAttempt> allAttempts = quizAttemptRepository.findByUserIdOrderByStartedAtDesc(userId);
        List<QuizAttempt> filtered = new ArrayList<>();
        for (QuizAttempt attempt : allAttempts) {
            if (attempt.getCategory().getId().equals(categoryId)) {
                filtered.add(attempt);
            }
        }
        int start = page * size;
        int end = Math.min(start + size, filtered.size());
        if (start >= filtered.size()) {
            return new ArrayList<>();
        }
        return filtered.subList(start, end);
    }
    
    public List<QuizAnswer> getQuizAnswersByAttempt(Long attemptId) {
        return quizAnswerRepository.findByQuizAttemptId(attemptId);
    }
}
