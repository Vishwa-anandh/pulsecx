import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Users, UserPlus, Shield, Key, Network, Server, Activity, Mail, Database, Terminal, FileText, ToggleLeft, ToggleRight, CheckCircle, Search, Cpu, Globe } from 'lucide-react';

export default function SettingsHub() {
  const { tab } = useParams();

  if (!tab) {
    return <Navigate to="/settings/users" replace />;
  }

  const tabMap = {
    'users': 'Users',
    'teams': 'Teams',
    'integrations': 'Integrations',
    'agents': 'Agents',
    'audit': 'Audit'
  };

  const activeTab = tabMap[tab] || 'Users';

  const renderUsers = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>User Management</h2>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage users, roles, and platform permissions.</p>
        </div>
        <button className="btn btn-primary"><UserPlus size={14}/> Add User</button>
      </div>

      <div className="glass-panel" style={{ padding: '0' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>User</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Role</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Permissions</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Sarah Connor', email: 'sarah@pulsecx.com', role: 'Global Admin', perms: 'Full Access', status: 'Active' },
              { name: 'John Doe', email: 'john.d@pulsecx.com', role: 'Engineer', perms: 'Read, Write, Execute', status: 'Active' },
              { name: 'Alice Smith', email: 'alice.s@pulsecx.com', role: 'Support Tier 1', perms: 'Read Only', status: 'Inactive' },
              { name: 'Bob Johnson', email: 'bob.j@pulsecx.com', role: 'Ops Manager', perms: 'Read, Write', status: 'Active' },
            ].map((user, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div className="flex-col">
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{user.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.email}</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)' }}>{user.role}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{user.perms}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge badge-${user.status === 'Active' ? 'success' : 'secondary'}`}>{user.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeams = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Team Management</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Group users into operational teams for alert routing.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { name: 'Operations Team', count: 12, desc: 'Handles infrastructure, platform health, and deployments.' },
          { name: 'Support Team', count: 45, desc: 'Frontline customer support and tier 1 incident triaging.' },
          { name: 'Engineering Team', count: 28, desc: 'Core developers, handles L3 escalations and bug fixes.' }
        ].map((team, i) => (
          <div key={i} className="glass-panel hover-bg-surface-hover cursor-pointer" style={{ padding: '1.5rem', transition: 'all 0.2s' }}>
            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <Users size={20} />
              </div>
              <span className="badge badge-primary">{team.count} members</span>
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>{team.name}</h3>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{team.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Integrations</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Connect third-party services for alerting and syncing.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {[
          { name: 'Microsoft Teams', type: 'ChatOps', icon: Terminal, status: true },
          { name: 'Email SMTP', type: 'Notifications', icon: Mail, status: true },
          { name: 'SAP', type: 'ERP Data', icon: Database, status: false },
          { name: 'Jira', type: 'Issue Tracking', icon: CheckCircle, status: true },
          { name: 'ServiceNow', type: 'ITSM', icon: Shield, status: false }
        ].map((int, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="flex items-center gap-4">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: int.status ? 'var(--accent-success)' : 'var(--text-muted)' }}>
                <int.icon size={24} />
              </div>
              <div className="flex-col">
                <span style={{ fontSize: '1rem', fontWeight: '600' }}>{int.name}</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{int.type}</span>
              </div>
            </div>
            <div>
               {int.status ? <ToggleRight size={32} className="text-success cursor-pointer" /> : <ToggleLeft size={32} className="text-muted cursor-pointer" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Monitoring Agents</h2>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage global data collection agents.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { region: 'US-East', status: 'Active', cpu: '45%', mem: '2.1GB' },
          { region: 'EU-West', status: 'Active', cpu: '62%', mem: '3.4GB' },
          { region: 'AP-South', status: 'Active', cpu: '28%', mem: '1.8GB' },
          { region: 'US-West', status: 'Offline', cpu: '0%', mem: '0GB' }
        ].map((agent, i) => (
          <div key={i} className="glass-panel" style={{ padding: '1.5rem', borderTop: `3px solid ${agent.status === 'Active' ? 'var(--accent-success)' : 'var(--accent-danger)'}` }}>
            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
               <div className="flex items-center gap-2 font-semibold">
                 <Globe size={16} className="text-primary"/> {agent.region}
               </div>
               <span className={`badge badge-${agent.status === 'Active' ? 'success' : 'danger'}`}>{agent.status}</span>
            </div>
            <div className="flex-col gap-2 mt-4 text-sm text-secondary">
               <div className="flex justify-between"><span className="flex items-center gap-2"><Cpu size={14}/> CPU</span> <span>{agent.cpu}</span></div>
               <div className="flex justify-between"><span className="flex items-center gap-2"><Activity size={14}/> Memory</span> <span>{agent.mem}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAudit = () => (
    <div className="flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Audit Logs</h2>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Chronological record of all system activities.</p>
        </div>
        <div className="flex gap-2">
           <div className="input-field" style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={14} className="text-muted"/>
              <input type="text" placeholder="Search logs..." style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }} />
           </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Timestamp</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>User</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Action</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Resource</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: '2026-06-10 10:45:12', user: 'sarah@pulsecx.com', action: 'CREATE_USER', resource: 'bob.j@pulsecx.com' },
              { time: '2026-06-10 09:12:05', user: 'SYSTEM', action: 'AGENT_OFFLINE', resource: 'Agent (US-West)' },
              { time: '2026-06-09 16:30:00', user: 'john.d@pulsecx.com', action: 'UPDATE_ALERT_RULE', resource: 'Rule: CPU > 90%' },
              { time: '2026-06-09 14:22:18', user: 'sarah@pulsecx.com', action: 'ENABLE_INTEGRATION', resource: 'Jira' },
              { time: '2026-06-09 11:05:44', user: 'alice.s@pulsecx.com', action: 'ACKNOWLEDGE_INCIDENT', resource: 'INC-2049' },
            ].map((log, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{log.time}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)' }}>{log.user}</td>
                <td style={{ padding: '1rem 1.5rem' }}><span className="badge badge-secondary" style={{ fontFamily: 'monospace' }}>{log.action}</span></td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{log.resource}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex h-full gap-6 animate-fade-in" style={{ paddingBottom: '2rem', minHeight: 'calc(100vh - 100px)' }}>
      {/* Content Pane */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {activeTab === 'Users' && renderUsers()}
        {activeTab === 'Teams' && renderTeams()}
        {activeTab === 'Integrations' && renderIntegrations()}
        {activeTab === 'Agents' && renderAgents()}
        {activeTab === 'Audit' && renderAudit()}
      </div>
    </div>
  );
}
