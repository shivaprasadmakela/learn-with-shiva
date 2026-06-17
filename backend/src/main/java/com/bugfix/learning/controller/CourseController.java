package com.bugfix.learning.controller;

import com.bugfix.learning.dto.CourseDto;
import com.bugfix.learning.dto.LessonDto;
import com.bugfix.learning.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseDetails(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseDetails(id));
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<LessonDto> getLessonDetails(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getLessonDetails(id));
    }
}
