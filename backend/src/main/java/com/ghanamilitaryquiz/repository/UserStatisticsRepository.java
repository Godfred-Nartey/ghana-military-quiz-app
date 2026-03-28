package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.UserStatistics;
import com.ghanamilitaryquiz.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long> {
    
    Optional<UserStatistics> findByUser(User user);
    
    Optional<UserStatistics> findByUserId(Long userId);

    void deleteByUserId(Long userId);
    
    @Query("SELECT us FROM UserStatistics us ORDER BY us.totalPoints DESC")
    List<UserStatistics> findAllOrderByTotalPointsDesc();
    
    @Query("SELECT us FROM UserStatistics us ORDER BY us.currentStreak DESC")
    List<UserStatistics> findAllOrderByCurrentStreakDesc();
    
    Boolean existsByUserId(Long userId);
}
