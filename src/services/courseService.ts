// src/services/courseService.ts
import { Course } from '../types';

// Интерфейс для работы с курсами
export interface CourseService {
  // подписка: при изменении списка курсов вызываем onUpdate(массив Course)
  // onError — опциональный колбэк на ошибку
  subscribe: (
    onUpdate: (courses: Course[]) => void,
    onError?: (e: Error) => void
  ) => () => void;

  // добавление нового курса
  add: (course: Omit<Course, 'id' | 'createdAt'>) => Promise<Course>;

  // удаление курса по его id
  remove: (id: string) => Promise<void>;

  // (опционально) обновление (title, url или language)
  update: (id: string, data: Partial<Omit<Course, 'id' | 'owner' | 'createdAt'>>) => Promise<void>;
}
