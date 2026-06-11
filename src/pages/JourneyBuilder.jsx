import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Play, Globe, Type, MousePointer2, Eye, Activity, Trash2, Loader2, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useJourneys } from '../context/JourneyContext';

export default function JourneyBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const journeyId = searchParams.get('id');
  const { journeys, updateJourney } = useJourneys();

  const currentJourney = journeys.find(j => j.id === journeyId) || { name: 'Checkout Flow Production', url: 'https://app.pulse.cx/login' };

  const [activeStep, setActiveStep] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [testStatus, setTestStatus] = useState('idle');
  const [stepStatuses, setStepStatuses] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const actions = [
    { id: 'click', name: 'Click Element', icon: <MousePointer2 size={14} />, color: 'var(--accent-primary)' },
    { id: 'type', name: 'Type Text', icon: <Type size={14} />, color: 'var(--accent-warning)' },
    { id: 'assert', name: 'Assert Visible', icon: <Eye size={14} />, color: 'var(--accent-success)' }
  ];

  const [steps, setSteps] = useState(currentJourney.steps || [
    { id: 1, type: 'navigate', label: 'Navigate to URL', value: currentJourney.url || 'https://app.pulse.cx/login', icon: <Globe size={14} />, color: 'var(--text-muted)' },
  ]);

  useEffect(() => {
    if (currentJourney.steps) {
      setSteps(currentJourney.steps);
    }
  }, [currentJourney.steps]);

  const addStep = (actionMeta) => {
    const newId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) + 1 : 1;
    setSteps([...steps, { 
      id: newId, 
      type: actionMeta ? actionMeta.id : 'click', 
      label: actionMeta ? actionMeta.name : 'New Action', 
      value: '', 
      icon: actionMeta ? actionMeta.icon : <MousePointer2 size={14} />, 
      color: actionMeta ? actionMeta.color : 'var(--accent-primary)' 
    }]);
    setActiveStep(newId);
  };

  const deleteStep = (id) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const updateStep = (id, field, val) => {
    setSteps(steps.map(s => {
      if (s.id === id) {
        const updated = { ...s, [field]: val };
        // Auto-update icon/color based on type
        if (field === 'type') {
          const actionMeta = actions.find(a => a.id === val) || { icon: <Globe size={14} />, color: 'var(--text-muted)' };
          updated.icon = actionMeta.icon;
          updated.color = actionMeta.color;
        }
        return updated;
      }
      return s;
    }));
  };

  const handleSave = () => {
    if (journeyId) {
      updateJourney(journeyId, { steps });
      setToastMessage('Journey saved successfully');
      setTimeout(() => setToastMessage(''), 3000);
    }
    navigate('/journeys');
  };

  const runTest = async () => {
    if (testStatus === 'running') return;
    setTestStatus('running');
    setActiveStep(null); // collapse all steps
    
    let statuses = {};
    steps.forEach(s => statuses[s.id] = 'pending');
    setStepStatuses({...statuses});

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      statuses[step.id] = 'running';
      setStepStatuses({...statuses});
      
      await new Promise(r => setTimeout(r, 800)); // simulate work
      
      statuses[step.id] = 'success';
      setStepStatuses({...statuses});
    }

    setTestStatus('success');
    setToastMessage('Test completed successfully across all nodes.');
    setTimeout(() => {
      setToastMessage('');
      setTestStatus('idle');
      setStepStatuses({});
    }, 4000);
  };

  return (
    <div className="flex-col gap-4 animate-fade-in" style={{ height: 'calc(100vh - 6.25rem)' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <div className="flex items-center gap-3">
          <button className="btn-icon" onClick={() => navigate('/journeys')}><ArrowLeft size={18} /></button>
          <div className="flex-col gap-1">
            <nav className="flex items-center gap-2 text-muted" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-[var(--text-primary)]" onClick={() => navigate('/journeys')}>Journeys</span>
              <span>/</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-[var(--text-primary)]" onClick={() => journeyId && navigate(`/journeys/${journeyId}`)}>{currentJourney.name}</span>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>Builder</span>
            </nav>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>{currentJourney.name}</h1>
            <span className="text-secondary" style={{ fontSize: '0.8125rem' }}>Visual Builder</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={runTest} disabled={testStatus === 'running'} style={{ color: testStatus === 'running' ? 'var(--text-muted)' : 'var(--accent-success)' }}>
            {testStatus === 'running' ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />} 
            {testStatus === 'running' ? 'Running...' : 'Run Test'}
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={testStatus === 'running'}><Save size={14} /> Save Journey</button>
        </div>
      </div>

      <div className="flex gap-4" style={{ flex: 1, minHeight: 0 }}>
        
        {/* Left Panel: Actions Library */}
        <div className="glass-panel" style={{ width: '15.625rem', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)'}}>Actions Library</div>
          <div className="flex-col gap-2">
            {actions.map(action => (
              <div key={action.id} onClick={() => addStep(action)} className="hover:bg-[var(--bg-surface-hover)] group" style={{ 
                padding: '0.75rem', 
                background: 'var(--bg-base)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-sm)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <div style={{ color: action.color }}>{action.icon}</div>
                <span style={{ fontSize: '0.8125rem', fontWeight: '500' }}>{action.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Visual Workflow (Expanded to fill right side) */}
        <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', background: 'var(--bg-base)' }}>
          <div className="flex-col items-center gap-0" style={{ width: '100%', maxWidth: '37.5rem' }}>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Node */}
                <div 
                  onClick={() => setActiveStep(step.id)}
                  style={{ 
                    width: '100%',
                    background: activeStep === step.id ? 'var(--bg-surface)' : 'var(--bg-surface)',
                    border: `1px solid ${activeStep === step.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: activeStep === step.id ? 'default' : 'pointer',
                    boxShadow: activeStep === step.id ? '0 4px 12px rgba(0,0,0,0.2)' : 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                    overflow: 'hidden'
                  }}
                  className={activeStep !== step.id ? "hover:bg-[var(--bg-surface-hover)]" : ""}
                >
                  {/* Node Header */}
                  <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: activeStep === step.id ? 'var(--bg-surface-hover)' : 'transparent', borderBottom: activeStep === step.id ? '1px solid var(--border-color)' : 'none' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '8px', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, position: 'relative' }}>
                      {stepStatuses[step.id] === 'running' ? <Loader2 size={16} className="animate-spin text-primary" /> : 
                       stepStatuses[step.id] === 'success' ? <Check size={16} className="text-success" /> : 
                       step.icon}
                    </div>
                    <div className="flex-col gap-1" style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: stepStatuses[step.id] === 'success' ? 'var(--accent-success)' : 'var(--text-primary)' }}>{step.label}</span>
                      <span className="text-muted" style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>{step.value}</span>
                    </div>
                    {activeStep === step.id && testStatus !== 'running' && (
                      <div className="flex gap-2">
                        <button className="btn-icon" title="Test this Step"><Activity size={14} /></button>
                        <button className="btn-icon text-danger" onClick={(e) => { e.stopPropagation(); deleteStep(step.id); }} title="Delete Step"><Trash2 size={14} /></button>
                      </div>
                    )}
                  </div>

                  {/* Inline Configuration (Accordion) */}
                  {activeStep === step.id && (
                    <div className="animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-surface)' }}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex-col gap-1">
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Step Label</label>
                          <input type="text" value={step.label} onChange={e => updateStep(step.id, 'label', e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.8125rem' }} />
                        </div>
                        <div className="flex-col gap-1">
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Action Type</label>
                          <select value={step.type} onChange={e => updateStep(step.id, 'type', e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.8125rem' }}>
                            <option value="navigate">Navigate to URL</option>
                            <option value="type">Type Text</option>
                            <option value="click">Click Element</option>
                            <option value="assert">Assert Visible</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex-col gap-1">
                        <label className="flex items-center justify-between" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                          CSS Selector <span className="text-success" style={{ fontSize: '0.65rem', fontWeight: '500' }}>Valid Selector ✓</span>
                        </label>
                        <input type="text" value={step.value} onChange={e => updateStep(step.id, 'value', e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--accent-success)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.75rem' }} />
                      </div>

                      {step.type === 'type' && (
                        <div className="flex-col gap-1">
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Input Value</label>
                          <input type="text" value={step.inputVal || ''} onChange={e => updateStep(step.id, 'inputVal', e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.8125rem' }} />
                        </div>
                      )}

                      <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
                        <input type="checkbox" id={`opt-${step.id}`} />
                        <label htmlFor={`opt-${step.id}`} style={{ fontSize: '0.8125rem' }}>Continue on failure</label>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div style={{ width: '2px', height: '24px', background: 'var(--border-highlight)' }} />
                )}
              </React.Fragment>
            ))}

            <div style={{ width: '2px', height: '24px', background: 'var(--border-highlight)' }} />
            
            <div style={{ position: 'relative', width: '100%' }}>
              {showActionMenu && (
                <div className="animate-fade-in" style={{ position: 'absolute', bottom: 'calc(100% + 0.5rem)', left: 0, right: 0, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', boxShadow: 'var(--shadow-lg)', zIndex: 10 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', padding: '0.25rem 0.5rem', marginBottom: '0.25rem' }}>Select Action Type</div>
                  {actions.map(action => (
                    <div key={action.id} onClick={() => { addStep(action); setShowActionMenu(false); }} className="hover:bg-[var(--bg-surface-hover)]" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ color: action.color }}>{action.icon}</div>
                      <span style={{ fontSize: '0.8125rem' }}>{action.name}</span>
                    </div>
                  ))}
                </div>
              )}
              <button className="btn btn-ghost" onClick={() => setShowActionMenu(!showActionMenu)} style={{ borderStyle: 'dashed', width: '100%', padding: '1rem' }}>
                + Add Step
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', top: '5rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 1000 }}>
          <div className="animate-fade-in" style={{ pointerEvents: 'auto', background: 'var(--bg-surface)', border: '1px solid var(--accent-success)', borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-lg)' }}>
            <Check size={18} className="text-success" />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
