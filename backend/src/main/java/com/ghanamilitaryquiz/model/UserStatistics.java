package com.ghanamilitaryquiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "user_statistics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserStatistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "total_quizzes")
    private Integer totalQuizzes = 0;

    @Column(name = "total_questions_answered")
    private Integer totalQuestionsAnswered = 0;

    @Column(name = "total_correct_answers")
    private Integer totalCorrectAnswers = 0;

    @Column(name = "total_points")
    private Integer totalPoints = 0;

    @Column(name = "total_time_spent")
    private Integer totalTimeSpent = 0;

    @Column(name = "current_streak")
    private Integer currentStreak = 0;

    @Column(name = "longest_streak")
    private Integer longestStreak = 0;

    @Column(name = "last_quiz_date")
    private LocalDate lastQuizDate;
}
