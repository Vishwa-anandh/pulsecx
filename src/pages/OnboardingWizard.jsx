import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const { setCurrentUser } = useUsers();
  const [step, setStep] = useState('signup');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (name.trim().length < 2) newErrors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (workspace.trim().length < 2) newErrors.workspace = "Please enter a workspace name.";
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validate()) {
      setStep('otp');
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (otp.join('').length === 6) {
      setCurrentUser({ name, email, workspace, isDemo: false, isNewUser: true });
      navigate('/');
    } else {
      setErrors({ otp: "Please enter the 6-digit code." });
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrors({});
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#ffffff', color: '#000000', margin: 0, padding: 0, overflow: 'hidden', fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif' }}>
      
      {/* Left Pane (Image and Quote) - Exact match to LoginPage */}
      <div style={{ 
        flex: 1, 
        margin: '1rem', 
        borderRadius: '1.5rem', 
        background: 'linear-gradient(135deg, #0f172a 0%, #000000 100%)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        padding: '3rem',
        color: '#ffffff',
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
          backgroundColor: '#000000',
          borderRadius: '1.5rem',
          border: '10px solid #1e293b',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), -10px 0 30px rgba(0, 0, 0, 0.5)',
          transform: 'translateY(-50%) perspective(1200px) rotateY(-18deg) rotateX(12deg) rotateZ(-4deg)',
          overflow: 'hidden',
          zIndex: 1,
          transition: 'transform 0.5s ease'
        }}>
          {/* Tablet Screen inner shadow/glare effect */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)', zIndex: 2, pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', top: '-50%', left: '-50%', right: '-50%', bottom: '50%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)', transform: 'rotate(30deg)', zIndex: 2, pointerEvents: 'none' }}></div>
          
          <img src="/banner.png" alt="pulseCX App Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top' }} />
        </div>

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>pulseCX Platform</span>
          <div style={{ height: '1px', width: '40px', backgroundColor: '#ffffff', opacity: 0.5 }}></div>
        </div>

        {/* Bottom Text */}
        <div style={{ zIndex: 2 }}>
          <h1 style={{ 
            fontSize: '4rem', 
            lineHeight: '1.1', 
            fontWeight: '600', 
            marginBottom: '1rem',
            maxWidth: '500px',
            background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            Monitor.<br/>Analyze.<br/>Resolve.
          </h1>
          <p style={{ 
            fontSize: '0.9rem', 
            lineHeight: '1.6', 
            opacity: 0.9, 
            maxWidth: '350px',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
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
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.5rem', color: '#000000' }}>
              {step === 'signup' ? 'Create Account' : 'Verify Email'}
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#666666' }}>
              {step === 'signup' ? 'Set up your new workspace in seconds.' : `We sent a 6-digit code to ${email}.`}
            </p>
          </div>

          {step === 'signup' ? (
            <form onSubmit={handleSignup} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} noValidate>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333333' }}>Full name</label>
                  <input type="text" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)}
                    style={{ padding: '0.875rem 1rem', backgroundColor: '#f4f4f5', border: errors.name ? '1px solid #ef4444' : '1px solid transparent', borderRadius: '0.75rem', fontSize: '0.9rem', color: '#000000', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = '#000000'} onBlur={(e) => e.target.style.borderColor = errors.name ? '#ef4444' : 'transparent'} />
                  {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.name}</span>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="workspace" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333333' }}>Workspace</label>
                  <input type="text" id="workspace" placeholder="Acme Corp" value={workspace} onChange={(e) => setWorkspace(e.target.value)}
                    style={{ padding: '0.875rem 1rem', backgroundColor: '#f4f4f5', border: errors.workspace ? '1px solid #ef4444' : '1px solid transparent', borderRadius: '0.75rem', fontSize: '0.9rem', color: '#000000', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = '#000000'} onBlur={(e) => e.target.style.borderColor = errors.workspace ? '#ef4444' : 'transparent'} />
                  {errors.workspace && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.workspace}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333333' }}>Work email</label>
                <input type="email" id="email" placeholder="john@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '0.875rem 1rem', backgroundColor: '#f4f4f5', border: errors.email ? '1px solid #ef4444' : '1px solid transparent', borderRadius: '0.75rem', fontSize: '0.9rem', color: '#000000', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'} onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : 'transparent'} />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.email}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333333' }}>Password</label>
                <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                  style={{ padding: '0.875rem 1rem', backgroundColor: '#f4f4f5', border: errors.password ? '1px solid #ef4444' : '1px solid transparent', borderRadius: '0.75rem', fontSize: '0.9rem', color: '#000000', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#000000'} onBlur={(e) => e.target.style.borderColor = errors.password ? '#ef4444' : 'transparent'} />
                {errors.password && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.password}</span>}
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '0.875rem', backgroundColor: 'var(--accent-primary)', color: '#ffffff', border: 'none', borderRadius: '0.75rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Create Workspace
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpVerify} style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} noValidate>
              <div style={{ cursor: 'pointer', color: '#666666', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '-0.5rem' }} onClick={() => setStep('signup')}>
                &larr; Back
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    style={{ width: '3rem', height: '3.5rem', fontSize: '1.5rem', textAlign: 'center', fontWeight: '600', border: errors.otp ? '1px solid #ef4444' : '1px solid transparent', borderRadius: '0.5rem', outline: 'none', backgroundColor: '#f4f4f5', color: '#000000', transition: 'border-color 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = '#000000'}
                    onBlur={(e) => e.target.style.borderColor = errors.otp ? '#ef4444' : 'transparent'}
                  />
                ))}
              </div>
              {errors.otp && <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center', marginTop: '-0.5rem' }}>{errors.otp}</p>}

              <button
                type="submit"
                style={{ width: '100%', backgroundColor: 'var(--accent-primary)', color: '#fff', fontWeight: '600', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', transition: 'opacity 0.2s', cursor: 'pointer', fontSize: '0.9rem' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Verify Email
              </button>

              <div style={{ textAlign: 'center', color: '#666666', fontSize: '0.875rem' }}>
                Didn't receive the code?{" "}
                <span style={{ color: '#000000', fontWeight: '600', cursor: 'pointer' }}>Resend</span>
              </div>
            </form>
          )}

        </div>

        {/* Bottom Sign In Link */}
        {step === 'signup' && (
          <div style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center', fontSize: '0.875rem', color: '#666666' }}>
            Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#000000', fontWeight: '700', cursor: 'pointer' }}>Sign In</span>
          </div>
        )}

      </div>
    </div>
  );
}
