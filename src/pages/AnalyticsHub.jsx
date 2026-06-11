import React, { useState } from 'react';
import { BarChart2, Users, Route, ShieldAlert, CheckCircle, FilePlus, Calendar, Download, Search, Filter, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export default function AnalyticsHub() {
  const [activeReport, setActiveReport] = useState('Overview');

  const navItems = [
    { id: 'Overview', icon: BarChart2, label: 'Platform Analytics' },
    { id: 'CX', icon: Users, label: 'Customer Experience' },
    { id: 'Journeys', icon: Route, label: 'Journey Performance' },
    { id: 'Incidents', icon: ShieldAlert, label: 'Incident Report' },
    { id: 'SLA', icon: CheckCircle, label: 'SLA Compliance' },
    { id: 'Builder', icon: FilePlus, label: 'Report Builder' },
  ];

  const renderOverview = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Platform Analytics</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>High-level overview of global platform health and usage.</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Active Users (24h)</span>
          <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>124.5K</span>
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>+12%</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Total Transactions</span>
          <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>2.1M</span>
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>+5%</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Error Rate</span>
          <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>0.4%</span>
            <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>+0.1%</span>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Global Traffic Trend</h3>
        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
          {Array.from({ length: 48 }).map((_, i) => {
            const h = 20 + Math.random() * 60 + (i > 20 && i < 30 ? 20 : 0);
            return (
              <div key={i} className="tooltip-container" data-tooltip={`${Math.floor(h * 10)} req/s`} style={{ flex: 1, height: `${h}%`, background: 'var(--accent-primary)', opacity: 0.8, borderRadius: '2px 2px 0 0' }}></div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderCX = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Customer Experience Report</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Business KPIs tracking user satisfaction and sentiment.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem' }}>Net Promoter Score (NPS)</h3>
          <div className="flex items-center gap-6">
            <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(var(--accent-success) 72%, var(--bg-surface) 0)' }}>
              <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px', background: 'var(--bg-base)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700' }}>
                72
              </div>
            </div>
            <div className="flex-col gap-2 flex-1">
              <div className="flex justify-between items-center"><span className="text-success text-sm">Promoters</span> <span className="font-semibold">80%</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary text-sm">Passives</span> <span className="font-semibold">12%</span></div>
              <div className="flex justify-between items-center"><span className="text-danger text-sm">Detractors</span> <span className="font-semibold">8%</span></div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem' }}>Customer Satisfaction (CSAT)</h3>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: 1 }}>4.6<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/5.0</span></span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Based on 12,450 survey responses this month.</span>
          </div>
          <div className="flex gap-1" style={{ marginTop: '1.5rem' }}>
            {[1,2,3,4,5].map(star => (
               <svg key={star} style={{ width: '24px', height: '24px', fill: star <= 4 ? 'var(--accent-warning)' : 'var(--bg-surface)', stroke: 'var(--accent-warning)', strokeWidth: '2px', strokeLinejoin: 'round' }} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderJourneys = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Journey Performance Report</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Conversion trends and drop-off analysis across core flows.</p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Conversion Rate Trends (Last 30 Days)</h3>
        <div style={{ height: '250px', position: 'relative', borderBottom: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)' }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <polyline points="0,40 20,38 40,35 60,30 80,25 100,20" fill="none" stroke="var(--accent-success)" strokeWidth="2" />
            <polyline points="0,60 20,62 40,65 60,60 80,55 100,50" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />
          </svg>
          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
            <div className="flex items-center gap-2"><div style={{ width: '12px', height: '3px', background: 'var(--accent-success)' }}></div> Checkout Flow (↑ 15%)</div>
            <div className="flex items-center gap-2"><div style={{ width: '12px', height: '3px', background: 'var(--accent-primary)' }}></div> Signup Flow (↑ 5%)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>Payment Gateway</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Highest drop-off node (45%)</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>Home to Product</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Highest conversion node (85%)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncidents = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Incident Analytics</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Operational efficiency metrics and failure analysis.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14}/> MTTR</span>
          <span style={{ fontSize: '2rem', fontWeight: '700' }}>14m 20s</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-success)' }}>↓ 2m vs last month</span>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Search size={14}/> MTTD</span>
          <span style={{ fontSize: '2rem', fontWeight: '700' }}>2m 45s</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-success)' }}>↓ 15s vs last month</span>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={14}/> Total Failures</span>
          <span style={{ fontSize: '2rem', fontWeight: '700' }}>24</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>↑ 3 vs last month</span>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Incidents by Severity</h3>
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
  );

  const renderSLA = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>SLA Compliance</h2>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>System availability vs. Enterprise SLA targets.</p>
        </div>
        <button className="btn btn-primary"><Download size={14}/> Export PDF</button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="flex-col gap-2">
           <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>Platform Availability (YTD)</span>
           <span style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1, color: 'var(--accent-success)' }}>99.995%</span>
        </div>
        <div className="flex-col gap-4 text-right">
           <div>
             <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Target SLA</span>
             <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>99.990%</div>
           </div>
           <div>
             <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Error Budget Remaining</span>
             <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>26m 12s</div>
           </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Service</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Target</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Actual</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
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
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.svc}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{item.target}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>{item.actual}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge badge-${item.status === 'Compliant' ? 'success' : 'warning'}`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBuilder = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Custom Report Builder</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Design and export custom reports.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex-col gap-4">
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>1. Data Source</h3>
            <select className="input-field" style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}>
              <option>Customer Journeys</option>
              <option>API Analytics</option>
              <option>Incident Logs</option>
              <option>Mobile Sessions</option>
            </select>
          </div>
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>2. Date Range</h3>
            <div className="flex gap-2">
              <div className="flex-1 input-field" style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} className="text-muted"/> Start Date
              </div>
              <div className="flex-1 input-field" style={{ padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} className="text-muted"/> End Date
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>3. Output Format</h3>
            <div className="flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="format" defaultChecked /> <span className="text-sm">PDF Document</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="format" /> <span className="text-sm">CSV / Excel</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="format" /> <span className="text-sm">JSON Data</span>
              </label>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
            <FilePlus size={16} /> Generate Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full gap-6 animate-fade-in" style={{ paddingBottom: '2rem', minHeight: 'calc(100vh - 100px)' }}>
      {/* Left Navigation Menu (Master) */}
      <div className="glass-panel" style={{ width: '250px', flexShrink: 0, padding: '1rem 0', alignSelf: 'flex-start' }}>
        <div style={{ padding: '0 1.5rem 1rem 1.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.875rem', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Reports</h3>
        </div>
        <div className="flex-col">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveReport(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                background: activeReport === item.id ? 'var(--bg-surface-hover)' : 'transparent',
                border: 'none',
                borderRight: `3px solid ${activeReport === item.id ? 'var(--accent-primary)' : 'transparent'}`,
                color: activeReport === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeReport === item.id ? '600' : '500',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              className="hover-bg-surface-hover"
            >
              <item.icon size={16} style={{ color: activeReport === item.id ? 'var(--accent-primary)' : 'inherit' }} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content Pane (Detail) */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {activeReport === 'Overview' && renderOverview()}
        {activeReport === 'CX' && renderCX()}
        {activeReport === 'Journeys' && renderJourneys()}
        {activeReport === 'Incidents' && renderIncidents()}
        {activeReport === 'SLA' && renderSLA()}
        {activeReport === 'Builder' && renderBuilder()}
      </div>
    </div>
  );
}
