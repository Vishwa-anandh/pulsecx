import React, { useState } from 'react';
import { TerminalSquare, Bug, Globe, Clock, ChevronRight, Search, ZoomIn, X, ArrowRight, Copy, Check } from 'lucide-react';

const errorSignatures = [
  { id: 'ERR-7A9', name: 'NullReferenceException in PaymentProcessor.Process()', count: 1240, trend: '+15%' },
  { id: 'ERR-3B2', name: 'Timeout waiting for connection from pool', count: 850, trend: '-5%' },
  { id: 'ERR-9C1', name: 'SyntaxError: Unexpected token < in JSON at position 0', count: 420, trend: '+2%' },
];

const failedTransactions = [
  { id: 'TX-99012', user: 'usr_8x99a', endpoint: 'POST /api/v1/checkout', duration: '5,021ms', status: '500 Internal Error', time: '2m ago' },
  { id: 'TX-99011', user: 'usr_2b11c', endpoint: 'GET /api/v1/search', duration: '12,400ms', status: '504 Gateway Timeout', time: '5m ago' },
  { id: 'TX-99010', user: 'usr_7z44x', endpoint: 'POST /api/v1/auth/login', duration: '45ms', status: '401 Unauthorized', time: '12m ago' },
];

function EngineeringDashboard() {
  const [activeTrace, setActiveTrace] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyTrace = () => {
    navigator.clipboard.writeText(`${mockTraceData.message}\n${mockTraceData.stack_trace}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockTraceData = {
    "timestamp": "2026-06-09T12:05:33Z",
    "level": "ERROR",
    "logger": "PaymentProcessor",
    "message": "NullReferenceException: Object reference not set to an instance of an object.",
    "stack_trace": "   at PaymentProcessor.Process(Order order) in /src/services/payment/PaymentProcessor.cs:line 45\n   at CheckoutController.Submit(CheckoutRequest req) in /src/api/CheckoutController.cs:line 112\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ActionMethodExecutor.SyncObjectResultExecutor.Execute(IActionResultTypeMapper mapper, ObjectMethodExecutor executor, Object controller, Object[] arguments)\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeActionMethodAsync()\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)",
    "request_headers": {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "X-Forwarded-For": "192.168.1.104"
    }
  };

  return (
    <div className="flex-col gap-4" style={{ paddingBottom: '2rem' }}>
      
      {/* Trace Drawer Overlay */}
      {activeTrace && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40, backdropFilter: 'blur(4px)', animation: 'fadeIn 0.3s ease forwards' }}
          onClick={() => setActiveTrace(null)}
        />
      )}

      {/* Trace Drawer Panel */}
      <div 
        className="glass-panel"
        style={{ 
          position: 'fixed', 
          top: '0', 
          right: '0', 
          bottom: '0', 
          width: '31.25rem', 
          zIndex: 50, 
          transform: activeTrace ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
          borderRadius: '0',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {activeTrace && (
          <>
            <div className="flex justify-between items-center" style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Transaction Trace</h3>
                <div className="text-secondary" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>{activeTrace.id} • {activeTrace.endpoint}</div>
              </div>
              <button className="btn-ghost" onClick={() => setActiveTrace(null)} style={{ padding: '0.5rem', borderRadius: '50%' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="badge badge-danger" style={{ alignSelf: 'flex-start' }}>{activeTrace.status}</div>
              
              <div>
                <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)'}}>Error Details</div>
                  <button 
                    onClick={handleCopyTrace}
                    className="btn-ghost" 
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem', borderRadius: '4px', border: '1px solid var(--border-color)', color: copied ? 'var(--accent-success)' : 'var(--text-secondary)' }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy Trace'}
                  </button>
                </div>
                <div style={{ background: '#1E1E1E', padding: '1rem', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '0.8rem', color: '#D4D4D4', overflowX: 'auto', border: '1px solid #333' }}>
                  <div style={{ color: '#F14C4C', fontWeight: 'bold', marginBottom: '0.5rem' }}>{mockTraceData.message}</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{mockTraceData.stack_trace}</pre>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Request Headers</div>
                <div style={{ background: 'var(--bg-surface-hover)', padding: '1rem', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
                  {Object.entries(mockTraceData.request_headers).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--accent-primary)' }}>{key}:</span> {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-ghost" onClick={() => setActiveTrace(null)}>Close</button>
              <button className="btn btn-primary">Open in Datadog</button>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.125rem' }}>Engineering Investigation</h1>
          <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Deep dive into application errors, traces, and performance bottlenecks.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel glow-card" style={{ '--card-color': '239, 68, 68', padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <TerminalSquare size={24} color="var(--accent-danger)" />
          </div>
          <div>
            <div className="text-secondary" style={{ fontSize: '0.8125rem', fontWeight: '500' }}>API Errors (1h)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>2,451</div>
          </div>
        </div>
        <div className="glass-panel glow-card" style={{ '--card-color': '245, 158, 11', padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <Globe size={24} color="var(--accent-warning)" />
          </div>
          <div>
            <div className="text-secondary" style={{ fontSize: '0.8125rem', fontWeight: '500' }}>Browser Errors (1h)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>842</div>
          </div>
        </div>
        <div className="glass-panel glow-card" style={{ '--card-color': '59, 130, 246', padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <Bug size={24} color="var(--accent-primary)" />
          </div>
          <div>
            <div className="text-secondary" style={{ fontSize: '0.8125rem', fontWeight: '500' }}>New Issues (24h)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>14</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel col-span-2" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Failed Transactions</h3>
          <div style={{ flex: 1, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} role="table">
              <caption className="sr-only">Active Errors and Issues</caption>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 1, borderBottom: '2px solid var(--border-color)' }}>
                <tr style={{ color: 'var(--text-muted)', fontSize: '0.75rem'}}>
                  <th style={{ padding: '0.5rem', fontWeight: '600' }}>Transaction ID</th>
                  <th style={{ padding: '0.5rem', fontWeight: '600' }}>User</th>
                  <th style={{ padding: '0.5rem', fontWeight: '600' }}>Endpoint</th>
                  <th style={{ padding: '0.5rem', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '0.5rem', fontWeight: '600', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {failedTransactions.map(tx => (
                  <tr key={tx.id} className="hover-bg-surface-hover" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s', cursor: 'pointer' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ fontFamily: 'monospace', background: 'rgba(128,128,128,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem' }}>{tx.id}</span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ fontSize: '0.8125rem' }}>{tx.user}</span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', wordBreak: 'break-all' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>{tx.method}</span>
                        <span style={{ fontSize: '0.8125rem' }}>{tx.endpoint}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${tx.status.startsWith('5') ? 'badge-danger' : 'badge-warning'}`} style={{ whiteSpace: 'nowrap' }}>
                        {tx.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button className="btn-icon" onClick={() => setActiveTrace(tx)}>
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Showing 1-3 of 1,240 records</span>
            <div className="flex gap-2">
              <button className="btn-ghost" style={{ padding: '0.2rem 0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>Prev</button>
              <button className="btn-ghost" style={{ padding: '0.2rem 0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>Next</button>
            </div>
          </div>
        </div>

        <div className="flex-col gap-4">
          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Top Error Signatures</h3>
            <div className="flex-col gap-3">
              {errorSignatures.map(sig => (
                <div key={sig.id} className="flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-primary)', wordBreak: 'break-all', lineHeight: '1.4' }}>{sig.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted" style={{ fontSize: '0.7rem' }}>
                    <span>{sig.count} events</span>
                    <span className="text-danger">{sig.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Recent Error Screenshots</h3>
            <div className="grid grid-cols-2 gap-2" style={{ marginTop: '0.5rem' }}>
              {[1,2,3,4].map(num => (
                <div key={num} style={{ background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)', minHeight: '6.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('.overlay').style.opacity = '1';
                    e.currentTarget.querySelector('.screen-text').style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('.overlay').style.opacity = '0';
                    e.currentTarget.querySelector('.screen-text').style.transform = 'scale(1)';
                  }}
                >
                  <span className="screen-text" style={{ transition: 'transform 0.3s ease' }}>Screen_{num}.png</span>
                  <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Search size={20} color="white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngineeringDashboard;
