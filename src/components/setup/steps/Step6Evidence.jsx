import React from 'react';
import { useSetup } from '../SetupContext';
import { Camera, Terminal, Network, Shield, Globe } from 'lucide-react';

export default function Step6Evidence() {
  const { setupData, updateData, nextStep, prevStep } = useSetup();

  const evidenceOptions = [
    { id: 'screenshot', label: 'Screenshot', icon: <Camera size={16} /> },
    { id: 'consoleLogs', label: 'Browser Console Logs', icon: <Terminal size={16} /> },
    { id: 'networkLogs', label: 'Network Logs', icon: <Network size={16} /> },
    { id: 'harFile', label: 'HAR File', icon: <Network size={16} /> },
    { id: 'apiErrors', label: 'API Errors', icon: <Terminal size={16} /> },
    { id: 'dns', label: 'DNS Information', icon: <Globe size={16} /> },
    { id: 'ssl', label: 'SSL Information', icon: <Shield size={16} /> }
  ];
  const toggleEvidence = (id) => {
    updateData({
      evidenceCapture: {
        ...setupData.evidenceCapture,
        [id]: !setupData.evidenceCapture[id]
      }
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Configure Evidence Capture</h1>
          <p style={{ color: 'var(--text-secondary)' }}>What diagnostics should be collected when a failure occurs?</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {evidenceOptions.map(opt => {
            const isSelected = setupData.evidenceCapture[opt.id];
            return (
              <div 
                key={opt.id}
                onClick={() => toggleEvidence(opt.id)}
                style={{ 
                  padding: '1rem', 
                  background: isSelected ? 'var(--accent-primary-glow)' : 'var(--bg-base)', 
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <input type="checkbox" checked={isSelected} readOnly style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px', cursor: 'pointer' }} />
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {opt.icon} {opt.label}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '2rem' }}>
          <button className="btn btn-ghost" onClick={prevStep}>Back</button>
          <button className="btn btn-primary" onClick={nextStep}>Save & Continue</button>
        </div>
      </div>
    </div>
  );
}
