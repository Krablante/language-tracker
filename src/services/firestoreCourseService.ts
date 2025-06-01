// src/services/firestoreCourseService.ts
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { CourseService } from './courseService';
import { Course } from '../types';
import { db } from '../firebase';

export class FirestoreCourseService implements CourseService {
  private uid: string;

  constructor(uid: string) {
    this.uid = uid;
  }

  // Подписываемся на коллекцию "courses", где owner == this.uid, сортируя по createdAt DESC
  subscribe(onUpdate: (courses: Course[]) => void, onError?: (e: Error) => void) {
    const q = query(
      collection(db, 'courses'),
      where('owner', '==', this.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: Course[] = snapshot.docs.map(docSnap => {
          const data = docSnap.data() as Omit<Course, 'id'>;
          return {
            id: docSnap.id,
            title: data.title,
            url: data.url,
            language: data.language,
            owner: data.owner,
            createdAt: data.createdAt,
          };
        });
        onUpdate(items);
      },
      (error) => {
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  }

  // Добавляем новый курс
  async add(course: Omit<Course, 'id' | 'createdAt' | 'owner'>): Promise<Course> {
    // dataToSave — документ, который запишем
    const dataToSave: any = {
      owner: this.uid,
      title: course.title,
      language: course.language,
      createdAt: serverTimestamp(),
    };
    if (course.url) {
      dataToSave.url = course.url;
    }

    const docRef = await addDoc(collection(db, 'courses'), dataToSave);
    // Возвращаем объект с id и переданными полями (при client‐side рендере, serverTimestamp может быть undefined до чтения)
    return {
      id: docRef.id,
      title: course.title,
      url: course.url,
      language: course.language,
      owner: this.uid,
      createdAt: undefined, // либо можно оставить undefined, реальное значение придёт через subscribe
    };
  }

  // Удаление курса по id
  async remove(id: string): Promise<void> {
    await deleteDoc(doc(db, 'courses', id));
  }

  // Обновление полей (заодно можно менять title, url, language)
  async update(id: string, data: Partial<Omit<Course, 'id' | 'owner' | 'createdAt'>>): Promise<void> {
    const ref = doc(db, 'courses', id);
    await updateDoc(ref, data);
  }
}
