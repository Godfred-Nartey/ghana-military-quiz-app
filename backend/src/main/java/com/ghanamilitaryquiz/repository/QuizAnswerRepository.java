package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.QuizAnswer;
import com.ghanamilitaryquiz.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAnswerRepository extends JpaRepository<QuizAnswer, Long> {
    
    List<QuizAnswer> findByQuizAttempt(QuizAttempt quizAttempt);
    
    List<QuizAnswer> findByQuizAttemptId(Long quizAttemptId);

    void deleteByQuizAttemptId(Long quizAttemptId);
    
    Long countByQuizAttemptIdAndIsCorrect(Long quizAttemptId, Boolean isCorrect);
}
