import React, { useState, useEffect } from 'react';
import { useSetup } from '../SetupContext';
import { Play, Loader2, CheckCircle2 } from 'lucide-react';

export default function Step9TestRun() {
  const { setupData, nextStep, prevStep } = useSetup();
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);

  const stepsToTest = setupData.journeySteps.length > 0 
    ? setupData.journeySteps 
    : [{ action: 'Open URL', name: setupData.websiteUrl || 'https://example.com' }];

  const runTest = () => {
    setIsRunning(true);
    setCompletedSteps(0);
  };

  useEffect(() => {
    if (isRunning && completedSteps < stepsToTest.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => prev + 1);
      }, 1500); // 1.5s per simulated step
      return () => clearTimeout(timer);
    } else if (isRunning && completedSteps === stepsToTest.length) {
      setTimeout(() => {
        setIsRunning(false);
        nextStep(); // auto proceed to results
      }, 1000);
    }
  }, [isRunning, completedSteps, stepsToTest.length, nextStep]);

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Test Journey</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Execute your synthetic transaction to verify everything works.</p>
        </div>

        {!isRunning && completedSteps === 0 ? (
          <button 
            onClick={runTest}
            style={{ 
              width: '120px', height: '120px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, #a855f7 100%)',
              border: 'none', color: 'white', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)', transition: 'transform 0.2s', gap: '0.5rem'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Play size={40} fill="currentColor" />
            <span style={{ fontWeight: '600' }}>Run Now</span>
          </button>
        ) : (
          <div className="glass-panel" style={{ width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stepsToTest.map((step, idx) => {
              const isActive = isRunning && completedSteps === idx;
              const isDone = completedSteps > idx;
              
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', opacity: isDone || isActive ? 1 : 0.5 }}>
                  <div style={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                    {isDone ? <CheckCircle2 size={20} className="text-success" color="#10b981" /> : isActive ? <Loader2 size={20} className="animate-spin text-primary" /> : <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--border-color)' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{step.action}: {step.name}</div>
                    {isActive && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Executing step...</div>}
                    {isDone && <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Success - 1.2s</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start', paddingTop: '2rem', width: '100%' }}>
          <button className="btn btn-ghost" onClick={prevStep} disabled={isRunning}>Back</button>
        </div>
      </div>
    </div>
  );
}
