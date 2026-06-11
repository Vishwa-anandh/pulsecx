import React, { useState } from 'react';
import { Activity, ShieldAlert, ServerCrash, Clock, CheckCircle2, AlertTriangle, XCircle, Search, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import EmptyState from '../components/EmptyState';

const activeAlerts = [
  { id: 'AL-901', component: 'Payment Gateway', issue: 'High latency detected in US-East region', severity: 'critical', time: '5m ago' },
  { id: 'AL-902', component: 'Auth Service', issue: 'Spike in failed token validations', severity: 'warning', time: '12m ago' },
  { id: 'AL-903', component: 'Inventory DB', issue: 'Replication lag exceeds 30s threshold', severity: 'warning', time: '1h ago' },
  { id: 'AL-904', component: 'Frontend CDN', issue: 'Cache hit ratio dropped below 80%', severity: 'info', time: '2h ago' },
];

const recentIncidents = [
  { id: 'INC-441', title: 'Complete Checkout Failure', status: 'Resolved', duration: '45m', mttr: '15m' },
  { id: 'INC-440', title: 'Search API Timeout', status: 'Resolved', duration: '12m', mttr: '8m' },
  { id: 'INC-439', title: 'Third-party webhook failing', status: 'Monitoring', duration: 'Ongoing', mttr: '-' },
];

function StatusWidget({ title, status, metric, subtext }) {
  const isDanger = status === 'danger';
  const isWarning = status === 'warning';
  const isGood = status === 'success';

  let borderClass = '';
  if (isDanger) borderClass = 'animate-pulse-danger';
  if (isWarning) borderClass = 'animate-pulse-warning';

  let cardColor = '59, 130, 246'; // primary
  if (isDanger) cardColor = '239, 68, 68';
  if (isWarning) cardColor = '245, 158, 11';
  if (isGood) cardColor = '16, 185, 129';

  return (
    <div className={`glass-panel glow-card ${borderClass}`} style={{ '--card-color': cardColor, padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: isDanger ? '1px solid rgba(239, 68, 68, 0.5)' : isWarning ? '1px solid rgba(245, 158, 11, 0.5)' : undefined }}>
      <div className="flex justify-between items-center">
        <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{title}</span>
        {isGood && <CheckCircle2 size={16} className="text-success" />}
        {isWarning && <AlertTriangle size={16} className="text-warning" />}
        {isDanger && <XCircle size={16} className="text-danger" />}
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem' }}>{metric}</div>
      <div className="text-secondary" style={{ fontSize: '0.75rem' }}>{subtext}</div>
    </div>
  );
}

export default function OperationsDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useUsers();
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  if (!currentUser?.isDemo) {
    return (
      <EmptyState 
        title="Operations Hub" 
        description="Connect your infrastructure and services to monitor alerts and incidents." 
      />
    );
  }

  const toggleAlert = (id) => {
    setSelectedAlerts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedAlerts.length === activeAlerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(activeAlerts.map(a => a.id));
    }
  };

  return (
    <div className="flex-col gap-4" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.125rem' }}>Operations Command Center</h1>
          <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Monitor system health, active alerts, and incident response.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatusWidget title="API Gateway" status="success" metric="99.99%" subtext="Uptime 30d" />
        <StatusWidget title="Payment Processing" status="danger" metric="94.2%" subtext="Degraded performance" />
        <StatusWidget title="Auth Services" status="warning" metric="98.5%" subtext="Elevated latency" />
        <StatusWidget title="CDN & Edge" status="success" metric="100%" subtext="Operating normally" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel col-span-2" style={{ padding: 'var(--panel-padding)' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
            <div className="flex items-center gap-2">
              <h3 style={{ margin: 0 }}>Active Alerts</h3>
              <div className="badge badge-danger">1 Critical</div>
            </div>
            <button 
              className="btn btn-primary" 
              disabled={selectedAlerts.length === 0}
              style={{ opacity: selectedAlerts.length === 0 ? 0.5 : 1, cursor: selectedAlerts.length === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
            >
              Acknowledge Selected ({selectedAlerts.length})
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }} role="table">
            <caption className="sr-only">Recent System Alerts and Incidents</caption>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.5rem' }}><input type="checkbox" checked={selectedAlerts.length === activeAlerts.length} onChange={toggleAll} style={{ cursor: 'pointer' }} /></th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Component</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Issue</th>
                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Time</th>
              </tr>
            </thead>
            <tbody>
            {activeAlerts.map((alert) => (
              <tr key={alert.id} className="hover-bg-surface-hover" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s', cursor: 'pointer' }}>
                <td style={{ padding: '0.75rem', verticalAlign: 'middle', width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedAlerts.includes(alert.id)}
                    onChange={() => toggleAlert(alert.id)}
                    style={{ cursor: 'pointer', accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }}
                  />
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.8125rem', fontWeight: '500' }}>{alert.component}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{alert.issue}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{alert.time}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>Recent Incidents</h3>
          <div className="flex-col gap-3" style={{ flex: 1 }}>
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="flex gap-3" style={{ padding: '0.75rem', background: 'var(--bg-base)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Server size={20} color="var(--accent-danger)" />
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', background: 'var(--accent-danger)', borderRadius: '50%', border: '2px solid var(--bg-surface)' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center justify-between" style={{ paddingBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{incident.title}</span>
                    <span className={`badge ${incident.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>{incident.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted" style={{ fontSize: '0.7rem' }}>
                    <div className="flex items-center gap-1"><Clock size={12} /> Duration: <span style={{ fontVariantNumeric: 'tabular-nums' }}>{incident.duration}</span></div>
                    <div className="flex items-center gap-1"><Activity size={12} /> MTTR: {incident.mttr}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" onClick={() => navigate('/incidents')} style={{ width: '100%', marginTop: '1rem' }}>View Incident History</button>
        </div>
      </div>
    </div>
  );
}
