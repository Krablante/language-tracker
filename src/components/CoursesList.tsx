// src/components/CoursesList.tsx
import React from 'react';
import { Course, Lecture } from '../types';
import LectureForm from './LectureForm';
import LecturesList from './LecturesList';

interface Props {
  courses: Course[];
  lecturesGrouped: Record<string, Lecture[]>;
  onRemoveCourse: (id: string) => void;
  onAddLecture: (lecture: { courseId: string; title: string; description?: string }) => void;
  onRemoveLecture: (id: string) => void;
}

const CoursesList: React.FC<Props> = ({
  courses,
  lecturesGrouped,
  onRemoveCourse,
  onAddLecture,
  onRemoveLecture,
}) => {
  if (courses.length === 0) {
    return <div className="course-empty">Нет курсов</div>;
  }

  return (
    <ul className="courses-list">
      {courses.map((course) => (
        <li key={course.id} className="course-item">
          {/* Обёртка для заголовка и кнопки удаления */}
          <div className="course-header">
            {course.url ? (
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="course-link"
              >
                {course.title}
              </a>
            ) : (
              <span className="course-title">{course.title}</span>
            )}
            <button
              className="course-delete-btn"
              onClick={() => onRemoveCourse(course.id)}
              title="Удалить курс"
            >
              ×
            </button>
          </div>

          {/* Форма для добавления лекции */}
          <LectureForm courseId={course.id} onAdd={onAddLecture} />

          {/* Список лекций для данного курса */}
          <LecturesList entries={lecturesGrouped[course.id] || []} onRemove={onRemoveLecture} />
        </li>
      ))}
    </ul>
  );
};

export default CoursesList;
