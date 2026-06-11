import React, { useState } from 'react';
import { useSetup } from '../SetupContext';
import { 
  Globe, Type, MousePointer2, Eye, Activity, Trash2, Loader2, Check,
  Navigation, Link, Menu, ExternalLink, RefreshCw, ArrowLeftCircle, ArrowRightCircle, Hand, Pointer, AlignLeft, KeyRound, Radio, 
  CheckSquare, CheckCircle2, Upload, Download, ChevronDown, ChevronRight, LogIn, LogOut, ShieldCheck, Fingerprint, 
  Search, AlertCircle, Hourglass, Timer, Network, Camera, Image, Terminal, FileCode, Server, 
  Smartphone, Zap, MessageSquare, Mail, Webhook, GitBranch, XCircle, SkipForward, PauseCircle, 
  Repeat, Users, Database, Hash
} from 'lucide-react';

export default function Step4JourneyBuilder() {
  const { setupData, updateData, nextStep, prevStep } = useSetup();
  
  const steps = setupData.journeySteps || [];
  const setSteps = (newSteps) => updateData({ journeySteps: newSteps });

  const [activeStep, setActiveStep] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(['navigation']);

  const actionCategories = [
    {
      id: 'navigation',
      name: 'Navigation',
      actions: [
        { id: 'nav-open', name: 'Open URL', icon: <Globe size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-webpage', name: 'Navigate to webpage', icon: <Navigation size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-internal', name: 'Internal page navigation', icon: <Link size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-menu', name: 'Click Menu Item', icon: <Menu size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-tab', name: 'Open New Tab', icon: <ExternalLink size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-refresh', name: 'Refresh Page', icon: <RefreshCw size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-back', name: 'Go Back', icon: <ArrowLeftCircle size={14} />, color: 'var(--accent-primary)' }
      ]
    },
    {
      id: 'user-actions',
      name: 'User Actions',
      actions: [
        { id: 'act-click', name: 'Click Element', icon: <MousePointer2 size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-dblclick', name: 'Double Click', icon: <Pointer size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-hover', name: 'Hover Element', icon: <Hand size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-text', name: 'Enter Text', icon: <Type size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-pass', name: 'Enter Password', icon: <KeyRound size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-drop', name: 'Select Dropdown', icon: <AlignLeft size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-radio', name: 'Select Radio Button', icon: <Radio size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-check', name: 'Select Checkbox', icon: <CheckSquare size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-upload', name: 'Upload File', icon: <Upload size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-scroll', name: 'Scroll Page', icon: <ChevronDown size={14} />, color: 'var(--accent-warning)' }
      ]
    },
    {
      id: 'auth',
      name: 'Authentication',
      actions: [
        { id: 'auth-login', name: 'Login', icon: <LogIn size={14} />, color: 'var(--accent-danger)' },
        { id: 'auth-logout', name: 'Logout', icon: <LogOut size={14} />, color: 'var(--accent-danger)' },
        { id: 'auth-sso', name: 'SSO Login', icon: <ShieldCheck size={14} />, color: 'var(--accent-danger)' },
        { id: 'auth-mfa', name: 'MFA Verification', icon: <Fingerprint size={14} />, color: 'var(--accent-danger)' }
      ]
    },
    {
      id: 'validation',
      name: 'Validation',
      actions: [
        { id: 'val-load', name: 'Verify Page Loaded', icon: <CheckCircle2 size={14} />, color: 'var(--accent-success)' },
        { id: 'val-url', name: 'Verify URL', icon: <Link size={14} />, color: 'var(--accent-success)' },
        { id: 'val-exist', name: 'Verify Element Exists', icon: <Search size={14} />, color: 'var(--accent-success)' },
        { id: 'val-text', name: 'Verify Text Exists', icon: <Type size={14} />, color: 'var(--accent-success)' },
        { id: 'val-succ', name: 'Verify Success Message', icon: <CheckCircle2 size={14} />, color: 'var(--accent-success)' }
      ]
    },
    {
      id: 'wait',
      name: 'Wait & Timing',
      actions: [
        { id: 'wait-gen', name: 'Wait', icon: <Hourglass size={14} />, color: 'var(--text-muted)' },
        { id: 'wait-el', name: 'Wait For Element', icon: <Timer size={14} />, color: 'var(--text-muted)' }
      ]
    }
  ];

  const allActions = actionCategories.flatMap(c => c.actions);

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => 
      prev.includes(catId) ? [] : [catId]
    );
  };

  const addStep = (actionMeta) => {
    const newId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) + 1 : 1;
    setSteps([...steps, { 
      id: newId, 
      type: actionMeta ? actionMeta.id : 'act-click', 
      label: actionMeta ? actionMeta.name : 'New Action', 
      value: '', 
      icon: actionMeta ? actionMeta.icon : <MousePointer2 size={14} />, 
      color: actionMeta ? actionMeta.color : 'var(--accent-warning)' 
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
        if (field === 'type') {
          const actionMeta = allActions.find(a => a.id === val) || { icon: <Globe size={14} />, color: 'var(--text-muted)' };
          updated.icon = actionMeta.icon;
          updated.color = actionMeta.color;
        }
        return updated;
      }
      return s;
    }));
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Journey Builder Wizard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Drag or click actions to define the sequence for your synthetic transaction.</p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
          
          {/* Left Panel: Actions Library */}
          <div className="glass-panel" style={{ width: '18rem', padding: '0', display: 'flex', flexDirection: 'column', gap: '0', overflowY: 'auto' }}>
            <div style={{ padding: 'var(--panel-padding)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 10 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-primary)'}}>Actions Library</div>
            </div>
            
            <div className="flex-col gap-0">
              {actionCategories.map(category => {
                const isExpanded = expandedCategories.includes(category.id);
                return (
                  <div key={category.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div 
                      onClick={() => toggleCategory(category.id)}
                      className="hover:bg-[var(--bg-surface-hover)]"
                      style={{ 
                        padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        cursor: 'pointer', background: isExpanded ? 'var(--bg-base)' : 'transparent', transition: 'background 0.2s'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: isExpanded ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{category.name}</span>
                      <div style={{ color: 'var(--text-muted)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="flex-col gap-1 animate-fade-in" style={{ padding: '0.5rem', background: 'var(--bg-base)' }}>
                        {category.actions.map(action => (
                          <div key={action.id} onClick={() => addStep(action)} className="hover:bg-[var(--bg-surface-hover)] group" style={{ 
                            padding: '0.35rem 0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', 
                            borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem',
                            cursor: 'pointer', transition: 'all 0.2s'
                          }}>
                            <div style={{ color: action.color, display: 'flex' }}>{action.icon}</div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-primary)' }}>{action.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center: Visual Workflow Canvas */}
          <div className="glass-panel" style={{ flex: 1, display: 'flex', overflow: 'hidden', background: '#f1f5f9', position: 'relative' }}>
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="flex-col items-center gap-0" style={{ width: '100%', maxWidth: '32rem' }}>
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    {/* Node */}
                    <div 
                      onClick={() => setActiveStep(step.id)}
                      style={{ 
                        width: '100%', background: 'var(--bg-surface)',
                        border: `1px solid ${activeStep === step.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-md)', cursor: activeStep === step.id ? 'default' : 'pointer',
                        boxShadow: activeStep === step.id ? '0 4px 12px rgba(0,0,0,0.2)' : 'var(--shadow-sm)',
                        display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease', overflow: 'hidden'
                      }}
                    >
                      <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: activeStep === step.id ? 'var(--bg-surface-hover)' : 'transparent', borderBottom: activeStep === step.id ? '1px solid var(--border-color)' : 'none' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '8px', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color }}>
                          {step.icon}
                        </div>
                        <div className="flex-col gap-1" style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-primary)' }}>{step.label}</span>
                          <span className="text-muted" style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>{step.value || 'No value set'}</span>
                        </div>
                        {activeStep === step.id && (
                          <div className="flex gap-2">
                            <button className="btn-icon text-danger" onClick={(e) => { e.stopPropagation(); deleteStep(step.id); }}><Trash2 size={14} /></button>
                          </div>
                        )}
                      </div>

                      {activeStep === step.id && (
                        <div className="animate-fade-in" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-surface)' }}>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex-col gap-1">
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Step Label</label>
                              <input type="text" value={step.label} onChange={e => updateStep(step.id, 'label', e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.8125rem' }} />
                            </div>
                            <div className="flex-col gap-1">
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Action Type</label>
                              <select value={step.type} onChange={e => updateStep(step.id, 'type', e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.8125rem' }}>
                                {actionCategories.map(category => (
                                  <optgroup key={category.id} label={category.name}>
                                    {category.actions.map(action => (
                                      <option key={action.id} value={action.id}>{action.name}</option>
                                    ))}
                                  </optgroup>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex-col gap-1">
                            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                              CSS Selector / Value
                            </label>
                            <input type="text" value={step.value} onChange={e => updateStep(step.id, 'value', e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.75rem' }} />
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

                {steps.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', width: '100%' }}>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Start from scratch or pick a template.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left' }}>
                      <div 
                        onClick={() => setSteps([
                          { id: 1, type: 'nav-open', label: 'Open Page', value: 'https://app.example.com', icon: <Globe size={14} />, color: 'var(--accent-primary)' },
                          { id: 2, type: 'act-text', label: 'Enter Username', value: '#email', icon: <Type size={14} />, color: 'var(--accent-warning)' },
                          { id: 3, type: 'act-pass', label: 'Enter Password', value: '#password', icon: <KeyRound size={14} />, color: 'var(--accent-warning)' },
                          { id: 4, type: 'act-click', label: 'Click Login', value: '#submit-btn', icon: <MousePointer2 size={14} />, color: 'var(--accent-warning)' },
                          { id: 5, type: 'val-text', label: 'Verify Dashboard', value: '.welcome-text', icon: <CheckCircle2 size={14} />, color: 'var(--accent-success)' }
                        ])}
                        className="hover:bg-[var(--bg-surface-hover)]"
                        style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Login Flow Template</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>5 steps: Navigate, enter credentials, and verify login.</p>
                      </div>

                      <div 
                        onClick={() => setSteps([
                          { id: 1, type: 'nav-open', label: 'Open Cart', value: 'https://shop.example.com/cart', icon: <Globe size={14} />, color: 'var(--accent-primary)' },
                          { id: 2, type: 'act-click', label: 'Click Checkout', value: '.checkout-btn', icon: <MousePointer2 size={14} />, color: 'var(--accent-warning)' },
                          { id: 3, type: 'act-text', label: 'Enter Shipping', value: '#address', icon: <Type size={14} />, color: 'var(--accent-warning)' },
                          { id: 4, type: 'act-click', label: 'Place Order', value: '#place-order', icon: <MousePointer2 size={14} />, color: 'var(--accent-warning)' },
                          { id: 5, type: 'val-succ', label: 'Verify Success', value: '.confirmation', icon: <CheckCircle2 size={14} />, color: 'var(--accent-success)' }
                        ])}
                        className="hover:bg-[var(--bg-surface-hover)]"
                        style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>E-commerce Checkout</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>5 steps: Cart to order confirmation validation.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ width: '2px', height: '24px', background: 'var(--border-highlight)', display: steps.length > 0 ? 'block' : 'none' }} />
                
                {steps.length > 0 && (
                  <div style={{ position: 'relative', width: '100%' }}>
                    {showActionMenu && (
                      <div className="animate-fade-in" style={{ position: 'absolute', bottom: 'calc(100% + 0.5rem)', left: 0, right: 0, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', boxShadow: 'var(--shadow-lg)', zIndex: 10, maxHeight: '250px', overflowY: 'auto' }}>
                        {actionCategories.map(category => (
                          <div key={category.id} style={{ marginBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>{category.name}</div>
                            {category.actions.map(action => (
                              <div key={action.id} onClick={() => { addStep(action); setShowActionMenu(false); }} className="hover:bg-[var(--bg-surface-hover)]" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ color: action.color }}>{action.icon}</div>
                                <span style={{ fontSize: '0.8125rem' }}>{action.name}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                    <button className="btn btn-ghost" onClick={() => setShowActionMenu(!showActionMenu)} style={{ borderStyle: 'dashed', width: '100%', padding: '1rem' }}>
                      + Add Step
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '2rem' }}>
          <button className="btn btn-ghost" onClick={prevStep}>Back</button>
          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={steps.length === 0}
            style={{ opacity: steps.length === 0 ? 0.5 : 1 }}
          >
            Save Journey
          </button>
        </div>
      </div>
    </div>
  );
}
