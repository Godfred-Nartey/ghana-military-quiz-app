package com.ghanamilitaryquiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardEntryDto {
    private Integer rank;
    private Long userId;
    private String username;
    private String fullName;
    private Integer totalPoints;
    private Integer totalQuizzes;
    private Double averageScore;
    private Integer currentStreak;
}