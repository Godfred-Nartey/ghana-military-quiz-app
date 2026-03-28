package com.ghanamilitaryquiz.service;

import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.model.UserStatistics;
import com.ghanamilitaryquiz.model.UserProgress;
import com.ghanamilitaryquiz.model.QuizAttempt;
import com.ghanamilitaryquiz.repository.QuizAnswerRepository;
import com.ghanamilitaryquiz.repository.QuizAttemptRepository;
import com.ghanamilitaryquiz.repository.UserAchievementRepository;
import com.ghanamilitaryquiz.repository.UserRepository;
import com.ghanamilitaryquiz.repository.UserStatisticsRepository;
import com.ghanamilitaryquiz.repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final UserStatisticsRepository userStatisticsRepository;
    private final UserProgressRepository userProgressRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAnswerRepository quizAnswerRepository;
    private final PasswordEncoder passwordEncoder;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    @Transactional(rollbackFor = Exception.class)
    public User createUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        user.setRole(User.Role.USER);
        user.setIsActive(true);
        
        User savedUser = userRepository.save(user);
        
        // Create user statistics
        UserStatistics statistics = new UserStatistics();
        statistics.setUser(savedUser);
        userStatisticsRepository.save(statistics);
        
        return savedUser;
    }
    
    @Transactional
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (userDetails.getFullName() != null) {
            user.setFullName(userDetails.getFullName());
        }
        if (userDetails.getEmail() != null && !userDetails.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDetails.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(userDetails.getEmail());
        }
        if (userDetails.getRole() != null) {
            user.setRole(userDetails.getRole());
        }
        if (userDetails.getIsActive() != null) {
            user.setIsActive(userDetails.getIsActive());
        }
        
        return userRepository.save(user);
    }
    
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        for (QuizAttempt attempt : quizAttemptRepository.findByUserId(id)) {
            quizAnswerRepository.deleteByQuizAttemptId(attempt.getId());
        }

        quizAttemptRepository.deleteByUserId(id);
        userAchievementRepository.deleteByUserId(id);
        userProgressRepository.deleteByUserId(id);
        userStatisticsRepository.deleteByUserId(id);
        userRepository.delete(user);
    }
    
    @Transactional
    public void updateLastLogin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
    }
    
    public Long countUsers() {
        return userRepository.count();
    }
    
    public UserStatistics getUserStatistics(Long userId) {
        return userStatisticsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User statistics not found"));
    }
    
    public List<UserProgress> getUserProgress(Long userId) {
        return userProgressRepository.findByUserId(userId);
    }
    
    public UserProgress getUserProgressByCategory(Long userId, Long categoryId) {
        return userProgressRepository.findByUserIdAndCategoryId(userId, categoryId)
                .orElseThrow(() -> new RuntimeException("User progress not found for this category"));
    }
}
