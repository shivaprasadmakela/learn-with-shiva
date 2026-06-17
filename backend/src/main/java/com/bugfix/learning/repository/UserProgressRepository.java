package com.bugfix.learning.repository;

import com.bugfix.learning.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUsername(String username);
    Optional<UserProgress> findByUsernameAndLessonId(String username, Long lessonId);
    void deleteByUsername(String username);
}
