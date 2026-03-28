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
public class UserProgressDto {
    private Long id;
    private Long userId;
    private Long categoryId;
    private Integer totalAttempts;
    private Integer bestScore;
    private Double averageScore;
    private Long totalTimeSpent;
    private Integer totalPoints;
    private LocalDateTime lastAttemptAt;
    private CategoryDto category;
}