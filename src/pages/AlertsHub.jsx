import React, { useState } from 'react';
import { Bell, ShieldAlert, Settings, Plus, Search, Filter, Mail, MessageSquare, Webhook, CheckCircle2, XCircle, AlertTriangle, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_ALERTS = [
  { id: 'ALT-901', trigger: 'Latency > 500ms', severity: 'Critical', status: 'Open', journey: 'Checkout Payment Flow', time: '10 mins ago' },
  { id: 'ALT-902', trigger: 'Error Rate > 5%', severity: 'Major', status: 'Acknowledged', journey: 'Login Flow', time: '1 hour ago' },
  { id: 'ALT-903', trigger: 'DB CPU > 80%', severity: 'Minor', status: 'Resolved', journey: 'Search Catalog', time: '2 days ago' }
];

const MOCK_RULES = [
  { id: 'RUL-001', name: 'High Latency Alert', condition: 'P99 Latency > 500ms for 5 mins', status: 'Active', channels: ['MS Teams', 'Email'] },
  { id: 'RUL-002', name: 'Payment Failure Spike', condition: '5xx Errors > 2% for 2 mins', status: 'Active', channels: ['PagerDuty', 'SMS'] },
  { id: 'RUL-003', name: 'Low Traffic Warning', condition: 'Requests < 100/min for 10 mins', status: 'Disabled', channels: ['Email'] },
];

const MOCK_HISTORY = [
  { id: 'LOG-1029', alert: 'ALT-901', channel: 'MS Teams', recipient: '#ops-alerts', status: 'Sent', time: '10 mins ago' },
  { id: 'LOG-1028', alert: 'ALT-901', channel: 'Email', recipient: 'oncall@pulsecx.com', status: 'Sent', time: '10 mins ago' },
  { id: 'LOG-1027', alert: 'ALT-902', channel: 'SMS', recipient: '+1 (555) 019-2039', status: 'Sent', time: '1 hour ago' },
  { id: 'LOG-1026', alert: 'ALT-903', channel: 'Webhook', recipient: 'https://api.internal/trigger', status: 'Failed', time: '2 days ago' },
];

export default function AlertsHub() {
  const [activeTab, setActiveTab] = useState('Center');
  const navigate = useNavigate();

  const tabs = ['Center', 'Rules', 'Channels', 'History'];

  const renderCenter = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-3 gap-4">
        {/* Open Alerts Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>1</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Open Alerts</span>
          </div>
        </div>
        {/* Acknowledged Alerts Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>1</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Acknowledged</span>
          </div>
        </div>
        {/* Resolved Alerts Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>1</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Resolved (24h)</span>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Alert ID</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Trigger Condition</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Severity</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Time</th>
              <th style={{ padding: '0.75rem 1.5rem', width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ALERTS.map(alert => (
              <tr key={alert.id} onClick={() => navigate(`/alerts/${alert.id}`)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover-bg-surface-hover group">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>{alert.id}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '500', color: 'var(--text-primary)' }}>{alert.trigger}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`text-${alert.severity === 'Critical' ? 'danger' : alert.severity === 'Major' ? 'warning' : 'primary'}`} style={{ fontWeight: '600' }}>{alert.severity}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge badge-${alert.status === 'Open' ? 'danger' : alert.status === 'Acknowledged' ? 'warning' : 'success'}`}>{alert.status}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{alert.time}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}><ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="flex justify-end">
        <button className="btn btn-primary"><Plus size={14} /> Create Alert Rule</button>
      </div>
      <div className="glass-panel" style={{ padding: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Rule Name</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Condition & Threshold</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Recipients</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RULES.map(rule => (
              <tr key={rule.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="hover-bg-surface-hover">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>{rule.name}</td>
                <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--accent-primary)', fontSize: '0.75rem' }}>{rule.condition}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div className="flex gap-2">
                    {rule.channels.map(ch => <span key={ch} className="badge" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)' }}>{ch}</span>)}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge badge-${rule.status === 'Active' ? 'success' : 'neutral'}`}>{rule.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderChannels = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-6">
        {[
          { name: 'Microsoft Teams', icon: <MessageSquare size={24} />, desc: 'Send alerts to Teams channels via incoming webhook.', connected: true },
          { name: 'Email', icon: <Mail size={24} />, desc: 'Send traditional email alerts to users and distribution lists.', connected: true },
          { name: 'SMS', icon: <MessageSquare size={24} />, desc: 'Send critical alerts via SMS using Twilio integration.', connected: false },
          { name: 'Custom Webhook', icon: <Webhook size={24} />, desc: 'Trigger internal APIs or systems on alert creation.', connected: true }
        ].map(ch => (
          <div key={ch.name} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
              {ch.icon}
            </div>
            <div className="flex-col gap-1" style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{ch.name}</h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{ch.desc}</p>
            </div>
            <div>
              {ch.connected ? (
                <button className="btn btn-ghost" style={{ color: 'var(--accent-success)' }}><CheckCircle2 size={14}/> Connected</button>
              ) : (
                <button className="btn btn-primary">Configure</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="glass-panel" style={{ padding: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Log ID</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Alert Ref</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Channel</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Recipient</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Time</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_HISTORY.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="hover-bg-surface-hover">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>{log.id}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--accent-primary)' }}>{log.alert}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{log.channel}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{log.recipient}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{log.time}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  {log.status === 'Sent' ? 
                    <span className="flex items-center gap-1 text-success"><CheckCircle2 size={14}/> Sent</span> : 
                    <span className="flex items-center gap-1 text-danger"><XCircle size={14}/> Failed</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Alerts Hub</h1>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage monitoring alerts, notification rules, and channels.</p>
        </div>
      </div>

      <div className="flex gap-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
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
            {tab === 'Center' ? 'Alert Center' : tab === 'Rules' ? 'Alert Rules' : tab === 'Channels' ? 'Notification Channels' : 'Alert History'}
          </button>
        ))}
      </div>

      <div style={{ paddingTop: '1rem' }}>
        {activeTab === 'Center' && renderCenter()}
        {activeTab === 'Rules' && renderRules()}
        {activeTab === 'Channels' && renderChannels()}
        {activeTab === 'History' && renderHistory()}
      </div>

    </div>
  );
}
