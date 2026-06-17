package com.bugfix.learning.repository;

import com.bugfix.learning.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    List<QuizQuestion> findByLessonId(Long lessonId);
}
