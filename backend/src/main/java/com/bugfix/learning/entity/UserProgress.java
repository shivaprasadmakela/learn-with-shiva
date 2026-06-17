package com.bugfix.learning.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"username", "lessonId"})
})
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private Long lessonId;
    private boolean completed;
    private Integer quizScore;
    private LocalDateTime completedAt;

    public UserProgress() {}

    public UserProgress(Long id, String username, Long lessonId, boolean completed, Integer quizScore, LocalDateTime completedAt) {
        this.id = id;
        this.username = username;
        this.lessonId = lessonId;
        this.completed = completed;
        this.quizScore = quizScore;
        this.completedAt = completedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public Integer getQuizScore() { return quizScore; }
    public void setQuizScore(Integer quizScore) { this.quizScore = quizScore; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
