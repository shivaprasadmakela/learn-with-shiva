export interface QuizQuestion {
    id: number;
    lessonId: number;
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export interface Lesson {
    id: number;
    moduleId: number;
    title: string;
    content: string | null; // Null when loaded in syllabus preview
    orderIndex: number;
    durationMinutes: number;
    quizQuestions?: QuizQuestion[];
}

export interface CourseModule {
    id: number;
    courseId: number;
    title: string;
    orderIndex: number;
    lessons: Lesson[];
}

export interface Course {
    id: number;
    title: string;
    description: string;
    category: string;
    duration: string;
    level: string;
    imageUrl: string;
    modules?: CourseModule[];
}

export interface UserProgress {
    id: number;
    username: string;
    lessonId: number;
    completed: boolean;
    quizScore: number | null;
    completedAt: string;
}

export interface UserProfile {
    id: number;
    username: string;
    fullName: string;
    avatar: string;
    role: string;
    bio: string;
}
