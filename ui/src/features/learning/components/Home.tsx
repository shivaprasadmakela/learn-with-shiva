import { useState } from 'react';
import type { Course, UserProgress, UserProfile } from '../types';
import { Button } from '../../../shared/components/Button/Button';
import { 
    MenuIcon, 
    SearchIcon, 
    HelpIcon, 
    GlobeIcon, 
    HomeIcon, 
    CatalogIcon, 
    PathsIcon, 
    CollectionsIcon, 
    SubscriptionsIcon, 
    OrganizationsIcon,
    RightArrowIcon,
    ChevronRightIcon,
    SunIcon,
    MoonIcon,
    BookOpenIcon,
    AwardIcon,
    UserIcon,
    ToggleSidebarIcon,
    LockIcon
} from '../../../shared/components/Icons';
import styles from './Home.module.css';

interface HomeProps {
    courses: Course[];
    progress: UserProgress[];
    profile: UserProfile | null;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    onSelectCourse: (id: number) => void;
    onResetProgress: () => void;
    onChangeView: (view: any) => void;
}

export const Home: React.FC<HomeProps> = ({
    courses,
    progress,
    profile,
    theme,
    toggleTheme,
    onSelectCourse,
    onResetProgress: _onResetProgress,
    onChangeView
}) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('Featured');
    const [activeCredIndex, setActiveCredIndex] = useState<number>(0);

    // Calculate course completions
    const getCourseProgress = (courseId: number): number => {
        // Find matching course details
        const course = courses.find(c => c.id === courseId);
        if (!course || course.id !== 1) return 0; // Only first course is active for MVP

        // The first course has 8 lessons. Let's find completed ones.
        const completedCount = progress.filter(p => p.completed).length;
        return Math.min(Math.round((completedCount / 8) * 100), 100);
    };

    // Filter courses based on Search & Tabs
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             course.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeTab === 'Featured') return matchesSearch;
        if (activeTab === 'Fullstack') return matchesSearch && course.category === 'Fullstack';
        if (activeTab === 'Cloud') return matchesSearch && course.category === 'Cloud';
        if (activeTab === 'Backend') return matchesSearch && course.category === 'Backend';
        if (activeTab === 'Design') return matchesSearch && course.category === 'Design';
        
        return matchesSearch;
    });

    return (
        <div className={`${styles.container} ${theme === 'dark' ? 'dark-theme' : ''}`}>
            {/* 1. Sidebar Navigation */}
            <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
                <button 
                    className={styles.toggleSidebarBtn}
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <ToggleSidebarIcon size={22} />
                </button>

                <div className={`${styles.navItem} ${styles.navItemActive}`}>
                    <HomeIcon size={20} />
                    <span className={styles.navLabel}>Home</span>
                </div>
                <div className={styles.navItem} onClick={() => onChangeView('DASHBOARD')}>
                    <UserIcon size={20} />
                    <span className={styles.navLabel}>Dashboard</span>
                </div>
                <div className={styles.navItem} onClick={() => setActiveTab('Featured')}>
                    <CatalogIcon size={20} />
                    <span className={styles.navLabel}>Catalog</span>
                </div>
                <div className={styles.navItem} onClick={() => setActiveTab('Fullstack')}>
                    <PathsIcon size={20} />
                    <span className={styles.navLabel}>Paths</span>
                </div>
                <div className={styles.navItem}>
                    <CollectionsIcon size={20} />
                    <span className={styles.navLabel}>Collections</span>
                </div>
                <div className={styles.navItem}>
                    <SubscriptionsIcon size={20} />
                    <span className={styles.navLabel}>Subscriptions</span>
                </div>
                <div className={styles.navItem}>
                    <OrganizationsIcon size={20} />
                    <span className={styles.navLabel}>Organizations</span>
                </div>
            </aside>

            {/* 2. Main Content Wrapper */}
            <div className={styles.mainContent}>
                {/* Header Top Bar */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <button 
                            className={styles.menuToggle} 
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            <MenuIcon size={20} />
                        </button>
                        <div className={styles.logo} onClick={() => onChangeView('HOME')}>
                            <span className={styles.logoLetterG}>B</span>
                            <span className={styles.logoLetterO1}>u</span>
                            <span className={styles.logoLetterO2}>g</span>
                            <span className={styles.logoLetterG2}>f</span>
                            <span className={styles.logoLetterL}>i</span>
                            <span className={styles.logoLetterE}>x</span>
                            <span className={styles.logoSkills}>Academy</span>
                        </div>
                    </div>

                    <div className={styles.headerSearchContainer}>
                        <SearchIcon size={18} className={styles.headerSearchIcon} />
                        <input 
                            type="text" 
                            className={styles.headerSearch} 
                            placeholder="What do you want to learn today?" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.headerRight}>
                        <button 
                            className={styles.headerIconBtn} 
                            onClick={toggleTheme}
                            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
                        >
                            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                        </button>
                        <button className={styles.headerIconBtn}>
                            <GlobeIcon size={20} />
                        </button>
                        <button className={styles.headerIconBtn}>
                            <HelpIcon size={20} />
                        </button>
                        <button className={styles.signInBtn} onClick={() => onChangeView('DASHBOARD')}>
                            {profile ? `Hi, ${profile.fullName.split(' ')[0]}` : "Sign in"}
                        </button>
                        <Button variant="primary" onClick={() => onSelectCourse(1)}>
                            Join Path
                        </Button>
                    </div>
                </header>

                {/* Thin Notice Banner */}
                <div className={styles.noticeBanner}>
                    <span className={styles.noticeText}>Practice code integrations directly in terminal console</span>
                    <a className={styles.noticeLink} onClick={() => onSelectCourse(1)}>Get started</a>
                </div>

                {/* Scroll Container */}
                <div className={styles.scrollContainer}>
                    {/* SECTION 1: HERO CONTAINER (Google organic shapes) */}
                    <section className={styles.heroSection}>
                        {/* Organic Shapes Background matching Screenshot 1 */}
                        <div className={`${styles.shape} ${styles.shape1}`}>
                            <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor">
                                <circle cx="50" cy="50" r="40" opacity="0.85" />
                            </svg>
                        </div>
                        <div className={`${styles.shape} ${styles.shape2}`}>
                            <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 0 C65 20 85 20 100 50 C85 80 65 80 50 100 C35 80 15 80 0 50 C15 20 35 20 50 0 Z" opacity="0.85" />
                            </svg>
                        </div>
                        <div className={`${styles.shape} ${styles.shape3}`}>
                            <svg width="230" height="230" viewBox="0 0 100 100" fill="currentColor">
                                <rect x="20" y="20" width="60" height="60" rx="15" transform="rotate(45 50 50)" opacity="0.8" />
                            </svg>
                        </div>
                        <div className={`${styles.shape} ${styles.shape4}`}>
                            <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
                                <polygon points="50,15 90,85 10,85" opacity="0.85" />
                            </svg>
                        </div>
                        <div className={`${styles.shape} ${styles.shape5}`}>
                            <svg width="260" height="260" viewBox="0 0 120 120" fill="currentColor">
                                <path d="M60 10 A50 50 0 0 1 110 60 L60 60 Z" opacity="0.85" />
                            </svg>
                        </div>
                        <div className={`${styles.shape} ${styles.shape6}`}>
                            <svg width="160" height="160" viewBox="0 0 100 100" fill="currentColor">
                                <circle cx="50" cy="50" r="30" opacity="0.8" />
                            </svg>
                        </div>

                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>Build fullstack skills for tomorrow, today</h1>
                            <p className={styles.heroSubtitle}>
                                Whether you're just starting out or looking to build cloud-native applications, future-proof your career with professional fullstack courses.
                            </p>

                            <div className={styles.heroSearchContainer}>
                                <SearchIcon size={22} className={styles.heroSearchIcon} />
                                <input 
                                    type="text" 
                                    className={styles.heroSearch} 
                                    placeholder="What do you want to learn today?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className={styles.heroChips}>
                                <div className={styles.chip} onClick={() => { setSearchQuery('React'); setActiveTab('Fullstack'); }}>
                                    <span className={styles.chipIcon}>↪</span> React Framework
                                </div>
                                <div className={styles.chip} onClick={() => { setSearchQuery('Spring'); setActiveTab('Fullstack'); }}>
                                    <span className={styles.chipIcon}>↪</span> Spring Boot REST APIs
                                </div>
                                <div className={styles.chip} onClick={() => onChangeView('DASHBOARD')}>
                                    <span className={styles.chipIcon}>↪</span> Credentials Dashboard
                                </div>
                                <div className={styles.chip} onClick={() => onSelectCourse(1)}>
                                    <span className={styles.chipIcon}>↪</span> Fullstack Course
                                </div>
                            </div>

                            <Button variant="primary" size="lg" onClick={() => onSelectCourse(1)}>
                                Get started
                            </Button>
                        </div>
                    </section>

                    {/* SECTION 2: BLACK CONTAINER COURSE MODULE SHOWCASE */}
                    <section className={styles.darkBlockContainer}>
                        <div className={styles.darkBlock}>
                            <div className={styles.darkBlockHeader}>
                                <div className={styles.darkBlockSubtitle}>
                                    <span className={`${styles.darkTab} ${activeTab === 'Featured' ? styles.darkTabActive : ''}`} onClick={() => setActiveTab('Featured')}>Featured</span>
                                    <span className={`${styles.darkTab} ${activeTab === 'Fullstack' ? styles.darkTabActive : ''}`} onClick={() => setActiveTab('Fullstack')}>Fullstack</span>
                                    <span className={`${styles.darkTab} ${activeTab === 'Backend' ? styles.darkTabActive : ''}`} onClick={() => setActiveTab('Backend')}>Backend</span>
                                    <span className={`${styles.darkTab} ${activeTab === 'Cloud' ? styles.darkTabActive : ''}`} onClick={() => setActiveTab('Cloud')}>Cloud</span>
                                    <span className={`${styles.darkTab} ${activeTab === 'Design' ? styles.darkTabActive : ''}`} onClick={() => setActiveTab('Design')}>Design</span>
                                </div>
                                <h2 className={styles.darkBlockTitle}>Skill up on development today</h2>
                                <p className={styles.darkBlockDesc}>
                                    Software engineering is constantly changing. Learn backend architectures, frontend hooks, and API integrations with hands-on practice.
                                </p>
                            </div>

                            <div className={styles.coursesGrid}>
                                {filteredCourses.map(course => {
                                    const progressVal = getCourseProgress(course.id);
                                    const isLocked = course.id !== 1; // Mocks lock icon for placeholders
                                    
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
                                                                <div className={styles.cardProgressBar} style={{ width: `${progressVal}%` }}></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {isLocked ? (
                                                    <div className={styles.arrowBtn} style={{ opacity: 0.5, cursor: 'default' }}>
                                                        <LockIcon size={18} />
                                                    </div>
                                                ) : (
                                                    <button className={styles.arrowBtn} onClick={(e) => { e.stopPropagation(); onSelectCourse(course.id); }}>
                                                        <RightArrowIcon size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <Button variant="secondary" onClick={() => setActiveTab('Featured')}>
                                Explore catalog
                            </Button>
                        </div>
                    </section>

                    {/* SECTION 3: REUSABLE COMMUNITY SECTION (GEAR interactive node panel) */}
                    <section className={styles.twoColSection}>
                        <div className={styles.colLeft}>
                            <h2 className={styles.sectionTitle}>Learn and build with other developers</h2>
                            <p className={styles.sectionDesc}>
                                Build real integration projects, earn skill badges, and synchronize frontend states with Java REST APIs. Access our comprehensive sandbox workspaces with immediate compilation responses.
                            </p>
                            <Button variant="secondary" onClick={() => onSelectCourse(1)}>
                                Enroll in Course
                            </Button>
                        </div>
                        <div className={styles.colRight}>
                            <div className={styles.gearCard}>
                                <div className={styles.gearTitle}>GEAR</div>
                                <div className={styles.gearPipeline}>
                                    <div className={`${styles.pipelineNode} ${styles.pipelineNodeActive}`}>
                                        React TypeScript View
                                    </div>
                                    <div className={styles.pipelineLine}></div>
                                    <div className={styles.pipelineNode}>
                                        Fetch REST API / CORS
                                    </div>
                                    <div className={styles.pipelineLine}></div>
                                    <div className={styles.pipelineNode}>
                                        Spring Boot Controller
                                    </div>
                                    <div className={styles.pipelineLine}></div>
                                    <div className={`${styles.pipelineNode} ${styles.pipelineNodeActive}`}>
                                        JPA Persistent H2 DB
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: STATS METRICS */}
                    <section className={styles.statsSection}>
                        <span className={styles.statsBadge}>Interactive Sandbox metrics</span>
                        <h2 className={styles.sectionTitle}>Hands-on learning is better for engineers</h2>
                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>82%</span>
                                <span className={styles.statText}>
                                    of learners preferred <span className={styles.statHighlight}>interactive sandbox playgrounds</span> over standard video tutorials.
                                </span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>94%</span>
                                <span className={styles.statText}>
                                    completion rate recorded for modules incorporating <span className={styles.statHighlight}>immediate quiz checks</span>.
                                </span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>140%</span>
                                <span className={styles.statText}>
                                    increase in <span className={styles.statHighlight}>debugging efficiency</span> after building real API mock tests.
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 5: CREDENTIALS (Laptop illustration / tabs) */}
                    <section className={styles.credentialSection}>
                        <div className={styles.colLeft}>
                            <div className={styles.laptopContainer}>
                                <div className={styles.laptopGraphic}>
                                    <div style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--google-red)' }}></div>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--google-yellow)' }}></div>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--google-green)' }}></div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>credential_verify.sh</div>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                        <AwardIcon size={64} style={{ color: 'var(--google-blue)', marginBottom: '16px' }} />
                                        <h4 style={{ fontFamily: 'var(--font-family-display)', marginBottom: '8px' }}>Course Completion Seal</h4>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Fullstack Path: 100% Completed</p>
                                        <div style={{ marginTop: '20px', padding: '8px', border: '1px dashed var(--google-green)', borderRadius: '4px', backgroundColor: 'rgba(52, 168, 83, 0.05)', fontSize: '0.78rem', color: 'var(--google-green)', fontWeight: '600' }}>
                                            ✓ SHA256 Verification Passed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.credentialList}>
                            <h2 className={styles.sectionTitle}>Future proof your career with credentials</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                Certificates can be a big step, and a big investment. Build your skills, complete assignments, and earn shareable digital credentials to stand out.
                            </p>

                            <div 
                                className={`${styles.credentialItem} ${activeCredIndex === 0 ? styles.credentialItemActive : ''}`}
                                onMouseEnter={() => setActiveCredIndex(0)}
                            >
                                <h3 className={styles.credTitle}>Kickstart your career with certificates</h3>
                                <p className={styles.credDesc}>
                                    Unlock developer roles by demonstrating knowledge of web client engines and database persistence.
                                </p>
                                <a className={styles.credLink} onClick={() => onChangeView('DASHBOARD')}>
                                    Explore certificates <ChevronRightIcon size={14} />
                                </a>
                            </div>

                            <div 
                                className={`${styles.credentialItem} ${activeCredIndex === 1 ? styles.credentialItemActive : ''}`}
                                onMouseEnter={() => setActiveCredIndex(1)}
                            >
                                <h3 className={styles.credTitle}>Level up with skill badges</h3>
                                <p className={styles.credDesc}>
                                    Complete lesson assessments to test parameters, configure filters, and configure proxy ports.
                                </p>
                            </div>

                            <div 
                                className={`${styles.credentialItem} ${activeCredIndex === 2 ? styles.credentialItemActive : ''}`}
                                onMouseEnter={() => setActiveCredIndex(2)}
                            >
                                <h3 className={styles.credTitle}>Prove your expertise with certifications</h3>
                                <p className={styles.credDesc}>
                                    Pass the comprehensive fullstack quiz to earn a signed, printable completion certificate.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 6: START BUILDING BOTTOM BANNER */}
                    <section className={styles.bottomBannerSection}>
                        <div className={styles.bottomLogoG}>
                            <svg width="48" height="48" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gGrad)" strokeWidth="10" />
                                <defs>
                                    <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="var(--google-blue)" />
                                        <stop offset="25%" stopColor="var(--google-red)" />
                                        <stop offset="50%" stopColor="var(--google-yellow)" />
                                        <stop offset="75%" stopColor="var(--google-green)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h2 className={styles.bottomTitle}>Start building your tomorrow, today</h2>
                        <p className={styles.bottomDesc}>
                            Enroll in our comprehensive fullstack engineering course today, take quizzes, code integration scripts, and claim your shareable skill badges.
                        </p>
                        <Button variant="primary" size="lg" onClick={() => onSelectCourse(1)}>
                            Get started
                        </Button>
                    </section>
                </div>
            </div>
        </div>
    );
};
export default Home;
