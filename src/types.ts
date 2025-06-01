// src/types.ts
import { Timestamp } from 'firebase/firestore';

// Язык курса: английский или французский
export type Language = 'eng' | 'fr';

// Course: документ в Firestore, коллекция "courses"
export interface Course {
  id: string;
  title: string;
  url?: string;
  language: Language;
  owner?: string;          // uid пользователя (который добавил курс)
  createdAt?: Timestamp;
}

// Lecture: документ в Firestore, коллекция "lectures"
export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  owner?: string;          // uid пользователя (для безопасности)
  createdAt?: Timestamp;
}
