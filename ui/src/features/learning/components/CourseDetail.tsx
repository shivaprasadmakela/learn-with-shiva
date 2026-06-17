import React, { useState } from 'react';
import type { Course, UserProgress } from '../types';
import { Button } from '../../../shared/components/Button/Button';
import { ChevronDownIcon, ChevronRightIcon } from '../../../shared/components/Icons';
import styles from './CourseDetail.module.css';

// Direct SVG icon definitions to avoid imports if icons-stub is not ready
const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const ClockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const BarChartIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

interface CourseDetailProps {
    course: Course | null;
    progress: UserProgress[];
    onBack: () => void;
    onStartLesson: (lessonId: number) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
    course,
    progress,
    onBack,
    onStartLesson
}) => {
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

    if (!course) {
        return (
            <div className={styles.loading}>
                <p>Loading course syllabus details...</p>
            </div>
        );
    }

    const toggleModule = (moduleId: number) => {
        setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
    };

    const isLessonCompleted = (lessonId: number): boolean => {
        return progress.some(p => p.lessonId === lessonId && p.completed);
    };

    const getLessonScore = (lessonId: number): number | null => {
        const p = progress.find(p => p.lessonId === lessonId);
        return p ? p.quizScore : null;
    };

    const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id;

    return (
        <div className={styles.container}>
            {/* Top Toolbar */}
            <div className={styles.toolbar}>
                <button className={styles.backBtn} onClick={onBack}>
                    <BackIcon />
                    <span>Back to catalog</span>
                </button>
            </div>

            {/* Course Header Banner */}
            <div className={styles.heroBanner}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>{course.category} Certification Path</div>
                    <h1 className={styles.title}>{course.title}</h1>
                    <p className={styles.desc}>{course.description}</p>
                    
                    <div className={styles.metaGrid}>
                        <div className={styles.metaItem}>
                            <ClockIcon />
                            <span>Estimated Duration: <strong>{course.duration}</strong></span>
                        </div>
                        <div className={styles.metaItem}>
                            <BarChartIcon />
                            <span>Difficulty Level: <strong>{course.level}</strong></span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        {firstLessonId && (
                            <Button 
                                variant="primary" 
                                size="lg" 
                                onClick={() => onStartLesson(firstLessonId)}
                            >
                                Start Learning Path
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Syllabus */}
            <main className={styles.mainLayout}>
                <section className={styles.overviewSection}>
                    <h2 className={styles.sectionTitle}>What you will master in this path</h2>
                    <div className={styles.skillsGrid}>
                        <div className={styles.skillItem}>
                            <div className={styles.skillNumber}>01</div>
                            <div>
                                <h4 className={styles.skillTitle}>Fullstack Architecture</h4>
                                <p className={styles.skillDesc}>Understand client-server configurations, REST endpoints, and dynamic HTTP mapping variables.</p>
                            </div>
                        </div>
                        <div className={styles.skillItem}>
                            <div className={styles.skillNumber}>02</div>
                            <div>
                                <h4 className={styles.skillTitle}>React TypeScript Frontends</h4>
                                <p className={styles.skillDesc}>Build reactive views, utilize hooks, and config local Vite development server proxies.</p>
                            </div>
                        </div>
                        <div className={styles.skillItem}>
                            <div className={styles.skillNumber}>03</div>
                            <div>
                                <h4 className={styles.skillTitle}>Spring Boot Persistence</h4>
                                <p className={styles.skillDesc}>Map entities, build controller request annotations, and persist data in in-memory H2 databases.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.syllabusSection}>
                    <h2 className={styles.sectionTitle}>Syllabus & Modules</h2>
                    <p className={styles.sectionSubtitle}>Complete all lessons and pass end-of-module quiz checks to unlock your certificate.</p>
                    
                    <div className={styles.modulesList}>
                        {course.modules?.map((mod, idx) => {
                            const isExpanded = expandedModuleId === mod.id || (expandedModuleId === null && idx === 0);
                            
                            return (
                                <div key={mod.id} className={styles.moduleWrapper}>
                                    <div 
                                        className={styles.moduleHeader}
                                        onClick={() => toggleModule(mod.id)}
                                    >
                                        <div className={styles.moduleHeaderLeft}>
                                            <span className={styles.moduleIndex}>Module 0{mod.orderIndex}</span>
                                            <h3 className={styles.moduleTitle}>{mod.title}</h3>
                                        </div>
                                        <div className={styles.moduleHeaderRight}>
                                            <span className={styles.lessonCount}>{mod.lessons?.length || 0} Lessons</span>
                                            {isExpanded ? <ChevronDownIcon size={20} /> : <ChevronRightIcon size={20} />}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className={styles.lessonsList}>
                                            {mod.lessons?.map(les => {
                                                const completed = isLessonCompleted(les.id);
                                                const score = getLessonScore(les.id);
                                                
                                                return (
                                                    <div 
                                                        key={les.id} 
                                                        className={styles.lessonItem}
                                                        onClick={() => onStartLesson(les.id)}
                                                    >
                                                        <div className={styles.lessonItemLeft}>
                                                            <div className={`${styles.statusIndicator} ${completed ? styles.completedIndicator : ''}`}>
                                                                {completed ? <CheckCircleIcon /> : <div className={styles.dot}></div>}
                                                            </div>
                                                            <span className={styles.lessonTitle}>{les.title}</span>
                                                        </div>
                                                        <div className={styles.lessonItemRight}>
                                                            {score !== null && (
                                                                <span className={styles.scoreTag}>Quiz: {score}%</span>
                                                            )}
                                                            <span className={styles.duration}>{les.durationMinutes} mins</span>
                                                            <button className={styles.startBtn}>
                                                                {completed ? "Review" : "Start"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
};
export default CourseDetail;
