package com.bugfix.progress.controller;

import com.bugfix.progress.dto.UserProgressDto;
import com.bugfix.progress.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;
    private static final String DEFAULT_USER = "learner_1";

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public ResponseEntity<List<UserProgressDto>> getProgress() {
        return ResponseEntity.ok(progressService.getProgress(DEFAULT_USER));
    }

    @PostMapping("/complete/{lessonId}")
    public ResponseEntity<UserProgressDto> completeLesson(@PathVariable Long lessonId) {
        return ResponseEntity.ok(progressService.completeLesson(DEFAULT_USER, lessonId));
    }

    @PostMapping("/quiz/{lessonId}")
    public ResponseEntity<UserProgressDto> saveQuizScore(
            @PathVariable Long lessonId,
            @RequestParam int score) {
        return ResponseEntity.ok(progressService.saveQuizScore(DEFAULT_USER, lessonId, score));
    }

    @PostMapping("/reset")
    public ResponseEntity<Void> resetProgress() {
        progressService.resetProgress(DEFAULT_USER);
        return ResponseEntity.ok().build();
    }
}
