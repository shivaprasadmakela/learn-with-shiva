package com.bugfix.learning.dto;

import java.util.List;

public record CourseDto(
    Long id,
    String title,
    String description,
    String category,
    String duration,
    String level,
    String imageUrl,
    List<CourseModuleDto> modules
) {
    public CourseDto(Long id, String title, String description, String category, String duration, String level, String imageUrl) {
        this(id, title, description, category, duration, level, imageUrl, null);
    }
}
