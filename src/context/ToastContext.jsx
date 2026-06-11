import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', pointerEvents: 'none' }}>
          <TransitionGroup component={null}>
            {toasts.map(toast => (
              <CSSTransition key={toast.id} timeout={300} classNames="row">
                <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', width: '320px', boxShadow: 'var(--shadow-xl)', pointerEvents: 'auto' }}>
                  {toast.type === 'success' ? <CheckCircle size={20} color="var(--accent-success)" /> :
                   toast.type === 'error' ? <AlertCircle size={20} color="var(--accent-danger)" /> :
                   <Info size={20} color="var(--accent-primary)" />}
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', flex: 1, marginTop: '2px' }}>{toast.message}</span>
                  <button onClick={() => removeToast(toast.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }} className="hover:text-text-primary transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
