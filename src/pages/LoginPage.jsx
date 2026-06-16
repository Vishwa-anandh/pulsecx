import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Eye, EyeOff } from 'lucide-react';
import { useUsers } from '../context/UserContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useUsers();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value) => {
    return value.length >= 4;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 4 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      if (email === 'mark.bennet@pulsecx.com') {
        setCurrentUser({ name: 'Mark Bennet', email: 'mark.bennet@pulsecx.com', isDemo: true });
      } else {
        setCurrentUser({ name: 'User', email: email, isDemo: false });
      }
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#ffffff', color: '#000000', margin: 0, padding: 0, overflow: 'hidden', fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif' }}>
      
      {/* Left Pane (Image and Quote) */}
      <div style={{ 
        flex: 1, 
        margin: '1rem', 
        borderRadius: '1.5rem', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        padding: '3rem',
        color: '#0f172a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Tablet Mockup Background */}
        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          width: '90%',
          height: '75%',
          backgroundColor: '#ffffff',
          borderRadius: '1.5rem',
          border: '10px solid #cbd5e1',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), -10px 0 30px rgba(0, 0, 0, 0.05)',
          transform: 'translateY(-50%) perspective(1200px) rotateY(-18deg) rotateX(12deg) rotateZ(-4deg)',
          overflow: 'hidden',
          zIndex: 1,
          transition: 'transform 0.5s ease'
        }}>
          {/* Tablet Screen inner shadow/glare effect */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)', zIndex: 2, pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', top: '-50%', left: '-50%', right: '-50%', bottom: '50%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, transparent 100%)', transform: 'rotate(30deg)', zIndex: 2, pointerEvents: 'none' }}></div>
          
          <img src="/banner.png" alt="pulseCX App Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top' }} />
        </div>

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>pulseCX Platform</span>
          <div style={{ height: '1px', width: '40px', backgroundColor: '#0f172a', opacity: 0.5 }}></div>
        </div>

        {/* Bottom Text */}
        <div style={{ zIndex: 2 }}>
          <h1 style={{ 
            fontSize: '5.5rem', 
            lineHeight: '1.1', 
            fontWeight: '600', 
            marginBottom: '1rem',
            maxWidth: '600px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Monitor.<br/>Analyze.<br/>Resolve.
          </h1>
          <p style={{ 
            fontSize: '0.9rem', 
            lineHeight: '1.6', 
            opacity: 0.8, 
            maxWidth: '350px'
          }}>
            Gain deep visibility into your customer journeys, APIs, and infrastructure. Detect anomalies before your users do.
          </p>
        </div>
      </div>

      {/* Right Pane (Form) */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative'
      }}>
        
        {/* Logo at top center */}
        <div style={{ position: 'absolute', top: '2rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', flexShrink: 0, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <img src="/favicon.svg" alt="pulseCX Logo" style={{ width: '24px', height: '24px' }} />
          </div>
          <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.04em', color: '#000000' }}>
            pulse<span style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text' 
            }}>CX</span>
          </h2>
        </div>

        {/* Main Form Container */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          
          <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.5rem', color: '#000000' }}>Welcome</h2>
            <p style={{ fontSize: '0.9rem', color: '#666666' }}>Enter your email and password to access your account</p>
          </div>

          <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Email Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333333' }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  backgroundColor: '#f4f4f5',
                  border: emailError ? '1px solid #ef4444' : '1px solid transparent',
                  borderRadius: '0.75rem',
                  fontSize: '0.9rem',
                  color: '#000000',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#000000'}
                onBlur={(e) => e.target.style.borderColor = emailError ? '#ef4444' : 'transparent'}
              />
              {emailError && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{emailError}</span>}
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333333' }}>Password</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 1rem',
                    backgroundColor: '#f4f4f5',
                    border: passwordError ? '1px solid #ef4444' : '1px solid transparent',
                    borderRadius: '0.75rem',
                    fontSize: '0.9rem',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'}
                  onBlur={(e) => e.target.style.borderColor = passwordError ? '#ef4444' : 'transparent'}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#666666' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{passwordError}</span>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#333333' }}>
                <input type="checkbox" style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }} />
                Remember me
              </label>
              <span style={{ color: 'var(--accent-primary)', fontWeight: '600', cursor: 'pointer' }}>Forgot Password?</span>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '0.5rem',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Sign In
            </button>

          </form>

          {/* Demo Credentials Box */}
          <div 
            style={{ width: '100%', maxWidth: '400px', marginTop: '2rem', padding: '1rem', border: '1px dashed #cccccc', borderRadius: '0.75rem', backgroundColor: '#f9fafb', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
            onClick={() => {
              setEmail('mark.bennet@pulsecx.com');
              setPassword('admin123');
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.backgroundColor = '#f4f4f5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cccccc'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666666', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>demo credentials</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#000000' }}>mark.bennet@pulsecx.com</div>
                <div style={{ fontSize: '0.875rem', color: '#666666' }}>admin123</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#000000', fontWeight: '600' }}>Click to fill &rarr;</div>
            </div>
          </div>

        </div>

        {/* Bottom Sign Up Link */}
        <div style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center', fontSize: '0.875rem', color: '#666666' }}>
          Don't have an account? <span onClick={() => navigate('/setup')} style={{ color: '#000000', fontWeight: '700', cursor: 'pointer' }}>Sign Up</span>
        </div>

      </div>
    </div>
  );
}
