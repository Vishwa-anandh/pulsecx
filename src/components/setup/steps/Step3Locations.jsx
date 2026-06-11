import React from 'react';
import { useSetup } from '../SetupContext';

export default function Step3Locations() {
  const { setupData, updateData, nextStep, prevStep } = useSetup();

  const locationsList = ['India', 'Singapore', 'London', 'New York', 'Sydney'];
  const frequencies = ['1 Minute', '5 Minutes', '15 Minutes', '30 Minutes', '1 Hour'];

  const toggleLocation = (loc) => {
    const current = setupData.locations;
    if (current.includes(loc)) {
      updateData({ locations: current.filter(l => l !== loc) });
    } else {
      updateData({ locations: [...current, loc] });
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Where should monitoring run?</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Select geographic locations to run your synthetic tests.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', display: 'block' }}>Locations</label>
            <div className="grid grid-cols-2 gap-3">
              {locationsList.map(loc => {
                const isSelected = setupData.locations.includes(loc);
                return (
                  <div 
                    key={loc}
                    onClick={() => toggleLocation(loc)}
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
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{loc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', display: 'block' }}>Frequency</label>
            <div className="grid grid-cols-3 gap-3">
              {frequencies.map(freq => {
                const isSelected = setupData.frequency === freq;
                return (
                  <div 
                    key={freq}
                    onClick={() => updateData({ frequency: freq })}
                    style={{ 
                      padding: '0.75rem', 
                      background: isSelected ? 'var(--accent-primary-glow)' : 'var(--bg-base)', 
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{freq}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '2rem' }}>
          <button className="btn btn-ghost" onClick={prevStep}>Back</button>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={setupData.locations.length === 0}
            style={{ opacity: setupData.locations.length === 0 ? 0.5 : 1 }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
