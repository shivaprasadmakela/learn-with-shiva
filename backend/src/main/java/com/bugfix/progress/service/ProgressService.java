package com.bugfix.progress.service;

import com.bugfix.progress.dto.UserProgressDto;
import com.bugfix.progress.entity.UserProgress;
import com.bugfix.progress.repository.UserProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProgressService {

    private final UserProgressRepository userProgressRepository;

    public ProgressService(UserProgressRepository userProgressRepository) {
        this.userProgressRepository = userProgressRepository;
    }

    public List<UserProgressDto> getProgress(String username) {
        return userProgressRepository.findByUsername(username).stream()
                .map(p -> new UserProgressDto(
                        p.getId(),
                        p.getUsername(),
                        p.getLessonId(),
                        p.isCompleted(),
                        p.getQuizScore(),
                        p.getCompletedAt()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public UserProgressDto completeLesson(String username, Long lessonId) {
        Optional<UserProgress> optionalProgress = userProgressRepository.findByUsernameAndLessonId(username, lessonId);
        UserProgress progress;

        if (optionalProgress.isPresent()) {
            progress = optionalProgress.get();
            progress.setCompleted(true);
            progress.setCompletedAt(LocalDateTime.now());
        } else {
            progress = new UserProgress(null, username, lessonId, true, null, LocalDateTime.now());
        }

        UserProgress saved = userProgressRepository.save(progress);
        return new UserProgressDto(
                saved.getId(),
                saved.getUsername(),
                saved.getLessonId(),
                saved.isCompleted(),
                saved.getQuizScore(),
                saved.getCompletedAt()
        );
    }

    @Transactional
    public UserProgressDto saveQuizScore(String username, Long lessonId, Integer score) {
        Optional<UserProgress> optionalProgress = userProgressRepository.findByUsernameAndLessonId(username, lessonId);
        UserProgress progress;

        if (optionalProgress.isPresent()) {
            progress = optionalProgress.get();
            progress.setQuizScore(score);
            // If they scored highly (e.g. 100%), let's mark it complete as well
            progress.setCompleted(true);
            progress.setCompletedAt(LocalDateTime.now());
        } else {
            progress = new UserProgress(null, username, lessonId, true, score, LocalDateTime.now());
        }

        UserProgress saved = userProgressRepository.save(progress);
        return new UserProgressDto(
                saved.getId(),
                saved.getUsername(),
                saved.getLessonId(),
                saved.isCompleted(),
                saved.getQuizScore(),
                saved.getCompletedAt()
        );
    }

    @Transactional
    public void resetProgress(String username) {
        userProgressRepository.deleteByUsername(username);
    }
}
