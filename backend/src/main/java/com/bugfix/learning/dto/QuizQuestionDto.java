package com.bugfix.learning.dto;

import java.util.List;

public record QuizQuestionDto(
    Long id,
    Long lessonId,
    String questionText,
    List<String> options,
    Integer correctAnswerIndex,
    String explanation
) {}
