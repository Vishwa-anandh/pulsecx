import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, Terminal, ShieldAlert, Users, Settings, User, PanelLeftClose, PanelLeftOpen, Route, MonitorPlay, Bell, Network, ShieldCheck, Smartphone, BarChart2, Sun, Moon, Search, Shield, Server, FileText, Key } from 'lucide-react';
import NotificationPopup from './NotificationPopup';
import { useNotifications } from '../context/NotificationContext';
import { useUsers } from '../context/UserContext';

export default function Sidebar({ setIsSearchOpen }) {
  const navigate = useNavigate();
  const { currentUser } = useUsers();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const toggleSidebar = (state) => {
    setIsCollapsed(state);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(state));
  };

  const { unreadCount } = useNotifications();

  const renderNotificationButton = (isCollapsedView) => (
    <div style={{ position: 'relative' }}>
      <button 
        className="btn-ghost tooltip-container" 
        onClick={() => setNotificationOpen(!notificationOpen)} 
        style={{ 
           padding: isCollapsedView ? 0 : '0.2rem', 
           width: isCollapsedView ? '40px' : 'auto',
           height: isCollapsedView ? '40px' : 'auto',
           display: 'flex', 
           justifyContent: 'center', 
           alignItems: 'center', 
           border: 'none', 
           borderRadius: '50%',
           transition: 'background-color 0.2s',
           background: notificationOpen ? 'var(--bg-surface-hover)' : 'transparent',
           margin: isCollapsedView ? '0 auto' : 0
        }} 
        data-tooltip="Notifications"
      >
        <Bell size={16} color="var(--text-muted)" />
        {unreadCount > 0 && (
          <div style={{ position: 'absolute', top: isCollapsedView ? '8px' : '2px', right: isCollapsedView ? '8px' : '-2px', width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%', border: '2px solid var(--bg-base)' }} />
        )}
      </button>
      {notificationOpen && <NotificationPopup onClose={() => setNotificationOpen(false)} />}
    </div>
  );

  const navItems = [
    { name: 'Overview', path: '/', icon: <LayoutDashboard size={16} /> },
    { name: 'Operations', path: '/operations', icon: <Activity size={16} /> },
    { name: 'Engineering', path: '/engineering', icon: <Terminal size={16} /> },
    { name: 'Customer Journeys', path: '/journeys', icon: <Route size={16} /> },
    { name: 'Monitoring', path: '/monitoring', icon: <MonitorPlay size={16} /> },
    { name: 'APIs', path: '/api', icon: <Network size={16} /> },
    { name: 'SSL & DNS', path: '/ssl-dns', icon: <ShieldCheck size={16} /> },
    { name: 'Mobile App', path: '/mobile', icon: <Smartphone size={16} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={16} /> },
  ];

  const secondaryItems = [
    { name: 'Alerts', path: '/alerts', icon: <Bell size={16} /> },
    { name: 'Incidents', path: '/incidents', icon: <ShieldAlert size={16} /> },
  ];

  const adminItems = [
    { name: 'User Management', path: '/administration/users', icon: <Users size={16} /> },
    { name: 'Team Management', path: '/administration/teams', icon: <Shield size={16} /> },
    { name: 'Integrations', path: '/administration/integrations', icon: <Network size={16} /> },
    { name: 'Monitoring Agents', path: '/administration/agents', icon: <Server size={16} /> },
    { name: 'Audit Logs', path: '/administration/audit', icon: <FileText size={16} /> },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{ height: '100%', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`} style={{ marginBottom: '2rem', padding: isCollapsed ? '0' : '0 0.5rem' }}>
        <div className="flex items-center gap-2" style={{ overflow: 'hidden' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', flexShrink: 0, transition: 'transform 0.5s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(10deg) scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}>
            <img src="/favicon.svg" alt="Logo" style={{ width: '18px', height: '18px' }} />
          </div>
          {!isCollapsed && <h2 style={{ margin: 0, letterSpacing: '-0.04em', opacity: 1, transition: 'opacity 0.2s' }}>pulse<span className="text-gradient">CX</span></h2>}
        </div>
        {!isCollapsed && (
          <div className="flex items-center gap-1">
            {renderNotificationButton(false)}
            <button className="btn-ghost tooltip-container" onClick={() => toggleSidebar(true)} aria-label="Collapse Sidebar" style={{ padding: '0.2rem', display: 'flex', border: 'none', borderRadius: '50%', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'} data-tooltip="Collapse Sidebar">
              <PanelLeftClose size={16} color="var(--text-muted)" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {isCollapsed && (
        <div className="flex-col items-center gap-2" style={{ marginBottom: '1.5rem', display: 'flex' }}>
          <button className="btn-ghost tooltip-container" onClick={() => toggleSidebar(false)} aria-label="Expand Sidebar" style={{ padding: 0, width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', borderRadius: '50%', margin: '0 auto' }} data-tooltip="Expand Sidebar">
            <PanelLeftOpen size={16} color="var(--text-muted)" aria-hidden="true" />
          </button>
          {renderNotificationButton(true)}
        </div>
      )}

      <div className="sidebar-scroll" style={{ flex: 1, overflowY: isCollapsed ? 'hidden' : 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {!isCollapsed && (
          <div style={{ marginBottom: '0.5rem', padding: '0 0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.08em' }}>
            Dashboards
          </div>
        )}
        <nav className="flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link tooltip-container ${isActive ? 'active' : ''}`}
              data-tooltip={isCollapsed ? item.name : undefined}
              style={{ 
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                ...(isCollapsed ? { width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, padding: 0, margin: '0.2rem auto', borderRadius: '50%', alignSelf: 'center' } : {})
              }}
            >
              <div style={{ flexShrink: 0, display: 'flex' }}>{React.cloneElement(item.icon, { color: 'currentcolor' })}</div>
              {!isCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
        
        {!isCollapsed && (
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)', margin: '1rem 0.5rem', opacity: 0.5 }}></div>
        )}

        {!isCollapsed && (
          <div style={{ marginBottom: '0.5rem', padding: '0 0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.08em' }}>
            Management
          </div>
        )}
        <nav className="flex-col gap-1">
          {secondaryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link tooltip-container ${isActive ? 'active' : ''}`}
              data-tooltip={isCollapsed ? item.name : undefined}
              style={{ 
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                ...(isCollapsed ? { width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, padding: 0, margin: '0.2rem auto', borderRadius: '50%', alignSelf: 'center' } : {})
              }}
            >
              <div style={{ flexShrink: 0, display: 'flex' }}>{React.cloneElement(item.icon, { color: 'currentcolor' })}</div>
              {!isCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {!isCollapsed && (
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)', margin: '1rem 0.5rem', opacity: 0.5 }}></div>
        )}

        {!isCollapsed && (
          <div style={{ marginBottom: '0.5rem', padding: '0 0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.08em' }}>
            Administration
          </div>
        )}
        <nav className="flex-col gap-1">
          {adminItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link tooltip-container ${isActive ? 'active' : ''}`}
              data-tooltip={isCollapsed ? item.name : undefined}
              style={{ 
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                ...(isCollapsed ? { width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', flexShrink: 0, padding: 0, margin: '0.2rem auto', borderRadius: '50%', alignSelf: 'center' } : {})
              }}
            >
              <div style={{ flexShrink: 0, display: 'flex' }}>{React.cloneElement(item.icon, { color: 'currentcolor' })}</div>
              {!isCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: isCollapsed ? '1.5rem 0' : 'var(--panel-padding)', position: 'relative' }}>
        {profileMenuOpen && (
          <div className="animate-fade-in" style={{ position: 'absolute', bottom: '100%', left: '1rem', right: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '0.5rem', boxShadow: 'var(--shadow-lg)', zIndex: 100, marginBottom: '0.5rem' }}>
            <div className="hover-bg-surface-hover" style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.8125rem' }} onClick={() => { setProfileMenuOpen(false); navigate('/settings/profile'); }}>Your Profile</div>
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.25rem 0' }} />
            <div className="hover-bg-surface-hover" style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--accent-danger)' }} onClick={() => { setProfileMenuOpen(false); navigate('/login'); }}>Log out</div>
          </div>
        )}
        <div className="flex items-center gap-2 tooltip-container" style={{ 
          padding: isCollapsed ? '0' : '0.5rem', 
          width: isCollapsed ? '40px' : 'auto', 
          height: isCollapsed ? '40px' : 'auto', 
          margin: isCollapsed ? '0 auto' : '0', 
          borderRadius: 'var(--radius-full)', 
          background: 'var(--bg-surface)', 
          cursor: 'pointer', 
          border: '1px solid var(--border-color)', 
          justifyContent: isCollapsed ? 'center' : 'flex-start', 
          transition: 'background-color 0.2s, box-shadow 0.2s', 
          boxShadow: 'var(--shadow-sm)' 
        }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'} data-tooltip={isCollapsed ? (currentUser?.name || "Guest") : undefined} onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--border-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
            <User size={16} color="var(--text-primary)" />
          </div>
          {!isCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden' }}>{currentUser?.name || "Guest"}</span>
              {currentUser?.role && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>{currentUser.role}</span>}
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.65rem', fontWeight: '700', color: 'var(--accent-danger)', opacity: 0.8 }}>
            Powered by <img src="/maitsys-logo.png" alt="maitsys" style={{ height: '12px', objectFit: 'contain' }} />
          </div>
        )}
      </div>
    </aside>
  );
}
