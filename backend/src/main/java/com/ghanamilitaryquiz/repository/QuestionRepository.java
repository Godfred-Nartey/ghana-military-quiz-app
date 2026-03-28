package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.Question;
import com.ghanamilitaryquiz.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    List<Question> findByCategory(Category category);
    List<Question> findByCategoryId(Long categoryId);
    List<Question> findByCategoryIdAndIsActiveTrue(Long categoryId);
    List<Question> findByIsActiveTrue();
    
    @Query("SELECT q FROM Question q WHERE q.isActive = true ORDER BY RAND()")
    List<Question> findRandomQuestions();
    
    @Query("SELECT q FROM Question q WHERE q.category.id = :categoryId AND q.isActive = true ORDER BY RAND()")
    List<Question> findRandomQuestionsByCategory(Long categoryId);
    
    @Query("SELECT q FROM Question q WHERE q.category.id = :categoryId AND q.isActive = true AND q.difficultyLevel = :difficulty ORDER BY RAND()")
    List<Question> findRandomQuestionsByCategoryAndDifficulty(Long categoryId, Question.DifficultyLevel difficulty);
    
    Long countByCategoryId(Long categoryId);

    @Transactional
    void deleteByCategoryId(Long categoryId);
}