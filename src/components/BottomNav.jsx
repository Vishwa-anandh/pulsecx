import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Terminal, Route, Menu, X, ShieldAlert, Users, Settings, User, MonitorPlay, Network, ShieldCheck, Smartphone, BarChart2 } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function BottomNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      menuRef.current.focus();
    } else if (!isMenuOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Overview', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Operations', path: '/operations', icon: <Activity size={20} /> },
    { name: 'Engineering', path: '/engineering', icon: <Terminal size={20} /> },
    { name: 'Journeys', path: '/journeys', icon: <Route size={20} /> },
    { name: 'Monitoring', path: '/monitoring', icon: <MonitorPlay size={20} /> },
  ];

  const extraDashboards = [
    { name: 'APIs', path: '/api', icon: <Network size={20} /> },
    { name: 'SSL & DNS', path: '/ssl-dns', icon: <ShieldCheck size={20} /> },
    { name: 'Mobile App', path: '/mobile', icon: <Smartphone size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
  ];

  const secondaryItems = [
    { name: 'Incidents', path: '/incidents', icon: <ShieldAlert size={20} /> },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const [touchStartY, setTouchStartY] = useState(0);
  const [touchCurrentY, setTouchCurrentY] = useState(0);

  const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);
  const handleTouchMove = (e) => setTouchCurrentY(e.touches[0].clientY);
  const handleTouchEnd = () => {
    if (touchCurrentY - touchStartY > 50) setIsMenuOpen(false); // swipe down threshold
    setTouchStartY(0);
    setTouchCurrentY(0);
  };

  return (
    <>
      <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <div className="bottom-nav-icon">
            {React.cloneElement(item.icon, { color: 'currentcolor' })}
          </div>
          <span className="bottom-nav-label">{item.name}</span>
        </NavLink>
      ))}
      <button 
        ref={triggerRef}
        className={`bottom-nav-item ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu-overlay"
        aria-label="More Options Menu"
      >
        <div className="bottom-nav-icon">
          <Menu size={20} />
        </div>
        <span className="bottom-nav-label">Menu</span>
      </button>
    </nav>

    {/* Mobile Menu Overlay */}
    {isMenuOpen && createPortal(
      <div id="mobile-menu-overlay" className="mobile-menu-overlay animate-fade-in" onClick={() => setIsMenuOpen(false)}>
        <div 
          ref={menuRef}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-label="More Options"
          className="mobile-menu-sheet" 
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ 
            transform: `translateY(${Math.max(0, touchCurrentY - touchStartY)}px)`,
            transition: touchStartY ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none'
          }}
        >
          <div className="flex justify-between items-center" style={{ padding: 'var(--panel-padding)', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '4px', background: 'var(--border-color)', borderRadius: '2px', position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)' }} />
              <h3 style={{ margin: 0, marginTop: '12px' }}>More Options</h3>
            </div>
            <button className="btn-icon" style={{ marginTop: '12px' }} onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
          </div>
          
          <div className="flex-col" style={{ padding: '0.5rem', overflowY: 'auto' }}>
            <div style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)'}}>Dashboards</div>
            {extraDashboards.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                style={{ padding: 'var(--panel-padding)', fontSize: '1rem' }}
              >
                {React.cloneElement(item.icon, { color: 'currentcolor' })}
                <span>{item.name}</span>
              </NavLink>
            ))}
            
            <div style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Management</div>
            {secondaryItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
                style={{ padding: 'var(--panel-padding)', fontSize: '1rem' }}
              >
                {React.cloneElement(item.icon, { color: 'currentcolor' })}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div style={{ padding: 'var(--panel-padding)', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
            <div className="flex items-center gap-3" style={{ padding: 'var(--panel-padding)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--border-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="var(--text-primary)" />
              </div>
              <div className="flex-col">
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Admin User</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Workspace Owner</span>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
