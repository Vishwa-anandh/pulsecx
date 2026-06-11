import React, { useState } from 'react';
import { Smartphone, Activity, CheckCircle, Apple, MonitorSmartphone, Wifi, BatteryCharging, Zap, Filter, Search } from 'lucide-react';

export default function MobileHub() {
  const [activeTab, setActiveTab] = useState('Device Monitoring');

  const renderDeviceMonitoring = () => (
    <div className="grid grid-cols-2 gap-6 animate-fade-in">
      {/* Android Device Stats */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MonitorSmartphone size={20} />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Android</h3>
        </div>
        <div className="flex-col gap-4">
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Active Sessions</span>
            <span style={{ fontWeight: '600' }}>42,501</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Crash-Free Users</span>
            <span style={{ fontWeight: '600', color: 'var(--accent-success)' }}>99.1%</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Avg App Start Time</span>
            <span style={{ fontWeight: '600' }}>1.2s</span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)'}}>OS Distribution</span>
            <div className="flex gap-1" style={{ height: '8px', marginTop: '0.5rem', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="tooltip-container" data-tooltip="Android 14 (60%)" style={{ width: '60%', background: 'var(--accent-success)' }}></div>
              <div className="tooltip-container" data-tooltip="Android 13 (25%)" style={{ width: '25%', background: 'var(--accent-warning)' }}></div>
              <div className="tooltip-container" data-tooltip="Older (15%)" style={{ width: '15%', background: 'var(--border-highlight)' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Device Stats */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Apple size={20} />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>iPhone (iOS)</h3>
        </div>
        <div className="flex-col gap-4">
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Active Sessions</span>
            <span style={{ fontWeight: '600' }}>58,102</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Crash-Free Users</span>
            <span style={{ fontWeight: '600', color: 'var(--accent-success)' }}>99.8%</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Avg App Start Time</span>
            <span style={{ fontWeight: '600' }}>0.8s</span>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)'}}>OS Distribution</span>
            <div className="flex gap-1" style={{ height: '8px', marginTop: '0.5rem', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="tooltip-container" data-tooltip="iOS 17 (80%)" style={{ width: '80%', background: 'var(--accent-primary)' }}></div>
              <div className="tooltip-container" data-tooltip="iOS 16 (15%)" style={{ width: '15%', background: 'var(--accent-warning)' }}></div>
              <div className="tooltip-container" data-tooltip="Older (5%)" style={{ width: '5%', background: 'var(--border-highlight)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMobileJourneys = () => (
    <div className="flex-col gap-6 animate-fade-in">
      {[
        { name: 'Login Flow', steps: [{n:'App Open', v:100}, {n:'Input Creds', v:85}, {n:'MFA', v:78}, {n:'Success', v:75}], color: 'var(--accent-primary)' },
        { name: 'Payment Flow', steps: [{n:'Cart', v:100}, {n:'Shipping', v:65}, {n:'Card Entry', v:45}, {n:'Success', v:40}], color: 'var(--accent-success)' },
        { name: 'Search Flow', steps: [{n:'Home', v:100}, {n:'Search Tap', v:50}, {n:'Query Entered', v:45}, {n:'Result Click', v:30}], color: 'var(--accent-warning)' }
      ].map((flow, i) => (
        <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>{flow.name}</h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Last 24 Hours</span>
          </div>
          <div className="flex gap-2" style={{ height: '120px', alignItems: 'flex-end' }}>
            {flow.steps.map((step, j) => (
              <div key={j} className="flex-col items-center" style={{ flex: 1, gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{step.v}%</span>
                <div style={{ width: '100%', height: `${step.v}%`, background: flow.color, opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.n}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderAnalytics = () => (
    <div className="grid grid-cols-2 gap-6 animate-fade-in">
      {/* Device Performance Chart */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={16} className="text-warning"/> UI Render Delay (ms)
        </h3>
        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderBottom: '1px solid var(--border-color)' }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const val = 10 + Math.random() * 20 + (i === 12 ? 40 : 0);
            return (
              <div key={i} className="tooltip-container" data-tooltip={`${Math.floor(val)}ms`} style={{ flex: 1, height: `${val}%`, background: val > 40 ? 'var(--accent-warning)' : 'var(--accent-primary)', borderRadius: '2px 2px 0 0', opacity: 0.8 }}></div>
            );
          })}
        </div>
      </div>

      {/* Network Performance Chart */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wifi size={16} className="text-secondary"/> Network Latency (5G vs WiFi)
        </h3>
        <div style={{ height: '200px', position: 'relative', borderBottom: '1px solid var(--border-color)' }}>
          {/* Mock line chart using SVG */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            {/* 5G line */}
            <polyline points="0,60 20,55 40,65 60,40 80,50 100,45" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />
            {/* WiFi line */}
            <polyline points="0,80 20,78 40,82 60,75 80,79 100,81" fill="none" stroke="var(--accent-success)" strokeWidth="2" strokeDasharray="4" />
          </svg>
          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.7rem' }}>
            <div className="flex items-center gap-2"><div style={{ width: '10px', height: '2px', background: 'var(--accent-primary)' }}></div> 5G/LTE (~85ms)</div>
            <div className="flex items-center gap-2"><div style={{ width: '10px', height: '2px', background: 'var(--accent-success)' }}></div> WiFi (~25ms)</div>
          </div>
        </div>
      </div>
      
      <div className="col-span-2 glass-panel" style={{ padding: '1.5rem' }}>
         <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BatteryCharging size={16} className="text-success"/> Battery Impact
        </h3>
        <div className="flex items-center gap-8">
          <div className="flex-col gap-1" style={{ flex: 1 }}>
            <div className="flex justify-between" style={{ fontSize: '0.8125rem' }}><span>Video Playback</span> <span style={{ color: 'var(--accent-warning)' }}>High Impact</span></div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--accent-warning)', borderRadius: '4px' }}></div>
            </div>
          </div>
          <div className="flex-col gap-1" style={{ flex: 1 }}>
            <div className="flex justify-between" style={{ fontSize: '0.8125rem' }}><span>Background Sync</span> <span style={{ color: 'var(--accent-success)' }}>Low Impact</span></div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px' }}>
              <div style={{ width: '15%', height: '100%', background: 'var(--accent-success)', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Mobile Experience</h1>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Track native app performance, user journeys, and crash analytics across Android and iOS.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost"><Filter size={14} /> Filter</button>
        </div>
      </div>

      {/* 8.1 KPI Header */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Smartphone size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>9.4/10</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Mobile Experience Score (Apdex)</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>98.2%</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Mobile Success Rate</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
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
