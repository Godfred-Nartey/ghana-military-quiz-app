package com.ghanamilitaryquiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatisticsDto {
    private Long id;
    private Long userId;
    private Integer totalQuizzes;
    private Integer totalQuestionsAnswered;
    private Integer totalCorrectAnswers;
    private Integer totalPoints;
    private Long totalTimeSpent;
    private Integer currentStreak;
    private Integer longestStreak;
    private LocalDateTime lastQuizDate;
}