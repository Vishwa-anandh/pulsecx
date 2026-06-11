import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, Play, Globe, ShieldAlert, MonitorPlay, Activity, Smartphone, Network, Server, Cloud, Cpu, ArrowRight, Camera, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isTesting, setIsTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  
  // State for all forms
  const [config, setConfig] = useState({
    appName: '',
    environment: 'Production',
    websiteUrl: '',
    monitoringType: 'Website Monitoring',
    locations: ['Singapore', 'New York'],
    frequency: '5 Minutes',
    journeyName: 'Login Journey',
    journeySteps: [
      { action: 'Open URL', target: 'https://portal.company.com', expected: 'Homepage loads' },
      { action: 'Click Login', target: '#login-btn', expected: 'Login page opens' },
      { action: 'Enter Username', target: '#username', expected: 'Use Test Account' },
      { action: 'Enter Password', target: '#password', expected: 'Use Test Account' },
      { action: 'Click Sign In', target: '#submit', expected: 'Dashboard displayed' },
    ],
    validations: { pageLoaded: true, pageTitleExists: true, responseTimeLt3sec: true, noBrowserErrors: true },
    evidence: { screenshot: true, consoleLogs: true, networkLogs: true, har: true, apiErrors: true, dns: true, ssl: true },
    alerts: { teams: true, email: true },
    incidentRule: 'Fails 2 Consecutive Times'
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 11));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleActivate = () => navigate('/');

  const steps = [
    { id: 1, name: 'Application Setup', desc: 'Core details' },
    { id: 2, name: 'Monitoring Type', desc: 'Target system' },
    { id: 3, name: 'Locations', desc: 'Global nodes' },
    { id: 4, name: 'Journey Builder', desc: 'User flow' },
    { id: 5, name: 'Validation Rules', desc: 'Success criteria' },
    { id: 6, name: 'Evidence Capture', desc: 'Debug data' },
    { id: 7, name: 'Alerts', desc: 'Notifications' },
    { id: 8, name: 'Incident Rules', desc: 'Ticketing' },
    { id: 9, name: 'Test Journey', desc: 'Simulation' },
    { id: 10, name: 'Review Results', desc: 'Validation' },
    { id: 11, name: 'Activate', desc: 'Deploy monitor' },
  ];

  const handleTest = () => {
    setIsTesting(true);
    setTestProgress(0);
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsTesting(false);
            nextStep();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex-col gap-6 animate-fade-in">
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Welcome to <span className="text-gradient">pulseCX</span></h2>
              <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Let's get started by setting up your first application monitor.</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
              <div className="flex-col gap-1.5">
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Application Name</label>
                <input type="text" value={config.appName} onChange={e => setConfig({...config, appName: e.target.value})} placeholder="e.g., Customer Portal" style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'} />
              </div>
              <div className="flex-col gap-1.5">
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Environment</label>
                <select value={config.environment} onChange={e => setConfig({...config, environment: e.target.value})} style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                </select>
              </div>
              <div className="flex-col gap-1.5">
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Website URL</label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0 1rem' }}>
                  <Globe size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                  <input type="url" value={config.websiteUrl} onChange={e => setConfig({...config, websiteUrl: e.target.value})} placeholder="https://portal.company.com" style={{ width: '100%', padding: '0.75rem 0.5rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex-col gap-6 animate-fade-in">
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Monitoring Type</h2>
              <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Choose the architecture of the application you want to monitor.</p>
            </div>

            <div className="grid grid-cols-2 gap-4" style={{ maxWidth: '600px' }}>
              {[
                { name: 'Website Monitoring', icon: <MonitorPlay size={24} />, desc: 'Standard web applications' },
                { name: 'Customer Portal', icon: <Activity size={24} />, desc: 'Authenticated user portals' },
                { name: 'SAP Fiori', icon: <Server size={24} />, desc: 'Enterprise SAP environments' },
                { name: 'SAP BTP', icon: <Cloud size={24} />, desc: 'Business Technology Platform' },
                { name: 'E-Commerce', icon: <Smartphone size={24} />, desc: 'Retail and checkout flows' },
                { name: 'API Endpoints', icon: <Network size={24} />, desc: 'REST/GraphQL services' },
              ].map(type => {
                const isSelected = config.monitoringType === type.name;
                return (
                  <div key={type.name} onClick={() => setConfig({...config, monitoringType: type.name})} 
                       className="glass-panel"
                       style={{ 
                         padding: '1.5rem', 
                         cursor: 'pointer', 
                         display: 'flex', 
                         flexDirection: 'column', 
                         gap: '1rem',
                         border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)', 
                         background: isSelected ? 'rgba(0, 112, 243, 0.05)' : 'var(--bg-surface)',
                         transform: isSelected ? 'translateY(-2px)' : 'none',
                         transition: 'all 0.2s',
                         boxShadow: isSelected ? '0 8px 30px rgba(0, 112, 243, 0.15)' : 'none'
                       }}>
                    <div style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                      {type.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem', color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{type.name}</h3>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{type.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex-col gap-6 animate-fade-in">
             <div>
               <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Global Locations</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Select the geographical nodes to run your synthetic tests from.</p>
             </div>
             
             <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px' }}>
               <div className="flex-col gap-1.5 mb-8">
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Execution Frequency</label>
                  <select value={config.frequency} onChange={e => setConfig({...config, frequency: e.target.value})} style={{ width: '100%', maxWidth: '300px', padding: '0.75rem 1rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                    <option>Every 1 Minute</option>
                    <option>Every 5 Minutes</option>
                    <option>Every 15 Minutes</option>
                    <option>Every 1 Hour</option>
                  </select>
                </div>

               <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>Select Regions (Multi-select)</label>
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { name: 'New York', region: 'us-east' },
                   { name: 'London', region: 'eu-west' },
                   { name: 'Singapore', region: 'ap-southeast' },
                   { name: 'Sydney', region: 'ap-southeast-2' },
                   { name: 'India', region: 'ap-south-1' },
                   { name: 'Tokyo', region: 'ap-northeast' }
                 ].map(loc => {
                   const isSelected = config.locations.includes(loc.name);
                   return (
                     <label key={loc.name} className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)', background: isSelected ? 'rgba(0, 112, 243, 0.05)' : 'var(--bg-surface)', transition: 'all 0.2s' }}>
                       <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: isSelected ? 'none' : '1px solid var(--border-color)', background: isSelected ? 'var(--accent-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {isSelected && <Check size={14} color="#fff" />}
                       </div>
                       <input type="checkbox" checked={isSelected} style={{ display: 'none' }}
                              onChange={(e) => {
                                const newLocs = e.target.checked ? [...config.locations, loc.name] : config.locations.filter(l => l !== loc.name);
                                setConfig({...config, locations: newLocs});
                              }} />
                       <div>
                         <div style={{ fontSize: '0.9375rem', fontWeight: '500', color: 'var(--text-primary)' }}>{loc.name}</div>
                         <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{loc.region}</div>
                       </div>
                     </label>
                   )
                 })}
               </div>
             </div>
          </div>
        );
      case 4:
        return (
          <div className="flex-col gap-6 animate-fade-in" style={{ width: '100%', maxWidth: '800px' }}>
             <div>
               <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Journey Builder</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Define the sequential steps of your user journey.</p>
             </div>
             
             <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Journey Name:</label>
                  <input type="text" value={config.journeyName} onChange={e => setConfig({...config, journeyName: e.target.value})} placeholder="e.g., Pay Bill Journey" style={{ width: '100%', padding: '0.5rem 1rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none', fontSize: '1.1rem', fontWeight: '600' }} />
                </div>
             </div>

             <div className="flex-col gap-3">
               {config.journeySteps.map((step, idx) => (
                 <div key={idx} className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--accent-primary)', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', color: '#fff' }}>
                      {idx + 1}
                    </div>
                    
                    <div style={{ display: 'flex', flex: 1, gap: '1rem', marginLeft: '1rem' }}>
                      <select value={step.action} onChange={e => {
                        const newSteps = [...config.journeySteps];
                        newSteps[idx].action = e.target.value;
                        setConfig({...config, journeySteps: newSteps});
                      }} style={{ flex: '1', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none' }}>
                        <option>Open URL</option>
                        <option>Click Login</option>
                        <option>Enter Username</option>
                        <option>Enter Password</option>
                        <option>Click Sign In</option>
                        <option>Click Pay Bill</option>
                        <option>Submit Test Payment</option>
                        <option>Validate Success Message</option>
                      </select>
                      
                      <input type="text" placeholder="Target Element / Value" value={step.target} onChange={e => {
                        const newSteps = [...config.journeySteps];
                        newSteps[idx].target = e.target.value;
                        setConfig({...config, journeySteps: newSteps});
                      }} style={{ flex: '1.5', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'monospace', fontSize: '0.85rem' }}/>
                      
                      <input type="text" placeholder="Expected Result" value={step.expected} onChange={e => {
                        const newSteps = [...config.journeySteps];
                        newSteps[idx].expected = e.target.value;
                        setConfig({...config, journeySteps: newSteps});
                      }} style={{ flex: '1.5', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none' }}/>
                    </div>
                 </div>
               ))}
             </div>
             
             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
               <button className="btn btn-secondary" style={{ borderRadius: '50px', padding: '0.5rem 1.5rem', borderStyle: 'dashed' }} onClick={() => setConfig({...config, journeySteps: [...config.journeySteps, { action: 'Click Login', target: '', expected: '' }]})}>
                 + Add New Step
               </button>
             </div>
          </div>
        );
      case 5:
        return (
          <div className="flex-col gap-6 animate-fade-in">
             <div>
               <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Validation Rules</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Define what constitutes a successful step execution.</p>
             </div>
             <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {Object.keys(config.validations).map(key => {
                 const labels = {
                   pageLoaded: 'Page DOM completely loaded',
                   pageTitleExists: 'Valid Page Title detected',
                   responseTimeLt3sec: 'Response Time < 3 Seconds',
                   noBrowserErrors: 'Zero Browser Console Errors (Severity: ERROR)'
                 };
                 return (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: config.validations[key] ? 'none' : '1px solid var(--border-color)', background: config.validations[key] ? 'var(--accent-success)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {config.validations[key] && <Check size={14} color="#fff" />}
                    </div>
                    <input type="checkbox" checked={config.validations[key]} style={{ display: 'none' }} onChange={e => setConfig({...config, validations: {...config.validations, [key]: e.target.checked}})} />
                    <span style={{ fontSize: '1rem', fontWeight: '500' }}>{labels[key]}</span>
                  </label>
                 )
               })}
             </div>
          </div>
        );
      case 6:
        return (
          <div className="flex-col gap-6 animate-fade-in">
             <div>
               <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Evidence Capture</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Select diagnostic data to capture automatically upon failure.</p>
             </div>
             <div className="glass-panel" style={{ padding: '2rem', maxWidth: '700px' }}>
               <div className="grid grid-cols-2 gap-4">
                 {Object.keys(config.evidence).map(key => {
                   const labels = {
                     screenshot: { label: 'Screenshots', icon: <Camera size={18}/> },
                     consoleLogs: { label: 'Browser Console Logs', icon: <FileText size={18}/> },
                     networkLogs: { label: 'Network Requests', icon: <Activity size={18}/> },
                     har: { label: 'HAR Files (Archive)', icon: <FileText size={18}/> },
                     apiErrors: { label: 'API Error Payloads', icon: <Network size={18}/> },
                     dns: { label: 'DNS Resolution Info', icon: <Globe size={18}/> },
                     ssl: { label: 'SSL Certificate Chain', icon: <ShieldAlert size={18}/> }
                   };
                   const isSelected = config.evidence[key];
                   return (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', background: isSelected ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: 'var(--radius-md)', border: isSelected ? '1px solid var(--border-highlight)' : '1px solid var(--border-color)', transition: 'all 0.2s' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: isSelected ? 'none' : '1px solid var(--border-color)', background: isSelected ? 'var(--accent-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isSelected && <Check size={14} color="#fff" />}
                      </div>
                      <input type="checkbox" checked={isSelected} style={{ display: 'none' }} onChange={e => setConfig({...config, evidence: {...config.evidence, [key]: e.target.checked}})} />
                      <div style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{labels[key].icon}</div>
                      <span style={{ fontSize: '0.9375rem', fontWeight: '500', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{labels[key].label}</span>
                    </label>
                   )
                 })}
               </div>
             </div>
          </div>
        );
      case 7:
        return (
          <div className="flex-col gap-6 animate-fade-in">
             <div>
               <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Configure Alerts</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Who should be notified when this journey fails?</p>
             </div>
             <div className="flex-col gap-4 max-w-md">
                <label className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: config.alerts.teams ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: config.alerts.teams ? 'none' : '1px solid var(--border-color)', background: config.alerts.teams ? 'var(--accent-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {config.alerts.teams && <Check size={16} color="#fff" />}
                  </div>
                  <input type="checkbox" checked={config.alerts.teams} style={{ display: 'none' }} onChange={e => setConfig({...config, alerts: {...config.alerts, teams: e.target.checked}})} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Microsoft Teams</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>NOC Team, Application Team channels</div>
                  </div>
                </label>
                <label className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: config.alerts.email ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: config.alerts.email ? 'none' : '1px solid var(--border-color)', background: config.alerts.email ? 'var(--accent-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {config.alerts.email && <Check size={16} color="#fff" />}
                  </div>
                  <input type="checkbox" checked={config.alerts.email} style={{ display: 'none' }} onChange={e => setConfig({...config, alerts: {...config.alerts, email: e.target.checked}})} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Email Notification</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Service Desk & On-call engineer</div>
                  </div>
                </label>
             </div>
          </div>
        );
      case 8:
        return (
          <div className="flex-col gap-6 animate-fade-in">
             <div>
               <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Incident Rules</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Configure thresholds for automated ticket creation.</p>
             </div>
             <div className="glass-panel" style={{ padding: '2rem', maxWidth: '500px' }}>
                <div className="flex-col gap-1.5">
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Trigger Condition</label>
                  <select value={config.incidentRule} onChange={e => setConfig({...config, incidentRule: e.target.value})} style={{ width: '100%', padding: '1rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none', appearance: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                    <option>Create Incident if Fails 1 Time</option>
                    <option>Create Incident if Fails 2 Consecutive Times</option>
                    <option>Create Incident if Fails 3 Consecutive Times</option>
                  </select>
                </div>
                
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 171, 0, 0.1)', border: '1px solid rgba(255, 171, 0, 0.2)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1rem' }}>
                  <AlertCircle size={20} color="var(--accent-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    If this condition is met, pulseCX will automatically generate an Incident in your ITSM system (e.g., ServiceNow, Jira) and attach all configured evidence.
                  </p>
                </div>
             </div>
          </div>
        );
      case 9:
        return (
          <div className="flex-col gap-6 animate-fade-in" style={{ width: '100%', maxWidth: '700px' }}>
             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Test Simulation</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Run a live simulation of the journey from a local node to verify logic.</p>
             </div>
             
             <div className="glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: isTesting ? 'rgba(0, 112, 243, 0.1)' : 'var(--bg-surface-hover)', border: `2px solid ${isTesting ? 'var(--accent-primary)' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {isTesting ? (
                    <div style={{ width: '40px', height: '40px', border: '3px solid var(--accent-primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <Play size={32} color="var(--accent-primary)" style={{ marginLeft: '4px' }} />
                  )}
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>{config.journeyName}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Executing {config.journeySteps.length} Steps from Local Environment</p>
                </div>
                
                {isTesting && (
                  <div style={{ width: '100%', maxWidth: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Executing steps...</span>
                      <span style={{ fontWeight: '600' }}>{testProgress}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-base)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${testProgress}%`, background: 'var(--accent-primary)', transition: 'width 0.2s ease-out' }} />
                    </div>
                  </div>
                )}
                
                {!isTesting && (
                  <button className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '50px' }} onClick={handleTest}>
                    Execute Test Run
                  </button>
                )}
             </div>
          </div>
        );
      case 10:
        return (
          <div className="flex-col gap-6 animate-fade-in" style={{ width: '100%', maxWidth: '700px' }}>
             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                 <CheckCircle2 size={64} color="var(--accent-success)" />
               </div>
               <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Validation Successful</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>The journey completed without any errors across all validation rules.</p>
             </div>
             
             <div className="grid grid-cols-3 gap-4">
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Duration</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>1.24s</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Steps Passed</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-success)' }}>{config.journeySteps.length}/{config.journeySteps.length}</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Network Requests</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>42</div>
                </div>
             </div>
             
             <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1rem' }}>
               <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Execution Log</h4>
               <div className="flex-col gap-2 font-mono" style={{ fontSize: '0.85rem' }}>
                 {config.journeySteps.map((step, i) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'var(--bg-base)', borderRadius: '4px' }}>
                     <Check size={14} color="var(--accent-success)" />
                     <span style={{ color: 'var(--text-secondary)' }}>[0.{(i+1)*15}s]</span>
                     <span style={{ color: 'var(--text-primary)' }}>{step.action}</span>
                     <span style={{ color: 'var(--text-muted)' }}>{step.target}</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        );
      case 11:
        return (
          <div className="flex-col gap-6 animate-fade-in" style={{ width: '100%', maxWidth: '700px' }}>
             <div>
               <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Activate Monitor</h2>
               <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Review your configuration. Upon activation, the synthetic journey will be deployed globally.</p>
             </div>
             
             <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-surface-hover)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Monitor Name</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{config.journeyName}</div>
                  </div>
                  <div className="badge badge-success" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Ready to Deploy</div>
                </div>
                
                <div style={{ padding: '2rem' }}>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Application</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500' }}>{config.appName || 'Customer Portal'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Environment</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500' }}>{config.environment}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Frequency</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500' }}>{config.frequency}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Locations</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500' }}>{config.locations.length > 0 ? config.locations.join(', ') : 'None selected'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Total Steps</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500' }}>{config.journeySteps.length} Actions</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Alerts Routing</div>
                      <div style={{ fontSize: '1rem', fontWeight: '500' }}>{config.alerts.teams ? 'Teams ' : ''}{config.alerts.email ? '& Email' : ''}</div>
                    </div>
                  </div>
                </div>
             </div>
             
             <button className="btn btn-primary" style={{ padding: '1.25rem', fontSize: '1.2rem', justifyContent: 'center', borderRadius: 'var(--radius-md)', background: 'linear-gradient(90deg, var(--accent-primary), #0056b3)', border: 'none', boxShadow: '0 8px 30px rgba(0, 112, 243, 0.3)' }} onClick={handleActivate}>
               Start Global Monitoring
             </button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-base" style={{ overflow: 'hidden', position: 'relative' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .timeline-line {
          position: absolute;
          left: 11px;
          top: 30px;
          bottom: -15px;
          width: 2px;
          background: var(--border-color);
          z-index: 0;
        }
        .timeline-line.active {
          background: var(--accent-primary);
        }
      `}} />
      
      {/* Background Enhancements */}
      <div style={{ position: 'absolute', top: '-20%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 60%)', opacity: 0.08, filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '800px', height: '800px', background: 'radial-gradient(circle, var(--accent-success) 0%, transparent 60%)', opacity: 0.05, filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* Left Sidebar (Progress) */}
      <div className="glass-panel" style={{ width: '320px', flexShrink: 0, padding: '2.5rem 1.5rem', height: '100%', borderRadius: 0, borderRight: '1px solid var(--border-color)', borderTop: 'none', borderBottom: 'none', borderLeft: 'none', overflowY: 'auto', zIndex: 10, background: 'rgba(10, 10, 10, 0.6)', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '0.4rem', borderRadius: '0.4rem' }}>
            <Activity color="#fff" size={20} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
            pulseCX
          </span>
        </div>
        
        <div className="flex-col gap-4" style={{ paddingLeft: '0.5rem' }}>
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} style={{ position: 'relative', display: 'flex', gap: '1rem', opacity: isCompleted || isActive ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                {!isLast && (
                  <div className={`timeline-line ${isCompleted ? 'active' : ''}`} />
                )}
                <div style={{ position: 'relative', zIndex: 1, width: '24px', height: '24px', borderRadius: '50%', background: isActive ? 'var(--accent-primary)' : isCompleted ? 'var(--accent-primary)' : 'var(--bg-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: isActive ? '4px solid rgba(0, 112, 243, 0.3)' : isCompleted ? 'none' : '1px solid var(--border-color)', color: '#fff', transition: 'all 0.3s' }}>
                  {isCompleted ? <Check size={12} strokeWidth={3} /> : <span style={{ fontSize: '0.65rem', fontWeight: '700', color: isActive ? '#fff' : 'var(--text-secondary)' }}>{step.id}</span>}
                </div>
                <div style={{ paddingBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.9375rem', fontWeight: isActive ? '600' : '500', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: '0.1rem' }}>{step.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex-col" style={{ padding: '4rem 5rem', overflowY: 'auto', zIndex: 10 }}>
        <div className="flex-1 w-full" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {renderStepContent()}
        </div>
        
        {/* Footer Navigation */}
        <div className="w-full flex justify-between mt-12 pt-6 border-t" style={{ borderColor: 'var(--border-color)', maxWidth: '1000px', margin: 'auto' }}>
          <button className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', opacity: currentStep === 1 ? 0 : 1, pointerEvents: currentStep === 1 ? 'none' : 'auto' }} onClick={prevStep}>
            <ChevronLeft size={18} /> Back
          </button>
          
          {currentStep < 11 && (
            <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', borderRadius: '50px' }} onClick={nextStep}>
              {currentStep === 9 ? 'Skip Test' : 'Continue'} <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
