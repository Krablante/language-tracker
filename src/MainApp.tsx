// src/MainApp.tsx
import React, { useState } from 'react';
import Tabs from './components/Tabs';
import CourseForm from './components/CourseForm';
import CoursesList from './components/CoursesList';
import { Language, Course, Lecture } from './types';
import { useCourses } from './hooks/useCourses';
import { useLectures } from './hooks/useLectures';

interface MainAppProps {
  onSignOut: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onSignOut }) => {
  // Здесь мы предполагаем, что пользователь точно залогинен,
  // потому что AppInner пропустил рендер только после авторизации.

  // 1) Вызываем хуки на верхнем уровне (чтобы ESLint не ругался)
  const { courses, addCourse, removeCourse, updateCourse, error: courseError } = useCourses();
  const { lectures, addLecture, removeLecture, updateLecture, error: lectureError } = useLectures();

  // 2) Локальный стейт для переключения вкладок (EN/FR)
  const [activeLanguage, setActiveLanguage] = useState<Language>('eng');

  // 3) Фильтруем курсы по выбранному языку
  const filteredCourses = courses.filter((c: Course) => c.language === activeLanguage);

  // 4) Группируем лекции по courseId
  const lecturesGrouped: Record<string, Lecture[]> = lectures.reduce((acc, lec) => {
    if (!acc[lec.courseId]) {
      acc[lec.courseId] = [];
    }
    acc[lec.courseId].push(lec);
    return acc;
  }, {} as Record<string, Lecture[]>);

  // Сортируем лекции внутри каждой группы по createdAt DESC
  Object.values(lecturesGrouped).forEach(arr => {
    arr.sort((a, b) => {
      const ta = a.createdAt?.seconds || 0;
      const tb = b.createdAt?.seconds || 0;
      return tb - ta;
    });
  });

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Шапка: заголовок + кнопка выхода */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Language Tracker</h1>
        <button
          onClick={onSignOut}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: '#e74c3c',
            fontSize: '1rem'
          }}
          title="Выйти"
        >
          Выйти
        </button>
      </div>

      {/* Переключатель языков */}
      <Tabs active={activeLanguage} onChange={setActiveLanguage} />

      {/* Форма добавления нового курса */}
      <CourseForm onAdd={addCourse} language={activeLanguage} />
      {courseError && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>
          Ошибка (курсы): {courseError}
        </div>
      )}

      {/* Список курсов и вложенных лекций */}
      <CoursesList
        courses={filteredCourses}
        lecturesGrouped={lecturesGrouped}
        onRemoveCourse={removeCourse}
        onAddLecture={addLecture}
        onRemoveLecture={removeLecture}
      />
      {lectureError && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>
          Ошибка (лекции): {lectureError}
        </div>
      )}
    </div>
  );
};

export default MainApp;
