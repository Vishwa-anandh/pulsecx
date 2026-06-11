import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Save, Play, Globe, Type, MousePointer2, Eye, Activity, Trash2, Loader2, Check,
  Mouse, Keyboard, Clock, FileText, CheckSquare, Download, Navigation, Link, Menu, ExternalLink, 
  RefreshCw, ArrowLeftCircle, ArrowRightCircle, Hand, Pointer, AlignLeft, KeyRound, Radio, 
  CheckCircle2, Upload, ChevronDown, ChevronRight, LogIn, LogOut, ShieldCheck, Fingerprint, 
  Search, AlertCircle, Hourglass, Timer, Network, Camera, Image, Terminal, FileCode, Server, 
  Smartphone, Zap, MessageSquare, Mail, Webhook, GitBranch, XCircle, SkipForward, PauseCircle, 
  Repeat, Users, Database, Hash
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useJourneys } from '../context/JourneyContext';

export default function JourneyBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const journeyId = searchParams.get('id');
  const { journeys, updateJourney } = useJourneys();

  const currentJourney = journeys.find(j => j.id === journeyId) || { name: 'Checkout Flow Production', url: 'https://app.pulse.cx/login' };

  // Canvas Pan & Zoom State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 50 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleCanvasWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        // Zoom
        e.preventDefault(); // Works because event is non-passive
        const zoomFactor = 0.001; // 100 deltaY = 0.1 (10%) zoom change
        setZoom(prev => {
          let newZoom = prev - e.deltaY * zoomFactor;
          // Snap to the nearest 0.1 (10%) to keep values perfectly clean
          newZoom = Math.round(newZoom * 10) / 10;
          return Math.min(Math.max(0.3, newZoom), 3);
        });
      } else {
        // Pan
        setPan(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
      }
    };

    canvas.addEventListener('wheel', handleCanvasWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleCanvasWheel);
  }, []);

  const handleCanvasMouseDown = (e) => {
    // Start panning only if clicking on the background (not inside nodes)
    if (e.target.id === 'canvas-viewport' || e.button === 1) {
      setIsDraggingCanvas(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDraggingCanvas) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const resetCanvas = () => {
    setZoom(1);
    setPan({ x: 0, y: 50 });
  };

  const [activeStep, setActiveStep] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [testStatus, setTestStatus] = useState('idle');
  const [stepStatuses, setStepStatuses] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  
  // State for Accordion categories
  const [expandedCategories, setExpandedCategories] = useState(['navigation', 'user-actions']);

  const actionCategories = [
    {
      id: 'navigation',
      name: 'Navigation',
      actions: [
        { id: 'nav-open', name: 'Open URL', icon: <Globe size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-webpage', name: 'Navigate to webpage', icon: <Navigation size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-page', name: 'Navigate to Page', icon: <Navigation size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-internal', name: 'Internal page navigation', icon: <Link size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-menu', name: 'Click Menu Item', icon: <Menu size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-menus', name: 'Navigate through menus', icon: <Menu size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-tab', name: 'Open New Tab', icon: <ExternalLink size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-switch', name: 'Switch Tab', icon: <ExternalLink size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-refresh', name: 'Refresh Page', icon: <RefreshCw size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-back', name: 'Go Back', icon: <ArrowLeftCircle size={14} />, color: 'var(--accent-primary)' },
        { id: 'nav-forward', name: 'Go Forward', icon: <ArrowRightCircle size={14} />, color: 'var(--accent-primary)' }
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
        { id: 'act-download', name: 'Download File', icon: <Download size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-scroll', name: 'Scroll Page', icon: <ChevronDown size={14} />, color: 'var(--accent-warning)' },
        { id: 'act-scroll-el', name: 'Scroll To Element', icon: <ChevronDown size={14} />, color: 'var(--accent-warning)' }
      ]
    },
    {
      id: 'auth',
      name: 'Authentication',
      actions: [
        { id: 'auth-login', name: 'Login', icon: <LogIn size={14} />, color: 'var(--accent-danger)' },
        { id: 'auth-logout', name: 'Logout', icon: <LogOut size={14} />, color: 'var(--accent-danger)' },
        { id: 'auth-sso', name: 'SSO Login', icon: <ShieldCheck size={14} />, color: 'var(--accent-danger)' },
        { id: 'auth-azure', name: 'Azure AD Login', icon: <ShieldCheck size={14} />, color: 'var(--accent-danger)' },
        { id: 'auth-mfa', name: 'MFA Verification', icon: <Fingerprint size={14} />, color: 'var(--accent-danger)' },
        { id: 'auth-session', name: 'Session Validation', icon: <CheckCircle2 size={14} />, color: 'var(--accent-danger)' }
      ]
    },
    {
      id: 'validation',
      name: 'Validation',
      actions: [
        { id: 'val-load', name: 'Verify Page Loaded', icon: <CheckCircle2 size={14} />, color: 'var(--accent-success)' },
        { id: 'val-url', name: 'Verify URL', icon: <Link size={14} />, color: 'var(--accent-success)' },
        { id: 'val-title', name: 'Verify Page Title', icon: <FileText size={14} />, color: 'var(--accent-success)' },
        { id: 'val-exist', name: 'Verify Element Exists', icon: <Search size={14} />, color: 'var(--accent-success)' },
        { id: 'val-vis', name: 'Verify Element Visible', icon: <Eye size={14} />, color: 'var(--accent-success)' },
        { id: 'val-text', name: 'Verify Text Exists', icon: <Type size={14} />, color: 'var(--accent-success)' },
        { id: 'val-succ', name: 'Verify Success Message', icon: <CheckCircle2 size={14} />, color: 'var(--accent-success)' },
        { id: 'val-err', name: 'Verify Error Message', icon: <AlertCircle size={14} />, color: 'var(--accent-success)' },
        { id: 'val-search', name: 'Verify Search Results', icon: <Search size={14} />, color: 'var(--accent-success)' },
        { id: 'val-conf', name: 'Verify Confirmation Page', icon: <CheckCircle2 size={14} />, color: 'var(--accent-success)' },
        { id: 'val-dl', name: 'Verify Download Completed', icon: <Download size={14} />, color: 'var(--accent-success)' },
        { id: 'val-login', name: 'Verify Login Success', icon: <LogIn size={14} />, color: 'var(--accent-success)' }
      ]
    },
    {
      id: 'wait',
      name: 'Wait & Timing',
      actions: [
        { id: 'wait-gen', name: 'Wait', icon: <Hourglass size={14} />, color: 'var(--text-muted)' },
        { id: 'wait-el', name: 'Wait For Element', icon: <Timer size={14} />, color: 'var(--text-muted)' },
        { id: 'wait-url', name: 'Wait For URL', icon: <Clock size={14} />, color: 'var(--text-muted)' },
        { id: 'wait-load', name: 'Wait For Page Load', icon: <Activity size={14} />, color: 'var(--text-muted)' },
        { id: 'wait-res', name: 'Wait For Response', icon: <Network size={14} />, color: 'var(--text-muted)' }
      ]
    },
    {
      id: 'evidence',
      name: 'Evidence Capture',
      actions: [
        { id: 'ev-screen', name: 'Capture Screenshot', icon: <Camera size={14} />, color: 'var(--accent-primary)' },
        { id: 'ev-full', name: 'Capture Full Page Screenshot', icon: <Image size={14} />, color: 'var(--accent-primary)' },
        { id: 'ev-console', name: 'Capture Browser Console', icon: <Terminal size={14} />, color: 'var(--accent-primary)' },
        { id: 'ev-net', name: 'Capture Network Logs', icon: <Network size={14} />, color: 'var(--accent-primary)' },
        { id: 'ev-har', name: 'Capture HAR File', icon: <FileCode size={14} />, color: 'var(--accent-primary)' },
        { id: 'ev-trace', name: 'Capture Trace', icon: <Activity size={14} />, color: 'var(--accent-primary)' }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring Checks',
      actions: [
        { id: 'mon-res', name: 'Check Response Time', icon: <Timer size={14} />, color: 'var(--text-primary)' },
        { id: 'mon-load', name: 'Check Page Load Time', icon: <Activity size={14} />, color: 'var(--text-primary)' },
        { id: 'mon-ssl', name: 'Check SSL Certificate', icon: <ShieldCheck size={14} />, color: 'var(--text-primary)' },
        { id: 'mon-sslexp', name: 'Check SSL Expiry', icon: <ShieldCheck size={14} />, color: 'var(--text-primary)' },
        { id: 'mon-dns', name: 'Check DNS Resolution', icon: <Globe size={14} />, color: 'var(--text-primary)' },
        { id: 'mon-api', name: 'Check API Availability', icon: <Server size={14} />, color: 'var(--text-primary)' },
        { id: 'mon-apires', name: 'Check API Response Time', icon: <Zap size={14} />, color: 'var(--text-primary)' },
        { id: 'mon-mobile', name: 'Check Mobile Rendering', icon: <Smartphone size={14} />, color: 'var(--text-primary)' }
      ]
    },
    {
      id: 'notifications',
      name: 'Notifications',
      actions: [
        { id: 'not-inc', name: 'Create Incident', icon: <AlertCircle size={14} />, color: 'var(--accent-danger)' },
        { id: 'not-teams', name: 'Send Teams Alert', icon: <MessageSquare size={14} />, color: 'var(--accent-danger)' },
        { id: 'not-email', name: 'Send Email Alert', icon: <Mail size={14} />, color: 'var(--accent-danger)' },
        { id: 'not-hook', name: 'Trigger Webhook', icon: <Webhook size={14} />, color: 'var(--accent-danger)' }
      ]
    },
    {
      id: 'logic',
      name: 'Logic & Flow',
      actions: [
        { id: 'log-if', name: 'If Condition', icon: <GitBranch size={14} />, color: 'var(--accent-primary)' },
        { id: 'log-else', name: 'Else', icon: <GitBranch size={14} />, color: 'var(--accent-primary)' },
        { id: 'log-retry', name: 'Retry Step', icon: <Repeat size={14} />, color: 'var(--accent-primary)' },
        { id: 'log-stop', name: 'Stop Journey', icon: <PauseCircle size={14} />, color: 'var(--accent-primary)' },
        { id: 'log-end', name: 'End Journey', icon: <XCircle size={14} />, color: 'var(--accent-primary)' },
        { id: 'log-par', name: 'Run Parallel Steps', icon: <SkipForward size={14} />, color: 'var(--accent-primary)' }
      ]
    },
    {
      id: 'test-data',
      name: 'Test Data',
      actions: [
        { id: 'td-cred', name: 'Use Test Credential', icon: <KeyRound size={14} />, color: 'var(--accent-warning)' },
        { id: 'td-email', name: 'Generate Random Email', icon: <Mail size={14} />, color: 'var(--accent-warning)' },
        { id: 'td-phone', name: 'Generate Random Phone Number', icon: <Hash size={14} />, color: 'var(--accent-warning)' },
        { id: 'td-name', name: 'Generate Random Name', icon: <Users size={14} />, color: 'var(--accent-warning)' },
        { id: 'td-acc', name: 'Generate Test Account', icon: <Database size={14} />, color: 'var(--accent-warning)' }
      ]
    }
  ];

  const allActions = actionCategories.flatMap(c => c.actions);

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const [steps, setSteps] = useState(currentJourney.steps || [
    { id: 1, type: 'nav-open', label: 'Open URL', value: currentJourney.url || 'https://app.pulse.cx/login', icon: <Globe size={14} />, color: 'var(--accent-primary)' },
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
    setActiveStep(null);
    
    let statuses = {};
    steps.forEach(s => statuses[s.id] = 'pending');
    setStepStatuses({...statuses});

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      statuses[step.id] = 'running';
      setStepStatuses({...statuses});
      
      await new Promise(r => setTimeout(r, 600)); 
      
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
            <h1 style={{ fontWeight: '600', margin: 0 }}>{currentJourney.name}</h1>
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
        <div className="glass-panel" style={{ width: '18rem', padding: '0', display: 'flex', flexDirection: 'column', gap: '0', overflowY: 'auto' }}>
          <div style={{ padding: 'var(--panel-padding)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 10 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-primary)'}}>Actions Library</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Drag or click to add actions</div>
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
                      padding: '0.75rem 1rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isExpanded ? 'var(--bg-base)' : 'transparent',
                      transition: 'background 0.2s'
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
                          padding: '0.6rem 0.75rem', 
                          background: 'var(--bg-surface)', 
                          border: '1px solid var(--border-color)', 
                          borderRadius: 'var(--radius-sm)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.6rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
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
        <div 
          ref={canvasRef}
          id="canvas-viewport"
          className="glass-panel" 
          style={{ 
            flex: 1, 
            display: 'flex', 
            overflow: 'hidden', 
            background: '#f1f5f9', // Soft diagram canvas grey
            position: 'relative',
            cursor: isDraggingCanvas ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        >
          {/* Zoom Controls */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', zIndex: 100 }}>
            <button className="btn-icon" onClick={() => setZoom(z => Math.max(0.3, z - 0.1))} title="Zoom Out" style={{ width: '28px', height: '28px' }}>-</button>
            <span style={{ fontSize: '0.75rem', fontWeight: '500', width: '40px', textAlign: 'center', userSelect: 'none' }}>{Math.round(zoom * 100)}%</span>
            <button className="btn-icon" onClick={() => setZoom(z => Math.min(3, z + 0.1))} title="Zoom In" style={{ width: '28px', height: '28px' }}>+</button>
            <div style={{ width: '1px', height: '16px', background: 'var(--border-color)', margin: '0 4px' }}></div>
            <button className="btn-icon" onClick={resetCanvas} title="Reset View" style={{ width: '28px', height: '28px' }}><RefreshCw size={14} /></button>
          </div>

          {/* Pan & Zoom Wrapper */}
          <div 
            style={{ 
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              transition: isDraggingCanvas ? 'none' : 'transform 0.1s ease-out',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              minWidth: 'min-content'
            }}
          >
            <div className="flex-col items-center gap-0" style={{ width: '40rem' }}>
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
                  <div style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)', background: activeStep === step.id ? 'var(--bg-surface-hover)' : 'transparent', borderBottom: activeStep === step.id ? '1px solid var(--border-color)' : 'none' }}>
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

                  {/* Inline Configuration */}
                  {activeStep === step.id && (
                    <div className="animate-fade-in" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)', background: 'var(--bg-surface)' }}>
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
                        <label className="flex items-center justify-between" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                          CSS Selector / Value <span className="text-success" style={{ fontSize: '0.65rem', fontWeight: '500' }}>Valid ✓</span>
                        </label>
                        <input type="text" value={step.value} onChange={e => updateStep(step.id, 'value', e.target.value)} style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--accent-success)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.75rem' }} />
                      </div>

                      {step.type && step.type.startsWith('act-text') && (
                        <div className="flex-col gap-1">
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Input Text Value</label>
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
                <div className="animate-fade-in" style={{ position: 'absolute', bottom: 'calc(100% + 0.5rem)', left: 0, right: 0, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem', boxShadow: 'var(--shadow-lg)', zIndex: 10, maxHeight: '300px', overflowY: 'auto' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', padding: '0.25rem 0.5rem', marginBottom: '0.25rem' }}>Select Action Category</div>
                  {actionCategories.map(category => (
                    <div key={category.id} style={{ marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{category.name}</div>
                      {category.actions.map(action => (
                        <div key={action.id} onClick={(e) => { e.stopPropagation(); addStep(action); setShowActionMenu(false); }} className="hover:bg-[var(--bg-surface-hover)]" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ color: action.color }}>{action.icon}</div>
                          <span style={{ fontSize: '0.8125rem' }}>{action.name}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              <button className="btn btn-ghost" onClick={(e) => { e.stopPropagation(); setShowActionMenu(!showActionMenu); }} style={{ borderStyle: 'dashed', width: '100%', padding: 'var(--panel-padding)' }}>
                + Add Step
              </button>
            </div>
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
