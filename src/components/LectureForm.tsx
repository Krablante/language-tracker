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
    <form onSubmit={handleSubmit} className="lecture-form" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
      <input
        type="text"
        placeholder="Название лекции"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Описание (опц.)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', border: 'none', background: '#2ecc71', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
        +
      </button>
    </form>
  );
};

export default LectureForm;
