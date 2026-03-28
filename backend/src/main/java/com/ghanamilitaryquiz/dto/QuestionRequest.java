package com.ghanamilitaryquiz.dto;

import com.ghanamilitaryquiz.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {
    private Long categoryId;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private Question.Answer correctAnswer;
    private String explanation;
    private Question.DifficultyLevel difficultyLevel;
    private Integer points;
    private Boolean isActive;
}