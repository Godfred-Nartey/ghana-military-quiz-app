package com.ghanamilitaryquiz.service;

import com.ghanamilitaryquiz.model.Achievement;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.model.UserAchievement;
import com.ghanamilitaryquiz.model.UserStatistics;
import com.ghanamilitaryquiz.repository.AchievementRepository;
import com.ghanamilitaryquiz.repository.UserAchievementRepository;
import com.ghanamilitaryquiz.repository.UserRepository;
import com.ghanamilitaryquiz.repository.UserStatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AchievementService {
    
    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final UserStatisticsRepository userStatisticsRepository;
    private final UserRepository userRepository;
    
    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }
    
    public List<Achievement> getActiveAchievements() {
        return achievementRepository.findByIsActiveTrue();
    }
    
    public Optional<Achievement> getAchievementById(Long id) {
        return achievementRepository.findById(id);
    }
    
    public List<UserAchievement> getUserAchievements(Long userId) {
        return userAchievementRepository.findByUserId(userId);
    }
    
    @Transactional
    public Achievement createAchievement(Achievement achievement) {
        if (achievementRepository.existsByName(achievement.getName())) {
            throw new RuntimeException("Achievement name already exists");
        }
        return achievementRepository.save(achievement);
    }
    
    @Transactional
    public Achievement updateAchievement(Long id, Achievement achievementDetails) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));
        
        if (achievementDetails.getName() != null) {
            achievement.setName(achievementDetails.getName());
        }
        if (achievementDetails.getDescription() != null) {
            achievement.setDescription(achievementDetails.getDescription());
        }
        if (achievementDetails.getIcon() != null) {
            achievement.setIcon(achievementDetails.getIcon());
        }
        if (achievementDetails.getCriteriaType() != null) {
            achievement.setCriteriaType(achievementDetails.getCriteriaType());
        }
        if (achievementDetails.getCriteriaValue() != null) {
            achievement.setCriteriaValue(achievementDetails.getCriteriaValue());
        }
        if (achievementDetails.getPoints() != null) {
            achievement.setPoints(achievementDetails.getPoints());
        }
        if (achievementDetails.getBadgeColor() != null) {
            achievement.setBadgeColor(achievementDetails.getBadgeColor());
        }
        if (achievementDetails.getIsActive() != null) {
            achievement.setIsActive(achievementDetails.getIsActive());
        }
        
        return achievementRepository.save(achievement);
    }
    
    @Transactional
    public void deleteAchievement(Long id) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));
        achievement.setIsActive(false);
        achievementRepository.save(achievement);
    }
    
    @Transactional
    public List<Achievement> checkAndAwardAchievements(Long userId) {
        List<Achievement> awardedAchievements = new ArrayList<>();
        
        UserStatistics stats = userStatisticsRepository.findByUserId(userId)
                .orElse(null);
        
        if (stats == null) {
            return awardedAchievements;
        }
        
        List<Achievement> allAchievements = achievementRepository.findByIsActiveTrue();
        
        for (Achievement achievement : allAchievements) {
            boolean alreadyEarned = userAchievementRepository.existsByUserIdAndAchievementId(userId, achievement.getId());
            
            if (alreadyEarned) {
                continue;
            }
            
            boolean earned = checkAchievementCriteria(achievement, stats);
            
            if (earned) {
                UserAchievement userAchievement = new UserAchievement();
                userAchievement.setUser(userRepository.getReferenceById(userId));
                userAchievement.setAchievement(achievement);
                userAchievementRepository.save(userAchievement);
                awardedAchievements.add(achievement);
            }
        }
        
        return awardedAchievements;
    }
    
    private boolean checkAchievementCriteria(Achievement achievement, UserStatistics stats) {
        String criteriaType = achievement.getCriteriaType();
        int criteriaValue = achievement.getCriteriaValue();
        
        switch (criteriaType) {
            case "TOTAL_QUIZZES":
                return stats.getTotalQuizzes() >= criteriaValue;
            case "TOTAL_POINTS":
                return stats.getTotalPoints() >= criteriaValue;
            case "CORRECT_ANSWERS":
                return stats.getTotalCorrectAnswers() >= criteriaValue;
            case "STREAK":
                return stats.getCurrentStreak() >= criteriaValue;
            case "PERFECT_SCORE":
                return stats.getTotalQuizzes() > 0 && 
                       (stats.getTotalCorrectAnswers() * 100.0 / stats.getTotalQuestionsAnswered()) >= criteriaValue;
            default:
                return false;
        }
    }
}
