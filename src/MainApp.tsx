// src/MainApp.tsx
import React, { useState, useEffect } from 'react';
import Tabs from './components/Tabs';
import CourseForm from './components/CourseForm';
import CoursesList from './components/CoursesList';
import { Language, Course, Lecture } from './types';
import { useCourses } from './hooks/useCourses';
import { useLectures } from './hooks/useLectures';
import { useAuth } from './contexts/AuthContext';

interface MainAppProps {
  onSignOut: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onSignOut }) => {
  // 1) Получаем текущего пользователя из контекста
  const { user } = useAuth();

  // 2) Хуки для курсов и лекций
  const { courses, addCourse, removeCourse, updateCourse, error: courseError } = useCourses();
  const { lectures, addLecture, removeLecture, updateLecture, error: lectureError } = useLectures();

  // 3) Тема (light/dark) с сохранением в localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 4) Выбранный язык (EN / FR)
  const [activeLanguage, setActiveLanguage] = useState<Language>('eng');

  // 5) Фильтрация курсов по языку
  const filteredCourses = courses.filter((c: Course) => c.language === activeLanguage);

  // 6) Группировка лекций по courseId
  const lecturesGrouped: Record<string, Lecture[]> = lectures.reduce((acc, lec) => {
    if (!acc[lec.courseId]) {
      acc[lec.courseId] = [];
    }
    acc[lec.courseId].push(lec);
    return acc;
  }, {} as Record<string, Lecture[]>);

  // 7) Внутри каждой группы сортируем лекции по createdAt (DESC)
  Object.values(lecturesGrouped).forEach(arr => {
    arr.sort((a, b) => {
      const ta = a.createdAt?.seconds || 0;
      const tb = b.createdAt?.seconds || 0;
      return tb - ta;
    });
  });

  return (
    <div className="container">
      {/* ─── ШАПКА ────────────────────────────────────────────────────────── */}
      <header className="app-header">
        <h1 className="app-title">Language Tracker</h1>

        <div className="header-controls">
          {/* 1) Кнопка переключения темы */}
          <button
            className="theme-btn"
            onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
            aria-label={theme === 'light' ? 'Переключиться на тёмную тему' : 'Переключиться на светлую тему'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* 2) Аватар пользователя */}
          {user?.photoURL ? (
            <button className="avatar-btn" onClick={onSignOut} title="Выйти из аккаунта">
              <img src={user.photoURL} alt="User Avatar" className="avatar-img" />
            </button>
          ) : (
            // Если у пользователя нет photoURL, рисуем кружок с буквой "G"
            <button className="avatar-btn" onClick={onSignOut} title="Выйти из аккаунта">
              <div className="avatar-placeholder">G</div>
            </button>
          )}
        </div>
      </header>

      {/* ─── ТАБЫ ДЛЯ ЯЗЫКОВ ───────────────────────────────────────────────── */}
      <Tabs active={activeLanguage} onChange={setActiveLanguage} />

      {/* ─── ФОРМА ДОБАВЛЕНИЯ НОВОГО КУРСА ───────────────────────────────────── */}
      <CourseForm onAdd={addCourse} language={activeLanguage} />
      {courseError && <div className="error-message">Ошибка (курсы): {courseError}</div>}

      {/* ─── СПИСОК КУРСОВ + ВНУТРИ НИХ ЛЕКЦИИ ──────────────────────────────── */}
      <CoursesList
        courses={filteredCourses}
        lecturesGrouped={lecturesGrouped}
        onRemoveCourse={removeCourse}
        onAddLecture={addLecture}
        onRemoveLecture={removeLecture}
      />
      {lectureError && <div className="error-message">Ошибка (лекции): {lectureError}</div>}
    </div>
  );
};

export default MainApp;
