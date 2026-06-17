package com.bugfix.learning.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "course_modules")
public class CourseModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long courseId;
    private String title;
    private Integer orderIndex;

    public CourseModule() {}

    public CourseModule(Long id, Long courseId, String title, Integer orderIndex) {
        this.id = id;
        this.courseId = courseId;
        this.title = title;
        this.orderIndex = orderIndex;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
}
