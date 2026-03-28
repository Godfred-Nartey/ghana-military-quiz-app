package com.ghanamilitaryquiz.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ghanamilitaryquiz.model.Category;
import com.ghanamilitaryquiz.model.Question;
import com.ghanamilitaryquiz.repository.CategoryRepository;
import com.ghanamilitaryquiz.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {
    
    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;
    
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
    
    public List<Question> getActiveQuestions() {
        return questionRepository.findByIsActiveTrue();
    }
    
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }
    
    public List<Question> getQuestionsByCategory(Long categoryId) {
        return questionRepository.findByCategoryId(categoryId);
    }
    
    public List<Question> getActiveQuestionsByCategory(Long categoryId) {
        return questionRepository.findByCategoryIdAndIsActiveTrue(categoryId);
    }
    
    public List<Question> getRandomQuestions(int limit) {
        List<Question> questions = questionRepository.findRandomQuestions();
        return questions.stream().limit(limit).collect(Collectors.toList());
    }
    
    public List<Question> getRandomQuestionsByCategory(Long categoryId, int limit) {
        List<Question> questions = questionRepository.findRandomQuestionsByCategory(categoryId);
        return questions.stream().limit(limit).collect(Collectors.toList());
    }
    
    public List<Question> getRandomQuestionsByCategoryAndDifficulty(Long categoryId, Question.DifficultyLevel difficulty, int limit) {
        List<Question> questions = questionRepository.findRandomQuestionsByCategoryAndDifficulty(categoryId, difficulty);
        return questions.stream().limit(limit).collect(Collectors.toList());
    }
    
    @Transactional
    public Question createQuestion(Question question, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        question.setCategory(category);
        return questionRepository.save(question);
    }
    
    @Transactional
    public Question updateQuestion(Long id, Question questionDetails) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        if (questionDetails.getQuestionText() != null) {
            question.setQuestionText(questionDetails.getQuestionText());
        }
        if (questionDetails.getOptionA() != null) {
            question.setOptionA(questionDetails.getOptionA());
        }
        if (questionDetails.getOptionB() != null) {
            question.setOptionB(questionDetails.getOptionB());
        }
        if (questionDetails.getOptionC() != null) {
            question.setOptionC(questionDetails.getOptionC());
        }
        if (questionDetails.getOptionD() != null) {
            question.setOptionD(questionDetails.getOptionD());
        }
        if (questionDetails.getCorrectAnswer() != null) {
            question.setCorrectAnswer(questionDetails.getCorrectAnswer());
        }
        if (questionDetails.getExplanation() != null) {
            question.setExplanation(questionDetails.getExplanation());
        }
        if (questionDetails.getDifficultyLevel() != null) {
            question.setDifficultyLevel(questionDetails.getDifficultyLevel());
        }
        if (questionDetails.getPoints() != null) {
            question.setPoints(questionDetails.getPoints());
        }
        if (questionDetails.getIsActive() != null) {
            question.setIsActive(questionDetails.getIsActive());
        }
        
        return questionRepository.save(question);
    }
    
    @Transactional
public void deleteQuestion(Long id) {
    if (!questionRepository.existsById(id)) {
        throw new RuntimeException("Question not found");
    }
    questionRepository.deleteById(id);
}
    
    @Transactional
    public void updateQuestionStats(Long questionId, boolean isCorrect) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        question.setTimesAnswered(question.getTimesAnswered() + 1);
        if (isCorrect) {
            question.setTimesCorrect(question.getTimesCorrect() + 1);
        }
        questionRepository.save(question);
    }
    
    public Long countQuestions() {
        return questionRepository.count();
    }
    
    public Long countQuestionsByCategory(Long categoryId) {
        return questionRepository.countByCategoryId(categoryId);
    }
}
