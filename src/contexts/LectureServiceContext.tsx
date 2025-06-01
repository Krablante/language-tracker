// src/contexts/LectureServiceContext.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { LectureService } from '../services/lectureService';
import { FirestoreLectureService } from '../services/firestoreLectureService';

const LectureServiceContext = createContext<LectureService | null>(null);

export const LectureServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const service = useMemo<LectureService>(() => {
    if (!user) throw new Error('LectureService требует авторизации');
    return new FirestoreLectureService(user.uid);
  }, [user]);

  return (
    <LectureServiceContext.Provider value={service}>
      {children}
    </LectureServiceContext.Provider>
  );
};

export const useLectureService = (): LectureService => {
  const ctx = useContext(LectureServiceContext);
  if (!ctx) throw new Error('useLectureService должен вызываться внутри LectureServiceProvider');
  return ctx;
};
