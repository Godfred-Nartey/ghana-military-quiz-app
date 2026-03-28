package com.ghanamilitaryquiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "category_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "total_attempts")
    private Integer totalAttempts = 0;

    @Column(name = "best_score")
    private Integer bestScore = 0;

    @Column(name = "average_score", precision = 5, scale = 2)
    private BigDecimal averageScore = BigDecimal.ZERO;

    @Column(name = "total_time_spent")
    private Integer totalTimeSpent = 0;

    @Column(name = "total_points")
    private Integer totalPoints = 0;

    @Column(name = "last_attempt_at")
    private LocalDateTime lastAttemptAt;
}
