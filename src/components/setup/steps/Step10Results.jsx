import React from 'react';
import { useSetup } from '../SetupContext';
import { CheckCircle, Clock, Camera, Terminal } from 'lucide-react';

export default function Step10Results() {
  const { nextStep, prevStep } = useSetup();

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <CheckCircle size={28} color="#10b981" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Execution Results</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Your journey completed successfully in 3.4 seconds.</p>
        </div>

        <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Success Rate</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>100%</div>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Duration</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3.4s</div>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Screenshots</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Captured</div>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Logs</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Saved</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)' }}>
          <Camera size={32} className="text-muted" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Screenshots and detailed HAR waterfall would appear here.</p>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '2rem' }}>
          <button className="btn btn-ghost" onClick={prevStep}>Run Again</button>
          <button className="btn btn-primary" onClick={nextStep}>Continue to Activate</button>
        </div>
      </div>
    </div>
  );
}
