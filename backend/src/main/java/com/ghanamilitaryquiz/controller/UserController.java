package com.ghanamilitaryquiz.controller;

//import com.ghanamilitaryquiz.model.UserStatistics;
import com.ghanamilitaryquiz.dto.ApiResponse;
import com.ghanamilitaryquiz.dto.UserDto;
import com.ghanamilitaryquiz.dto.UserStatisticsDto;
import com.ghanamilitaryquiz.dto.UserProgressDto;
import com.ghanamilitaryquiz.dto.LeaderboardEntryDto;
import com.ghanamilitaryquiz.dto.CategoryDto;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.model.UserStatistics;
import com.ghanamilitaryquiz.model.UserProgress;
import com.ghanamilitaryquiz.service.UserService;
import com.ghanamilitaryquiz.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> getProfile(@RequestHeader("Authorization") String token) {
        try {
            if (!token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid token format"));
            }
            
            String username = jwtTokenProvider.getUsernameFromToken(token.replace("Bearer ", ""));
            User user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserDto userDto = convertToUserDto(user);
            return ResponseEntity.ok(ApiResponse.ok("Profile retrieved successfully", userDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid or expired token"));
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<UserStatisticsDto>> getStatistics(@RequestHeader("Authorization") String token) {
        try {
            if (!token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid token format"));
            }
            
            String username = jwtTokenProvider.getUsernameFromToken(token.replace("Bearer ", ""));
            User user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserStatistics statistics = userService.getUserStatistics(user.getId());
            UserStatisticsDto statisticsDto = convertToUserStatisticsDto(statistics);

            return ResponseEntity.ok(ApiResponse.ok("Statistics retrieved successfully", statisticsDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid or expired token"));
        }
    }

    @GetMapping("/progress")
    public ResponseEntity<ApiResponse<List<UserProgressDto>>> getProgress(@RequestHeader("Authorization") String token) {
        try {
            if (!token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid token format"));
            }
            
            String username = jwtTokenProvider.getUsernameFromToken(token.replace("Bearer ", ""));
            User user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<UserProgress> progressList = userService.getUserProgress(user.getId());
            List<UserProgressDto> progressDtos = progressList.stream()
                    .map(this::convertToUserProgressDto)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(ApiResponse.ok("Progress retrieved successfully", progressDtos));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid or expired token"));
        }
    }

    @GetMapping("/progress/{categoryId}")
    public ResponseEntity<ApiResponse<UserProgressDto>> getProgressByCategory(
            @RequestHeader("Authorization") String token,
            @PathVariable Long categoryId) {
        try {
            if (!token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid token format"));
            }
            
            String username = jwtTokenProvider.getUsernameFromToken(token.replace("Bearer ", ""));
            User user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserProgress progress = userService.getUserProgressByCategory(user.getId(), categoryId);
            UserProgressDto progressDto = convertToUserProgressDto(progress);

            return ResponseEntity.ok(ApiResponse.ok("Progress retrieved successfully", progressDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid or expired token"));
        }
    }

    @GetMapping("/leaderboard")
public ResponseEntity<ApiResponse<List<LeaderboardEntryDto>>> getLeaderboard(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {
    try {
        List<User> users = userService.getAllUsers();

        List<LeaderboardEntryDto> leaderboard = users.stream()
            .filter(user -> user.getIsActive())
            .map(user -> {
                try {
                    UserStatistics stats = userService.getUserStatistics(user.getId());
                    double avgScore = stats.getTotalQuestionsAnswered() > 0
                        ? (double) stats.getTotalCorrectAnswers() / stats.getTotalQuestionsAnswered() * 100
                        : 0.0;
                    return LeaderboardEntryDto.builder()
                        .userId(user.getId())
                        .username(user.getUsername())
                        .fullName(user.getFullName())
                        .totalPoints(stats.getTotalPoints())
                        .totalQuizzes(stats.getTotalQuizzes())
                        .averageScore(Math.round(avgScore * 100.0) / 100.0)
                        .currentStreak(stats.getCurrentStreak())
                        .build();
                } catch (Exception e) {
                    return LeaderboardEntryDto.builder()
                        .userId(user.getId())
                        .username(user.getUsername())
                        .fullName(user.getFullName())
                        .totalPoints(0)
                        .totalQuizzes(0)
                        .averageScore(0.0)
                        .currentStreak(0)
                        .build();
                }
            })
            .sorted((a, b) -> b.getTotalPoints() - a.getTotalPoints())
            .collect(Collectors.toList());

        for (int i = 0; i < leaderboard.size(); i++) {
            leaderboard.get(i).setRank(i + 1);
        }

        return ResponseEntity.ok(ApiResponse.ok("Leaderboard retrieved successfully", leaderboard));
    } catch (Exception e) {
        return ResponseEntity.internalServerError()
                .body(ApiResponse.error("An error occurred while retrieving leaderboard: " + e.getMessage()));
    }
}

    private UserDto convertToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().toString())
                .isActive(user.getIsActive())
                .build();
    }

    private UserStatisticsDto convertToUserStatisticsDto(UserStatistics statistics) {
        return UserStatisticsDto.builder()
                .id(statistics.getId())
                .userId(statistics.getUser().getId())
                .totalQuizzes(statistics.getTotalQuizzes())
                .totalQuestionsAnswered(statistics.getTotalQuestionsAnswered())
                .totalCorrectAnswers(statistics.getTotalCorrectAnswers())
                .totalPoints(statistics.getTotalPoints())
                .totalTimeSpent(statistics.getTotalTimeSpent().longValue())
                .currentStreak(statistics.getCurrentStreak())
                .longestStreak(statistics.getLongestStreak())
                .lastQuizDate(statistics.getLastQuizDate() != null ?
                    statistics.getLastQuizDate().atStartOfDay() : null)
                .build();
    }

    private UserProgressDto convertToUserProgressDto(UserProgress progress) {
        return UserProgressDto.builder()
                .id(progress.getId())
                .userId(progress.getUser().getId())
                .categoryId(progress.getCategory().getId())
                .totalAttempts(progress.getTotalAttempts())
                .bestScore(progress.getBestScore())
                .averageScore(progress.getAverageScore().doubleValue())
                .totalTimeSpent(progress.getTotalTimeSpent().longValue())
                .totalPoints(progress.getTotalPoints())
                .lastAttemptAt(progress.getLastAttemptAt())
                .category(convertToCategoryDto(progress.getCategory()))
                .build();
    }

    private CategoryDto convertToCategoryDto(com.ghanamilitaryquiz.model.Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .icon(category.getIcon())
                .displayOrder(category.getDisplayOrder())
                .isActive(category.getIsActive())
                .createdAt(category.getCreatedAt())
                .questionCount(0) // TODO: Implement question count
                .build();
    }
}
