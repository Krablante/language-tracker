// src/App.tsx
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CourseServiceProvider } from './contexts/CourseServiceContext';
import { LectureServiceProvider } from './contexts/LectureServiceContext';
import MainApp from './MainApp';

// «Каркасный» компонент, который проверяет авторизацию и рендерит разные экраны
function AppInner() {
  const { user, loading, signIn, signOut } = useAuth();

  // Пока идёт проверка (onAuthStateChanged), показываем «Загрузка...»
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        Загрузка...
      </div>
    );
  }

  // Если пользователь не залогинен — показываем экран входа
  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={{
          padding: '2rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2>Пожалуйста, войдите через Google</h2>
          <button
            onClick={signIn}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
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

  // Если мы здесь — значит пользователь точно авторизован, можем подключать провайдеры курса/лекций
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
