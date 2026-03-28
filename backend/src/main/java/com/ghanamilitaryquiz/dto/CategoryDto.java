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
public class CategoryDto {
    private Long id;
    private String name;
    private String description;
    private String icon;
    private Integer displayOrder;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private Integer questionCount;
}