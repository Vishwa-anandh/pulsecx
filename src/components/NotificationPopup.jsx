import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, AtSign, Info, Check, X } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationPopup({ onClose }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState('all'); // 'all' or 'mentions'
  const navigate = useNavigate();

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'mentions') return n.type === 'mention';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle size={16} className="text-danger" />;
      case 'mention': return <AtSign size={16} className="text-primary" />;
      case 'system': return <Info size={16} className="text-accent" />;
      default: return <Bell size={16} className="text-muted" />;
    }
  };

  const getRelativeTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleNotificationClick = (n) => {
    markAsRead(n.id);
    navigate(n.link);
    onClose();
  };

  return (
    <div className="animate-fade-in glass-panel" style={{ 
      position: 'absolute', 
      top: 0, 
      left: '100%', 
      marginLeft: '15px',
      width: '420px', 
      display: 'flex', 
      flexDirection: 'column', 
      zIndex: 1000,
      boxShadow: '0 12px 36px rgba(0,0,0,0.15), 0 0 0 1px var(--border-color)',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--panel-padding)', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Notifications
          {unreadCount > 0 && (
            <span className="badge badge-primary" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
              {unreadCount} new
            </span>
          )}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn-ghost" 
            style={{ fontSize: '0.75rem', padding: '0.3rem', color: 'var(--text-secondary)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={markAllAsRead}
            title="Mark all as read"
          >
            <Check size={16} />
          </button>
          <button className="btn-ghost" style={{ padding: '0.3rem', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose} title="Close">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 'var(--panel-gap)', padding: '0 1rem', borderBottom: '1px solid var(--border-color)' }}>
        <button 
          className={`btn-ghost ${filter === 'all' ? 'text-primary' : 'text-muted'}`}
          style={{ padding: '0.75rem 0.5rem', border: 'none', borderBottom: filter === 'all' ? '2px solid var(--accent-primary)' : '2px solid transparent', borderRadius: 0, background: 'transparent' }}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`btn-ghost ${filter === 'mentions' ? 'text-primary' : 'text-muted'}`}
          style={{ padding: '0.75rem 0.5rem', border: 'none', borderBottom: filter === 'mentions' ? '2px solid var(--accent-primary)' : '2px solid transparent', borderRadius: 0, background: 'transparent' }}
          onClick={() => setFilter('mentions')}
        >
          Mentions
        </button>
      </div>

      {/* Notification List */}
      <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--panel-gap)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={24} className="text-muted" />
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>You're all caught up!</div>
          </div>
        ) : (
          filteredNotifications.map(n => (
            <div 
              key={n.id}
              className="hover-bg-surface-hover"
              style={{ 
                display: 'flex', 
                gap: 'var(--panel-gap)', 
                padding: 'var(--panel-padding)', 
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                background: n.read ? 'transparent' : 'var(--bg-surface-hover)'
              }}
              onClick={() => handleNotificationClick(n)}
            >
              <div style={{ marginTop: '0.2rem', position: 'relative', flexShrink: 0 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-base)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getIcon(n.type)}
                </div>
                {!n.read && (
                  <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', background: 'var(--accent-primary)', borderRadius: '50%', border: '2px solid var(--bg-surface)' }} />
                )}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: n.read ? '500' : '600', fontSize: '0.875rem', color: 'var(--text-primary)', wordBreak: 'break-word' }}>{n.title}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '0.5rem', flexShrink: 0 }}>{getRelativeTime(n.timestamp)}</span>
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.4', wordBreak: 'break-word' }}>{n.message}</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Footer */}
      <div style={{ padding: '0.75rem', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
        <button 
          className="btn-ghost" 
          style={{ fontSize: '0.8125rem', color: 'var(--accent-primary)', width: '100%', justifyContent: 'center', border: 'none' }}
          onClick={() => { navigate('/settings/notifications'); onClose(); }}
        >
          Notification Settings
        </button>
      </div>

    </div>
  );
}
