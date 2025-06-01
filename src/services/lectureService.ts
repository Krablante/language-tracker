// src/services/lectureService.ts
import { Lecture } from '../types';

export interface LectureService {
  subscribe: (
    onUpdate: (lectures: Lecture[]) => void,
    onError?: (e: Error) => void
  ) => () => void;

  add: (lecture: Omit<Lecture, 'id' | 'createdAt' | 'owner'>) => Promise<Lecture>;

  remove: (id: string) => Promise<void>;

  update: (
    id: string,
    data: Partial<Omit<Lecture, 'id' | 'owner' | 'createdAt' | 'courseId'>>
  ) => Promise<void>;
}
