package com.ghanamilitaryquiz.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ghanamilitaryquiz.dto.ApiResponse;
import com.ghanamilitaryquiz.model.Question;
import com.ghanamilitaryquiz.model.QuizAnswer;
import com.ghanamilitaryquiz.model.QuizAttempt;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.repository.UserRepository;
import com.ghanamilitaryquiz.service.AchievementService;
import com.ghanamilitaryquiz.service.QuestionService;
import com.ghanamilitaryquiz.service.QuizService;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private AchievementService achievementService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/start")
    public ResponseEntity<ApiResponse<QuizAttempt>> startQuiz(@RequestBody Map<String, Object> request) {
        try {
            Long categoryId = Long.valueOf(request.get("categoryId").toString());
            Integer numberOfQuestions = request.get("numberOfQuestions") != null
                ? Integer.valueOf(request.get("numberOfQuestions").toString())
                : 10;

            Long userId = getCurrentUserId();

            List<Question> questions = questionService.getRandomQuestionsByCategory(categoryId, numberOfQuestions);

            if (questions.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "No questions available for this category", null));
            }

            QuizAttempt attempt = quizService.createQuizAttempt(userId, categoryId, questions.size());

            return ResponseEntity.ok(new ApiResponse<>(true, "Quiz started successfully", attempt));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error starting quiz: " + e.getMessage(), null));
        }
    }

    @GetMapping("/{attemptId}/questions")
    public ResponseEntity<ApiResponse<List<Question>>> getQuizQuestions(@PathVariable Long attemptId) {
        try {
            QuizAttempt attempt = quizService.getQuizAttemptById(attemptId)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found"));

            List<Question> questions = questionService.getRandomQuestionsByCategory(
                attempt.getCategory().getId(),
                attempt.getTotalQuestions()
            );

            for (Question q : questions) {
                q.setCorrectAnswer(null);
            }

            return ResponseEntity.ok(new ApiResponse<>(true, "Questions retrieved successfully", questions));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error getting questions: " + e.getMessage(), null));
        }
    }

    @PostMapping("/{attemptId}/answers")
    public ResponseEntity<ApiResponse<QuizAnswer>> submitAnswer(
            @PathVariable Long attemptId,
            @RequestBody Map<String, Object> request) {
        try {
            Long questionId = Long.valueOf(request.get("questionId").toString());
            String userAnswer = request.get("userAnswer").toString();
            Integer timeSpent = Integer.valueOf(request.get("timeSpent").toString());

            Question question = questionService.getQuestionById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

            boolean isCorrect = question.getCorrectAnswer().toString().equals(userAnswer);

            QuizAnswer answer = quizService.saveQuizAnswer(attemptId, questionId, userAnswer, isCorrect, timeSpent);

            questionService.updateQuestionStats(questionId, isCorrect);

            return ResponseEntity.ok(new ApiResponse<>(true, "Answer submitted successfully", answer));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error submitting answer: " + e.getMessage(), null));
        }
    }

    @PostMapping("/{attemptId}/complete")
    public ResponseEntity<ApiResponse<QuizAttempt>> completeQuiz(@PathVariable Long attemptId) {
        try {
            QuizAttempt attempt = quizService.completeQuiz(attemptId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Quiz completed successfully", attempt));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error completing quiz: " + e.getMessage(), null));
        }
    }

    @GetMapping("/{attemptId}/result")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getQuizResult(@PathVariable Long attemptId) {
        try {
            Long userId = getCurrentUserId();

            QuizAttempt attempt = quizService.getQuizAttemptById(attemptId)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found"));

            if (!attempt.getUser().getId().equals(userId)) {
                return ResponseEntity.status(403)
                    .body(new ApiResponse<>(false, "Unauthorized to view this result", null));
            }

            List<QuizAnswer> answers = quizService.getQuizAnswersByAttempt(attemptId);

            int correctAnswers = (int) answers.stream().filter(QuizAnswer::getIsCorrect).count();
            int totalQuestions = attempt.getTotalQuestions();
            int score = totalQuestions > 0 ? (correctAnswers * 100) / totalQuestions : 0;
            int timeTaken = answers.stream()
                .mapToInt(a -> a.getTimeSpent() != null ? a.getTimeSpent() : 0)
                .sum();

            quizService.updateQuizAttempt(attemptId, score, correctAnswers, true);

            achievementService.checkAndAwardAchievements(userId);

            Map<String, Object> result = new HashMap<>();
            result.put("attempt", attempt);
            result.put("answers", answers);
            result.put("score", score);
            result.put("correctAnswers", correctAnswers);
            result.put("totalQuestions", totalQuestions);
            result.put("timeTaken", timeTaken);

            return ResponseEntity.ok(new ApiResponse<>(true, "Quiz results retrieved successfully", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error getting results: " + e.getMessage(), null));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<QuizAttempt>>> getQuizHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Long userId = getCurrentUserId();
            List<QuizAttempt> attempts = quizService.getQuizAttemptsByUser(userId, page, size);
            return ResponseEntity.ok(new ApiResponse<>(true, "Quiz history retrieved successfully", attempts));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error getting quiz history: " + e.getMessage(), null));
        }
    }

    @GetMapping("/category/{categoryId}/history")
    public ResponseEntity<ApiResponse<List<QuizAttempt>>> getCategoryQuizHistory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Long userId = getCurrentUserId();
            List<QuizAttempt> attempts = quizService.getQuizAttemptsByUserAndCategory(userId, categoryId, page, size);
            return ResponseEntity.ok(new ApiResponse<>(true, "Category quiz history retrieved successfully", attempts));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error getting category quiz history: " + e.getMessage(), null));
        }
    }

    private Long getCurrentUserId() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getPrincipal() instanceof org.springframework.security.core.userdetails.User) {
                org.springframework.security.core.userdetails.User user =
                    (org.springframework.security.core.userdetails.User) auth.getPrincipal();
                User dbUser = userRepository.findByUsername(user.getUsername()).orElse(null);
                if (dbUser != null) {
                    return dbUser.getId();
                }
            }
            return 1L;
        } catch (Exception e) {
            return 1L;
        }
    }
}