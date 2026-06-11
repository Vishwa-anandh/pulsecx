import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    navigate('/');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-base" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-success) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(80px)' }}></div>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: '0.5rem' }}>
            <Activity color="#fff" size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
            pulseCX
          </span>
        </div>

        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '2rem', textAlign: 'center' }}>Enter your credentials to access your workspace.</p>

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="flex-col gap-1">
            <label style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={16} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pulsecx.com"
                required
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>

          <div className="flex-col gap-1">
            <div className="flex justify-between">
              <label style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Password</label>
              <a href="#" style={{ fontSize: '0.8125rem', color: 'var(--accent-primary)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={16} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            Sign In <ArrowRight size={16} />
          </button>
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <span onClick={() => navigate('/setup')} style={{ color: 'var(--text-primary)', fontWeight: '500', textDecoration: 'none', cursor: 'pointer' }}>Create account</span>
        </p>
      </div>
    </div>
  );
}
