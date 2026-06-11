import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import SearchModal from './SearchModal';
import AIChatBot from './AIChatBot';

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  // Global hotkey
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <div className="dashboard-layout" style={{ position: 'relative' }}>
      {/* Ambient Translucent Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '40%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
      
      <a href="#main-content" className="skip-link" style={{ zIndex: 100 }}>Skip to main content</a>
      <Sidebar setIsSearchOpen={setIsSearchOpen} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <main className="main-content" id="main-content" tabIndex="-1" style={{ outline: 'none', transition: 'padding-right 0.3s ease', paddingRight: isChatOpen ? '400px' : '0' }}>
        <div className="scroll-wrapper">
          <div className="content-area animate-fade-in">
            <Outlet />
          </div>
        </div>
        <BottomNav />
      </main>
      <AIChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
