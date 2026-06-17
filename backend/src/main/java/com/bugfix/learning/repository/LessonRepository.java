package com.bugfix.learning.repository;

import com.bugfix.learning.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByModuleIdOrderByOrderIndexAsc(Long moduleId);
    List<Lesson> findByModuleIdIn(List<Long> moduleIds);
}
