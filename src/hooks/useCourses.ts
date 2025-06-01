// src/hooks/useCourses.ts
import { useState, useEffect, useCallback } from 'react';
import { Course } from '../types';
import { useCourseService } from '../contexts/CourseServiceContext';

export function useCourses() {
  const service = useCourseService();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = service.subscribe(
      (items: Course[]) => {
        setCourses(items);
      },
      (e: Error) => {
        setError(e.message);
      }
    );
    return unsubscribe;
  }, [service]);

  const addCourse = useCallback(
    async (course: Omit<Course, 'id' | 'createdAt' | 'owner'>) => {
      try {
        await service.add(course);
      } catch (e: any) {
        setError(e.message);
      }
    },
    [service]
  );

  const removeCourse = useCallback(
    async (id: string) => {
      try {
        await service.remove(id);
      } catch (e: any) {
        setError(e.message);
      }
    },
    [service]
  );

  const updateCourse = useCallback(
    async (id: string, data: Partial<Omit<Course, 'id' | 'owner' | 'createdAt'>>) => {
      try {
        await service.update(id, data);
      } catch (e: any) {
        setError(e.message);
      }
    },
    [service]
  );

  return { courses, addCourse, removeCourse, updateCourse, error };
}
