import React, { useState } from 'react';
import { Network, Activity, Clock, ShieldAlert, ChevronRight, Server, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import EmptyState from '../components/EmptyState';
import { useApis } from '../context/ApiContext';
import { createPortal } from 'react-dom';
import { X, Plus } from 'lucide-react';

export default function ApiDashboard() {
  const { currentUser } = useUsers();
  const navigate = useNavigate();
  const { apis, addApi } = useApis();
  
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newApiName, setNewApiName] = useState('');
  const [newApiEndpoint, setNewApiEndpoint] = useState('');
  const [newApiType, setNewApiType] = useState('REST');
  const [newApiMethods, setNewApiMethods] = useState(['GET', 'POST']);

  if (!currentUser?.isDemo) {
    return (
      <EmptyState 
        title="API Monitoring" 
        description="Connect your API gateways to track endpoint performance and error rates." 
      />
    );
  }

  const handleMethodToggle = (method) => {
    setNewApiMethods(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };

  // Dynamic KPIs
  const globalAvailability = (apis.reduce((acc, api) => acc + api.availability, 0) / apis.length).toFixed(2);
  const avgLatency = Math.round(apis.reduce((acc, api) => acc + api.latency, 0) / apis.length);
  const globalErrorRate = (apis.reduce((acc, api) => acc + api.errorRate, 0) / apis.length).toFixed(2);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (newApiName && newApiEndpoint && newApiMethods.length > 0) {
      addApi({
        name: newApiName,
        endpoint: newApiEndpoint,
        type: newApiType,
        owner: 'Unassigned',
        methods: newApiMethods
      });
      setShowRegisterModal(false);
      setNewApiName('');
      setNewApiEndpoint('');
      setNewApiMethods(['GET', 'POST']);
    }
  };

  return (
    <div className="flex-col gap-4 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>API Monitoring</h1>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Track performance, availability, and errors across all endpoints.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-primary" onClick={() => setShowRegisterModal(true)}>
            <Plus size={14} /> Register API
          </button>
          <button className="btn btn-ghost"><Filter size={14} /> Filter</button>
          <div className="search-bar" style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search APIs..." style={{ padding: '0.5rem 1rem 0.5rem 2rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', width: '250px' }} />
          </div>
        </div>
      </div>

      {/* KPI Header (6.1) */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>{globalAvailability}%</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Availability</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>{avgLatency}ms</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Avg Latency (P95)</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>{globalErrorRate}%</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Error Rate</span>
          </div>
        </div>
      </div>

      {/* API Catalog (6.2) */}
      <div className="glass-panel" style={{ padding: '1rem 0' }}>
        <div style={{ padding: '0 1.5rem 1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>API Catalog</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{apis.length} active endpoints</span>
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
            {apis.map(api => (
              <tr key={api.id} onClick={() => navigate(`/api/${api.id}`)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover:bg-[var(--bg-surface-hover)] group">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  <div className="flex items-center gap-2">
                    <Network size={14} className="text-primary" /> {api.name}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{api.endpoint}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className="badge" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)' }}>{api.type}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: api.availability < 99 ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{api.availability}%</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: api.latency > 200 ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{api.latency}ms</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge badge-${api.status === 'Critical' ? 'danger' : api.status === 'Degraded' ? 'warning' : 'success'}`}>{api.status}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}><ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Register API Modal */}
      {showRegisterModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '400px', background: 'var(--bg-surface)', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
            <div className="flex justify-between items-center">
              <h2 style={{ margin: 0 }}>Register New API</h2>
              <button className="btn-icon" onClick={() => setShowRegisterModal(false)}><X size={16}/></button>
            </div>
            
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
              <div className="flex-col gap-2">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600' }}>API Name</label>
                <input required type="text" value={newApiName} onChange={(e) => setNewApiName(e.target.value)} placeholder="e.g. Fraud Detection API" style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              
              <div className="flex-col gap-2">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Endpoint URL</label>
                <input required type="text" value={newApiEndpoint} onChange={(e) => setNewApiEndpoint(e.target.value)} placeholder="e.g. internal.pulsecx.com/fraud" style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>

              <div className="flex-col gap-2">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Protocol Type</label>
                <select value={newApiType} onChange={(e) => setNewApiType(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}>
                  <option>REST</option>
                  <option>GraphQL</option>
                  <option>gRPC</option>
                  <option>Webhook</option>
                </select>
              </div>

              <div className="flex-col gap-2">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Supported Methods</label>
                <div className="flex gap-2 flex-wrap">
                  {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(method => (
                    <label key={method} className="flex items-center gap-2" style={{ fontSize: '0.8125rem', cursor: 'pointer', background: 'var(--bg-base)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${newApiMethods.includes(method) ? 'var(--accent-primary)' : 'var(--border-color)'}` }}>
                      <input 
                        type="checkbox" 
                        checked={newApiMethods.includes(method)}
                        onChange={() => handleMethodToggle(method)}
                        style={{ accentColor: 'var(--accent-primary)' }}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowRegisterModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={newApiMethods.length === 0}>Register API</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
