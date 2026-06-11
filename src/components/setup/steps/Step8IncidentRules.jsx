import React from 'react';
import { useSetup } from '../SetupContext';
import { AlertOctagon, Activity } from 'lucide-react';

export default function Step8IncidentRules() {
  const { setupData, updateData, nextStep, prevStep } = useSetup();

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Configure Incident Rules</h1>
          <p style={{ color: 'var(--text-secondary)' }}>When should a failure become an official incident?</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="flex-col gap-1">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Create Incident When</label>
            <select 
              value={setupData.incidentRules.condition}
              onChange={e => updateData({ incidentRules: { ...setupData.incidentRules, condition: e.target.value } })}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
            >
              <option value="Journey Fails 1 Time">Journey Fails 1 Time</option>
              <option value="Journey Fails 2 Consecutive Times">Journey Fails 2 Consecutive Times</option>
              <option value="Journey Fails 3 Consecutive Times">Journey Fails 3 Consecutive Times</option>
              <option value="Performance Degraded for 15+ mins">Performance Degraded for 15+ mins</option>
            </select>
          </div>

          <div className="flex-col gap-1">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Incident Severity</label>
            <div className="grid grid-cols-3 gap-3">
              {['Critical', 'High', 'Medium'].map(sev => (
                <div 
                  key={sev}
                  onClick={() => updateData({ incidentRules: { ...setupData.incidentRules, severity: sev } })}
                  style={{ 
                    padding: '0.75rem', 
                    background: setupData.incidentRules.severity === sev ? 'var(--accent-primary-glow)' : 'var(--bg-base)', 
                    border: '1px solid',
                    borderColor: setupData.incidentRules.severity === sev ? 'var(--accent-primary)' : 'var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}
                >
                  {sev}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-col gap-1">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Default Assignment Group</label>
            <select 
              value={setupData.incidentRules.assignment}
              onChange={e => updateData({ incidentRules: { ...setupData.incidentRules, assignment: e.target.value } })}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
            >
              <option value="Application Support Team">Application Support Team</option>
              <option value="SRE Team">SRE Team</option>
              <option value="NOC">NOC</option>
            </select>
          </div>

        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '2rem' }}>
          <button className="btn btn-ghost" onClick={prevStep}>Back</button>
          <button className="btn btn-primary" onClick={nextStep}>Save & Continue</button>
        </div>
      </div>
    </div>
  );
}
