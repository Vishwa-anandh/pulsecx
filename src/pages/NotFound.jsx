import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in" style={{ padding: 'var(--panel-padding)' }}>
      <div className="glass-panel text-center" style={{ padding: 'var(--panel-padding)', maxWidth: '400px', width: '100%' }}>
        <div style={{ animation: 'pulse-dot 2s infinite' }}>
          <AlertTriangle size={64} className="mx-auto mb-4" style={{ color: 'var(--accent-warning)' }} />
        </div>
        <h1 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>404</h1>
        <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>The page you are looking for does not exist, has been moved, or you lack permissions.</p>
        <button className="btn-primary flex items-center justify-center gap-2 w-full" onClick={() => navigate('/')}>
          <Home size={16} />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
