package com.bugfix.learning.dto;

import java.util.List;

public record LessonDto(
    Long id,
    Long moduleId,
    String title,
    String content,
    Integer orderIndex,
    Integer durationMinutes,
    List<QuizQuestionDto> quizQuestions
) {
    public LessonDto(Long id, Long moduleId, String title, String content, Integer orderIndex, Integer durationMinutes) {
        this(id, moduleId, title, content, orderIndex, durationMinutes, null);
    }
}
