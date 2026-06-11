import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Clock, Bell, Settings, FileBox, AlertCircle } from 'lucide-react';
import { useJourneys } from '../context/JourneyContext';

export default function CreateJourney() {
  const navigate = useNavigate();
  const { addJourney } = useJourneys();
  
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [locations, setLocations] = useState(['US East (N. Virginia)', 'US West (Oregon)']);
  const [frequency, setFrequency] = useState('5 Minutes');
  const [customValue, setCustomValue] = useState('1');
  const [customUnit, setCustomUnit] = useState('Days');
  const [alerts, setAlerts] = useState({ slack: true, email: false });
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleLocation = (loc) => {
    if (locations.includes(loc)) setLocations(locations.filter(l => l !== loc));
    else setLocations([...locations, loc]);
  };

  const applyTemplate = (template) => {
    if (template === 'checkout') {
      setName('E-commerce Checkout Flow');
      setUrl('https://ecommerce.example.com/checkout');
      setLocations(['US East (N. Virginia)', 'EU (Frankfurt)']);
      setFrequency('1 Minute');
      setAlerts({ slack: true, email: true });
    } else if (template === 'sso') {
      setName('Enterprise SAML SSO Login');
      setUrl('https://login.pulse.cx/saml');
      setLocations(['US East (N. Virginia)', 'US West (Oregon)', 'EU (Frankfurt)', 'AP (Tokyo)']);
      setFrequency('5 Minutes');
      setAlerts({ slack: true, email: false });
    } else if (template === 'reset') {
      setName('Password Reset Flow');
      setUrl('https://app.pulse.cx/forgot-password');
      setLocations(['US East (N. Virginia)']);
      setFrequency('15 Minutes');
      setAlerts({ slack: false, email: true });
    }
    setShowTemplateModal(false);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Journey Name is required';
    if (!url) newErrors.url = 'Starting URL is required';
    if (frequency === 'Custom' && (!customValue || customValue <= 0)) {
      newErrors.customValue = 'Please enter a valid number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top so they see the errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const finalFrequency = frequency === 'Custom' ? `Every ${customValue} ${customUnit}` : frequency;
      const id = addJourney({ name, url, locations, frequency: finalFrequency, alerts });
      navigate(`/journeys/builder?id=${id}`);
    }
  };

  return (
    <>
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Sticky Header */}
      <div className="flex items-center justify-between" style={{ padding: '0 0 1.5rem 0', position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-base)', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <div className="flex items-center gap-4">
          <button className="btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%' }} onClick={() => navigate('/journeys')}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ marginBottom: '0.125rem' }}>Create New Journey</h1>
            <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Configure a new synthetic testing workflow.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" style={{ color: 'var(--accent-primary)' }} onClick={() => setShowTemplateModal(true)}><FileBox size={14} /> Start from Template</button>
          <button className="btn btn-primary" onClick={handleSave}>Save & Open Builder</button>
        </div>
      </div>

      {/* Scrolling Content */}
      <div style={{ maxWidth: '50rem', width: '100%', margin: '0 auto', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
        
        {/* Section 1: Basic Info */}
        <div className="glass-panel" id="basic-info" style={{ padding: 'var(--panel-padding)', display: 'flex', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '12.5rem', flexShrink: 0 }}>
            <div className="flex items-center gap-2" style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              <Settings size={16} className="text-primary" /> Basic Info
            </div>
            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Core details for identifying this workflow.</p>
          </div>
          <div className="flex-col gap-4" style={{ flex: 1, maxWidth: '50rem' }}>
            <div className="flex-col gap-1">
              <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Journey Name</label>
              <input type="text" placeholder="e.g. Checkout Flow Production" value={name} onChange={e => { setName(e.target.value); if(errors.name) setErrors({...errors, name: null}); }} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: errors.name ? '1px solid var(--accent-danger)' : '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
              {errors.name && <div className="animate-fade-in" style={{ color: 'var(--accent-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={12} /> {errors.name}</div>}
            </div>
            <div className="flex-col gap-1">
              <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Starting URL</label>
              <input type="url" placeholder="https://app.example.com" value={url} onChange={e => { setUrl(e.target.value); if(errors.url) setErrors({...errors, url: null}); }} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: errors.url ? '1px solid var(--accent-danger)' : '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
              {errors.url && <div className="animate-fade-in" style={{ color: 'var(--accent-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={12} /> {errors.url}</div>}
            </div>
          </div>
        </div>

        {/* Section 2: Locations */}
        <div className="glass-panel" id="locations" style={{ padding: 'var(--panel-padding)', display: 'flex', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '12.5rem', flexShrink: 0 }}>
            <div className="flex items-center gap-2" style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              <Globe size={16} className="text-primary" /> Locations
            </div>
            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Global regions from which to execute the synthetic test.</p>
          </div>
          <div className="grid grid-cols-2 gap-3" style={{ flex: 1 }}>
            {['US East (N. Virginia)', 'US West (Oregon)', 'EU (Frankfurt)', 'AP (Tokyo)', 'AP (Sydney)', 'SA (São Paulo)'].map((loc) => {
              const isSelected = locations.includes(loc);
              return (
                <div key={loc} onClick={() => toggleLocation(loc)} className="flex items-center gap-3" style={{ padding: 'var(--panel-padding)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: isSelected ? 'var(--accent-primary-glow)' : 'var(--bg-base)', borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)' }}>
                  <input type="checkbox" checked={isSelected} readOnly style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px', cursor: 'pointer' }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: '500' }}>{loc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Frequency */}
        <div className="glass-panel" id="frequency" style={{ padding: 'var(--panel-padding)', display: 'flex', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '12.5rem', flexShrink: 0 }}>
            <div className="flex items-center gap-2" style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              <Clock size={16} className="text-primary" /> Frequency
            </div>
            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>How often should this test run automatically?</p>
          </div>
          <div className="flex-col gap-3" style={{ flex: 1 }}>
            <div className="grid grid-cols-3 gap-3">
              {['1 Minute', '5 Minutes', '15 Minutes', '30 Minutes', '1 Hour', 'Custom'].map((freq) => (
                <div key={freq} onClick={() => setFrequency(freq)} style={{ padding: 'var(--panel-padding)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'center', background: frequency === freq ? 'var(--accent-primary-glow)' : 'var(--bg-base)', borderColor: frequency === freq ? 'var(--accent-primary)' : 'var(--border-color)' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>{freq}</span>
                </div>
              ))}
            </div>
            {frequency === 'Custom' && (
              <div className="animate-fade-in" style={{ marginTop: '0.5rem', display: 'flex', gap: 'var(--panel-gap)', alignItems: 'flex-start' }}>
                <div className="flex-col gap-1" style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Every</label>
                  <input 
                    type="number" 
                    min="1"
                    value={customValue} 
                    onChange={e => {
                      setCustomValue(e.target.value);
                      if (errors.customValue) setErrors({...errors, customValue: null});
                    }}
                    style={{ padding: '0.75rem', background: 'var(--bg-base)', border: errors.customValue ? '1px solid var(--accent-danger)' : '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', width: '100%' }} 
                  />
                  {errors.customValue && <div className="animate-fade-in" style={{ color: 'var(--accent-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={12} /> {errors.customValue}</div>}
                </div>
                <div className="flex-col gap-1" style={{ flex: 2 }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Unit</label>
                  <select 
                    value={customUnit}
                    onChange={e => setCustomUnit(e.target.value)}
                    style={{ padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', width: '100%', cursor: 'pointer' }}
                  >
                    <option value="Minutes">Minutes</option>
                    <option value="Hours">Hours</option>
                    <option value="Days">Days</option>
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Alerts */}
        <div className="glass-panel" id="alerts" style={{ padding: 'var(--panel-padding)', display: 'flex', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '12.5rem', flexShrink: 0 }}>
            <div className="flex items-center gap-2" style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              <Bell size={16} className="text-primary" /> Notifications
            </div>
            <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Who to notify when this journey fails.</p>
          </div>
          <div className="flex-col gap-3" style={{ flex: 1 }}>
            <div className="flex items-center justify-between" style={{ padding: 'var(--panel-padding)', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <div className="flex-col gap-1">
                <span style={{ fontWeight: '600', fontSize: '0.8125rem' }}>Slack Integration</span>
                <span className="text-secondary" style={{ fontSize: '0.75rem' }}>Send failure screenshots to #alerts channel</span>
              </div>
              <div onClick={() => setAlerts({...alerts, slack: !alerts.slack})} style={{ width: '40px', height: '22px', background: alerts.slack ? 'var(--accent-success)' : 'var(--border-color)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ width: '18px', height: '18px', background: alerts.slack ? 'white' : 'var(--text-muted)', borderRadius: '50%', position: 'absolute', top: '2px', left: alerts.slack ? 'auto' : '2px', right: alerts.slack ? '2px' : 'auto', transition: 'all 0.2s' }} />
              </div>
            </div>
            <div className="flex items-center justify-between" style={{ padding: 'var(--panel-padding)', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <div className="flex-col gap-1">
                <span style={{ fontWeight: '600', fontSize: '0.8125rem' }}>Email Alerts</span>
                <span className="text-secondary" style={{ fontSize: '0.75rem' }}>Send daily summary reports</span>
              </div>
              <div onClick={() => setAlerts({...alerts, email: !alerts.email})} style={{ width: '40px', height: '22px', background: alerts.email ? 'var(--accent-success)' : 'var(--border-color)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ width: '18px', height: '18px', background: alerts.email ? 'white' : 'var(--text-muted)', borderRadius: '50%', position: 'absolute', top: '2px', left: alerts.email ? 'auto' : '2px', right: alerts.email ? '2px' : 'auto', transition: 'all 0.2s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {showTemplateModal && createPortal(
        <div className="animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-surface)', padding: 'var(--panel-padding)', borderRadius: 'var(--radius-lg)', width: '31.25rem', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontWeight: '600', marginBottom: '1rem' }}>Select a Template</h2>
            <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Choose a pre-configured journey template to start with.</p>
            
            <div className="flex-col gap-3">
              <div onClick={() => applyTemplate('checkout')} className="hover:bg-[var(--bg-surface-hover)] group" style={{ padding: 'var(--panel-padding)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s' }}>
                <h3 style={{ fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>E-commerce Checkout Flow</h3>
                <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Multi-region test running every 1 minute with strict alerting.</p>
              </div>
              <div onClick={() => applyTemplate('sso')} className="hover:bg-[var(--bg-surface-hover)] group" style={{ padding: 'var(--panel-padding)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s' }}>
                <h3 style={{ fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>Enterprise SAML SSO Login</h3>
                <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Global coverage test running every 5 minutes.</p>
              </div>
              <div onClick={() => applyTemplate('reset')} className="hover:bg-[var(--bg-surface-hover)] group" style={{ padding: 'var(--panel-padding)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s' }}>
                <h3 style={{ fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>Password Reset Flow</h3>
                <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>US-only lightweight test running every 15 minutes.</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button className="btn btn-ghost" onClick={() => setShowTemplateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
