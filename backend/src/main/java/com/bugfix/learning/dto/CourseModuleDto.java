package com.bugfix.learning.dto;

import java.util.List;

public record CourseModuleDto(
    Long id,
    Long courseId,
    String title,
    Integer orderIndex,
    List<LessonDto> lessons
) {
    public CourseModuleDto(Long id, Long courseId, String title, Integer orderIndex) {
        this(id, courseId, title, orderIndex, null);
    }
}
