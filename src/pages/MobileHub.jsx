import React, { useState } from 'react';
import { Smartphone, Activity, CheckCircle, Apple, MonitorSmartphone, Wifi, BatteryCharging, Zap, Filter, Search, Play, RotateCcw } from 'lucide-react';
import { useMobile } from '../context/MobileContext';
import { useUsers } from '../context/UserContext';
import EmptyState from '../components/EmptyState';

export default function MobileHub() {
  const { currentUser } = useUsers();
  const { mobileState, simulateTrafficSpike, resetMetrics } = useMobile();
  const [activeTab, setActiveTab] = useState('Device Monitoring');

  if (!currentUser?.isDemo) {
    return (
      <EmptyState 
        title="Mobile Experience" 
        description="Connect your iOS and Android apps to monitor performance, crashes, and user journeys." 
      />
    );
  }

  const { deviceStats, journeys, analytics, isSpiking } = mobileState;

  const renderDeviceMonitoring = () => (
    <div className="grid grid-cols-2 gap-4 animate-fade-in">
      {/* Android Device Stats */}
      <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MonitorSmartphone size={20} />
          </div>
          <h3 style={{ margin: 0 }}>Android</h3>
        </div>
        <div className="flex-col gap-4">
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Active Sessions</span>
            <span style={{ fontWeight: '600' }}>{deviceStats.android.sessions.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Crash-Free Users</span>
            <span style={{ fontWeight: '600', color: deviceStats.android.crashFree < 95 ? 'var(--accent-danger)' : 'var(--accent-success)' }}>{deviceStats.android.crashFree}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Avg App Start Time</span>
            <span style={{ fontWeight: '600', color: deviceStats.android.startupTime > 2 ? 'var(--accent-danger)' : 'var(--text-primary)' }}>{deviceStats.android.startupTime}s</span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)'}}>OS Distribution</span>
            <div className="flex gap-1" style={{ height: '8px', marginTop: '0.5rem', borderRadius: '4px', overflow: 'hidden' }}>
              {deviceStats.android.osDist.map(os => (
                <div key={os.name} className="tooltip-container" data-tooltip={`${os.name} (${os.percentage}%)`} style={{ width: `${os.percentage}%`, background: os.color }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* iOS Device Stats */}
      <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Apple size={20} />
          </div>
          <h3 style={{ margin: 0 }}>iPhone (iOS)</h3>
        </div>
        <div className="flex-col gap-4">
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Active Sessions</span>
            <span style={{ fontWeight: '600' }}>{deviceStats.ios.sessions.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Crash-Free Users</span>
            <span style={{ fontWeight: '600', color: deviceStats.ios.crashFree < 95 ? 'var(--accent-danger)' : 'var(--accent-success)' }}>{deviceStats.ios.crashFree}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Avg App Start Time</span>
            <span style={{ fontWeight: '600', color: deviceStats.ios.startupTime > 2 ? 'var(--accent-danger)' : 'var(--text-primary)' }}>{deviceStats.ios.startupTime}s</span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)'}}>OS Distribution</span>
            <div className="flex gap-1" style={{ height: '8px', marginTop: '0.5rem', borderRadius: '4px', overflow: 'hidden' }}>
              {deviceStats.ios.osDist.map(os => (
                <div key={os.name} className="tooltip-container" data-tooltip={`${os.name} (${os.percentage}%)`} style={{ width: `${os.percentage}%`, background: os.color }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMobileJourneys = () => (
    <div className="flex-col gap-4 animate-fade-in">
      {journeys.map((flow, i) => (
        <div key={i} className="glass-panel" style={{ padding: 'var(--panel-padding)', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle background glow */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: flow.color, opacity: 0.05, filter: 'blur(40px)', borderRadius: '50%' }}></div>
          
          <div className="flex items-center justify-between" style={{ marginBottom: '2.5rem' }}>
            <div className="flex-col gap-1">
              <h3 style={{ margin: 0, fontWeight: '600' }}>{flow.name}</h3>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Conversion Funnel • Last 24 Hours</span>
            </div>
            <div className="badge" style={{ background: 'var(--bg-base)', border: `1px solid ${flow.color}`, color: flow.color, padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}>
              Overall Conversion: <strong>{flow.steps[flow.steps.length - 1].v}%</strong>
            </div>
          </div>
          
          <div className="flex items-start" style={{ width: '100%', position: 'relative' }}>
            {flow.steps.map((step, j) => (
              <React.Fragment key={j}>
                <div className="flex-col items-center" style={{ flex: '0 0 auto', width: '120px', zIndex: 1 }}>
                  <div className="flex items-center justify-center" style={{ 
                    width: '74px', height: '74px', 
                    borderRadius: '50%', 
                    background: 'var(--bg-surface)', 
                    border: `3px solid ${j === 0 ? 'var(--accent-success)' : flow.color}`,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>{step.v}%</span>
                  </div>
                  <span style={{ marginTop: '1rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', textAlign: 'center' }}>{step.n}</span>
                </div>

                {j < flow.steps.length - 1 && (
                  <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {/* Base Line */}
                    <div style={{ position: 'absolute', top: '35px', left: 0, width: '100%', height: '4px', background: 'var(--bg-base)', zIndex: 0 }}></div>
                    {/* Filled Line */}
                    <div style={{ position: 'absolute', top: '35px', left: 0, width: '100%', height: '4px', background: flow.color, opacity: (step.v + flow.steps[j+1].v) / 200, zIndex: 0, transition: 'all 0.5s ease' }}></div>
                    
                    {/* Drop-off Badge */}
                    <div className="animate-fade-in" style={{ 
                      marginTop: '70px', 
                      padding: '0.35rem 0.75rem', 
                      color: 'var(--accent-danger)', 
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      whiteSpace: 'nowrap',
                      zIndex: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      -{step.v - flow.steps[j+1].v}% drop
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderAnalytics = () => (
    <div className="grid grid-cols-2 gap-4 animate-fade-in">
      {/* Device Performance Chart */}
      <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={16} className="text-warning"/> UI Render Delay (ms)
        </h3>
        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderBottom: '1px solid var(--border-color)' }}>
          {analytics.uiDelays.map((val, i) => (
            <div key={i} className="tooltip-container" data-tooltip={`${Math.floor(val)}ms`} style={{ flex: 1, height: `${Math.min(val, 100)}%`, background: val > 40 ? 'var(--accent-warning)' : 'var(--accent-primary)', borderRadius: '2px 2px 0 0', opacity: 0.8, transition: 'all 0.5s ease' }}></div>
          ))}
        </div>
      </div>

      {/* Network Performance Chart */}
      <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wifi size={16} className="text-secondary"/> Network Latency (5G vs WiFi)
        </h3>
        <div style={{ height: '200px', position: 'relative', borderBottom: '1px solid var(--border-color)' }}>
          {/* Mock line chart using SVG */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            {/* 5G line */}
            <polyline points={`0,${isSpiking ? 80 : 60} 20,${isSpiking ? 75 : 55} 40,${isSpiking ? 85 : 65} 60,${isSpiking ? 60 : 40} 80,${isSpiking ? 70 : 50} 100,${isSpiking ? 65 : 45}`} fill="none" stroke="var(--accent-primary)" strokeWidth="2" style={{ transition: 'all 0.5s ease' }} />
            {/* WiFi line */}
            <polyline points={`0,${isSpiking ? 95 : 80} 20,${isSpiking ? 90 : 78} 40,${isSpiking ? 92 : 82} 60,${isSpiking ? 85 : 75} 80,${isSpiking ? 89 : 79} 100,${isSpiking ? 91 : 81}`} fill="none" stroke="var(--accent-success)" strokeWidth="2" strokeDasharray="4" style={{ transition: 'all 0.5s ease' }} />
          </svg>
          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.7rem' }}>
            <div className="flex items-center gap-2"><div style={{ width: '10px', height: '2px', background: 'var(--accent-primary)' }}></div> 5G/LTE {isSpiking ? '(~200ms)' : '(~85ms)'}</div>
            <div className="flex items-center gap-2"><div style={{ width: '10px', height: '2px', background: 'var(--accent-success)' }}></div> WiFi {isSpiking ? '(~120ms)' : '(~25ms)'}</div>
          </div>
        </div>
      </div>
      
      <div className="col-span-2 glass-panel" style={{ padding: 'var(--panel-padding)' }}>
         <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BatteryCharging size={16} className="text-success"/> Battery Impact
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex-col gap-1" style={{ flex: 1 }}>
            <div className="flex justify-between" style={{ fontSize: '0.8125rem' }}><span>Video Playback</span> <span style={{ color: 'var(--accent-warning)' }}>High Impact</span></div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px' }}>
              <div style={{ width: `${analytics.battery.video}%`, height: '100%', background: 'var(--accent-warning)', borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>
          <div className="flex-col gap-1" style={{ flex: 1 }}>
            <div className="flex justify-between" style={{ fontSize: '0.8125rem' }}><span>Background Sync</span> <span style={{ color: 'var(--accent-success)' }}>Low Impact</span></div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px' }}>
              <div style={{ width: `${analytics.battery.sync}%`, height: '100%', background: 'var(--accent-success)', borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="flex-col gap-4 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Mobile Experience</h1>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Track native app performance, user journeys, and crash analytics across Android and iOS.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost tooltip-container" onClick={simulateTrafficSpike} disabled={isSpiking} data-tooltip="Simulate Traffic Spike">
            <Play size={14} className={isSpiking ? "text-danger" : ""} /> {isSpiking ? "Spike Active" : "Simulate Spike"}
          </button>
          <button className="btn btn-ghost tooltip-container" onClick={resetMetrics} disabled={!isSpiking} data-tooltip="Reset to Baseline">
            <RotateCcw size={14} /> Reset
          </button>
          <button className="btn btn-ghost"><Filter size={14} /> Filter</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Smartphone size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1, color: isSpiking ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{isSpiking ? '6.8/10' : '9.4/10'}</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Mobile Experience Score (Apdex)</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1, color: isSpiking ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{isSpiking ? '93.7%' : '98.2%'}</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Mobile Success Rate</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        {['Device Monitoring', 'Mobile Journeys', 'Analytics'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '0.75rem 0', 
              background: 'transparent', 
              border: 'none', 
              borderBottom: `2px solid ${activeTab === tab ? 'var(--accent-primary)' : 'transparent'}`,
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab ? '600' : '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ paddingTop: '0.5rem' }}>
        {activeTab === 'Device Monitoring' && renderDeviceMonitoring()}
        {activeTab === 'Mobile Journeys' && renderMobileJourneys()}
        {activeTab === 'Analytics' && renderAnalytics()}
      </div>
    </div>
  );
}
