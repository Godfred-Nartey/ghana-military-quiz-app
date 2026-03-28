package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.QuizAttempt;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    
    List<QuizAttempt> findByUser(User user);
    
    List<QuizAttempt> findByUserId(Long userId);

    void deleteByUserId(Long userId);
    
    List<QuizAttempt> findByUserIdOrderByStartedAtDesc(Long userId);
    
    List<QuizAttempt> findByCategory(Category category);
    
    List<QuizAttempt> findByUserIdAndCategoryId(Long userId, Long categoryId);
    
    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.isCompleted = true ORDER BY qa.score DESC")
    List<QuizAttempt> findTopScores();
    
    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.isCompleted = true AND qa.category.id = :categoryId ORDER BY qa.score DESC")
    List<QuizAttempt> findTopScoresByCategory(Long categoryId);
    
    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.isCompleted = true AND qa.user.id = :userId ORDER BY qa.score DESC")
    List<QuizAttempt> findTopScoresByUser(Long userId);
    
    Optional<QuizAttempt> findByIdAndUserId(Long attemptId, Long userId);
    
    Long countByUserId(Long userId);
    
    Long countByUserIdAndIsCompleted(Long userId, Boolean isCompleted);
}
