import React from 'react';
import { Network, Activity, Clock, ShieldAlert, ChevronRight, Server, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_APIS = [
  { id: 'API-001', name: 'Payment Gateway API', endpoint: 'api.pulsecx.com/v1/payments', availability: '99.99%', latency: '120ms', status: 'Healthy', type: 'REST' },
  { id: 'API-002', name: 'User Authentication', endpoint: 'api.pulsecx.com/v1/auth', availability: '99.95%', latency: '85ms', status: 'Healthy', type: 'GraphQL' },
  { id: 'API-003', name: 'Product Catalog Search', endpoint: 'api.pulsecx.com/v2/search', availability: '98.50%', latency: '450ms', status: 'Degraded', type: 'REST' },
  { id: 'API-004', name: 'Order Processing', endpoint: 'internal.pulsecx.com/orders', availability: '100%', latency: '45ms', status: 'Healthy', type: 'gRPC' },
  { id: 'API-005', name: 'Shipping Webhooks', endpoint: 'api.pulsecx.com/webhooks', availability: '95.20%', latency: '850ms', status: 'Critical', type: 'Webhook' },
];

export default function ApiDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>API Monitoring</h1>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Track performance, availability, and errors across all endpoints.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost"><Filter size={14} /> Filter</button>
          <div className="search-bar" style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search APIs..." style={{ padding: '0.5rem 1rem 0.5rem 2rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', width: '250px' }} />
          </div>
        </div>
      </div>

      {/* KPI Header (6.1) */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>99.92%</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Availability</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>145ms</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Avg Latency (P95)</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>0.08%</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Error Rate</span>
          </div>
        </div>
      </div>

      {/* API Catalog (6.2) */}
      <div className="glass-panel" style={{ padding: '1rem 0' }}>
        <div style={{ padding: '0 1.5rem 1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1rem' }}>API Catalog</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{MOCK_APIS.length} active endpoints</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>API Name</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Endpoint</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Type</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Availability</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Response Time</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '0.75rem 1.5rem', width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_APIS.map(api => (
              <tr key={api.id} onClick={() => navigate(`/api/${api.id}`)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover-bg-surface-hover group">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  <div className="flex items-center gap-2">
                    <Network size={14} className="text-primary" /> {api.name}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{api.endpoint}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className="badge" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)' }}>{api.type}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: parseFloat(api.availability) < 99 ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{api.availability}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: parseInt(api.latency) > 200 ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{api.latency}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge badge-${api.status === 'Critical' ? 'danger' : api.status === 'Degraded' ? 'warning' : 'success'}`}>{api.status}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}><ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
