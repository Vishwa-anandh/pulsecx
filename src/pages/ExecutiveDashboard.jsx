import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Users, AlertCircle, CheckCircle, Info, Calendar, Maximize2, GripVertical, Globe, Apple, Smartphone, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import EmptyState from '../components/EmptyState';

import mockData from '../data/mockDatabase.json';

const { experienceData, availabilityData, impactData, failingJourneys } = mockData.executive;

function KPICard({ title, value, change, isPositive, icon, tooltip, index, colorCode, loading }) {
  if (loading) {
    return (
      <div className="glass-panel skeleton" style={{ padding: 'var(--panel-padding)', height: '110px' }} />
    );
  }
  return (
    <div className="glass-panel glow-card group" style={{ background: 'var(--bg-surface)', color: 'inherit', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`, opacity: 0, cursor: 'grab', position: 'relative', border: '1px solid var(--border-color)' }}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5" title={tooltip} style={{ cursor: 'help' }}>
          <div style={{ opacity: 0, transition: 'opacity 0.2s', position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)' }} className="group-hover:opacity-100 hidden md:block">
            <GripVertical size={16} color="var(--border-highlight)" />
          </div>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.875rem', lineHeight: 1 }}>{title}</span>
          <Info size={14} color="var(--text-muted)" />
        </div>
        <div>
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const { currentUser } = useUsers();

  if (!currentUser?.isDemo) {
    return (
      <EmptyState 
        title="Executive Overview" 
        description="Connect your business metrics and core systems to start populating this dashboard." 
      />
    );
  }

  return (
    <div className="flex-col gap-4" style={{ paddingBottom: '2rem' }}>
      <div className="flex flex-wrap justify-between items-center gap-4" style={{ marginBottom: '0.5rem' }}>
        <div style={{ minWidth: '250px' }}>
          <h1 style={{ marginBottom: '0.125rem' }}>Platform Overview</h1>
          <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Real-time business performance and customer experience metrics.</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
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
            <h3 style={{ margin: 0 }}>Experience Trend ({timeRange})</h3>
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
          <h3 style={{ marginBottom: '1rem' }}>Top Failing Journeys</h3>
          <div className="flex-col gap-2" style={{ flex: 1 }}>
            {failingJourneys.map((journey) => (
              <div key={journey.id} className="flex justify-between items-center" style={{ padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', borderBottom: '1px solid rgba(128,128,128,0.1)' }}>
                <div className="flex-col gap-1">
                  <span style={{ fontWeight: '500', fontSize: '0.8125rem' }}>{journey.name}</span>
                  <span className="text-muted" style={{ fontSize: '0.7rem' }}>{journey.id}</span>
                </div>
                <span style={{ fontWeight: '600', color: 'var(--accent-danger)', fontSize: '0.8125rem' }}>{journey.failureRate}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" onClick={() => navigate('/journeys')} style={{ width: '100%', marginTop: '0.75rem' }}>View All Journeys</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Service Availability</h3>
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

        <div className="glass-panel flex-col justify-between" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-surface)' }}>
          <div className="flex justify-between items-center">
            <h3 style={{ margin: 0 }}>User Demographics & Engagement</h3>
            <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem' }}>
              <ArrowUpRight size={14} /> +12% Active
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex-col gap-1">
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Active Users (24h)</span>
              <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>124.5K</span>
            </div>
            <div className="flex-col gap-1" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.25rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>CSAT Score</span>
              <div className="flex items-center gap-1">
                <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-primary)', letterSpacing: '-0.02em' }}>4.6</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>/5.0</span>
              </div>
            </div>
            <div className="flex-col gap-1" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.25rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Net Promoter</span>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-success)', letterSpacing: '-0.02em' }}>72</span>
                <Smile size={18} color="var(--accent-success)" />
              </div>
            </div>
          </div>

          <div className="flex-col gap-2">
            <div className="flex justify-between items-end" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Platform Distribution</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last 30 Days</span>
            </div>
            
            {/* Horizontal Stacked Bar */}
            <div className="flex" style={{ height: '24px', borderRadius: '12px', overflow: 'hidden', gap: '2px' }}>
              <div className="tooltip-container flex items-center justify-center hover-scale" data-tooltip="Web / Desktop (45%)" style={{ width: '45%', background: 'var(--accent-primary)', color: 'white', cursor: 'pointer' }}>
                <Globe size={14} />
              </div>
              <div className="tooltip-container flex items-center justify-center hover-scale" data-tooltip="iOS (35%)" style={{ width: '35%', background: 'var(--accent-purple)', color: 'white', cursor: 'pointer' }}>
                <Apple size={14} />
              </div>
              <div className="tooltip-container flex items-center justify-center hover-scale" data-tooltip="Android (20%)" style={{ width: '20%', background: 'var(--accent-success)', color: 'white', cursor: 'pointer' }}>
                <Smartphone size={14} />
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-between items-center mt-2" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div className="flex items-center gap-1.5"><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--accent-primary)' }}></div> Web (45%)</div>
              <div className="flex items-center gap-1.5"><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--accent-purple)' }}></div> iOS (35%)</div>
              <div className="flex items-center gap-1.5"><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--accent-success)' }}></div> Android (20%)</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
