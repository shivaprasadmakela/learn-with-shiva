import type { Course, Lesson, UserProgress, UserProfile } from '../types';

export const fetchCourses = async (): Promise<Course[]> => {
    const response = await fetch('/api/courses');
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
};

export const fetchCourseDetails = async (id: number): Promise<Course> => {
    const response = await fetch(`/api/courses/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch course ${id} details`);
    return response.json();
};

export const fetchLesson = async (id: number): Promise<Lesson> => {
    const response = await fetch(`/api/courses/lessons/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch lesson ${id}`);
    return response.json();
};

export const fetchProgress = async (): Promise<UserProgress[]> => {
    const response = await fetch('/api/progress');
    if (!response.ok) throw new Error('Failed to fetch progress');
    return response.json();
};

export const completeLesson = async (id: number): Promise<UserProgress> => {
    const response = await fetch(`/api/progress/complete/${id}`, {
        method: 'POST'
    });
    if (!response.ok) throw new Error(`Failed to complete lesson ${id}`);
    return response.json();
};

export const submitQuizScore = async (id: number, score: number): Promise<UserProgress> => {
    const response = await fetch(`/api/progress/quiz/${id}?score=${score}`, {
        method: 'POST'
    });
    if (!response.ok) throw new Error(`Failed to submit quiz score for lesson ${id}`);
    return response.json();
};

export const resetProgress = async (): Promise<void> => {
    const response = await fetch('/api/progress/reset', {
        method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to reset progress');
};

export const fetchProfile = async (): Promise<UserProfile> => {
    const response = await fetch('/api/profile');
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
};

export const updateProfile = async (profile: UserProfile): Promise<UserProfile> => {
    const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
};
