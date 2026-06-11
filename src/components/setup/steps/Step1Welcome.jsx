import React from 'react';
import { useSetup } from '../SetupContext';
import { Globe, Server, Laptop } from 'lucide-react';

export default function Step1Welcome() {
  const { setupData, updateData, nextStep } = useSetup();

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--accent-primary)' }}>
            <Globe size={24} className="text-primary" />
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Get Started with CX Monitoring</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Configure your first application to start monitoring customer experience.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="flex-col gap-1">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Application Name</label>
            <input 
              type="text" 
              placeholder="e.g. Customer Self-Service Portal" 
              value={setupData.appName}
              onChange={e => updateData({ appName: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          
          <div className="flex-col gap-1">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Environment</label>
            <select 
              value={setupData.environment}
              onChange={e => updateData({ environment: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
            >
              <option value="Production">Production</option>
              <option value="Staging">Staging</option>
              <option value="QA">QA</option>
              <option value="Development">Development</option>
            </select>
          </div>

          <div className="flex-col gap-1">
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Website URL</label>
            <input 
              type="url" 
              placeholder="https://portal.company.com" 
              value={setupData.websiteUrl}
              onChange={e => updateData({ websiteUrl: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={!setupData.appName || !setupData.websiteUrl}
            style={{ opacity: (!setupData.appName || !setupData.websiteUrl) ? 0.5 : 1 }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
