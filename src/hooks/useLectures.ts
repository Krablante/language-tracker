// src/hooks/useLectures.ts
import { useState, useEffect, useCallback } from 'react';
import { Lecture } from '../types';
import { useLectureService } from '../contexts/LectureServiceContext';

export function useLectures() {
  const service = useLectureService();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = service.subscribe(
      (items: Lecture[]) => {
        setLectures(items);
      },
      (e: Error) => {
        setError(e.message);
      }
    );
    return unsubscribe;
  }, [service]);

  const addLecture = useCallback(
    async (lecture: Omit<Lecture, 'id' | 'createdAt' | 'owner'>) => {
      try {
        await service.add(lecture);
      } catch (e: any) {
        setError(e.message);
      }
    },
    [service]
  );

  const removeLecture = useCallback(
    async (id: string) => {
      try {
        await service.remove(id);
      } catch (e: any) {
        setError(e.message);
      }
    },
    [service]
  );

  const updateLecture = useCallback(
    async (
      id: string,
      data: Partial<Omit<Lecture, 'id' | 'owner' | 'createdAt' | 'courseId'>>
    ) => {
      try {
        await service.update(id, data);
      } catch (e: any) {
        setError(e.message);
      }
    },
    [service]
  );

  return { lectures, addLecture, removeLecture, updateLecture, error };
}
