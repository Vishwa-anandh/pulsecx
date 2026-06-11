import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BarChart2, Users, Route, ShieldAlert, CheckCircle, FilePlus, Calendar, Download, Search, Filter, TrendingUp, Clock, AlertTriangle, X } from 'lucide-react';
import { useUsers } from '../context/UserContext';
import EmptyState from '../components/EmptyState';

export default function AnalyticsHub() {
  const { currentUser } = useUsers();
  const [showBuilderModal, setShowBuilderModal] = useState(false);

  if (!currentUser?.isDemo) {
    return (
      <EmptyState 
        title="Custom Analytics" 
        description="Build custom dashboards and run complex queries across all your observability data." 
      />
    );
  }

  return (
    <div className="flex-col animate-fade-in" style={{ paddingBottom: '4rem', gap: 'var(--panel-gap)' }}>
      
      {/* Header */}
      <div className="flex justify-between items-center" style={{ paddingBottom: '0.5rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem', fontWeight: '700', letterSpacing: '-0.02em' }}>Analytics Hub</h1>
          <p className="text-secondary" style={{ fontSize: '1rem' }}>Comprehensive performance, journey, and incident analytics.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost"><Filter size={14} /> Filter Reports</button>
          <button className="btn btn-primary" onClick={() => setShowBuilderModal(true)}>
            <FilePlus size={14} /> Report Builder
          </button>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border-color)', width: '100%' }}></div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-4 gap-4" style={{ gridAutoRows: 'minmax(min-content, max-content)' }}>
        
        {/* KPI Row (4 cols) */}
        <div className="col-span-1 glass-panel hover-bg-surface-hover transition-all" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Active Users (24h)</span>
          <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>124.5K</span>
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>+12%</span>
          </div>
        </div>

        <div className="col-span-1 glass-panel hover-bg-surface-hover transition-all" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Total Transactions</span>
          <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>2.1M</span>
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>+5%</span>
          </div>
        </div>

        <div className="col-span-1 glass-panel hover-bg-surface-hover transition-all" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Error Rate</span>
          <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>0.4%</span>
            <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>+0.1%</span>
          </div>
        </div>

        <div className="col-span-1 glass-panel hover-bg-surface-hover transition-all" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Customer Satisfaction</span>
          <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>4.6<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/5.0</span></span>
          </div>
        </div>

        {/* Global Traffic Trend (2 cols, 2 rows) */}
        <div className="col-span-2 row-span-2 glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Global Traffic Trend</h3>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '2px', minHeight: '200px' }}>
            {Array.from({ length: 48 }).map((_, i) => {
              const h = 20 + Math.random() * 60 + (i > 20 && i < 30 ? 20 : 0);
              return (
                <div key={i} className="tooltip-container" data-tooltip={`${Math.floor(h * 10)} req/s`} style={{ flex: 1, height: `${h}%`, background: 'var(--accent-primary)', opacity: 0.8, borderRadius: '2px 2px 0 0', transition: 'height 0.3s' }}></div>
              );
            })}
          </div>
        </div>

        {/* Customer & Incident Health (2 cols, 2 rows) */}
        <div className="col-span-2 row-span-2 glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div className="flex-1">
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Net Promoter Score</h3>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Based on 12k surveys</p>
              <div className="flex-col gap-2">
                <div className="flex justify-between items-center"><span className="text-success text-sm">Promoters</span> <span className="font-semibold">80%</span></div>
                <div className="flex justify-between items-center"><span className="text-secondary text-sm">Passives</span> <span className="font-semibold">12%</span></div>
                <div className="flex justify-between items-center"><span className="text-danger text-sm">Detractors</span> <span className="font-semibold">8%</span></div>
              </div>
            </div>
            <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(var(--accent-success) 72%, var(--bg-surface) 0)', marginLeft: '2rem', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px', background: 'var(--bg-base)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700' }}>
                72
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-color)', opacity: 0.5 }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Incidents by Severity</h3>
            <div className="flex gap-2" style={{ height: '32px', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="tooltip-container" data-tooltip="Critical (2)" style={{ width: '8%', background: 'var(--accent-danger)' }}></div>
              <div className="tooltip-container" data-tooltip="Major (6)" style={{ width: '25%', background: 'var(--accent-warning)' }}></div>
              <div className="tooltip-container" data-tooltip="Minor (16)" style={{ width: '67%', background: 'var(--accent-primary)' }}></div>
            </div>
            <div className="flex justify-between" style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1"><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-danger)' }}></div> Critical</span>
              <span className="flex items-center gap-1"><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-warning)' }}></div> Major</span>
              <span className="flex items-center gap-1"><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div> Minor</span>
            </div>
          </div>
        </div>

        {/* SLA Compliance & Table (2 cols, 2 rows) */}
        <div className="col-span-2 row-span-2 glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>SLA Compliance</h3>
          <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
            <div className="flex-col">
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Platform Availability</span>
              <span style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-success)' }}>99.995%</span>
            </div>
            <div className="flex-col text-right">
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Target: 99.990%</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Budget: 26m 12s rem.</span>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-base)' }}>
                  <th style={{ padding: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Service</th>
                  <th style={{ padding: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Actual</th>
                  <th style={{ padding: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { svc: 'Payment API', target: '99.99%', actual: '99.999%', status: 'Compliant' },
                  { svc: 'Authentication', target: '99.99%', actual: '99.992%', status: 'Compliant' },
                  { svc: 'Search Engine', target: '99.95%', actual: '99.910%', status: 'Breach Risk' },
                  { svc: 'Web Dashboard', target: '99.90%', actual: '99.980%', status: 'Compliant' },
                ].map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.svc}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: '600' }}>{item.actual}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge badge-${item.status === 'Compliant' ? 'success' : 'warning'}`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Conversion Rate Trends (2 cols, 1 row) */}
        <div className="col-span-2 row-span-1 glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Conversion Rate Trends</h3>
          <div style={{ flex: 1, position: 'relative', borderBottom: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)', minHeight: '120px' }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
              <polyline points="0,40 20,38 40,35 60,30 80,25 100,20" fill="none" stroke="var(--accent-success)" strokeWidth="2" />
              <polyline points="0,60 20,62 40,65 60,60 80,55 100,50" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />
            </svg>
            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
              <div className="flex items-center gap-2"><div style={{ width: '12px', height: '3px', background: 'var(--accent-success)' }}></div> Checkout (↑ 15%)</div>
              <div className="flex items-center gap-2"><div style={{ width: '12px', height: '3px', background: 'var(--accent-primary)' }}></div> Signup (↑ 5%)</div>
            </div>
          </div>
        </div>

        {/* Small metric blocks (1 col, 1 row) */}
        <div className="col-span-1 row-span-1 glass-panel hover-bg-surface-hover transition-all" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14}/> MTTR</span>
          <span style={{ fontSize: '2rem', fontWeight: '700' }}>14m 20s</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-success)' }}>↓ 2m vs last month</span>
        </div>
        
        <div className="col-span-1 row-span-1 glass-panel hover-bg-surface-hover transition-all" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={14}/> Failures</span>
          <span style={{ fontSize: '2rem', fontWeight: '700' }}>24</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>↑ 3 vs last month</span>
        </div>

        {/* Wide bottom nodes (2 cols, 1 row) */}
        <div className="col-span-2 row-span-1 glass-panel hover-bg-surface-hover transition-all cursor-pointer" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>Payment Gateway</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Highest drop-off node (45%)</span>
          </div>
        </div>
        
        <div className="col-span-2 row-span-1 glass-panel hover-bg-surface-hover transition-all cursor-pointer" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
           <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <TrendingUp size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>Home to Product</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Highest conversion node (85%)</span>
          </div>
        </div>

      </div>

      {/* Report Builder Modal */}
      {showBuilderModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '700px', background: 'var(--bg-surface)', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
            <div className="flex justify-between items-center">
              <h2 style={{ margin: 0 }}>Custom Report Builder</h2>
              <button className="btn-icon" onClick={() => setShowBuilderModal(false)}><X size={16}/></button>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.875rem', marginTop: '-1rem' }}>Design and export custom analytics reports.</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex-col gap-4">
                <div style={{ padding: 'var(--panel-padding)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>1. Data Source</h3>
                  <select className="input-field" style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}>
                    <option>Customer Journeys</option>
                    <option>API Analytics</option>
                    <option>Incident Logs</option>
                    <option>Mobile Sessions</option>
                  </select>
                </div>
                
                <div style={{ padding: 'var(--panel-padding)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>2. Date Range</h3>
                  <div className="flex gap-2">
                    <div className="flex-1 input-field" style={{ padding: '0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} className="text-muted"/> Start Date
                    </div>
                    <div className="flex-1 input-field" style={{ padding: '0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} className="text-muted"/> End Date
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: 'var(--panel-padding)', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 1rem 0' }}>3. Output Format</h3>
                  <div className="flex-col gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="format" defaultChecked style={{ accentColor: 'var(--accent-primary)' }}/> <span className="text-sm">PDF Document</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="format" style={{ accentColor: 'var(--accent-primary)' }}/> <span className="text-sm">CSV / Excel</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="format" style={{ accentColor: 'var(--accent-primary)' }}/> <span className="text-sm">JSON Data</span>
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setShowBuilderModal(false)}>
                  <FilePlus size={16} /> Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
