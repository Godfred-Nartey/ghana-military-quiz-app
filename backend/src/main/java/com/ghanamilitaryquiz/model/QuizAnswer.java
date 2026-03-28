package com.ghanamilitaryquiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_answers")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_attempt_id", nullable = false)
    private QuizAttempt quizAttempt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_answer", nullable = false)
    private Question.Answer userAnswer;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect = false;

    @Column(name = "time_spent")
    private Integer timeSpent = 0;

    @CreationTimestamp
    @Column(name = "answered_at", nullable = false, updatable = false)
    private LocalDateTime answeredAt;
}
