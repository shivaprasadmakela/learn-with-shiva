import { 
    useLearning,
    Home,
    CourseDetail,
    LessonReader,
    Dashboard,
    Certificate
} from '../features/learning';
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

    if (isLoading && courses.length === 0) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.spinner}></div>
                <p>Loading Bugfix Academy Platform...</p>
            </div>
        );
    }

    return (
        <div className={styles.appRoot}>
            {error && (
                <div className={styles.errorBanner}>
                    <p>⚠️ {error}. Please ensure the Spring Boot server is running on port 8081.</p>
                </div>
            )}

            {activeView === 'HOME' && (
                <Home 
                    courses={courses}
                    progress={progress}
                    profile={profile}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    onSelectCourse={selectCourse}
                    onResetProgress={resetAllProgress}
                    onChangeView={changeView}
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
        </div>
    );
}
