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
    <form onSubmit={handleSubmit} className="course-form">
      <input
        type="text"
        placeholder="Название курса"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Ссылка (опционально)"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      {/* Кнопка заменилась на круглую с буквой «A» */}
      <button type="submit" className="submit-btn" title="Добавить курс">
      A
      </button>
    </form>
  );
};

export default CourseForm;
