// src/components/CourseForm.tsx
import React, { useState } from 'react';
import { Language } from '../types';

interface Props {
  onAdd: (course: { title: string; url?: string; language: Language }) => void;
  language: Language;
}

const CourseForm: React.FC<Props> = ({ onAdd, language }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const trimmedUrl = url.trim();
    onAdd({ title: trimmedTitle, url: trimmedUrl || undefined, language });
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="course-form" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      <input
        type="text"
        placeholder="Название курса"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="url"
        placeholder="Ссылка (опционально)"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', border: 'none', background: '#4a90e2', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
        Добавить
      </button>
    </form>
  );
};

export default CourseForm;
