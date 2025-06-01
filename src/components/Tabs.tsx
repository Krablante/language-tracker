// src/components/Tabs.tsx
import React from 'react';
import { Language } from '../types';

interface TabsProps {
  active: Language;
  onChange: (lang: Language) => void;
}

const TABS: { key: Language; label: string }[] = [
  { key: 'eng', label: 'ENGLISH' },
  { key: 'fr',  label: 'FRANÇAIS' },
];

const Tabs: React.FC<TabsProps> = ({ active, onChange }) => (
  <div className="tabs">
    {TABS.map(({ key, label }) => (
      <button
        key={key}
        className={`tab ${active === key ? 'tab--active' : ''}`}
        onClick={() => onChange(key)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default Tabs;
