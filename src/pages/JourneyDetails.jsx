import React, { useState, useMemo } from 'react';
import { ArrowLeft, Play, Settings, Clock, Globe, Image as ImageIcon, CheckCircle, XCircle, Download, Activity } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const successData = [
  { time: '00:00', rate: 100 },
  { time: '04:00', rate: 100 },
  { time: '08:00', rate: 98 },
  { time: '12:00', rate: 85 },
  { time: '16:00', rate: 95 },
  { time: '20:00', rate: 100 },
  { time: '24:00', rate: 100 },
];

const geoData = [
  { name: 'US East', ms: 120 },
  { name: 'US West', ms: 145 },
  { name: 'EU Central', ms: 85 },
  { name: 'AP Tokyo', ms: 210 },
  { name: 'SA Brazil', ms: 305 },
];

const executions = [
  { id: 'run-8831', status: 'Passed', duration: '2.4s', location: 'US East (N. Virginia)', time: '2 mins ago' },
  { id: 'run-8830', status: 'Failed', duration: '12.1s', location: 'EU (Frankfurt)', time: '17 mins ago' },
  { id: 'run-8829', status: 'Passed', duration: '2.1s', location: 'US West (Oregon)', time: '32 mins ago' },
];

const failedRunSteps = [
  { step: 1, name: 'Navigate to Checkout', status: 'passed', time: '800ms' },
  { step: 2, name: 'Enter Payment Info', status: 'passed', time: '450ms' },
  { step: 3, name: 'Click Submit Order', status: 'passed', time: '120ms' },
  { step: 4, name: 'Assert Order Confirmation', status: 'failed', time: '10000ms', error: 'Timeout: Element .confirmation-message not found after 10s' },
];

