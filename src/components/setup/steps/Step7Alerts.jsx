import React from 'react';
import { useSetup } from '../SetupContext';
import { Bell, Users, Mail, MessageSquare } from 'lucide-react';

export default function Step7Alerts() {
  const { setupData, updateData, nextStep, prevStep } = useSetup();

  const recipients = ['NOC Team', 'Application Team', 'Service Desk'];
  const channels = ['Teams', 'Email', 'Slack', 'PagerDuty'];

  const toggleRecipient = (rec) => {
    const current = setupData.alerts.recipients;
    const updated = current.includes(rec) ? current.filter(r => r !== rec) : [...current, rec];
    updateData({ alerts: { ...setupData.alerts, recipients: updated } });
  };

  const toggleChannel = (ch) => {
    const current = setupData.alerts.channels;
    const updated = current.includes(ch) ? current.filter(c => c !== ch) : [...current, ch];
    updateData({ alerts: { ...setupData.alerts, channels: updated } });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Configure Alerts</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Who should be notified and how?</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', display: 'block' }}>Recipients</label>
            <div className="grid grid-cols-2 gap-3">
              {recipients.map(rec => {
                const isSelected = setupData.alerts.recipients.includes(rec);
                return (
                  <div 
                    key={rec}
                    onClick={() => toggleRecipient(rec)}
                    style={{ padding: '0.75rem', background: isSelected ? 'var(--accent-primary-glow)' : 'var(--bg-base)', border: '1px solid', borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Users size={16} className={isSelected ? "text-primary" : "text-muted"} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{rec}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', display: 'block' }}>Channels</label>
            <div className="grid grid-cols-2 gap-3">
              {channels.map(ch => {
                const isSelected = setupData.alerts.channels.includes(ch);
                return (
                  <div 
                    key={ch}
                    onClick={() => toggleChannel(ch)}
                    style={{ padding: '0.75rem', background: isSelected ? 'var(--accent-primary-glow)' : 'var(--bg-base)', border: '1px solid', borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {ch === 'Email' ? <Mail size={16} className={isSelected ? "text-primary" : "text-muted"} /> : <MessageSquare size={16} className={isSelected ? "text-primary" : "text-muted"} />}
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{ch}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#ec4899', marginBottom: '0.25rem' }}>Warning Alerts</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Automatically trigger warning alerts if Response Time {'>'} 5 Seconds</p>
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
