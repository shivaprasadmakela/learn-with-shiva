import { useState } from 'react';
import { 
    useLearning,
    Home,
    CourseDetail,
    LessonReader,
    Dashboard,
    Certificate
} from '../features/learning';
import { 
    HomeIcon, 
    UserIcon, 
    CatalogIcon, 
    PathsIcon, 
    CollectionsIcon, 
    SubscriptionsIcon, 
    OrganizationsIcon,
    MenuIcon,
    ChevronDownIcon,
    MoonIcon,
    SunIcon,
    GlobeIcon,
    HelpIcon,
    SearchIcon
} from '../shared/components/Icons';
import styles from './App.module.css';


export default function App() {
    const {
        activeView,
        changeView,
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
        saveProfile
    } = useLearning();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isCollectionsExpanded, setIsCollectionsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    if (isLoading && courses.length === 0) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.spinner}></div>
                <p>Loading Bugfix Academy Platform...</p>
            </div>
        );
    }

    const userFirstName = profile?.fullName?.split(' ')[0] ?? 'there';

    return (
        <div className={`${styles.appRoot} ${theme === 'dark' ? 'dark-theme' : ''}`}>
            {error && (
                <div className={styles.errorBanner}>
                    <p>⚠️ {error}. Please ensure the Spring Boot server is running on port 8081.</p>
                </div>
            )}

            {/* Global Sticky Top Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <button className={styles.menuBtn} onClick={() => setIsExpanded(!isExpanded)} aria-label="Toggle menu">
                        <MenuIcon size={22} />
                    </button>
                    <div className={styles.logo} onClick={() => changeView('HOME')}>
                        <span className={styles.logoBrand}>Bugfix</span>
                        <span className={styles.logoAcademy}>Academy</span>
                    </div>
                </div>

                {activeView === 'HOME' && (
                    <div className={styles.headerSearchContainer}>
                        <SearchIcon size={18} className={styles.headerSearchIcon} />
                        <input
                            type="text"
                            className={styles.headerSearch}
                            placeholder="What do you want to learn today?"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                )}

                <div className={styles.headerRight}>
                    <button
                        className={styles.headerIconBtn}
                        onClick={toggleTheme}
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                    </button>
                    <button className={styles.headerIconBtn}><GlobeIcon size={20} /></button>
                    <button className={styles.headerIconBtn}><HelpIcon size={20} /></button>
                    <button className={styles.signInBtn} onClick={() => changeView('DASHBOARD')}>
                        {profile ? `Hi, ${userFirstName}` : 'Sign in'}
                    </button>
                </div>
            </header>

            <div className={styles.appLayout}>
                {/* Shared Sticky Sidebar Navigation */}
                <aside className={`${styles.sidebar} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`}>
                    {isExpanded ? (
                        <nav className={styles.navContainer}>
                            <div 
                                className={`${styles.navItemExpanded} ${(activeView === 'HOME' || activeView === 'COURSE_DETAIL') ? styles.navItemActive : ''}`}
                                onClick={() => changeView('HOME')}
                                title="Home"
                            >
                                <HomeIcon size={20} />
                                <span className={styles.navLabelExpanded}>Home</span>
                            </div>
                            <div 
                                className={`${styles.navItemExpanded} ${(activeView === 'DASHBOARD' || activeView === 'CERTIFICATE') ? styles.navItemActive : ''}`}
                                onClick={() => changeView('DASHBOARD')}
                                title="Dashboard"
                            >
                                <UserIcon size={20} />
                                <span className={styles.navLabelExpanded}>Dashboard</span>
                            </div>
                            <div 
                                className={styles.navItemExpanded}
                                onClick={() => {
                                    changeView('HOME');
                                    setTimeout(() => {
                                        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                title="Catalog"
                            >
                                <CatalogIcon size={20} />
                                <span className={styles.navLabelExpanded}>Catalog</span>
                            </div>
                            <div 
                                className={styles.navItemExpanded}
                                onClick={() => selectCourse(1)}
                                title="Paths"
                            >
                                <PathsIcon size={20} />
                                <span className={styles.navLabelExpanded}>Paths</span>
                            </div>
                            
                            {/* Collections Expandable Menu */}
                            <div className={styles.collectionsWrapper}>
                                <div 
                                    className={`${styles.navItemExpanded} ${isCollectionsExpanded ? styles.collectionsActive : ''}`}
                                    onClick={() => setIsCollectionsExpanded(!isCollectionsExpanded)}
                                    title="Collections"
                                >
                                    <div className={styles.navItemLeft}>
                                        <CollectionsIcon size={20} />
                                        <span className={styles.navLabelExpanded}>Collections</span>
                                    </div>
                                    <ChevronDownIcon 
                                        size={16} 
                                        className={`${styles.caretIcon} ${isCollectionsExpanded ? styles.caretRotated : ''}`} 
                                    />
                                </div>
                                {isCollectionsExpanded && (
                                    <div className={styles.submenu}>
                                        <div className={styles.submenuItem} onClick={() => { changeView('HOME'); setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>AI Boost Bites</div>
                                        <div className={styles.submenuItem} onClick={() => { changeView('HOME'); setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Career Certificates</div>
                                        <div className={styles.submenuItem} onClick={() => { changeView('HOME'); setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Cloud</div>
                                        <div className={styles.submenuItem} onClick={() => { changeView('HOME'); setTimeout(() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>DeepMind</div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.navItemExpanded} title="Subscriptions">
                                <SubscriptionsIcon size={20} />
                                <span className={styles.navLabelExpanded}>Subscriptions</span>
                            </div>
                            <div className={styles.navItemExpanded} title="Organizations">
                                <OrganizationsIcon size={20} />
                                <span className={styles.navLabelExpanded}>Organizations</span>
                            </div>
                        </nav>
                    ) : (
                        <nav className={styles.navContainerCentered}>
                            <div 
                                className={styles.navItemCollapsed}
                                onClick={() => changeView('HOME')}
                                title="Home"
                            >
                                <div className={`${styles.iconPill} ${(activeView === 'HOME' || activeView === 'COURSE_DETAIL') ? styles.iconPillActive : ''}`}>
                                    <HomeIcon size={20} />
                                </div>
                                <span className={styles.navLabelCollapsed}>Home</span>
                            </div>

                            <div 
                                className={styles.navItemCollapsed}
                                onClick={() => changeView('DASHBOARD')}
                                title="Dashboard"
                            >
                                <div className={`${styles.iconPill} ${(activeView === 'DASHBOARD' || activeView === 'CERTIFICATE') ? styles.iconPillActive : ''}`}>
                                    <UserIcon size={20} />
                                </div>
                                <span className={styles.navLabelCollapsed}>Dashboard</span>
                            </div>

                            <div 
                                className={styles.navItemCollapsed}
                                onClick={() => {
                                    changeView('HOME');
                                    setTimeout(() => {
                                        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                title="Catalog"
                            >
                                <div className={styles.iconPill}>
                                    <CatalogIcon size={20} />
                                </div>
                                <span className={styles.navLabelCollapsed}>Catalog</span>
                            </div>

                            <div 
                                className={styles.navItemCollapsed}
                                onClick={() => selectCourse(1)}
                                title="Paths"
                            >
                                <div className={styles.iconPill}>
                                    <PathsIcon size={20} />
                                </div>
                                <span className={styles.navLabelCollapsed}>Paths</span>
                            </div>

                            <div 
                                className={styles.navItemCollapsed}
                                onClick={() => {
                                    setIsExpanded(true);
                                    setIsCollectionsExpanded(true);
                                }}
                                title="Collections"
                            >
                                <div className={styles.iconPill}>
                                    <div className={styles.collectionsIconContainer}>
                                        <CollectionsIcon size={20} />
                                        <ChevronDownIcon size={10} className={styles.collapsedCaret} />
                                    </div>
                                </div>
                                <span className={styles.navLabelCollapsed}>Collections</span>
                            </div>

                            <div 
                                className={styles.navItemCollapsed}
                                title="Subscriptions"
                            >
                                <div className={styles.iconPill}>
                                    <SubscriptionsIcon size={20} />
                                </div>
                                <span className={styles.navLabelCollapsed}>Subscriptions</span>
                            </div>

                            <div 
                                className={styles.navItemCollapsed}
                                title="Organizations"
                            >
                                <div className={styles.iconPill}>
                                    <OrganizationsIcon size={20} />
                                </div>
                                <span className={styles.navLabelCollapsed}>Organizations</span>
                            </div>
                        </nav>
                    )}
                </aside>

                {/* Main Content Area */}
                <main className={styles.mainContent}>
                    {activeView === 'HOME' && (
                        <Home 
                            courses={courses}
                            progress={progress}
                            onSelectCourse={selectCourse}
                            onResetProgress={resetAllProgress}
                            searchQuery={searchQuery}
                        />
                    )}

                    {activeView === 'COURSE_DETAIL' && (
                        <CourseDetail 
                            course={currentCourse}
                            progress={progress}
                            onBack={() => changeView('HOME')}
                            onStartLesson={selectLesson}
                        />
                    )}

                    {activeView === 'LESSON_READER' && currentCourse && (
                        <LessonReader 
                            course={currentCourse}
                            lesson={activeLesson}
                            progress={progress}
                            onBack={() => selectCourse(currentCourse.id)}
                            onSelectLesson={selectLesson}
                            onMarkCompleted={markLessonCompleted}
                            onSubmitQuiz={submitQuiz}
                            onChangeView={changeView}
                        />
                    )}

                    {activeView === 'DASHBOARD' && (
                        <Dashboard 
                            courses={courses}
                            progress={progress}
                            profile={profile}
                            onBack={() => changeView('HOME')}
                            onResetProgress={resetAllProgress}
                            onSelectCourse={selectCourse}
                            onSaveProfile={saveProfile}
                            onChangeView={changeView}
                        />
                    )}

                    {activeView === 'CERTIFICATE' && (
                        <Certificate 
                            course={currentCourse || (courses.length > 0 ? courses[0] : null)}
                            profile={profile}
                            onBack={() => changeView('DASHBOARD')}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