export default function JourneyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedRun, setSelectedRun] = useState(executions[1]); // Default to the failed one for demo
  const [timeframe, setTimeframe] = useState('24H');

  const handleRunNow = () => {
    // Execution logic here
  };

  // Mock shifting data when timeframe changes
  const displaySuccessData = useMemo(() => {
    if (timeframe === '1H') return successData.map(d => ({...d, rate: Math.max(50, d.rate - 10)}));
    if (timeframe === '7D') return successData.map(d => ({...d, rate: Math.min(100, d.rate + 5)}));
    if (timeframe === '30D') return successData.map(d => ({...d, rate: Math.random() * 20 + 80}));
    return successData;
  }, [timeframe]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Sticky Header */}
      <div className="flex justify-between items-center" style={{ padding: '0 0 1.5rem 0', position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-base)', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <div className="flex items-center gap-4">
          <button className="btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%' }} onClick={() => navigate('/journeys')}>
            <ArrowLeft size={18} />
          </button>
          <div className="flex-col gap-1">
            <nav className="flex items-center gap-2 text-muted" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-[var(--text-primary)]" onClick={() => navigate('/journeys')}>Journeys</span>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>Checkout Payment Flow</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 style={{ margin: 0 }}>Checkout Payment Flow</h1>
              <div className="badge badge-warning">Warning</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', padding: '0.2rem 0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-success)', boxShadow: '0 0 8px var(--accent-success)' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: '600'}}>Live System Status</span>
              </div>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>{id || 'J-209'} • Created by Admin • Last edited 2 days ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1" style={{ background: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {['1H', '24H', '7D', '30D'].map(tf => (
              <button 
                key={tf}
                className="btn btn-ghost" 
                onClick={() => setTimeframe(tf)}
                style={{ 
                  padding: '0.25rem 0.75rem', 
                  border: 'none',
                  background: timeframe === tf ? 'var(--bg-surface-hover)' : 'transparent',
                  color: timeframe === tf ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={() => navigate('/journeys/builder')}><Settings size={14} /> Edit Workflow</button>
            <button className="btn btn-primary" onClick={handleRunNow}><Play size={14} /> Run Now</button>
          </div>
        </div>
      </div>

      {/* Unified Scrolling Content */}
      <div style={{ paddingBottom: '4rem', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
        
        {/* Row 1: Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="glass-panel" style={{ padding: 'var(--panel-padding)', position: 'relative', overflow: 'hidden' }}>
            <div className="text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>Success Rate</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-warning)' }}>85.2%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-danger)', fontWeight: '600', marginTop: '0.5rem' }}>↓ 1.4% from last week</div>
          </div>
          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <div className="text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>Avg Duration</div>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>3.1s</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-success)', fontWeight: '600', marginTop: '0.5rem' }}>↑ 0.2s faster</div>
          </div>
          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <div className="text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total Runs</div>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>3,200</div>
          </div>
          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <div className="text-secondary" style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>Failing Locations</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-danger)' }}>1</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '0.5rem' }}>EU (Frankfurt)</div>
          </div>
        </div>

        {/* Row 2: Analytics Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ color: 'var(--text-secondary)' }}>Response Time Distribution</h3>
              <button className="btn-icon" style={{ color: 'var(--text-muted)' }} title="Export Chart"><Download size={14}/></button>
            </div>
            <div style={{ height: '15.625rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displaySuccessData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-success)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-success)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[50, 100]} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }} />
                  <Area type="monotone" dataKey="rate" stroke="var(--accent-success)" strokeWidth={2} fillOpacity={1} fill="url(#colorSuccess)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Geographic Latency (ms)</h3>
            </div>
            <div style={{ height: '15.625rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geoData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                  <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} width={80} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: 'var(--radius-sm)' }} cursor={{fill: 'var(--bg-surface-hover)'}}/>
                  <Bar dataKey="ms" fill="var(--accent-primary)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Row 3: Executions & Waterfall */}
        <div className="grid grid-cols-3 gap-4" style={{ alignItems: 'start' }}>
          
          {/* Execution List */}
          <div className="glass-panel" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-between items-center" style={{ padding: 'var(--panel-padding)', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: '600' }}>Recent Executions</span>
              <div className="flex gap-2">
                <span className="badge badge-primary" style={{ cursor: 'pointer' }}>All</span>
                <span className="badge" style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>Failed</span>
              </div>
            </div>
            <div style={{ maxHeight: '25rem', overflowY: 'auto' }}>
              {executions.map(run => (
                <div 
                  key={run.id}
                  onClick={() => setSelectedRun(run)}
                  style={{ 
                    padding: 'var(--panel-padding)', 
                    borderBottom: '1px solid var(--border-color)', 
                    cursor: 'pointer',
                    background: selectedRun?.id === run.id ? 'var(--bg-surface-hover)' : 'transparent',
                    borderLeft: selectedRun?.id === run.id ? `3px solid ${run.status === 'Passed' ? 'var(--accent-success)' : 'var(--accent-danger)'}` : '3px solid transparent'
                  }}
                  className="hover:bg-[var(--bg-surface-hover)]"
                >
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '600', color: run.status === 'Passed' ? 'var(--accent-success)' : 'var(--accent-danger)' }}>{run.status}</span>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{run.time}</span>
                  </div>
                  <div className="flex items-center gap-4 text-secondary" style={{ fontSize: '0.75rem' }}>
                    <div className="flex items-center gap-1"><Globe size={12} /> {run.location}</div>
                    <div className="flex items-center gap-1"><Clock size={12} /> {run.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Details (Waterfall & Screenshot) */}
          {selectedRun && (
            <div className="col-span-2 flex-col gap-4">
              <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>Execution Details: {selectedRun.id}</h3>
                    <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>{selectedRun.location} • {selectedRun.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost"><Activity size={14} /> View Network</button>
                    <button className="btn btn-ghost"><ImageIcon size={14} /> View Full Video</button>
                  </div>
                </div>
                
                <div className="flex-col gap-0" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  {failedRunSteps.map((step, i) => (
                    <div key={i} style={{ padding: 'var(--panel-padding)', borderBottom: i < failedRunSteps.length - 1 ? '1px solid var(--border-color)' : 'none', background: step.status === 'failed' ? 'rgba(239,68,68,0.05)' : 'var(--bg-base)' }}>
                      <div className="flex justify-between items-center" style={{ marginBottom: step.error ? '0.75rem' : '0' }}>
                        <div className="flex items-center gap-3">
                          {step.status === 'passed' ? <CheckCircle size={16} className="text-success" /> : <XCircle size={16} className="text-danger" />}
                          <span style={{ fontWeight: '500', fontSize: '0.8125rem' }}>{step.step}. {step.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {step.status === 'failed' && <button className="btn btn-primary" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>Fix this Step</button>}
                          <span className="text-muted" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{step.time}</span>
                        </div>
                      </div>
                      {step.error && (
                        <div style={{ background: '#1E1E1E', padding: 'var(--panel-padding)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.75rem', color: '#F14C4C', border: '1px solid #333' }}>
                          {step.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedRun.status === 'Failed' && (
                <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>DOM Snapshot</h3>
                    <button className="btn btn-ghost text-primary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>View Source HTML</button>
                  </div>
                  <div style={{ width: '100%', height: '18.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--panel-gap)', color: 'var(--text-muted)', position: 'relative', overflow: 'hidden' }}>
                    <ImageIcon size={48} opacity={0.5} />
                    <span style={{ fontSize: '0.8125rem' }}>Screenshot captured at point of failure</span>
                    
                    {/* Fake progress/scrubber bar for video replay */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2.5rem', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: 'var(--panel-gap)' }}>
                      <Play size={14} className="text-primary" style={{ cursor: 'pointer' }} />
                      <div style={{ flex: 1, height: '4px', background: 'var(--bg-surface)', borderRadius: '2px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '85%', background: 'var(--accent-primary)', borderRadius: '2px' }} />
                        <div style={{ position: 'absolute', top: '-4px', left: '85%', width: '12px', height: '12px', background: 'white', borderRadius: '50%', boxShadow: '0 0 4px rgba(0,0,0,0.5)', cursor: 'pointer' }} />
                      </div>
                      <span style={{ fontSize: '0.65rem', fontFamily: 'monospace' }}>12.1s / 12.1s</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
