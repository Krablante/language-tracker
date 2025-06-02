// src/components/CoursesList.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Course, Lecture } from '../types';
import LectureForm from './LectureForm';
import LecturesList from './LecturesList';
import { useCourseService } from '../contexts/CourseServiceContext';

// ── @dnd-kit ────────────────────────────────────────────────
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  courses: Course[];
  lecturesGrouped: Record<string, Lecture[]>;
  onRemoveCourse: (id: string) => void;
  onAddLecture: (lecture: { courseId: string; title: string; description?: string }) => void;
  onRemoveLecture: (id: string) => void;
}

/**
 * SortableCourseItem – <li> обёрнут в useSortable
 */
const SortableCourseItem: React.FC<{
  course: Course;
  openId: string | null;
  toggle: (id: string) => void;
  onRemoveCourse: (id: string) => void;
  children: React.ReactNode;
}> = ({ course, openId, toggle, onRemoveCourse, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: course.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <li ref={setNodeRef} style={style} className="course-item" {...attributes} {...listeners}>
      {/* ── Заголовок ─────────────────────────────────────── */}
      <div className="course-header">
        <button
          className="course-toggle-btn"
          onClick={() => toggle(course.id)}
          title={openId === course.id ? 'Свернуть курс' : 'Развернуть курс'}
        >
          <span className={`arrow ${openId === course.id ? 'arrow--open' : ''}`}>▸</span>
        </button>

        {course.url ? (
          <a href={course.url} target="_blank" rel="noopener noreferrer" className="course-link">
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
      {children}
    </li>
  );
};

/**
 * CoursesList – аккордеон + auto-height + drag&drop
 */
const CoursesList: React.FC<Props> = ({
  courses,
  lecturesGrouped,
  onRemoveCourse,
  onAddLecture,
  onRemoveLecture,
}) => {
  const courseService = useCourseService();

  // ── Аккордеон ───────────────────────────────────────────
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  // ── Auto-height ────────────────────────────────────────
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!openId) return;
    const el = contentRefs.current[openId];
    if (el) {
      setHeights(prev => ({ ...prev, [openId]: el.scrollHeight }));
    }
  }, [openId, courses, lecturesGrouped]);

  // ── DnD sensors ────────────────────────────────────────
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = courses.findIndex(c => c.id === active.id);
    const newIndex = courses.findIndex(c => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(courses, oldIndex, newIndex);
    reordered.forEach((c, idx) => {
      courseService.update(c.id, { order: idx });
    });
  };

  if (courses.length === 0) return <div className="course-empty">Нет курсов</div>;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={courses.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <ul className="courses-list">
          {courses.map(course => (
            <SortableCourseItem
              key={course.id}
              course={course}
              openId={openId}
              toggle={toggle}
              onRemoveCourse={onRemoveCourse}
            >
              <div
                ref={el => {
                  contentRefs.current[course.id] = el;
                }}
                className={`course-content ${openId === course.id ? 'course-content--open' : ''}`}
                style={{ maxHeight: openId === course.id ? heights[course.id] || 0 : 0 }}
              >
                <LectureForm courseId={course.id} onAdd={onAddLecture} />
                <LecturesList
                  entries={lecturesGrouped[course.id] || []}
                  onRemove={onRemoveLecture}
                />
              </div>
            </SortableCourseItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default CoursesList;
