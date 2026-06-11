import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, LayoutDashboard, Activity, Route, MonitorPlay, ShieldAlert, Terminal, Users, Settings } from 'lucide-react';

const searchableItems = [
  { id: '1', title: 'Executive Overview', path: '/', category: 'Dashboards', icon: <LayoutDashboard size={14} /> },
  { id: '2', title: 'Operations Dashboard', path: '/operations', category: 'Dashboards', icon: <Activity size={14} /> },
  { id: '3', title: 'Customer Journeys', path: '/journeys', category: 'Features', icon: <Route size={14} /> },
  { id: '4', title: 'Live Monitoring', path: '/monitoring', category: 'Features', icon: <MonitorPlay size={14} /> },
  { id: '5', title: 'Active Incidents', path: '/incidents', category: 'Alerts', icon: <ShieldAlert size={14} /> },
  { id: '6', title: 'API Latency Spike Incident', path: '/operations', category: 'Recent Searches', icon: <Terminal size={14} /> },
  { id: '7', title: 'Customer Checkout Journey', path: '/journeys', category: 'Recent Searches', icon: <Route size={14} /> },
  { id: '8', title: 'Team Directory', path: '/team', category: 'Management', icon: <Users size={14} /> },
  { id: '9', title: 'Platform Settings', path: '/settings', category: 'Management', icon: <Settings size={14} /> }
];

export default function SearchModal({ isOpen, onClose }) {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const filteredItems = searchQuery 
    ? searchableItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchableItems.filter(item => item.category === 'Recent Searches');

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === 'Enter' && filteredItems.length > 0) {
        e.preventDefault();
        navigate(filteredItems[selectedIndex].path);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex, navigate]);

  if (!isOpen) {
    if (searchQuery !== '') setSearchQuery('');
    return null;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10vh', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="animate-fade-in"
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          background: 'var(--bg-surface)', 
          borderRadius: 'var(--radius-lg)', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: 'var(--panel-padding)', borderBottom: '1px solid var(--border-color)' }}>
          <Search size={20} color="var(--text-muted)" style={{ marginRight: '1rem' }} />
          <input 
            ref={inputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dashboards, incidents, or commands..." 
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '1.125rem', color: 'var(--text-primary)' }}
          />
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}>
            <X size={20} color="var(--text-muted)" />
          </button>
        </div>
        <div style={{ padding: 'var(--panel-padding)', maxHeight: '60vh', overflowY: 'auto' }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--panel-padding)', color: 'var(--text-muted)' }}>
              No results found for "{searchQuery}"
            </div>
          ) : (
            <>
              {!searchQuery && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Recent Searches</div>}
              {searchQuery && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Results</div>}
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id}
                  onClick={() => { navigate(item.path); onClose(); }}
                  style={{ 
                    padding: '0.75rem 1rem', 
                    margin: '0 -1rem', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    color: 'var(--text-primary)',
                    background: index === selectedIndex ? 'var(--bg-surface-hover)' : 'transparent',
                    borderLeft: index === selectedIndex ? '3px solid var(--accent-primary)' : '3px solid transparent'
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div style={{ color: index === selectedIndex ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                    {item.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.9375rem', fontWeight: index === selectedIndex ? '600' : '500' }}>{item.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.category}</span>
                  </div>
                  {index === selectedIndex && (
                    <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>↵ to jump</span>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
