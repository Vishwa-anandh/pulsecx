import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Sun, Moon } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = React.useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="header">
      <div className="flex items-center gap-4" style={{ flex: 1 }}>
        <div style={{ position: 'relative', width: '15rem', transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, incidents..." 
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 1rem 0.35rem 2rem',
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              outline: 'none',
              transition: 'border-color 0.2s ease, background-color 0.3s ease, width 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease'}}
            onFocus={(e) => {
              setSearchOpen(true);
              e.target.style.borderColor = 'var(--accent-primary)';
              e.target.parentElement.style.width = '17.5rem';
              e.target.style.boxShadow = '0 0 0 3px var(--accent-primary-glow)';
            }}
            onBlur={(e) => {
              // Delay closing to allow clicking dropdown items
              setTimeout(() => setSearchOpen(false), 200);
              e.target.style.borderColor = 'var(--border-color)';
              e.target.parentElement.style.width = '15rem';
              e.target.style.boxShadow = 'none';
            }}
          />
          <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.1rem 0.3rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600', pointerEvents: 'none', borderBottom: '2px solid var(--border-color)' }}>
            ⌘K
          </div>
          
          {searchOpen && (
            <div className="animate-fade-in" style={{ position: 'absolute', top: '120%', left: 0, width: '25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 100, overflow: 'hidden' }}>
              {!searchQuery ? (
                <div style={{ padding: '0.5rem' }}>
                  <div style={{ padding: '0.5rem', fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)'}}>Recent Searches</div>
                  <div className="hover-bg-surface-hover" onClick={() => { navigate('/journeys'); setSearchOpen(false); }} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8125rem' }}>E-commerce Checkout Flow</div>
                  <div className="hover-bg-surface-hover" onClick={() => { navigate('/operations'); setSearchOpen(false); }} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8125rem' }}>Auth Service Latency</div>
                  <div className="hover-bg-surface-hover" onClick={() => { navigate('/settings'); setSearchOpen(false); }} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8125rem' }}>API Gateway Settings</div>
                </div>
              ) : (
                <div style={{ padding: '0.5rem' }}>
                  <div style={{ padding: '0.5rem', fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)'}}>Dashboards</div>
                  <div className="hover-bg-surface-hover" onClick={() => { navigate('/monitoring'); setSearchOpen(false); setSearchQuery(''); }} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--accent-primary)' }}>Go to Monitoring Dashboard</div>
                  <div className="hover-bg-surface-hover" onClick={() => { navigate('/journeys'); setSearchOpen(false); setSearchQuery(''); }} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--accent-primary)' }}>Go to Customer Journeys</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Removed right side icons based on user feedback */}
      <div></div>
    </header>
  );
}
