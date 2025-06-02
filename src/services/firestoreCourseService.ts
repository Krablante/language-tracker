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

/**
 * FirestoreCourseService v2
 * Поддержка drag-and-drop сортировки через поле `order` (число).
 *  1. subscribe: orderBy('order','asc') → orderBy('createdAt','desc')
 *  2. add(): проставляем order: Date.now()
 *  3. update() уже умеет менять любое поле, включая order.
 */
export class FirestoreCourseService implements CourseService {
  private uid: string;

  constructor(uid: string) {
    this.uid = uid;
  }

  // Подписка на курсы пользователя, сначала сортировка по order ASC, потом createdAt DESC
  subscribe(onUpdate: (courses: Course[]) => void, onError?: (e: Error) => void) {
    const q = query(
      collection(db, 'courses'),
      where('owner', '==', this.uid),
      orderBy('order', 'asc'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: Course[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as Omit<Course, 'id'>;
          return {
            id: docSnap.id,
            title: data.title,
            url: data.url,
            language: data.language,
            owner: data.owner,
            createdAt: data.createdAt,
            order: data.order,
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

  // Добавляем новый курс с полем order (Date.now())
  async add(course: Omit<Course, 'id' | 'createdAt' | 'owner' | 'order'>): Promise<Course> {
    const timestampNow = Date.now();
    const dataToSave: any = {
      owner: this.uid,
      title: course.title,
      language: course.language,
      createdAt: serverTimestamp(),
      order: timestampNow,
    };
    if (course.url) {
      dataToSave.url = course.url;
    }

    const docRef = await addDoc(collection(db, 'courses'), dataToSave);
    return {
      id: docRef.id,
      title: course.title,
      url: course.url,
      language: course.language,
      owner: this.uid,
      createdAt: undefined, // придёт из subscribe
      order: timestampNow,
    };
  }

  // Удаляем курс по id
  async remove(id: string): Promise<void> {
    await deleteDoc(doc(db, 'courses', id));
  }

  // Обновление полей (title, url, language, order, ...)
  async update(
    id: string,
    data: Partial<Omit<Course, 'id' | 'owner' | 'createdAt'>>
  ): Promise<void> {
    const ref = doc(db, 'courses', id);
    await updateDoc(ref, data);
  }
}
