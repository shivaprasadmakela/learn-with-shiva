import { useState, useEffect, useCallback } from 'react';
import type { Course, Lesson, UserProgress, UserProfile } from '../types';
import * as api from '../api/learningApi';

export type ViewState = 'HOME' | 'COURSE_DETAIL' | 'LESSON_READER' | 'DASHBOARD' | 'CERTIFICATE';

export const useLearning = () => {
    const [activeView, setActiveView] = useState<ViewState>('HOME');
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [progress, setProgress] = useState<UserProgress[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Toggle theme
    const toggleTheme = useCallback(() => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
    }, [theme]);

    // Initial load
    const loadInitialData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [fetchedCourses, fetchedProgress, fetchedProfile] = await Promise.all([
                api.fetchCourses(),
                api.fetchProgress(),
                api.fetchProfile()
            ]);
            setCourses(fetchedCourses);
            setProgress(fetchedProgress);
            setProfile(fetchedProfile);
        } catch (err: any) {
            console.error('Failed to load initial learning data:', err);
            setError(err.message || 'Connection error: Spring Boot backend could not be reached.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInitialData();
        // Check system theme preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, [loadInitialData]);

    const selectCourse = async (courseId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const courseDetails = await api.fetchCourseDetails(courseId);
            setCurrentCourse(courseDetails);
            setActiveView('COURSE_DETAIL');
        } catch (err: any) {
            setError(err.message || 'Failed to load course details');
        } finally {
            setIsLoading(false);
        }
    };

    const selectLesson = async (lessonId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const lessonDetails = await api.fetchLesson(lessonId);
            setActiveLesson(lessonDetails);
            setActiveView('LESSON_READER');
        } catch (err: any) {
            setError(err.message || 'Failed to load lesson contents');
        } finally {
            setIsLoading(false);
        }
    };

    const markLessonCompleted = async (lessonId: number) => {
        try {
            const updatedProgress = await api.completeLesson(lessonId);
            setProgress(prev => {
                const idx = prev.findIndex(p => p.lessonId === lessonId);
                if (idx > -1) {
                    const next = [...prev];
                    next[idx] = updatedProgress;
                    return next;
                }
                return [...prev, updatedProgress];
            });
        } catch (err: any) {
            console.error('Failed to update progress:', err);
        }
    };

    const submitQuiz = async (lessonId: number, score: number) => {
        try {
            const updatedProgress = await api.submitQuizScore(lessonId, score);
            setProgress(prev => {
                const idx = prev.findIndex(p => p.lessonId === lessonId);
                if (idx > -1) {
                    const next = [...prev];
                    next[idx] = updatedProgress;
                    return next;
                }
                return [...prev, updatedProgress];
            });
        } catch (err: any) {
            console.error('Failed to submit quiz score:', err);
        }
    };

    const resetAllProgress = async () => {
        setIsLoading(true);
        try {
            await api.resetProgress();
            const freshProgress = await api.fetchProgress();
            setProgress(freshProgress);
            setActiveView('HOME');
            setCurrentCourse(null);
            setActiveLesson(null);
        } catch (err: any) {
            console.error('Failed to reset progress:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const saveProfile = async (fullName: string, avatar: string, role: string, bio: string) => {
        if (!profile) return;
        setIsLoading(true);
        try {
            const updatedProfile = await api.updateProfile({
                ...profile,
                fullName,
                avatar,
                role,
                bio
            });
            setProfile(updatedProfile);
        } catch (err: any) {
            console.error('Failed to update profile:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        activeView,
        changeView: setActiveView,
        courses,
        currentCourse,
        activeLesson,
        progress,
        profile,
        isLoading,
        error,
        theme,
        toggleTheme,
        selectCourse,
        selectLesson,
        markLessonCompleted,
        submitQuiz,
        resetAllProgress,
        saveProfile,
        refreshInitialData: loadInitialData
    };
};
export type UseLearningReturn = ReturnType<typeof useLearning>;
