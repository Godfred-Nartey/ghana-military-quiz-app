package com.ghanamilitaryquiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatisticsDto {
    private Long totalUsers;
    private Long totalCategories;
    private Long totalQuestions;
    private Long totalQuizzesTaken;
    private Long totalActiveUsers;
    private Double averageScore;
}