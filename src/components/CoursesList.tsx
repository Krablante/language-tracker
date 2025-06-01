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
    return <div style={{ textAlign: 'center', marginTop: '1rem', opacity: 0.6 }}>Нет курсов</div>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
      {courses.map(course => (
        <li key={course.id} style={{ marginBottom: '1.5rem', border: '1px solid #ddd', borderRadius: '6px', padding: '1rem' }} className="course-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {course.url ? (
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}
              >
                {course.title}
              </a>
            ) : (
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{course.title}</span>
            )}
            <button
              onClick={() => onRemoveCourse(course.id)}
              style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: '#e74c3c' }}
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
