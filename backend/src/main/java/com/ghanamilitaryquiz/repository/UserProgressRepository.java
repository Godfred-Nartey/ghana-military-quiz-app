package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.UserProgress;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    
    List<UserProgress> findByUser(User user);
    
    List<UserProgress> findByUserId(Long userId);

    void deleteByUserId(Long userId);
    
    Optional<UserProgress> findByUserIdAndCategoryId(Long userId, Long categoryId);
    
    Optional<UserProgress> findByUserAndCategory(User user, Category category);
}
