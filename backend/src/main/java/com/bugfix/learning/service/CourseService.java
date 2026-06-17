package com.bugfix.learning.service;

import com.bugfix.learning.dto.CourseDto;
import com.bugfix.learning.dto.CourseModuleDto;
import com.bugfix.learning.dto.LessonDto;
import com.bugfix.learning.dto.QuizQuestionDto;
import com.bugfix.learning.entity.Course;
import com.bugfix.learning.entity.CourseModule;
import com.bugfix.learning.entity.Lesson;
import com.bugfix.learning.entity.QuizQuestion;
import com.bugfix.learning.repository.CourseModuleRepository;
import com.bugfix.learning.repository.CourseRepository;
import com.bugfix.learning.repository.LessonRepository;
import com.bugfix.learning.repository.QuizQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository courseModuleRepository;
    private final LessonRepository lessonRepository;
    private final QuizQuestionRepository quizQuestionRepository;

    public CourseService(CourseRepository courseRepository,
                         CourseModuleRepository courseModuleRepository,
                         LessonRepository lessonRepository,
                         QuizQuestionRepository quizQuestionRepository) {
        this.courseRepository = courseRepository;
        this.courseModuleRepository = courseModuleRepository;
        this.lessonRepository = lessonRepository;
        this.quizQuestionRepository = quizQuestionRepository;
    }

    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(course -> new CourseDto(
                        course.getId(),
                        course.getTitle(),
                        course.getDescription(),
                        course.getCategory(),
                        course.getDuration(),
                        course.getLevel(),
                        course.getImageUrl()
                ))
                .collect(Collectors.toList());
    }

    public CourseDto getCourseDetails(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        List<CourseModule> modules = courseModuleRepository.findByCourseIdOrderByOrderIndexAsc(courseId);

        List<CourseModuleDto> moduleDtos = modules.stream()
                .map(module -> {
                    List<Lesson> lessons = lessonRepository.findByModuleIdOrderByOrderIndexAsc(module.getId());
                    List<LessonDto> lessonDtos = lessons.stream()
                            .map(lesson -> new LessonDto(
                                    lesson.getId(),
                                    lesson.getModuleId(),
                                    lesson.getTitle(),
                                    null, // Keep content null in syllabus list for performance
                                    lesson.getOrderIndex(),
                                    lesson.getDurationMinutes()
                            ))
                            .collect(Collectors.toList());

                    return new CourseModuleDto(
                            module.getId(),
                            module.getCourseId(),
                            module.getTitle(),
                            module.getOrderIndex(),
                            lessonDtos
                    );
                })
                .collect(Collectors.toList());

        return new CourseDto(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getCategory(),
                course.getDuration(),
                course.getLevel(),
                course.getImageUrl(),
                moduleDtos
        );
    }

    public LessonDto getLessonDetails(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found with id: " + lessonId));

        List<QuizQuestion> questions = quizQuestionRepository.findByLessonId(lessonId);
        List<QuizQuestionDto> questionDtos = questions.stream()
                .map(q -> new QuizQuestionDto(
                        q.getId(),
                        q.getLessonId(),
                        q.getQuestionText(),
                        Arrays.asList(q.getOptions().split(";")),
                        q.getCorrectAnswerIndex(),
                        q.getExplanation()
                ))
                .collect(Collectors.toList());

        return new LessonDto(
                lesson.getId(),
                lesson.getModuleId(),
                lesson.getTitle(),
                lesson.getContent(),
                lesson.getOrderIndex(),
                lesson.getDurationMinutes(),
                questionDtos
        );
    }
}
