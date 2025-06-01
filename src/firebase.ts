// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Вставьте сюда скопированный объект конфигурации из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCbChaIIPANbk4ioZQKlUlOf7oZfSiHrN4",
  authDomain: "language-tracker-5b8f3.firebaseapp.com",
  projectId: "language-tracker-5b8f3",
  storageBucket: "language-tracker-5b8f3.firebasestorage.app",
  messagingSenderId: "704950663098",
  appId: "1:704950663098:web:9c13da563f2ca49b994f83"
};


// Инициализируем Firebase
const app = initializeApp(firebaseConfig);

// Экспортируем auth и db для использования в контекстах/сервисах
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
