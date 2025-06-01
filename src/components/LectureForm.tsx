// src/components/LectureForm.tsx
import React, { useState } from 'react';

interface Props {
  courseId: string;
  onAdd: (lecture: { courseId: string; title: string; description?: string }) => void;
}

const LectureForm: React.FC<Props> = ({ courseId, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const trimmedDesc = description.trim();
    onAdd({ courseId, title: trimmedTitle, description: trimmedDesc || undefined });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="lecture-form">
      <input
        type="text"
        placeholder="Название лекции"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Описание (опц.)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {/* Кнопка «A» */}
      <button type="submit" className="submit-btn" title="Добавить лекцию">
      A
     </button>
    </form>
  );
};

export default LectureForm;
