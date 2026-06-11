import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, AlertTriangle, Route, Activity, Server, Clock, Code, Database, Globe } from 'lucide-react';

export default function AlertDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock details
  const alert = {
    id: id || 'ALT-901',
    trigger: 'Latency > 500ms',
    severity: 'Critical',
    status: 'Open',
    journey: 'Checkout Payment Flow',
    time: '10 mins ago',
    threshold: '500ms',
    currentValue: '850ms',
    service: 'Payment Gateway API',
    region: 'us-east-1'
  };

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      
      {/* Hero Banner */}
      <div className="glass-panel" style={{ 
        background: alert.severity === 'Critical' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, var(--bg-surface) 100%)' : 'var(--bg-surface)', 
        border: '1px solid var(--border-color)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
          <button className="btn-icon" onClick={() => navigate('/alerts')} style={{ marginTop: '0.25rem', background: 'var(--bg-base)' }}>
            <ArrowLeft size={18} />
          </button>
          <div className="flex-col gap-2" style={{ flex: 1 }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{alert.id}</span>
              <span className={`badge badge-${alert.status === 'Open' ? 'danger' : alert.status === 'Acknowledged' ? 'warning' : 'success'}`}>{alert.status}</span>
              <span className="badge" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}><Clock size={10} style={{ marginRight: '4px' }}/> {alert.time}</span>
            </div>
            <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: '700', letterSpacing: '-0.02em' }}>{alert.trigger}</h1>
            <p className="text-secondary" style={{ fontSize: '0.875rem', maxWidth: '800px', lineHeight: '1.5' }}>
              Synthetic monitoring detected that the average latency for the <strong style={{ color: 'var(--text-primary)' }}>{alert.service}</strong> exceeded the defined threshold of {alert.threshold}.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" style={{ background: 'var(--bg-base)' }}>Silence Alert</button>
            <button className="btn btn-primary" onClick={() => navigate(`/incidents/new?alert=${alert.id}`)} style={{ background: 'var(--accent-danger)', color: 'white', boxShadow: 'none' }}>Escalate to Incident</button>
          </div>
        </div>
      </div>

      {/* Metadata Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>Alert Context</h3>
          
          <div className="flex-col gap-4">
            <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2 color-secondary">
                <AlertTriangle size={14} className="text-danger" />
                <span style={{ fontSize: '0.8125rem' }}>Severity</span>
              </div>
              <span style={{ fontWeight: '600', color: 'var(--accent-danger)' }}>{alert.severity}</span>
            </div>
            
            <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2 color-secondary">
                <Route size={14} className="text-primary" />
                <span style={{ fontSize: '0.8125rem' }}>Impacted Journey</span>
              </div>
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{alert.journey}</span>
            </div>
            
            <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2 color-secondary">
                <Server size={14} className="text-warning" />
                <span style={{ fontSize: '0.8125rem' }}>Service</span>
              </div>
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{alert.service}</span>
            </div>

            <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2 color-secondary">
                <Globe size={14} className="text-success" />
                <span style={{ fontSize: '0.8125rem' }}>Region</span>
              </div>
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{alert.region}</span>
            </div>
          </div>
        </div>

        {/* Visual Graph / Metric Representation */}
        <div className="col-span-2 glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>Metric Telemetry</h3>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="flex-col items-center gap-2 z-10">
              <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--accent-danger)' }}>{alert.currentValue}</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Current Metric Value</span>
            </div>
            
            <div style={{ position: 'absolute', bottom: '2rem', width: '80%', height: '2px', background: 'var(--text-muted)', borderTop: '2px dashed var(--accent-warning)', display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--accent-warning)', fontWeight: '600' }}>Threshold: {alert.threshold}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
