package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.UserAchievement;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    
    List<UserAchievement> findByUser(User user);
    
    List<UserAchievement> findByUserId(Long userId);

    void deleteByUserId(Long userId);
    
    Optional<UserAchievement> findByUserIdAndAchievementId(Long userId, Long achievementId);
    
    Optional<UserAchievement> findByUserAndAchievement(User user, Achievement achievement);
    
    Boolean existsByUserIdAndAchievementId(Long userId, Long achievementId);
    
    Long countByUserId(Long userId);
}
