import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Network, Activity, Server, Clock, Code, Database, Globe, AlertTriangle, Play, ChevronRight, ChevronDown, Loader } from 'lucide-react';
import { useApis } from '../context/ApiContext';
import { useToast } from '../context/ToastContext';

export default function ApiDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apis, addTransaction } = useApis();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPinging, setIsPinging] = useState(false);

  const api = apis.find(a => a.id === id) || {
    id: id || 'API-001',
    name: 'Payment Gateway API',
    endpoint: 'api.pulsecx.com/v1/payments',
    status: 'Degraded',
    availability: '98.50%',
    latency: '450ms',
    errorRate: '1.2%',
    throughput: '1,240',
    transactions: [],
    owner: 'Payments Engineering'
  };

  const tabs = ['Overview', 'Performance', 'Errors', 'Dependencies', 'Transactions'];

  const handleTestEndpoint = () => {
    setIsPinging(true);
    setTimeout(() => {
      const pingDuration = Math.floor(Math.random() * 150) + 50;
      addTransaction(api.id, {
        id: `test-${Math.random().toString(36).substr(2, 6)}`,
        method: 'GET',
        path: '/ping',
        status: 200,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        duration: pingDuration
      });
      addToast(`Ping successful! Replied in ${pingDuration}ms`, 'success');
      setIsPinging(false);
      setActiveTab('Transactions');
    }, 600);
  };

  const renderOverview = () => (
    <div className="grid grid-cols-3 gap-4 animate-fade-in">
      <div className="col-span-2 glass-panel" style={{ padding: 'var(--panel-padding)' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>API Information</h3>
        <div className="flex-col gap-4">
          <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Base URL</span>
            <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>https://api.pulsecx.com</span>
          </div>
          <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Protocol</span>
            <span style={{ color: 'var(--text-primary)' }}>HTTP/2 (REST)</span>
          </div>
          <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Authentication</span>
            <span style={{ color: 'var(--text-primary)' }}>OAuth 2.0 (Bearer)</span>
          </div>
          <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Owner Team</span>
            <span style={{ color: 'var(--text-primary)' }}>{api.owner || 'Unassigned'}</span>
          </div>
        </div>
      </div>
      <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Current Health</h3>
        <div className="flex-col gap-4">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Availability</span>
            <span style={{ fontWeight: '700', color: api.availability < 99 ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{api.availability}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Avg Latency</span>
            <span style={{ fontWeight: '700', color: api.latency > 200 ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{api.latency}ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Error Rate</span>
            <span style={{ fontWeight: '700', color: api.errorRate > 0.5 ? 'var(--accent-danger)' : 'var(--text-primary)' }}>{api.errorRate}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Throughput</span>
            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{api.throughput} req/s</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        {/* Latency Chart */}
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Latency (P95)</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: '1px', borderTop: '1px dashed var(--accent-warning)', opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', top: '20%', right: '0', fontSize: '0.65rem', color: 'var(--accent-warning)', transform: 'translateY(-100%)' }}>Threshold (500ms)</div>
            {Array.from({ length: 24 }).map((_, i) => {
              const val = i === 20 || i === 21 ? 80 + Math.random() * 20 : 10 + Math.random() * 30;
              return (
                <div key={i} className="tooltip-container" data-tooltip={`${Math.floor(val * 5)}ms`} style={{ flex: 1, height: `${val}%`, background: val > 80 ? 'var(--accent-danger)' : val > 50 ? 'var(--accent-warning)' : 'var(--accent-primary)', borderRadius: '2px 2px 0 0', opacity: 0.8 }}></div>
              );
            })}
          </div>
        </div>

        {/* Error Rate Chart */}
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Error Rate (5xx)</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderBottom: '1px solid var(--border-color)' }}>
             {Array.from({ length: 24 }).map((_, i) => {
              const val = i === 20 || i === 21 ? 40 + Math.random() * 20 : Math.random() * 5;
              return (
                <div key={i} className="tooltip-container" data-tooltip={`${val.toFixed(1)}%`} style={{ flex: 1, height: `${val}%`, background: val > 10 ? 'var(--accent-danger)' : 'var(--border-highlight)', borderRadius: '2px 2px 0 0', opacity: 0.8 }}></div>
              );
            })}
          </div>
        </div>

        {/* Throughput Chart */}
        <div className="col-span-2 glass-panel" style={{ padding: 'var(--panel-padding)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Throughput (Requests/sec)</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2px', borderBottom: '1px solid var(--border-color)' }}>
             {Array.from({ length: 60 }).map((_, i) => {
              const val = 40 + Math.sin(i / 5) * 20 + Math.random() * 10;
              return (
                <div key={i} style={{ flex: 1, height: `${val}%`, background: 'var(--text-muted)', borderRadius: '1px 1px 0 0', opacity: 0.4 }}></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ height: '600px' }}>
      
      {/* Transaction List */}
      <div className="glass-panel flex-col" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
          <h3 style={{ margin: 0 }}>Recent Traces</h3>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {api.transactions && api.transactions.length > 0 ? api.transactions.map((tx, idx) => (
            <div key={idx} className={`flex items-center justify-between hover:bg-[var(--bg-surface-hover)] ${idx === 0 ? 'bg-[var(--bg-surface-hover)]' : ''}`} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}>
              <div className="flex items-center gap-3">
                <span className={`badge badge-${tx.status >= 500 ? 'danger' : tx.status >= 400 ? 'warning' : 'success'}`} style={{ width: '45px', justifyContent: 'center' }}>{tx.status}</span>
                <div className="flex-col">
                  <span style={{ fontSize: '0.8125rem', fontWeight: '600', fontFamily: 'monospace' }}>{tx.method} {tx.path}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {tx.id}</span>
                </div>
              </div>
              <div className="flex-col items-end">
                <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: tx.duration > 1000 ? 'var(--accent-danger)' : 'var(--text-primary)' }}>{tx.duration}ms</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tx.time}</span>
              </div>
            </div>
          )) : (
            <div style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-muted)' }}>No recent transactions.</div>
          )}
        </div>
      </div>

      {/* Transaction Details Inspector */}
      <div className="glass-panel flex-col" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
          <h3 style={{ margin: 0 }}>Transaction Inspector</h3>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
          
          <div className="flex-col gap-2">
            <h4 style={{ margin: 0, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Request Headers</h4>
            <div style={{ background: 'var(--bg-base)', padding: 'var(--panel-padding)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', overflowX: 'auto', whiteSpace: 'pre' }}>
{`POST /v1/payments/process HTTP/2
Host: api.pulsecx.com
Authorization: Bearer eyJhbG...
Content-Type: application/json
X-Correlation-Id: req-9a8b7`}
            </div>
          </div>

          <div className="flex-col gap-2">
            <h4 style={{ margin: 0, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Request Payload</h4>
            <div style={{ background: 'var(--bg-base)', padding: 'var(--panel-padding)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-primary)', overflowX: 'auto', whiteSpace: 'pre' }}>
{`{
  "orderId": "ORD-50921",
  "amount": 124.50,
  "currency": "USD",
  "paymentMethod": {
    "type": "card",
    "token": "tok_visa_4242"
  }
}`}
            </div>
          </div>

          <div className="flex-col gap-2">
            <h4 style={{ margin: 0, color: 'var(--accent-danger)', letterSpacing: '0.05em' }}>Response Headers</h4>
            <div style={{ padding: 'var(--panel-padding)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.2)', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', overflowX: 'auto', whiteSpace: 'pre' }}>
{`HTTP/2 504 Gateway Timeout
Content-Type: application/json
X-Trace-Id: trace-110293
Date: Wed, 10 Jun 2026 14:32:06 GMT`}
            </div>
          </div>

          <div className="flex-col gap-2">
            <h4 style={{ margin: 0, color: 'var(--accent-danger)', letterSpacing: '0.05em' }}>Response Payload</h4>
            <div style={{ padding: 'var(--panel-padding)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.2)', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--accent-danger)', overflowX: 'auto', whiteSpace: 'pre' }}>
{`{
  "error": {
    "code": "gateway_timeout",
    "message": "Upstream processing timed out after 5000ms.",
    "doc_url": "https://docs.pulsecx.com/errors/504"
  }
}`}
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const renderDependencies = () => (
    <div className="glass-panel animate-fade-in" style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="flex items-center gap-4">
        <div className="flex-col items-center gap-2">
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={24} className="text-secondary" />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>API Gateway</span>
        </div>
        
        <div style={{ width: '60px', height: '2px', background: 'var(--accent-warning)', opacity: 0.5 }}></div>
        
        <div className="flex-col items-center gap-2">
          <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', border: '2px solid var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Network size={32} className="text-warning" />
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>{api.name}</span>
        </div>

        <div style={{ width: '60px', height: '2px', background: 'var(--accent-danger)' }}></div>

        <div className="flex-col gap-4">
          <div className="flex items-center gap-4">
            <div style={{ width: '40px', height: '2px', background: 'var(--border-highlight)' }}></div>
            <div className="flex-col items-center gap-2">
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Database size={24} className="text-primary" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>PostgreSQL</span>
              <span className="badge badge-success">Healthy</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div style={{ width: '40px', height: '2px', background: 'var(--accent-danger)' }}></div>
            <div className="flex-col items-center gap-2">
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Server size={24} className="text-danger" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Bank Processor</span>
              <span className="badge badge-danger">Timeout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-col gap-4 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      
      {/* Hero Banner */}
      <div className="glass-panel" style={{ 
        background: api.status === 'Critical' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, var(--bg-surface) 100%)' : api.status === 'Degraded' ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, var(--bg-surface) 100%)' : 'var(--bg-surface)', 
        border: '1px solid var(--border-color)',
        padding: 'var(--panel-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--panel-gap)'
      }}>
        <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
          <button className="btn-icon" onClick={() => navigate('/api')} style={{ marginTop: '0.25rem', background: 'var(--bg-base)' }}>
            <ArrowLeft size={18} />
          </button>
          <div className="flex-col gap-2" style={{ flex: 1 }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{api.id}</span>
              <span className={`badge badge-${api.status === 'Critical' ? 'danger' : api.status === 'Degraded' ? 'warning' : 'success'}`}>{api.status}</span>
            </div>
            <h1 style={{ margin: 0, fontWeight: '700', letterSpacing: '-0.02em' }}>{api.name}</h1>
            <p className="flex items-center gap-2" style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: 'var(--text-muted)', margin: 0 }}>
              <Globe size={14} /> {api.endpoint}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" style={{ background: 'var(--bg-base)' }} onClick={handleTestEndpoint} disabled={isPinging}>
              {isPinging ? <Loader size={14} className="animate-spin" /> : <Play size={14}/>} 
              {isPinging ? 'Pinging...' : 'Test Endpoint'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        {tabs.map(tab => (
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
        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Performance' && renderPerformance()}
        {activeTab === 'Transactions' && renderTransactions()}
        {activeTab === 'Dependencies' && renderDependencies()}
        {activeTab === 'Errors' && (
          <div className="glass-panel animate-fade-in" style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-muted)' }}>
            <AlertTriangle size={32} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Error Logs</h3>
            <p style={{ fontSize: '0.8125rem', maxWidth: '400px', margin: '0 auto' }}>Detailed stack traces and error clusters will appear here.</p>
          </div>
        )}
      </div>

    </div>
  );
}
