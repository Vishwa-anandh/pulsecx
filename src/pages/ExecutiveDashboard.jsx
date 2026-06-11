import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Users, AlertCircle, CheckCircle, Info, Calendar, Maximize2, GripVertical } from 'lucide-react';

import mockData from '../data/mockDatabase.json';

const { experienceData, availabilityData, impactData, failingJourneys } = mockData.executive;

function KPICard({ title, value, change, isPositive, icon, tooltip, index, colorCode, loading }) {
  if (loading) {
    return (
      <div className="glass-panel skeleton" style={{ padding: 'var(--panel-padding)', height: '110px' }} />
    );
  }
  return (
    <div className="glass-panel glow-card group" style={{ background: 'var(--bg-surface)', color: 'inherit', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`, opacity: 0, cursor: 'grab', position: 'relative', border: '1px solid var(--border-color)' }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5" title={tooltip} style={{ cursor: 'help' }}>
          <div style={{ opacity: 0, transition: 'opacity 0.2s', position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)' }} className="group-hover:opacity-100 hidden md:block">
            <GripVertical size={16} color="var(--border-highlight)" />
          </div>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.875rem' }}>{title}</span>
          <Info size={14} color="var(--text-muted)" />
        </div>
        <div style={{ padding: '0.5rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-md)' }}>
          {icon}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
        <div className="flex items-center gap-1" style={{ color: isPositive ? 'var(--accent-success)' : 'var(--accent-danger)', fontSize: '0.875rem', fontWeight: '600' }}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {change}
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Time: {label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }} />
            <span style={{ color: 'var(--text-muted)' }}>{entry.name}:</span>
            <span style={{ color: 'var(--text-primary)' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex justify-center gap-4 mt-2">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-1.5" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: entry.color }} />
          <span>{entry.value === 'uptime' ? 'Uptime' : 'Downtime'}</span>
        </div>
      ))}
    </div>
  );
};

export default function ExecutiveDashboard() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-col gap-4" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.125rem' }}>Platform Overview</h1>
          <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Real-time business performance and customer experience metrics.</p>
        </div>
        <div className="flex gap-2 items-center">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Calendar size={14} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              style={{ 
                padding: '0.4rem 2rem', 
                background: 'var(--bg-surface)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none'
              }}
            >
              <option value="1h">Last 1 Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2" style={{ padding: '0 0.5rem', borderRight: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)', margin: '0 0.25rem' }}>
            <label style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={liveUpdates} onChange={() => setLiveUpdates(!liveUpdates)} style={{ accentColor: 'var(--accent-success)' }} />
              Live Updates
              {liveUpdates && <span className="pulse-dot" style={{ width: '8px', height: '8px', background: 'var(--accent-success)', borderRadius: '50%', display: 'inline-block' }}></span>}
            </label>
          </div>

          <button className="btn btn-ghost">Export Report</button>
          <button className="btn btn-primary" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 800); }}>Refresh Data</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard loading={loading} index={0} title="Customer Experience Score" value="89.2" change="+2.4%" isPositive={true} icon={<Users size={16} color="var(--accent-primary)" />} tooltip="Composite metric of latency, error rates, and user drop-offs." colorCode="59, 130, 246" />
        <KPICard loading={loading} index={1} title="Active Incidents" value="3" change="-1" isPositive={true} icon={<AlertCircle size={16} color="var(--accent-warning)" />} tooltip="Number of currently unresolved Sev-1 and Sev-2 incidents." colorCode="245, 158, 11" />
        <KPICard loading={loading} index={2} title="Journey Success Rate" value="94.8%" change="-0.5%" isPositive={false} icon={<Activity size={16} color="var(--accent-purple)" />} tooltip="Percentage of users completing core business workflows." colorCode="168, 85, 247" />
        <KPICard loading={loading} index={3} title="SLA Compliance" value="99.8%" change="0.0%" isPositive={true} icon={<CheckCircle size={16} color="var(--accent-success)" />} tooltip="Adherence to guaranteed 99.9% uptime SLA across critical services." colorCode="16, 185, 129" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className={`glass-panel ${isFullScreen ? 'fixed inset-0 z-50 m-4 flex-col' : 'col-span-2'}`} style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', background: isFullScreen ? 'var(--bg-base)' : undefined }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Experience Trend ({timeRange})</h3>
          </div>
          <div className="chart-container" style={{ flex: isFullScreen ? 1 : undefined, minHeight: isFullScreen ? '400px' : undefined }}>
            {loading ? <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-sm)' }} /> : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={experienceData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[70, 100]} />
                <RechartsTooltip content={<CustomTooltip />} />
                <ReferenceLine y={90} stroke="var(--accent-warning)" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'SLA Warning Threshold (90%)', fill: 'var(--accent-warning)', fontSize: 10, dy: -10 }} />
                <Area type="monotone" dataKey="score" stroke="var(--accent-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" animationDuration={1500} animationEasing="ease-out" />
              </AreaChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Top Failing Journeys</h3>
          <div className="flex-col gap-2" style={{ flex: 1 }}>
            {failingJourneys.map((journey) => (
              <div key={journey.id} className="flex justify-between items-center" style={{ padding: '0.6rem 0.75rem', background: 'rgba(128,128,128,0.05)', borderRadius: 'var(--radius-sm)', borderBottom: '1px solid rgba(128,128,128,0.1)' }}>
                <div className="flex-col gap-1">
                  <span style={{ fontWeight: '500', fontSize: '0.8125rem' }}>{journey.name}</span>
                  <span className="text-muted" style={{ fontSize: '0.7rem' }}>{journey.id}</span>
                </div>
                <span style={{ fontWeight: '600', color: 'var(--accent-danger)', fontSize: '0.8125rem' }}>{journey.failureRate}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ width: '100%', marginTop: '0.75rem' }}>View All Journeys</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Service Availability</h3>
          <div className="chart-container flex-1 min-h-0 relative">
            {loading ? <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-sm)' }} /> : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={availabilityData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} width={100} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-surface-hover)', opacity: 0.4 }} />
                <Legend content={<CustomLegend />} />
                <Bar dataKey="uptime" stackId="a" fill="var(--accent-success)" radius={[0, 0, 0, 0]} barSize={12} animationDuration={1500} animationEasing="ease-out" />
                <Bar dataKey="downtime" stackId="a" fill="var(--accent-danger)" radius={[0, 4, 4, 0]} barSize={12} animationDuration={1500} animationEasing="ease-out" />
              </BarChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '0', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-surface)' }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%', zIndex: 0, opacity: 0.15 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-danger)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-danger)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="var(--accent-danger)" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'left', padding: '2.5rem', zIndex: 1, position: 'relative' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}>Customer Impact Risk</h3>
            <p style={{ fontSize: '0.9375rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>Estimated revenue risk due to active incidents over the last 6 hours.</p>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--accent-danger)' }}>$</span>42,500
            </div>
            <div className="flex gap-3">
              <div className="badge" style={{ background: 'var(--bg-surface-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-highlight)', padding: '0.5rem 1rem', borderRadius: '50px' }}>Priority <span style={{ background: 'var(--accent-danger)', color: '#fff', padding: '2px 6px', borderRadius: '50%', marginLeft: '4px' }}>1</span></div>
              <div className="badge" style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '50px' }}>Threat Level 8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
