// src/components/LecturesList.tsx
import React, { useState } from 'react';
import { Lecture } from '../types';

interface Props {
  entries: Lecture[];
  onRemove: (id: string) => void;
}

const LecturesList: React.FC<Props> = ({ entries, onRemove }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedIds(newSet);
  };

  if (entries.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '0.5rem', opacity: 0.6 }}>Нет лекций</div>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
      {entries.map(e => (
        <li key={e.id} className="lecture-item">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => toggleExpand(e.id)}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginRight: '0.5rem', fontSize: '1rem' }}
              title={expandedIds.has(e.id) ? 'Скрыть описание' : 'Показать описание'}
            >
              ℹ️
            </button>
            <span style={{ flex: 1 }}>{e.title}</span>
            <button
              onClick={() => onRemove(e.id)}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#e74c3c', fontSize: '1.2rem' }}
              title="Удалить лекцию"
            >
              ×
            </button>
          </div>
          {expandedIds.has(e.id) && e.description && (
            <div style={{ marginTop: '0.5rem', paddingLeft: '0rem', color: '#DCDCDC', fontSize: '0.9rem' }}>
              {e.description}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default LecturesList;
