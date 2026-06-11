import React, { useState, useContext } from 'react';
import { Bell, ShieldAlert, Settings, Plus, Search, Filter, Mail, MessageSquare, Webhook, CheckCircle2, XCircle, AlertTriangle, ChevronRight, Play, X, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import EmptyState from '../components/EmptyState';
import { AlertContext } from '../context/AlertContext';
import { useToast } from '../context/ToastContext';

export default function AlertsHub() {
  const { alerts, rules, channels, history, addAlertRule, updateRuleStatus, updateChannel, updateAlertStatus } = useContext(AlertContext);
  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('Center');
  const navigate = useNavigate();
  const { currentUser } = useUsers();

  if (!currentUser?.isDemo) {
    return (
      <EmptyState 
        title="Alerts & Routing" 
        description="Configure alert rules and routing to notify your team when issues occur." 
      />
    );
  }

  // Modal States
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [newRuleData, setNewRuleData] = useState({ name: '', condition: '', channels: [] });
  
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channelConfig, setChannelConfig] = useState('');

  const tabs = ['Center', 'Rules', 'Channels', 'History'];

  const renderCenter = () => (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="grid grid-cols-3 gap-4">
        {/* Open Alerts Card */}
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>{alerts.filter(a => a.status === 'Open').length}</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Open Alerts</span>
          </div>
        </div>
        {/* Acknowledged Alerts Card */}
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>{alerts.filter(a => a.status === 'Acknowledged').length}</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Acknowledged</span>
          </div>
        </div>
        {/* Resolved Alerts Card */}
        <div className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>{alerts.filter(a => a.status === 'Resolved').length}</span>
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
            {alerts.map(alert => (
              <tr key={alert.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} className="hover-bg-surface-hover group">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate(`/alerts/${alert.id}`)}>{alert.id}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '500', color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => navigate(`/alerts/${alert.id}`)}>{alert.trigger}</td>
                <td style={{ padding: '1rem 1.5rem', cursor: 'pointer' }} onClick={() => navigate(`/alerts/${alert.id}`)}>
                  <span className={`text-${alert.severity === 'Critical' ? 'danger' : alert.severity === 'Major' ? 'warning' : 'primary'}`} style={{ fontWeight: '600' }}>{alert.severity}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', cursor: 'pointer' }} onClick={() => navigate(`/alerts/${alert.id}`)}>
                  <span className={`badge badge-${alert.status === 'Open' ? 'danger' : alert.status === 'Acknowledged' ? 'warning' : 'success'}`}>{alert.status}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => navigate(`/alerts/${alert.id}`)}>{alert.time}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {alert.status === 'Open' && (
                      <button className="btn btn-ghost" style={{ padding: '0.2rem 0.5rem', color: 'var(--accent-warning)', borderColor: 'var(--accent-warning)' }} onClick={() => { updateAlertStatus(alert.id, 'Acknowledged'); addToast(`Alert ${alert.id} acknowledged`, "success"); }}>Ack</button>
                    )}
                    {alert.status !== 'Resolved' && (
                      <button className="btn btn-ghost" style={{ padding: '0.2rem 0.5rem', color: 'var(--accent-success)', borderColor: 'var(--accent-success)' }} onClick={() => { updateAlertStatus(alert.id, 'Resolved'); addToast(`Alert ${alert.id} resolved`, "success"); }}>Resolve</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={() => setIsRuleModalOpen(true)}><Plus size={14} /> Create Alert Rule</button>
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
            {rules.map(rule => (
              <tr key={rule.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="hover-bg-surface-hover">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>{rule.name}</td>
                <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--accent-primary)', fontSize: '0.75rem' }}>{rule.condition}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div className="flex gap-2">
                    {rule.channels.map(ch => <span key={ch} className="badge" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)' }}>{ch}</span>)}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                   <label className="toggle-switch">
                     <input 
                       type="checkbox" 
                       checked={rule.status === 'Active'} 
                       onChange={() => {
                         const newStatus = rule.status === 'Active' ? 'Disabled' : 'Active';
                         updateRuleStatus(rule.id, newStatus);
                         addToast(`Rule ${newStatus.toLowerCase()}`, "success");
                       }}
                     />
                     <span className="toggle-slider"></span>
                   </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderChannels = () => (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        {channels.map(ch => (
          <div key={ch.name} className="glass-panel" style={{ padding: 'var(--panel-padding)', display: 'flex', gap: 'var(--panel-gap)', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
              {ch.name.includes('Email') ? <Mail size={24} /> : ch.name.includes('Webhook') ? <Webhook size={24} /> : <MessageSquare size={24} />}
            </div>
            <div className="flex-col gap-1" style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{ch.name}</h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{ch.desc}</p>
            </div>
            <div>
              {ch.connected ? (
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost" style={{ color: 'var(--accent-success)' }} disabled><CheckCircle2 size={14}/> Connected</button>
                  <button className="btn-icon" onClick={() => { updateChannel(ch.name, false); addToast("Channel disconnected", "success"); }} data-tooltip="Disconnect"><X size={14}/></button>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => { setSelectedChannel(ch); setIsChannelModalOpen(true); setChannelConfig(''); }}>Configure</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="flex-col gap-4 animate-fade-in">
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
            {history.map(log => (
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
    <div className="flex-col gap-4 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Alerts Hub</h1>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage monitoring alerts, notification rules, and channels.</p>
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

      {/* Rule Creation Modal */}
      {isRuleModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} className="animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
            <div className="flex justify-between items-center">
              <h3 style={{ margin: 0 }}>Create Alert Rule</h3>
              <button className="btn-icon" onClick={() => { setIsRuleModalOpen(false); setNewRuleData({name: '', condition: '', channels: []}); }}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              if (newRuleData.name.trim() && newRuleData.condition.trim() && newRuleData.channels.length > 0) {
                addAlertRule(newRuleData);
                addToast("Alert Rule created successfully!", "success");
                setIsRuleModalOpen(false);
                setNewRuleData({name: '', condition: '', channels: []});
              } else {
                addToast("Please fill all fields and select at least one channel", "error");
              }
            }} className="flex-col gap-4">
              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Rule Name</label>
                <input 
                  type="text" required
                  value={newRuleData.name}
                  onChange={(e) => setNewRuleData({...newRuleData, name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                  placeholder="e.g. Critical Latency Spike"
                />
              </div>
              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Condition Expression</label>
                <input 
                  type="text" required
                  value={newRuleData.condition}
                  onChange={(e) => setNewRuleData({...newRuleData, condition: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'monospace' }}
                  placeholder="e.g. P99 > 800ms for 5m"
                />
              </div>
              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Notify Channels</label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {channels.filter(c => c.connected).map(ch => (
                     <label key={ch.name} className="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" checked={newRuleData.channels.includes(ch.name)} onChange={(e) => {
                          if (e.target.checked) setNewRuleData(prev => ({...prev, channels: [...prev.channels, ch.name]}));
                          else setNewRuleData(prev => ({...prev, channels: prev.channels.filter(c => c !== ch.name)}));
                        }} />
                        <span style={{ fontSize: '0.8125rem' }}>{ch.name}</span>
                     </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" className="btn btn-ghost" onClick={() => setIsRuleModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Rule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Configure Channel Modal */}
      {isChannelModalOpen && selectedChannel && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} className="animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
            <div className="flex justify-between items-center">
              <h3 style={{ margin: 0 }}>Configure {selectedChannel.name}</h3>
              <button className="btn-icon" onClick={() => setIsChannelModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              if (channelConfig.trim()) {
                updateChannel(selectedChannel.name, true);
                addToast(`${selectedChannel.name} successfully connected!`, "success");
                setIsChannelModalOpen(false);
                setChannelConfig('');
              }
            }} className="flex-col gap-4">
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                {selectedChannel.name.includes('Email') ? 'Enter the destination email distribution list.' : 'Enter the connection endpoint URL or API Key.'}
              </p>
              
              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  {selectedChannel.name.includes('Email') ? 'Email Address' : 'Webhook URL / Secret'}
                </label>
                <div className="input-field" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 0.5rem' }}>
                  <Key size={14} className="text-muted" />
                  <input 
                    type={selectedChannel.name.includes('Email') ? 'email' : 'text'} required
                    value={channelConfig}
                    onChange={(e) => setChannelConfig(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
                    placeholder={selectedChannel.name.includes('Email') ? "alerts@pulsecx.com" : "https://hooks.slack.com/services/..."}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" className="btn btn-ghost" onClick={() => setIsChannelModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ background: 'var(--accent-success)' }}>Connect Channel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
