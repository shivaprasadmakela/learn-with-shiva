import { useState } from 'react';
import type { Course, UserProgress } from '../types';
import { Button } from '../../../shared/components/Button/Button';
import {
    RightArrowIcon,
    ChevronRightIcon,
    BookOpenIcon,
    LockIcon,
} from '../../../shared/components/Icons';
import styles from './Home.module.css';

interface HomeProps {
    courses: Course[];
    progress: UserProgress[];
    onSelectCourse: (id: number) => void;
    onResetProgress: () => void;
    searchQuery: string;
}

export const Home: React.FC<HomeProps> = ({
    courses,
    progress,
    onSelectCourse,
    onResetProgress: _onResetProgress,
    searchQuery,
}) => {
    const [activeTab, setActiveTab] = useState<string>('Featured');

    const getCourseProgress = (courseId: number): number => {
        const course = courses.find(c => c.id === courseId);
        if (!course || course.id !== 1) return 0;
        const completedCount = progress.filter(p => p.completed).length;
        return Math.min(Math.round((completedCount / 8) * 100), 100);
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeTab === 'Featured') return matchesSearch;
        if (activeTab === 'Fullstack') return matchesSearch && course.category === 'Fullstack';
        if (activeTab === 'Cloud') return matchesSearch && course.category === 'Cloud';
        if (activeTab === 'Backend') return matchesSearch && course.category === 'Backend';
        if (activeTab === 'Design') return matchesSearch && course.category === 'Design';
        return matchesSearch;
    });

    return (
        <div className={styles.homeWrapper}>


            {/* Notice Banner */}
            <div className={styles.noticeBanner}>
                <span className={styles.noticeText}>Practice code integrations directly in terminal console</span>
                <a className={styles.noticeLink} onClick={() => onSelectCourse(1)}>Get started</a>
            </div>

            {/* ══════════════════════════════════════════
                SCROLL CONTAINER
            ══════════════════════════════════════════ */}
            <div className={styles.scrollContainer}>

                {/* ────────────────────────────────────────
                    SECTION 1 — HERO
                ──────────────────────────────────────── */}
                <section className={styles.heroSection}>
                    <div className={styles.heroBadge}>Interactive Learning Platform for Developers</div>
                    <h1 className={styles.heroTitle}>
                        Learn, Practice, and{' '}
                        <span className={styles.heroTitleHighlight}>Grow as a Software Engineer</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Master software engineering with interactive courses, structured learning paths, hands-on exercises,
                        and revision resources designed for modern developers.
                    </p>
                    <div className={styles.heroButtons}>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Start Learning
                        </Button>
                        <button
                            className={styles.heroSecondaryBtn}
                            onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Paths <ChevronRightIcon size={16} />
                        </button>
                    </div>
                </section>

                {/* ────────────────────────────────────────
                    SECTION 2 — DARK CATALOG BLOCK
                    (reference: image 1 — dark card, tabs, 3 course cards, "Explore catalog")
                ──────────────────────────────────────── */}
                <section id="catalog-section" className={styles.darkBlockContainer}>
                    <div className={styles.darkBlock}>
                        {/* Tab row */}
                        <div className={styles.darkBlockSubtitle}>
                            {['Featured', 'Fullstack', 'Backend', 'Cloud', 'Design'].map(tab => (
                                <span
                                    key={tab}
                                    className={`${styles.darkTab} ${activeTab === tab ? styles.darkTabActive : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </span>
                            ))}
                        </div>

                        {/* Heading */}
                        <div className={styles.darkBlockHeader}>
                            <h2 className={styles.darkBlockTitle}>Skill up on development today</h2>
                            <p className={styles.darkBlockDesc}>
                                Software engineering is constantly changing. Learn backend architectures,
                                frontend hooks, and API integrations with hands-on practice.
                            </p>
                        </div>

                        {/* Course cards */}
                        <div className={styles.coursesGrid}>
                            {filteredCourses.map(course => {
                                const progressVal = getCourseProgress(course.id);
                                const isLocked = course.id !== 1;
                                return (
                                    <div
                                        key={course.id}
                                        className={styles.courseCard}
                                        onClick={() => isLocked ? null : onSelectCourse(course.id)}
                                    >
                                        <div className={styles.cardBadge}>
                                            <BookOpenIcon size={14} />
                                            <span>{course.category} {isLocked ? '(Coming Soon)' : 'Path'}</span>
                                        </div>
                                        <h3 className={styles.cardTitle}>{course.title}</h3>
                                        <p className={styles.cardDesc}>{course.description}</p>
                                        <div className={styles.cardFooter}>
                                            <div className={styles.cardStats}>
                                                <span>Duration: <strong>{course.duration}</strong></span>
                                                <span>Level: <strong>{course.level}</strong></span>
                                                {!isLocked && progressVal > 0 && (
                                                    <div style={{ marginTop: '8px' }}>
                                                        <span style={{ display: 'block', marginBottom: '4px' }}>Progress: {progressVal}%</span>
                                                        <div className={styles.cardProgressBarContainer}>
                                                            <div className={styles.cardProgressBar} style={{ width: `${progressVal}%` }} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {isLocked ? (
                                                <div className={styles.arrowBtn} style={{ opacity: 0.5, cursor: 'default' }}>
                                                    <LockIcon size={18} />
                                                </div>
                                            ) : (
                                                <button
                                                    className={styles.arrowBtn}
                                                    onClick={e => { e.stopPropagation(); onSelectCourse(course.id); }}
                                                >
                                                    <RightArrowIcon size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Explore catalog CTA */}
                        <div className={styles.darkBlockCta}>
                            <Button variant="secondary" onClick={() => setActiveTab('Featured')}>
                                Explore catalog
                            </Button>
                        </div>
                    </div>
                </section>



                {/* ────────────────────────────────────────
                    SECTION 4 — COMMUNITY TWO-COL
                    (reference: image 3 — text left + tech pipeline card right)
                ──────────────────────────────────────── */}
                <section className={styles.communitySection}>
                    <div className={styles.communityLeft}>
                        <h2 className={styles.communityTitle}>Learn and build with other developers</h2>
                        <p className={styles.communityDesc}>
                            Continuous learning starts with community. Join the Bugfix Academy program and
                            accelerate your journey with structured learning paths, collaborative projects,
                            and hands-on exercises — at no cost to you.
                        </p>
                        <button className={styles.communityJoinBtn} onClick={() => onSelectCourse(1)}>
                            Join Now
                        </button>
                    </div>
                    <div className={styles.communityRight}>
                        <div className={styles.gearCard}>
                            <div className={styles.gearTitle}>GEAR</div>
                            <div className={styles.gearPipeline}>
                                <div className={`${styles.pipelineNode} ${styles.pipelineNodeActive}`}>
                                    React TypeScript View
                                </div>
                                <div className={styles.pipelineLine} />
                                <div className={styles.pipelineNode}>
                                    Fetch REST API / CORS
                                </div>
                                <div className={styles.pipelineLine} />
                                <div className={styles.pipelineNode}>
                                    Spring Boot Controller
                                </div>
                                <div className={styles.pipelineLine} />
                                <div className={`${styles.pipelineNode} ${styles.pipelineNodeActive}`}>
                                    JPA Persistent H2 DB
                                </div>
                            </div>
                            <div className={styles.gearSubtitle}>Growth · Engineer · Academy · Ready</div>
                        </div>
                    </div>
                </section>

                {/* ────────────────────────────────────────
                    SECTION 5 — FINAL CTA
                ──────────────────────────────────────── */}
                <section className={styles.bottomBannerSection}>
                    <div className={styles.bottomBannerGlow} />
                    <div className={styles.bottomLogoG}>
                        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="url(#techGradCTA)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                            <line x1="14" y1="4" x2="10" y2="20" />
                            <defs>
                                <linearGradient id="techGradCTA" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="50%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h2 className={styles.bottomTitle}>Start Building Your Future Today</h2>
                    <p className={styles.bottomDesc}>
                        Explore interactive courses, practice with quizzes, revise important concepts,
                        and continuously improve your software engineering skills.
                    </p>
                    <div className={styles.heroButtons}>
                        <Button variant="primary" size="lg" onClick={() => onSelectCourse(1)}>
                            Start Learning
                        </Button>
                        <button
                            className={styles.heroSecondaryBtn}
                            onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Browse Catalog <ChevronRightIcon size={16} />
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Home;
