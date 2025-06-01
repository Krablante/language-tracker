// src/contexts/CourseServiceContext.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { CourseService } from '../services/courseService';
import { FirestoreCourseService } from '../services/firestoreCourseService';

const CourseServiceContext = createContext<CourseService | null>(null);

export const CourseServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  // Когда user меняется (log in/out), создаём новый инстанс сервиса
  const service = useMemo<CourseService>(() => {
    if (!user) throw new Error('CourseService требует авторизации');
    return new FirestoreCourseService(user.uid);
  }, [user]);

  return (
    <CourseServiceContext.Provider value={service}>
      {children}
    </CourseServiceContext.Provider>
  );
};

export const useCourseService = (): CourseService => {
  const ctx = useContext(CourseServiceContext);
  if (!ctx) throw new Error('useCourseService должен вызываться внутри CourseServiceProvider');
  return ctx;
};
