import React from 'react';
import { useSetup } from '../SetupContext';
import { useUsers } from '../../../context/UserContext';
import { useJourneys } from '../../../context/JourneyContext';
import { Rocket, CheckCircle2 } from 'lucide-react';

export default function Step11Activate() {
  const { setupData, prevStep } = useSetup();
  const { currentUser, setCurrentUser } = useUsers();
  const { addJourney } = useJourneys();

  const handleActivate = () => {
    // 1. Save Journey to global context
    addJourney({
      name: setupData.appName + ' Journey',
      url: setupData.websiteUrl,
      locations: setupData.locations,
      frequency: setupData.frequency,
      alerts: { slack: setupData.alerts.channels.includes('Slack'), email: setupData.alerts.channels.includes('Email') },
      steps: setupData.journeySteps // we might not use this globally yet, but good to save
    });

    // 2. Complete Onboarding and show mock data
    setCurrentUser({ ...currentUser, isNewUser: false, isDemo: true });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--accent-primary) 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' }}>
            <Rocket size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>You're all set!</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Review your configuration before activating monitoring.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Application</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{setupData.appName || 'Not set'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Journey</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{setupData.journeySteps.length} Steps Defined</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Frequency</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{setupData.frequency}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Locations</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{setupData.locations.join(', ') || 'Not set'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Alerts</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{setupData.alerts.channels.join(' + ')}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Status</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14} /> Ready</div>
            </div>
          </div>

          <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginTop: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>What Happens Automatically</h4>
            <ul style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ listStyleType: 'disc' }}>Synthetic journey runs every {setupData.frequency}</li>
              <li style={{ listStyleType: 'disc' }}>Results are stored and dashboard is updated</li>
              <li style={{ listStyleType: 'disc' }}>If failure occurs: Screenshots/Logs captured, Incident created, {setupData.alerts.channels.join('/')} alerted.</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '2rem' }}>
          <button className="btn btn-ghost" onClick={prevStep}>Back</button>
          <button 
            className="btn btn-primary" 
            onClick={handleActivate}
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
          >
            Start Monitoring
          </button>
        </div>
      </div>
    </div>
  );
}
