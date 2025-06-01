// src/services/firestoreLectureService.ts
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
import { LectureService } from './lectureService';
import { Lecture } from '../types';
import { db } from '../firebase';

export class FirestoreLectureService implements LectureService {
  private uid: string;

  constructor(uid: string) {
    this.uid = uid;
  }

  // Подписка на все лекции, где owner == this.uid, сортировка по createdAt DESC
  subscribe(onUpdate: (lectures: Lecture[]) => void, onError?: (e: Error) => void) {
    const q = query(
      collection(db, 'lectures'),
      where('owner', '==', this.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: Lecture[] = snapshot.docs.map(docSnap => {
          const data = docSnap.data() as Omit<Lecture, 'id'>;
          return {
            id: docSnap.id,
            courseId: data.courseId,
            title: data.title,
            description: data.description,
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

  // Добавляем новую лекцию
  async add(lecture: Omit<Lecture, 'id' | 'createdAt' | 'owner'>): Promise<Lecture> {
    const dataToSave: any = {
      owner: this.uid,
      courseId: lecture.courseId,
      title: lecture.title,
      createdAt: serverTimestamp(),
    };
    if (lecture.description) {
      dataToSave.description = lecture.description;
    }

    const docRef = await addDoc(collection(db, 'lectures'), dataToSave);
    return {
      id: docRef.id,
      courseId: lecture.courseId,
      title: lecture.title,
      description: lecture.description,
      owner: this.uid,
      createdAt: undefined,
    };
  }

  // Удаление лекции по id
  async remove(id: string): Promise<void> {
    await deleteDoc(doc(db, 'lectures', id));
  }

  // Обновление лекции (title, description)
  async update(
    id: string,
    data: Partial<Omit<Lecture, 'id' | 'owner' | 'createdAt' | 'courseId'>>
  ): Promise<void> {
    const ref = doc(db, 'lectures', id);
    await updateDoc(ref, data);
  }
}
