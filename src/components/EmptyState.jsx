import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({ title, description, actionText, onAction }) {
  return (
    <div className="flex-col items-center justify-center animate-fade-in" style={{ padding: '4rem 1rem', textAlign: 'center', height: '100%', minHeight: '200px', flex: 1 }}>
      <div style={{ padding: '1.5rem', background: 'var(--bg-surface-hover)', borderRadius: '50%', marginBottom: '1rem', display: 'inline-flex', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
        <SearchX size={32} color="var(--text-muted)" />
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: '280px', marginBottom: '1.5rem', lineHeight: '1.5' }}>{description}</p>
      {actionText && onAction && (
        <button className="btn btn-primary" onClick={onAction}>{actionText}</button>
      )}
    </div>
  );
}
