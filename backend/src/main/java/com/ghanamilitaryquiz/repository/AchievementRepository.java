package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    
    List<Achievement> findByIsActiveTrue();
    
    List<Achievement> findByCriteriaType(String criteriaType);
    
    Boolean existsByName(String name);
}
