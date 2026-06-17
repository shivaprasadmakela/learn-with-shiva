package com.bugfix.learning.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long lessonId;
    private String questionText;

    @Column(columnDefinition = "TEXT")
    private String options; // Semi-colon separated options, e.g., "React;Angular;Vue;Svelte"

    private Integer correctAnswerIndex;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    public QuizQuestion() {}

    public QuizQuestion(Long id, Long lessonId, String questionText, String options, Integer correctAnswerIndex, String explanation) {
        this.id = id;
        this.lessonId = lessonId;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
        this.explanation = explanation;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getOptions() { return options; }
    public void setOptions(String options) { this.options = options; }

    public Integer getCorrectAnswerIndex() { return correctAnswerIndex; }
    public void setCorrectAnswerIndex(Integer correctAnswerIndex) { this.correctAnswerIndex = correctAnswerIndex; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
