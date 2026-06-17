package com.bugfix.learning.dto;

import java.time.LocalDateTime;

public record UserProgressDto(
    Long id,
    String username,
    Long lessonId,
    boolean completed,
    Integer quizScore,
    LocalDateTime completedAt
) {}
