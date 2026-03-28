package com.ghanamilitaryquiz.controller;

import com.ghanamilitaryquiz.dto.ApiResponse;
import com.ghanamilitaryquiz.model.Achievement;
import com.ghanamilitaryquiz.model.UserAchievement;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.repository.UserRepository;
import com.ghanamilitaryquiz.service.AchievementService;
import com.ghanamilitaryquiz.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<Achievement>>> getActiveAchievements() {
        try {
            List<Achievement> achievements = achievementService.getActiveAchievements();
            return ResponseEntity.ok(new ApiResponse<>(true, "Achievements retrieved successfully", achievements));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error retrieving achievements: " + e.getMessage(), null));
        }
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<List<UserAchievement>>> getUserAchievements() {
        try {
            Long userId = getCurrentUserId();
            List<UserAchievement> achievements = achievementService.getUserAchievements(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "User achievements retrieved successfully", achievements));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, "Error retrieving user achievements: " + e.getMessage(), null));
        }
    }

    private Long getCurrentUserId() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getPrincipal() instanceof org.springframework.security.core.userdetails.User) {
                org.springframework.security.core.userdetails.User user =
                    (org.springframework.security.core.userdetails.User) auth.getPrincipal();
                User dbUser = userRepository.findByUsername(user.getUsername()).orElse(null);
                if (dbUser != null) {
                    return dbUser.getId();
                }
            }
            return 1L;
        } catch (Exception e) {
            return 1L;
        }
    }
}
