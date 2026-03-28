package com.ghanamilitaryquiz.service;

import com.ghanamilitaryquiz.dto.AdminStatisticsDto;
import com.ghanamilitaryquiz.repository.CategoryRepository;
import com.ghanamilitaryquiz.repository.QuestionRepository;
import com.ghanamilitaryquiz.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;

    public AdminStatisticsDto getAdminStatistics() {
        long totalUsers = userRepository.count();
        long totalCategories = categoryRepository.count();
        long totalQuestions = questionRepository.count();
        long totalActiveUsers = userRepository.countByIsActiveTrue();

        // For now, set others to 0
        return AdminStatisticsDto.builder()
                .totalUsers(totalUsers)
                .totalCategories(totalCategories)
                .totalQuestions(totalQuestions)
                .totalQuizzesTaken(0L)
                .totalActiveUsers(totalActiveUsers)
                .averageScore(0.0)
                .build();
    }
}