package com.bugfix.learning.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long moduleId;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Integer orderIndex;
    private Integer durationMinutes;

    public Lesson() {}

    public Lesson(Long id, Long moduleId, String title, String content, Integer orderIndex, Integer durationMinutes) {
        this.id = id;
        this.moduleId = moduleId;
        this.title = title;
        this.content = content;
        this.orderIndex = orderIndex;
        this.durationMinutes = durationMinutes;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getModuleId() { return moduleId; }
    public void setModuleId(Long moduleId) { this.moduleId = moduleId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
}
