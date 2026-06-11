import React, { useState, useMemo } from 'react';
import { Activity, CheckCircle, XCircle, PauseCircle, Play, Pause, Edit2, Globe, Smartphone, Monitor as MonitorIcon, Clock, FileText, ChevronDown, ChevronUp, Copy, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useUsers } from '../context/UserContext';
import EmptyState from '../components/EmptyState';

import mockData from '../data/mockDatabase.json';

const { syntheticMonitors, browserMetrics, mobileData, locationsData, initialLogs } = mockData.monitoring;

// Helper to generate sparkline data
const generateTrendData = (base, volatility) => {
  return Array.from({ length: 15 }).map((_, i) => ({
    time: i,
    val: Math.max(0, base + (Math.random() * volatility * 2 - volatility))
  }));
};

function MetricCard({ title, value, icon, color }) {
  return (
    <div className="glass-panel glow-card" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: '0.25rem', '--card-color': color }}>
      <div className="flex justify-between items-start">
        <span style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8125rem' }}>{title}</span>
        <div style={{ padding: '0.4rem', background: `rgba(${color}, 0.1)`, borderRadius: 'var(--radius-sm)' }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', marginTop: '-0.5rem' }}>{value}</div>
    </div>
  );
}

export default function MonitoringDashboard() {
  const { currentUser } = useUsers();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [logsCollapsed, setLogsCollapsed] = useState(false);

  if (!currentUser?.isDemo) {
    return (
      <EmptyState 
        title="Proactive Monitoring" 
        description="Set up synthetic tests and browser monitoring to ensure site availability." 
      />
    );
  }
  
  const [logs, setLogs] = useState(initialLogs);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedGroups, setExpandedGroups] = useState({ 'Success': true, 'Failed': true });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    const sorted = [...logs].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setLogs(sorted);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={12} className="text-muted" style={{ marginLeft: '4px' }} />;
    return sortConfig.direction === 'asc' ? 
      <ArrowUp size={12} style={{ marginLeft: '4px', color: 'var(--text-primary)' }} /> : 
      <ArrowDown size={12} style={{ marginLeft: '4px', color: 'var(--text-primary)' }} />;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Enhance browser metrics with trend data only once
  const enhancedBrowserMetrics = useMemo(() => {
    return browserMetrics.map(m => {
      const baseVal = parseFloat(m.value) || 100;
      const volatility = m.value.includes('s') ? 0.2 : 5;
      return { ...m, trendData: generateTrendData(baseVal, volatility) };
    });
  }, []);

  return (
    <div className="flex-col gap-4 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>Monitoring Dashboard</h1>
            <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Proactive tracking of synthetic workflows, real users, and regional performance.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`pulse-indicator ${autoRefresh ? 'pulse-success' : ''}`} style={{ width: '8px', height: '8px', background: autoRefresh ? 'var(--accent-success)' : 'var(--text-muted)' }}></span>
            <span style={{ fontSize: '0.75rem', fontWeight: '500', color: autoRefresh ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              Live Data
            </span>
          </div>
          <button 
            className={`btn ${autoRefresh ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? 'Auto-refresh: ON (5s)' : 'Auto-refresh: OFF'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Active Monitors" value="24" icon={<Activity size={18} color="var(--accent-primary)" />} color="59, 130, 246" />
        <MetricCard title="Running" value="21" icon={<CheckCircle size={18} color="var(--accent-success)" />} color="16, 185, 129" />
        <MetricCard title="Failed" value="1" icon={<XCircle size={18} color="var(--accent-danger)" />} color="239, 68, 68" />
        <MetricCard title="Paused" value="2" icon={<PauseCircle size={18} color="var(--accent-warning)" />} color="245, 158, 11" />
      </div>

      {/* Row 2: Visual Widgets in 3 Columns */}
      <div className="grid grid-cols-3 gap-4">
        
        {/* Browser Performance (Sparklines) */}
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MonitorIcon size={16} color="var(--accent-purple)" />
            <h3 style={{ margin: 0 }}>Browser Performance</h3>
          </div>
          <div className="flex-col gap-3" style={{ flex: 1 }}>
            {enhancedBrowserMetrics.map(metric => (
              <div key={metric.name} className="flex justify-between items-center gap-2" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                <div className="flex-col gap-1" style={{ paddingLeft: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{metric.name}</span>
                  <div className="flex items-end gap-2">
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>{metric.value}</span>
                  </div>
                </div>
                <div style={{ width: '80px', height: '30px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metric.trendData}>
                      <Line type="monotone" dataKey="val" stroke={metric.status === 'success' ? 'var(--accent-success)' : metric.status === 'warning' ? 'var(--accent-warning)' : 'var(--accent-danger)'} strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Latency (Radar) */}
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={16} color="var(--accent-success)" />
            <h3 style={{ margin: 0 }}>Global Latency</h3>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={locationsData}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="region" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
                <Radar name="Latency" dataKey="val" stroke="var(--accent-primary)" fill="var(--accent-primary-glow)" fillOpacity={0.6} />
                <RechartsTooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.75rem' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mobile Monitoring (BarChart) */}
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={16} color="var(--accent-primary)" />
            <h3 style={{ margin: 0 }}>Mobile UX Scores</h3>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mobileData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="subject" tick={{fontSize: 10, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 10, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'var(--bg-surface-hover)'}} contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.75rem' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} iconType="circle" />
                <Bar dataKey="Android" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="iOS" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 3: Synthetic Monitors (30%) and Execution Logs (70%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 7fr', gap: 'var(--panel-gap)' }}>
        
        {/* Synthetic Monitors (30%) */}
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--panel-padding)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={16} color="var(--accent-primary)" />
          <h3 style={{ margin: 0 }}>Synthetic Monitors</h3>
        </div>
        <div style={{ flex: 1, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '400px' }} role="table">
            <caption className="sr-only">Synthetic Monitors</caption>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Monitor</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {syntheticMonitors.map((mon, i) => (
                <tr key={mon.id} className="hover-bg-surface-hover" style={{ borderBottom: i === syntheticMonitors.length - 1 ? 'none' : '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{mon.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{mon.id}</div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                        <Clock size={10} /> {mon.frequency}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className={`badge ${mon.status === 'Running' ? 'badge-success' : mon.status === 'Failed' ? 'badge-danger' : 'badge-warning'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {(mon.status === 'Running' || mon.status === 'Failed') && (
                        <span className={`pulse-indicator ${mon.status === 'Running' ? 'pulse-success' : 'pulse-danger'}`} style={{ width: '6px', height: '6px', background: 'currentColor' }}></span>
                      )}
                      {mon.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="btn-ghost tooltip-container" title="Run Now" style={{ padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Play size={14} /></button>
                      <button className="btn-ghost tooltip-container" title="Pause" style={{ padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pause size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Execution Logs (70%) */}
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div 
          style={{ padding: 'var(--panel-padding)', borderBottom: logsCollapsed ? 'none' : '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => setLogsCollapsed(!logsCollapsed)}
        >
          <div className="flex items-center gap-0.5">
            <FileText size={16} color="var(--text-muted)" />
            <h3 style={{ margin: 0, marginLeft: '0.5rem' }}>Recent Execution Logs</h3>
          </div>
          {logsCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>
        
        {!logsCollapsed && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} role="table">
            <caption className="sr-only">Active Global Execution Nodes</caption>
            <thead>
              <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Log ID</th>
                <th 
                  style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => handleSort('time')}
                >
                  <div className="flex items-center">Execution Time {getSortIcon('time')}</div>
                </th>
                <th 
                  style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => handleSort('duration')}
                >
                  <div className="flex items-center">Duration {getSortIcon('duration')}</div>
                </th>
                <th 
                  style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => handleSort('result')}
                >
                  <div className="flex items-center">Result {getSortIcon('result')}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {['Failed', 'Success'].map(group => {
                const groupLogs = logs.filter(l => l.result === group);
                if (groupLogs.length === 0) return null;
                const isExpanded = expandedGroups[group];
                return (
                  <React.Fragment key={group}>
                    <tr onClick={() => toggleGroup(group)} style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}>
                      <td colSpan={4} style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                        <div className="flex items-center gap-2">
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                          {group} Logs ({groupLogs.length})
                        </div>
                      </td>
                    </tr>
                    {isExpanded && groupLogs.map((log, i) => (
                      <tr key={log.id} style={{ borderBottom: i === groupLogs.length - 1 ? 'none' : '1px solid var(--border-color)', background: 'var(--bg-base)' }}>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                          <div className="flex items-center gap-2" style={{ paddingLeft: '1.5rem' }}>
                            {log.id}
                            <button className="btn-icon" style={{ padding: '2px' }} onClick={(e) => { e.stopPropagation(); copyToClipboard(log.id); }} title="Copy ID">
                              <Copy size={12} />
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: '500' }}>{log.time}</td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{log.duration}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className={`badge ${log.result === 'Success' ? 'badge-success' : 'badge-danger'}`}>{log.result}</span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      
      </div>
    </div>
  );
}
