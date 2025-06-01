// src/App.tsx
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CourseServiceProvider } from './contexts/CourseServiceContext';
import { LectureServiceProvider } from './contexts/LectureServiceContext';
import MainApp from './MainApp';

function AppInner() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        Загрузка...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--bg-color)'
      }}>
        <div style={{
          padding: '2rem',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          textAlign: 'center',
          background: 'var(--card-bg)',
          boxShadow: '0 2px 5px var(--card-shadow)'
        }}>
          <h2>Пожалуйста, войдите через Google</h2>
          <button
            onClick={signIn}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.2rem',
              border: 'none',
              background: '#4285F4',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Войти с Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <CourseServiceProvider>
      <LectureServiceProvider>
        <MainApp onSignOut={signOut} />
      </LectureServiceProvider>
    </CourseServiceProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
