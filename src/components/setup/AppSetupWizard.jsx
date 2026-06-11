import React from 'react';
import { createPortal } from 'react-dom';
import { useSetup } from './SetupContext';
import { useUsers } from '../../context/UserContext';
import { Check, ChevronRight } from 'lucide-react';

// Import Steps
import Step1Welcome from './steps/Step1Welcome';
import Step2MonitorType from './steps/Step2MonitorType';
import Step3Locations from './steps/Step3Locations';
import Step4JourneyBuilder from './steps/Step4JourneyBuilder';
import Step5Validation from './steps/Step5Validation';
import Step6Evidence from './steps/Step6Evidence';
import Step7Alerts from './steps/Step7Alerts';
import Step8IncidentRules from './steps/Step8IncidentRules';
import Step9TestRun from './steps/Step9TestRun';
import Step10Results from './steps/Step10Results';
import Step11Activate from './steps/Step11Activate';

const steps = [
  { id: 1, title: 'Application Setup' },
  { id: 2, title: 'Monitoring Type' },
  { id: 3, title: 'Locations' },
  { id: 4, title: 'Journey Builder' },
  { id: 5, title: 'Validation Rules' },
  { id: 6, title: 'Evidence Capture' },
  { id: 7, title: 'Alerts' },
  { id: 8, title: 'Incident Rules' },
  { id: 9, title: 'Test Journey' },
  { id: 10, title: 'Review Results' },
  { id: 11, title: 'Activate' }
];

export function AppSetupWizard() {
  const { currentUser, setCurrentUser } = useUsers();
  const { currentStep, setCurrentStep } = useSetup();

  if (!currentUser?.isNewUser) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1Welcome />;
      case 2: return <Step2MonitorType />;
      case 3: return <Step3Locations />;
      case 4: return <Step4JourneyBuilder />;
      case 5: return <Step5Validation />;
      case 6: return <Step6Evidence />;
      case 7: return <Step7Alerts />;
      case 8: return <Step8IncidentRules />;
      case 9: return <Step9TestRun />;
      case 10: return <Step10Results />;
      case 11: return <Step11Activate />;
      default: return null;
    }
  };

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '90vw', height: '90vh', maxWidth: '1400px', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Sidebar */}
        <div style={{ width: '280px', backgroundColor: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Setup Guide</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Configure your first monitoring journey to get started.</p>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }} className="sidebar-scroll">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isPast = step.id < currentStep;
              
              return (
                <div 
                  key={step.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    padding: '0.75rem 0',
                    color: isActive ? 'var(--accent-primary)' : (isPast ? 'var(--text-primary)' : 'var(--text-muted)'),
                    fontWeight: isActive ? '600' : '500',
                    position: 'relative'
                  }}
                >
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    backgroundColor: isActive ? 'var(--accent-primary)' : (isPast ? 'var(--accent-success)' : 'var(--bg-base)'),
                    color: (isActive || isPast) ? 'white' : 'var(--text-muted)',
                    border: isActive ? 'none' : (isPast ? 'none' : '1px solid var(--border-color)')
                  }}>
                    {isPast ? <Check size={14} /> : step.id}
                  </div>
                  <span style={{ fontSize: '0.875rem' }}>{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-base)', position: 'relative' }}>
          {/* Subtle Glows */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-primary-glow) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
          
          <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
            {renderStepContent()}
          </div>
        </div>
        
      </div>
    </div>,
    document.body
  );
}
