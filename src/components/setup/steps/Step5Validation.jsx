import React, { useState } from 'react';
import { useSetup } from '../SetupContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Step5Validation() {
  const { setupData, updateData, nextStep, prevStep } = useSetup();

  // For simplicity in the wizard, we just show a few global validation rules
  // instead of per-step rules which would be too complex for onboarding.
  
  const rulesList = [
    { id: 'page_loaded', label: 'Page Loaded successfully (HTTP 200)' },
    { id: 'title_exists', label: 'Page Title Exists' },
    { id: 'response_time', label: 'Response Time < 3 seconds' },
    { id: 'no_errors', label: 'No Browser Console Errors' }
  ];

  const toggleRule = (ruleId) => {
    const current = setupData.validationRules || {};
    updateData({
      validationRules: {
        ...current,
        [ruleId]: !current[ruleId]
      }
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Configure Validation Rules</h1>
          <p style={{ color: 'var(--text-secondary)' }}>What constitutes a successful step execution?</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {rulesList.map(rule => {
            const isSelected = setupData.validationRules[rule.id] !== false; // default true if undefined
            return (
              <div 
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                style={{ 
                  padding: '1rem', 
                  background: isSelected ? 'var(--accent-primary-glow)' : 'var(--bg-base)', 
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{rule.label}</span>
                {isSelected ? <CheckCircle2 size={18} className="text-primary" /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid var(--border-color)' }} />}
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
