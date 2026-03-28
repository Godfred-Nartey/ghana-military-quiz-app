package com.ghanamilitaryquiz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ghanamilitaryquiz.dto.ApiResponse;
import com.ghanamilitaryquiz.dto.QuestionRequest;
import com.ghanamilitaryquiz.model.Question;
import com.ghanamilitaryquiz.service.CategoryService;
import com.ghanamilitaryquiz.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    // @PreAuthorize("hasRole('ADMIN')") // Temporarily disabled for testing
    public ResponseEntity<ApiResponse<List<Question>>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(new ApiResponse<>(true, "Questions retrieved successfully", questions));
    }

    @GetMapping("/category/{categoryId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Question>>> getQuestionsByCategory(@PathVariable Long categoryId) {
        List<Question> questions = questionService.getQuestionsByCategory(categoryId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Questions retrieved successfully", questions));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Question>> getQuestionById(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        return ResponseEntity.ok(new ApiResponse<>(true, "Question retrieved successfully", question));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Question>> createQuestion(@RequestBody QuestionRequest request) {
        try {
            Question question = new Question();
            question.setQuestionText(request.getQuestionText());
            question.setOptionA(request.getOptionA());
            question.setOptionB(request.getOptionB());
            question.setOptionC(request.getOptionC());
            question.setOptionD(request.getOptionD());
            question.setCorrectAnswer(request.getCorrectAnswer());
            question.setExplanation(request.getExplanation());
            question.setDifficultyLevel(request.getDifficultyLevel());
            question.setPoints(request.getPoints());
            question.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);

            Question createdQuestion = questionService.createQuestion(question, request.getCategoryId());
            return ResponseEntity.ok(new ApiResponse<>(true, "Question created successfully", createdQuestion));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Error creating question: " + e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Question>> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        Question updatedQuestion = questionService.updateQuestion(id, question);
        return ResponseEntity.ok(new ApiResponse<>(true, "Question updated successfully", updatedQuestion));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Question deleted successfully", null));
    }
}