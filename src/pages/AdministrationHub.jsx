import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Users, UserPlus, Shield, Key, Network, Server, Activity, Mail, Database, Terminal, FileText, ToggleLeft, ToggleRight, CheckCircle, Search, Cpu, Globe, Edit2, Trash2, X, MessageSquare, Settings, Plus, RefreshCw, MoreVertical, Download, Filter } from 'lucide-react';
import { useUsers } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import EmptyState from '../components/EmptyState';

export default function AdministrationHub() {
  const { tab } = useParams();
  const { currentUser, users, addUser, updateUser, deleteUser, roles, updateRolePrivilege, teams, addTeam, updateTeam, deleteTeam } = useUsers();
  const { addToast } = useToast();

  if (!currentUser?.isDemo) {
    return (
      <EmptyState 
        title="Workspace Administration" 
        description="Configure your workspace, invite team members, and manage billing." 
      />
    );
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamModalMode, setTeamModalMode] = useState('add');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamFormData, setTeamFormData] = useState({ name: '', desc: '', members: [] });
  const [teamMemberSearch, setTeamMemberSearch] = useState('');
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [userSubTab, setUserSubTab] = useState('users');
  const [selectedRole, setSelectedRole] = useState(null);
  
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Microsoft Teams', type: 'ChatOps', icon: Terminal, status: 'Connected', desc: 'Send alerts to channels' },
    { id: 2, name: 'Email SMTP', type: 'Notifications', icon: Mail, status: 'Connected', desc: 'Email digest routing' },
    { id: 3, name: 'SAP', type: 'ERP Data', icon: Database, status: 'Unconfigured', desc: 'Sync customer data' },
    { id: 4, name: 'Jira', type: 'Issue Tracking', icon: CheckCircle, status: 'Connected', desc: 'Auto-create tickets' },
    { id: 5, name: 'ServiceNow', type: 'ITSM', icon: Shield, status: 'Error', desc: 'Incident management' },
    { id: 6, name: 'Slack', type: 'ChatOps', icon: MessageSquare, status: 'Unconfigured', desc: 'Real-time alerting' }
  ]);
  const [integrationSearch, setIntegrationSearch] = useState('');
  const [integrationFilter, setIntegrationFilter] = useState('All');
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const [isDeployAgentModalOpen, setIsDeployAgentModalOpen] = useState(false);
  const [deployAgentFormData, setDeployAgentFormData] = useState({ region: 'US-East (N. Virginia)', version: 'v2.4.1' });

  const [agents, setAgents] = useState([
    { id: 'ag-1', region: 'US-East (N. Virginia)', status: 'Active', cpu: 45, mem: 62, version: 'v2.4.1', ip: '192.168.1.104', uptime: '14d 2h' },
    { id: 'ag-2', region: 'EU-West (Ireland)', status: 'Active', cpu: 82, mem: 88, version: 'v2.4.1', ip: '10.0.4.22', uptime: '45d 11h' },
    { id: 'ag-3', region: 'AP-South (Mumbai)', status: 'Active', cpu: 28, mem: 41, version: 'v2.4.0', ip: '172.16.0.9', uptime: '112d 5h' },
    { id: 'ag-4', region: 'US-West (Oregon)', status: 'Offline', cpu: 0, mem: 0, version: 'v2.3.9', ip: '192.168.2.11', uptime: '0d 0h' }
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status !== 'Active') return agent;
        const cpuJitter = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const memJitter = Math.floor(Math.random() * 3) - 1; // -1 to +1
        return {
          ...agent,
          cpu: Math.max(0, Math.min(100, agent.cpu + cpuJitter)),
          mem: Math.max(0, Math.min(100, agent.mem + memJitter))
        };
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const [isAgentLogsModalOpen, setIsAgentLogsModalOpen] = useState(false);
  const [selectedAgentLogs, setSelectedAgentLogs] = useState(null);
  const [agentLogsContent, setAgentLogsContent] = useState([]);

  React.useEffect(() => {
    let interval;
    if (isAgentLogsModalOpen && selectedAgentLogs) {
      interval = setInterval(() => {
        const mockLogEntries = [
           "[INFO] Health check passed.",
           "[WARN] Latency spike detected on route /api/v1/metrics",
           `[INFO] Heartbeat acknowledged from ${selectedAgentLogs.ip}`,
           "[DEBUG] Flushing buffer: 204 bytes written.",
           "[INFO] Memory utilization stable.",
           `[ERROR] Connection timeout to origin server. Retrying...`
        ];
        const newEntry = `[${new Date().toISOString()}] ${mockLogEntries[Math.floor(Math.random() * mockLogEntries.length)]}`;
        setAgentLogsContent(prev => [...prev, newEntry].slice(-50)); // Keep last 50 logs
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAgentLogsModalOpen, selectedAgentLogs]);

  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditFilter, setAuditFilter] = useState('All');
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, time: '2026-06-11 11:45:12', user: 'admin@pulsecx.com', action: 'SYSTEM_RESTART', resource: 'Agent (US-East)' },
    { id: 2, time: '2026-06-11 11:42:05', user: 'sarah.j@pulsecx.com', action: 'CREATE_USER', resource: 'bob.m@pulsecx.com' },
    { id: 3, time: '2026-06-11 10:15:22', user: 'SYSTEM', action: 'AGENT_OFFLINE', resource: 'Agent (EU-West)' },
    { id: 4, time: '2026-06-11 09:30:00', user: 'john.d@pulsecx.com', action: 'UPDATE_ALERT_RULE', resource: 'Rule: CPU > 90%' },
    { id: 5, time: '2026-06-11 08:22:18', user: 'sarah.j@pulsecx.com', action: 'ENABLE_INTEGRATION', resource: 'Jira' },
    { id: 6, time: '2026-06-10 16:05:44', user: 'alice.s@pulsecx.com', action: 'ACKNOWLEDGE_INCIDENT', resource: 'INC-2049' },
    { id: 7, time: '2026-06-10 14:12:00', user: 'admin@pulsecx.com', action: 'DELETE_TEAM', resource: 'Marketing Ops' },
    { id: 8, time: '2026-06-10 13:45:11', user: 'bob.m@pulsecx.com', action: 'LOGIN_SUCCESS', resource: '192.168.1.45' },
    { id: 9, time: '2026-06-10 11:30:00', user: 'SYSTEM', action: 'BACKUP_COMPLETE', resource: 'Database: Main' },
    { id: 10, time: '2026-06-10 09:15:22', user: 'sarah.j@pulsecx.com', action: 'API_KEY_ROTATED', resource: 'Key: prod_v1' },
    { id: 11, time: '2026-06-09 15:44:00', user: 'john.d@pulsecx.com', action: 'CREATE_TEAM', resource: 'Security Team' },
    { id: 12, time: '2026-06-09 12:10:05', user: 'alice.s@pulsecx.com', action: 'RESOLVE_INCIDENT', resource: 'INC-2048' },
    { id: 13, time: '2026-06-09 08:00:00', user: 'SYSTEM', action: 'AGENT_ONLINE', resource: 'Agent (AP-South)' },
    { id: 14, time: '2026-06-08 17:20:11', user: 'admin@pulsecx.com', action: 'UPDATE_ROLE', resource: 'Role: Editor' },
    { id: 15, time: '2026-06-08 14:15:00', user: 'bob.m@pulsecx.com', action: 'LOGIN_FAILED', resource: '192.168.1.45' }
  ]);

  React.useEffect(() => {
    if (roles && roles.length > 0 && !selectedRole) {
      setSelectedRole(roles[0]);
    }
  }, [roles, selectedRole]);

  React.useEffect(() => {
    if (teams && teams.length > 0 && !expandedTeamId) {
      setExpandedTeamId(teams[0].id);
    }
  }, [teams, expandedTeamId]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Engineer',
    privilege: 'Read, Write, Execute',
    status: 'Active'
  });

  if (!tab) {
    return <Navigate to="/administration/users" replace />;
  }

  const tabMap = {
    'users': 'Users',
    'teams': 'Teams',
    'integrations': 'Integrations',
    'agents': 'Agents',
    'audit': 'Audit'
  };

  const activeTab = tabMap[tab] || 'Users';

  // Helper for initials
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Helper for colors based on initials
  const getAvatarColor = (name) => {
    const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', email: '', role: 'Engineer', privilege: 'Read, Write', status: 'Active' });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, privilege: user.privilege, status: user.status });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      addToast("User deleted successfully.", "success");
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      addUser(formData);
      addToast("User created successfully.", "success");
    } else {
      updateUser(selectedUser.id, formData);
      addToast("User updated successfully.", "success");
    }
    setIsModalOpen(false);
  };

  const openAddTeamModal = () => {
    setTeamModalMode('add');
    setTeamFormData({ name: '', desc: '', members: [] });
    setTeamMemberSearch('');
    setIsTeamModalOpen(true);
  };

  const openEditTeamModal = (team) => {
    setTeamModalMode('edit');
    setSelectedTeam(team);
    setTeamFormData({ name: team.name, desc: team.desc, members: team.members || [] });
    setTeamMemberSearch('');
    setIsTeamModalOpen(true);
  };

  const handleDeleteTeam = (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      deleteTeam(id);
      addToast("Team deleted successfully.", "success");
      setIsTeamModalOpen(false);
    }
  };

  const handleTeamModalSubmit = (e) => {
    e.preventDefault();
    if (teamModalMode === 'add') {
      addTeam(teamFormData);
      addToast("Team created successfully.", "success");
    } else {
      updateTeam(selectedTeam.id, teamFormData);
      addToast("Team updated successfully.", "success");
    }
    setIsTeamModalOpen(false);
  };

  const toggleTeamMember = (userId) => {
    setTeamFormData(prev => ({
      ...prev,
      members: prev.members.includes(userId) 
        ? prev.members.filter(id => id !== userId)
        : [...prev.members, userId]
    }));
  };

  const renderUserManagement = () => (
    <div className="flex-col gap-4 animate-fade-in" style={{ height: '100%' }}>
      <div className="flex justify-between items-start">
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>User Management</h2>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage users, roles, and platform privileges.</p>
        </div>
        {userSubTab === 'users' && (
          <div className="flex items-center gap-3">
            <div className="input-field" style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={14} className="text-muted"/>
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '200px' }} 
              />
            </div>
            <button className="btn btn-primary" onClick={openAddModal}><UserPlus size={14}/> Add User</button>
          </div>
        )}
      </div>

      <div className="flex gap-4" style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
         <div className={`cursor-pointer pb-2 font-semibold ${userSubTab === 'users' ? 'text-primary' : 'text-muted'}`} style={{ borderBottom: userSubTab === 'users' ? '2px solid var(--accent-primary)' : '2px solid transparent' }} onClick={() => setUserSubTab('users')}>Users List</div>
         <div className={`cursor-pointer pb-2 font-semibold ${userSubTab === 'roles' ? 'text-primary' : 'text-muted'}`} style={{ borderBottom: userSubTab === 'roles' ? '2px solid var(--accent-primary)' : '2px solid transparent' }} onClick={() => setUserSubTab('roles')}>Roles & Privileges</div>
      </div>

      {userSubTab === 'users' ? renderUsersList() : renderRoles()}
    </div>
  );

  const renderUsersList = () => (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="glass-panel" style={{ padding: '0', overflowX: 'auto' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>User</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Role</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Privilege</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
              <tr key={user.id} className="hover-bg-surface-hover" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div className="flex items-center gap-3">
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: getAvatarColor(user.name), color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-col">
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{user.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.email}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)' }}>{user.role}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{user.privilege}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge badge-${user.status === 'Active' ? 'success' : 'secondary'}`}>{user.status}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                   <div className="flex items-center justify-end gap-2">
                     <button className="btn-icon tooltip-container" data-tooltip="Edit User" onClick={() => openEditModal(user)}>
                       <Edit2 size={16} />
                     </button>
                     <button className="btn-icon tooltip-container text-danger" data-tooltip="Delete User" onClick={() => handleDeleteUser(user.id)}>
                       <Trash2 size={16} />
                     </button>
                   </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No users found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeams = () => (
    <div className="flex-col gap-4 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Team Management</h2>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Group users into operational teams for alert routing.</p>
        </div>
        <button className="btn btn-primary" onClick={openAddTeamModal}><Users size={14}/> Create Team</button>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Team Details</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Members</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams && teams.length > 0 ? teams.map((team) => (
              <React.Fragment key={team.id}>
                <tr className="hover-bg-surface-hover cursor-pointer" onClick={() => setExpandedTeamId(team.id)} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s', background: expandedTeamId === team.id ? 'var(--bg-surface-hover)' : 'transparent' }}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div className="flex-col">
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '0.25rem' }}>{team.name}</span>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{team.desc}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div className="flex items-center gap-1">
                      {team.members && team.members.slice(0, 3).map((memberId, idx) => {
                         const user = users.find(u => u.id === memberId);
                         if (!user) return null;
                         return (
                           <div key={memberId} style={{ width: '32px', height: '32px', borderRadius: '50%', background: getAvatarColor(user.name), color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', marginLeft: idx > 0 ? '-10px' : '0', border: '2px solid var(--bg-surface)', zIndex: 10 - idx }} className="tooltip-container" data-tooltip={user.name}>
                             {getInitials(user.name)}
                           </div>
                         );
                      })}
                      {team.members && team.members.length > 3 && (
                         <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-base)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', marginLeft: '-10px', border: '2px solid var(--bg-surface)', zIndex: 1 }}>
                           +{team.members.length - 3}
                         </div>
                      )}
                      {(!team.members || team.members.length === 0) && (
                         <span className="badge badge-secondary">No members</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                     <div className="flex items-center justify-end gap-2">
                       <button className="btn-icon tooltip-container" data-tooltip="Manage Team" onClick={(e) => { e.stopPropagation(); openEditTeamModal(team); }}>
                         <Edit2 size={16} />
                       </button>
                       <button className="btn-icon tooltip-container text-danger" data-tooltip="Delete Team" onClick={(e) => { e.stopPropagation(); handleDeleteTeam(team.id); }}>
                         <Trash2 size={16} />
                       </button>
                     </div>
                  </td>
                </tr>
                {expandedTeamId === team.id && (
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <td colSpan="3" style={{ padding: '0' }}>
                      <div className="animate-fade-in" style={{ padding: '1.5rem 2rem' }}>
                        <div className="flex justify-between items-center mb-4">
                           <h4 style={{ margin: 0 }}>Team Members</h4>
                           <button className="btn btn-ghost btn-sm" onClick={() => openEditTeamModal(team)}><Edit2 size={14} style={{marginRight: '0.5rem'}}/> Manage Members</button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                           {team.members && team.members.length > 0 ? team.members.map(memberId => {
                              const user = users.find(u => u.id === memberId);
                              if (!user) return null;
                              return (
                                <div key={user.id} className="glass-panel" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--border-color)', background: 'var(--bg-base)' }}>
                                   <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: getAvatarColor(user.name), color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                     {getInitials(user.name)}
                                   </div>
                                   <div className="flex-col" style={{ overflow: 'hidden' }}>
                                      <span style={{ fontWeight: '500', fontSize: '0.875rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</span>
                                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.role}</span>
                                   </div>
                                </div>
                              );
                           }) : (
                              <div className="col-span-4 text-muted" style={{ padding: 'var(--panel-padding)', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>No members in this team.</div>
                           )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )) : (
              <tr>
                <td colSpan="3" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                   <div className="flex-col items-center gap-3">
                     <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                       <Users size={32} />
                     </div>
                     <span style={{ fontSize: '1rem', fontWeight: '500' }}>No teams configured yet.</span>
                     <span style={{ fontSize: '0.875rem' }}>Click "Create Team" to get started.</span>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderIntegrations = () => {
    const filteredIntegrations = integrations.filter(int => {
      const matchesSearch = int.name.toLowerCase().includes(integrationSearch.toLowerCase()) || int.type.toLowerCase().includes(integrationSearch.toLowerCase());
      const matchesFilter = integrationFilter === 'All' || int.status === integrationFilter;
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="flex-col gap-4 animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Integration Catalog</h2>
            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Connect third-party services for alerting, syncing, and automation.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', width: '250px' }}>
              <Search size={16} className="text-muted" style={{ marginRight: '0.5rem' }} />
              <input 
                type="text" 
                placeholder="Search integrations..." 
                value={integrationSearch}
                onChange={(e) => setIntegrationSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.875rem' }}
              />
            </div>
            <select 
              value={integrationFilter} 
              onChange={(e) => setIntegrationFilter(e.target.value)}
              style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              <option value="All">All Statuses</option>
              <option value="Connected">Connected</option>
              <option value="Unconfigured">Unconfigured</option>
              <option value="Error">Error</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredIntegrations.map((int) => (
            <div key={int.id} className="glass-panel hover-bg-surface-hover" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)', transition: 'all 0.2s' }}>
              <div className="flex justify-between items-start">
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: int.status === 'Connected' ? 'var(--accent-success)' : int.status === 'Error' ? 'var(--accent-danger)' : 'var(--text-primary)' }}>
                  <int.icon size={24} />
                </div>
                {int.status === 'Connected' && <span className="badge badge-success">Connected</span>}
                {int.status === 'Error' && <span className="badge badge-danger">Auth Error</span>}
              </div>
              <div className="flex-col">
                <span style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>{int.name}</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{int.desc}</span>
              </div>
              <div className="flex justify-between items-center mt-auto pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                <span className="badge badge-secondary" style={{ background: 'var(--bg-base)' }}>{int.type}</span>
                {int.status === 'Unconfigured' ? (
                  <button className="btn btn-primary btn-sm" onClick={() => { setSelectedIntegration(int); setIsIntegrationModalOpen(true); }}>
                    <Plus size={14}/> Connect
                  </button>
                ) : (
                  <button className="btn btn-ghost btn-sm" onClick={() => { setSelectedIntegration(int); setIsIntegrationModalOpen(true); }}>
                    <Settings size={14}/> Configure
                  </button>
                )}
              </div>
            </div>
          ))}
          {filteredIntegrations.length === 0 && (
            <div className="col-span-3 text-center text-muted" style={{ padding: '4rem' }}>
              No integrations match your search criteria.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAgents = () => {
    const activeAgents = agents.filter(a => a.status === 'Active').length;
    const offlineAgents = agents.filter(a => a.status === 'Offline').length;

    return (
      <div className="flex-col gap-4 animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Monitoring Agents</h2>
            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage global data collection and synthetic monitoring agents.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsDeployAgentModalOpen(true)}>
            <Server size={14}/> Deploy Agent
          </button>
        </div>


        <div className="grid grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="glass-panel hover-bg-surface-hover" style={{ padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)', transition: 'all 0.2s' }}>
              
              {/* Header */}
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-2 font-semibold">
                   <Globe size={16} className={agent.status === 'Active' ? 'text-primary' : 'text-muted'}/> 
                   <span style={{ color: agent.status === 'Active' ? 'var(--text-primary)' : 'var(--text-muted)' }}>{agent.region}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className={`badge badge-${agent.status === 'Active' ? 'success' : agent.status === 'Restarting' ? 'warning' : 'danger'}`}>
                       {agent.status}
                    </span>
                    <button className="btn-icon btn-sm text-danger" onClick={() => {
                        setAgents(agents.filter(a => a.id !== agent.id));
                        addToast(`Agent ${agent.region} decommissioned.`, 'success');
                    }} title="Decommission Agent">
                        <Trash2 size={14}/>
                    </button>
                 </div>
              </div>

              {/* Metadata */}
              <div className="flex-col gap-1" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                 <div className="flex justify-between"><span>IP Address</span> <span style={{ fontFamily: 'monospace' }}>{agent.ip}</span></div>
                 <div className="flex justify-between"><span>Version</span> <span>{agent.version}</span></div>
                 <div className="flex justify-between"><span>Uptime</span> <span>{agent.uptime}</span></div>
              </div>

              {/* Metrics */}
              <div className="flex-col gap-3 mt-2" style={{ opacity: agent.status === 'Active' ? 1 : 0.4 }}>
                 <div className="flex-col gap-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="flex items-center gap-1"><Cpu size={12}/> CPU</span> 
                      <span>{agent.cpu}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'var(--bg-base)', borderRadius: '2px', overflow: 'hidden' }}>
                       <div style={{ width: `${agent.cpu}%`, height: '100%', background: agent.cpu > 80 ? 'var(--accent-danger)' : agent.cpu > 60 ? 'var(--accent-warning)' : 'var(--accent-success)', transition: 'width 1s ease-in-out, background-color 1s ease-in-out' }} />
                    </div>
                 </div>

                 <div className="flex-col gap-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="flex items-center gap-1"><Activity size={12}/> Memory</span> 
                      <span>{agent.mem}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'var(--bg-base)', borderRadius: '2px', overflow: 'hidden' }}>
                       <div style={{ width: `${agent.mem}%`, height: '100%', background: agent.mem > 80 ? 'var(--accent-danger)' : agent.mem > 60 ? 'var(--accent-warning)' : 'var(--accent-success)', transition: 'width 1s ease-in-out, background-color 1s ease-in-out' }} />
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-auto pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
                 <button className="btn btn-ghost btn-sm" disabled={agent.status !== 'Active'} onClick={() => {
                    setAgents(agents.map(a => a.id === agent.id ? { ...a, status: 'Restarting' } : a));
                    addToast(`Initiating restart for ${agent.region}...`, 'info');
                    setTimeout(() => {
                        setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, status: 'Active' } : a));
                        addToast(`Agent ${agent.region} restarted successfully.`, 'success');
                    }, 3000);
                 }}>
                    <RefreshCw size={12} style={{ marginRight: '0.25rem' }} className={agent.status === 'Restarting' ? 'animate-spin' : ''}/> 
                    {agent.status === 'Restarting' ? 'Restarting...' : 'Restart'}
                 </button>
                 <button className="btn btn-ghost btn-sm" onClick={() => {
                    setSelectedAgentLogs(agent);
                    setAgentLogsContent([`[${new Date().toISOString()}] [INFO] Connected to log stream for agent ${agent.id} at ${agent.ip}`]);
                    setIsAgentLogsModalOpen(true);
                 }}>
                    <FileText size={12} style={{ marginRight: '0.25rem' }}/> Logs
                 </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAudit = () => {
    const filteredAudit = auditLogs.filter(log => {
      const matchesSearch = log.user.toLowerCase().includes(auditSearchQuery.toLowerCase()) || 
                            log.action.toLowerCase().includes(auditSearchQuery.toLowerCase()) || 
                            log.resource.toLowerCase().includes(auditSearchQuery.toLowerCase());
      const matchesFilter = auditFilter === 'All' || 
                            (auditFilter === 'Creates' && log.action.includes('CREATE')) ||
                            (auditFilter === 'Deletes' && log.action.includes('DELETE')) ||
                            (auditFilter === 'System' && (log.user === 'SYSTEM' || log.action.includes('SYSTEM')));
      return matchesSearch && matchesFilter;
    });

    const getActionBadgeClass = (action) => {
      if (action.includes('CREATE') || action.includes('SUCCESS') || action.includes('ENABLE') || action.includes('RESOLVE') || action.includes('ONLINE')) return 'badge-success';
      if (action.includes('DELETE') || action.includes('FAILED') || action.includes('OFFLINE')) return 'badge-danger';
      if (action.includes('UPDATE') || action.includes('ROTATED')) return 'badge-primary';
      return 'badge-secondary';
    };

    return (
      <div className="flex-col gap-4 animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Audit Logs</h2>
            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Chronological record of all system activities.</p>
          </div>
          <div className="flex gap-3 items-center">
             <div className="input-field" style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '250px' }}>
                <Search size={14} className="text-muted"/>
                <input 
                   type="text" 
                   placeholder="Search logs..." 
                   value={auditSearchQuery}
                   onChange={(e) => setAuditSearchQuery(e.target.value)}
                   style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%' }} 
                />
             </div>
             <select 
                className="input-field" 
                value={auditFilter}
                onChange={(e) => setAuditFilter(e.target.value)}
                style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
             >
                <option value="All">All Actions</option>
                <option value="Creates">Creates</option>
                <option value="Deletes">Deletes</option>
                <option value="System">System Events</option>
             </select>
             <button className="btn btn-primary" onClick={() => addToast('Exporting audit logs to CSV...', 'info')}>
                <Download size={14}/> Export CSV
             </button>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
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
              {filteredAudit.map((log) => (
                <tr key={log.id} className="hover-bg-surface-hover" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{log.time}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)' }}>
                     <div className="flex items-center gap-2">
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: getAvatarColor(log.user), color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 'bold' }}>
                           {getInitials(log.user)}
                        </div>
                        {log.user}
                     </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                     <span className={`badge ${getActionBadgeClass(log.action)}`} style={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>
                        {log.action}
                     </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{log.resource}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAudit.length === 0 && (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
               <Shield size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
               <p style={{ fontSize: '0.875rem' }}>No audit logs found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const moduleNames = {
    dashboards: 'Dashboards',
    operations: 'Operations & Engineering',
    journeys: 'Customer Journeys',
    monitoring: 'Monitoring & Alerts',
    api: 'API & Infrastructure',
    admin: 'Administration'
  };

  const handlePrivilegeToggle = (moduleKey, privType) => {
    if (!selectedRole) return;
    const currentVal = selectedRole.privileges[moduleKey][privType];
    updateRolePrivilege(selectedRole.id, moduleKey, privType, !currentVal);
    
    // Optimistic local update
    setSelectedRole(prev => ({
      ...prev,
      privileges: {
        ...prev.privileges,
        [moduleKey]: {
          ...prev.privileges[moduleKey],
          [privType]: !currentVal
        }
      }
    }));
    addToast("Privilege updated", "success");
  };

  const renderRoles = () => (
    <div className="flex gap-4 animate-fade-in" style={{ height: '100%' }}>
      <div className="glass-panel" style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 'var(--panel-padding)', flexShrink: 0 }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, color: 'var(--text-secondary)' }}>Preset Roles</h3>
          <button className="btn-icon tooltip-container hover-bg-surface-hover" data-tooltip="Create Role" onClick={() => setIsRoleModalOpen(true)}>
            <UserPlus size={16} />
          </button>
        </div>
        {roles && roles.map(r => (
          <div 
            key={r.id} 
            className={`cursor-pointer ${selectedRole?.id === r.id ? 'bg-primary text-white' : 'hover-bg-surface-hover text-primary'}`}
            style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '500', transition: 'all 0.2s', background: selectedRole?.id === r.id ? 'var(--accent-primary)' : 'transparent', color: selectedRole?.id === r.id ? '#fff' : 'inherit' }}
            onClick={() => {
              const freshRole = roles.find(rl => rl.id === r.id);
              setSelectedRole(freshRole);
            }}
          >
            {r.name}
          </div>
        ))}
      </div>
      <div className="glass-panel" style={{ flex: 1, padding: '0', overflowX: 'auto' }}>
        {selectedRole ? (
          <div style={{ padding: 'var(--panel-padding)' }}>
            <h2 style={{ marginBottom: '0.25rem' }}>{selectedRole.name} Privileges</h2>
            <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '2rem' }}>Assign access levels across application modules.</p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
                  <th style={{ padding: 'var(--panel-padding)', color: 'var(--text-secondary)' }}>Module</th>
                  <th style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-secondary)' }}>Read</th>
                  <th style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-secondary)' }}>Write</th>
                  <th style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-secondary)' }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(moduleNames).map(modKey => (
                  <tr key={modKey} className="hover-bg-surface-hover" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: 'var(--panel-padding)', fontWeight: '500', color: 'var(--text-primary)' }}>{moduleNames[modKey]}</td>
                    {['read', 'write', 'delete'].map(priv => (
                      <td key={priv} style={{ padding: 'var(--panel-padding)', textAlign: 'center' }}>
                         <label className="toggle-switch">
                           <input 
                             type="checkbox" 
                             checked={selectedRole.privileges[modKey][priv]} 
                             onChange={() => handlePrivilegeToggle(modKey, priv)}
                           />
                           <span className="toggle-slider"></span>
                         </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-muted)' }}>Select a role to view privileges</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-full gap-4 animate-fade-in relative" style={{ paddingBottom: '2rem', minHeight: 'calc(100vh - 100px)' }}>
      {/* Content Pane */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {activeTab === 'Users' && renderUserManagement()}
        {activeTab === 'Teams' && renderTeams()}
        {activeTab === 'Integrations' && renderIntegrations()}
        {activeTab === 'Agents' && renderAgents()}
        {activeTab === 'Audit' && renderAudit()}
      </div>

      {/* User Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} className="animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
            <div className="flex justify-between items-center">
              <h3 style={{ margin: 0 }}>{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h3>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleModalSubmit} className="flex-col gap-4">
              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                  placeholder="jane.d@pulsecx.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex-col gap-1">
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="" disabled>Select a role...</option>
                    {roles && roles.map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-col gap-1">
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{modalMode === 'add' ? 'Create User' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      {isRoleModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} className="animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
            <div className="flex justify-between items-center">
              <h3 style={{ margin: 0 }}>Create New Role</h3>
              <button className="btn-icon" onClick={() => { setIsRoleModalOpen(false); setNewRoleName(''); }}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              if (newRoleName.trim()) {
                const createdRole = addRole(newRoleName.trim());
                setSelectedRole(createdRole);
                addToast(`Role "${newRoleName}" created successfully!`, "success");
                setIsRoleModalOpen(false);
                setNewRoleName('');
              }
            }} className="flex-col gap-4">
              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Role Name</label>
                <input 
                  type="text" 
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                  placeholder="e.g. Finance Auditor"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" className="btn btn-ghost" onClick={() => { setIsRoleModalOpen(false); setNewRoleName(''); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Role</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Modal */}
      {isTeamModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} className="animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex justify-between items-center">
              <h3 style={{ margin: 0 }}>{teamModalMode === 'add' ? 'Create Team' : 'Edit Team'}</h3>
              <button className="btn-icon" onClick={() => setIsTeamModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleTeamModalSubmit} className="flex-col gap-4">
              <div className="flex-col gap-4">
                <div className="flex-col gap-1">
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Team Name</label>
                  <input 
                    type="text" 
                    required
                    value={teamFormData.name}
                    onChange={(e) => setTeamFormData({...teamFormData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                    placeholder="e.g. Core Platform Engineering"
                  />
                </div>
                <div className="flex-col gap-1">
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Description</label>
                  <textarea 
                    value={teamFormData.desc}
                    onChange={(e) => setTeamFormData({...teamFormData, desc: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical', minHeight: '80px' }}
                    placeholder="Describe the team's responsibilities..."
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', margin: 0 }}>Team Members ({teamFormData.members.length})</label>
                  <div className="flex items-center" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.5rem', width: '220px' }}>
                    <Search size={14} className="text-muted" style={{ marginRight: '0.5rem' }} />
                    <input 
                      type="text" 
                      placeholder="Search users..." 
                      value={teamMemberSearch}
                      onChange={(e) => setTeamMemberSearch(e.target.value)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.8125rem' }}
                    />
                  </div>
                </div>
                <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', maxHeight: '300px', overflowY: 'auto' }}>
                  {users
                    .filter(u => u.name.toLowerCase().includes(teamMemberSearch.toLowerCase()) || u.role.toLowerCase().includes(teamMemberSearch.toLowerCase()))
                    .sort((a, b) => {
                      const aSelected = teamFormData.members.includes(a.id);
                      const bSelected = teamFormData.members.includes(b.id);
                      if (aSelected === bSelected) return 0;
                      return aSelected ? -1 : 1;
                    })
                    .map(user => {
                      const isSelected = teamFormData.members.includes(user.id);
                      return (
                      <div key={user.id} onClick={() => toggleTeamMember(user.id)} className="hover-bg-surface-hover cursor-pointer flex items-center gap-3" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', background: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'transparent' }}>
                         <input 
                           type="checkbox" 
                           checked={isSelected} 
                           onChange={() => {}} 
                           style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }} 
                         />
                         <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: getAvatarColor(user.name), color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold' }}>
                           {getInitials(user.name)}
                         </div>
                         <div className="flex-col">
                           <span style={{ fontWeight: isSelected ? '600' : '500', fontSize: '0.875rem' }}>{user.name}</span>
                           <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.role}</span>
                         </div>
                      </div>
                    )})}
                  {users.length === 0 && <div style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-muted)' }}>No users available</div>}
                  {users.length > 0 && users.filter(u => u.name.toLowerCase().includes(teamMemberSearch.toLowerCase())).length === 0 && (
                    <div style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-muted)' }}>No users match your search.</div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                {teamModalMode === 'edit' ? (
                  <button type="button" className="btn btn-ghost text-danger" onClick={() => handleDeleteTeam(selectedTeam.id)}><Trash2 size={16}/> Delete Team</button>
                ) : <div></div>}
                <div className="flex gap-3">
                  <button type="button" className="btn btn-ghost" onClick={() => setIsTeamModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{teamModalMode === 'add' ? 'Create Team' : 'Save Changes'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Integration Modal */}
      {isIntegrationModalOpen && selectedIntegration && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} className="animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedIntegration.status === 'Connected' ? 'var(--accent-success)' : 'var(--text-primary)' }}>
                   <selectedIntegration.icon size={18} />
                 </div>
                 <h3 style={{ margin: 0 }}>Configure {selectedIntegration.name}</h3>
              </div>
              <button className="btn-icon" onClick={() => setIsIntegrationModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setIntegrations(integrations.map(int => int.id === selectedIntegration.id ? { ...int, status: 'Connected' } : int));
              setIsIntegrationModalOpen(false);
              addToast(`${selectedIntegration.name} connected successfully!`, 'success');
            }} className="flex-col gap-4">
              
              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>API Endpoint URL</label>
                <input 
                  type="url" 
                  required
                  defaultValue={selectedIntegration.status === 'Connected' ? `https://api.${selectedIntegration.name.toLowerCase().replace(' ', '')}.com/v1/webhooks` : ''}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                  placeholder="https://..."
                />
              </div>

              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Authentication Token / API Key</label>
                <input 
                  type="password" 
                  required
                  defaultValue={selectedIntegration.status === 'Connected' ? '••••••••••••••••' : ''}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                  placeholder="Enter API key"
                />
              </div>

              <div className="flex justify-between items-center mt-2 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                {selectedIntegration.status === 'Connected' ? (
                  <button type="button" className="btn btn-ghost text-danger" onClick={() => {
                     setIntegrations(integrations.map(int => int.id === selectedIntegration.id ? { ...int, status: 'Unconfigured' } : int));
                     setIsIntegrationModalOpen(false);
                     addToast(`${selectedIntegration.name} integration disconnected.`, 'success');
                  }}>Disconnect</button>
                ) : <div></div>}
                <div className="flex gap-3">
                  <button type="button" className="btn btn-ghost" onClick={() => setIsIntegrationModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{selectedIntegration.status === 'Connected' ? 'Save Changes' : 'Connect & Verify'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Deploy Agent Modal */}
      {isDeployAgentModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} className="animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex justify-between items-center">
              <h3 style={{ margin: 0 }}>Deploy New Agent</h3>
              <button className="btn-icon" onClick={() => setIsDeployAgentModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const newAgent = {
                 id: `ag-${Date.now()}`,
                 region: deployAgentFormData.region,
                 status: 'Active',
                 cpu: Math.floor(Math.random() * 20) + 10,
                 mem: Math.floor(Math.random() * 30) + 20,
                 version: deployAgentFormData.version,
                 ip: `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                 uptime: '0d 0h'
              };
              setAgents([...agents, newAgent]);
              setIsDeployAgentModalOpen(false);
              addToast(`Agent successfully deployed in ${deployAgentFormData.region}!`, 'success');
            }} className="flex-col gap-4">
              
              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Region</label>
                <select 
                  value={deployAgentFormData.region}
                  onChange={(e) => setDeployAgentFormData({...deployAgentFormData, region: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                >
                   <option value="US-East (N. Virginia)">US-East (N. Virginia)</option>
                   <option value="US-West (Oregon)">US-West (Oregon)</option>
                   <option value="EU-West (Ireland)">EU-West (Ireland)</option>
                   <option value="EU-Central (Frankfurt)">EU-Central (Frankfurt)</option>
                   <option value="AP-South (Mumbai)">AP-South (Mumbai)</option>
                   <option value="AP-East (Tokyo)">AP-East (Tokyo)</option>
                </select>
              </div>

              <div className="flex-col gap-1">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Agent Version</label>
                <select 
                  value={deployAgentFormData.version}
                  onChange={(e) => setDeployAgentFormData({...deployAgentFormData, version: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}
                >
                   <option value="v2.4.1">v2.4.1 (Stable)</option>
                   <option value="v2.4.0">v2.4.0 (Legacy)</option>
                   <option value="v2.5.0-beta">v2.5.0-beta (Latest)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-2 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsDeployAgentModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Server size={14}/> Deploy Instance</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Agent Logs Modal */}
      {isAgentLogsModalOpen && selectedAgentLogs && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} className="animate-fade-in">
          <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '0', display: 'flex', flexDirection: 'column', maxHeight: '80vh', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            
            {/* Modal Header */}
            <div className="flex justify-between items-center" style={{ padding: '1rem 1.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-3">
                 <Terminal size={18} className="text-primary"/>
                 <h3 style={{ margin: 0, fontFamily: 'monospace' }}>tail -f /var/log/agent-{selectedAgentLogs.id}.log</h3>
              </div>
              <button className="btn-icon" onClick={() => {
                 setIsAgentLogsModalOpen(false);
                 setSelectedAgentLogs(null);
                 setAgentLogsContent([]);
              }}>
                <X size={20} />
              </button>
            </div>
            
            {/* Terminal Body */}
            <div style={{ background: '#0d1117', padding: 'var(--panel-padding)', overflowY: 'auto', flex: 1, fontFamily: 'monospace', fontSize: '0.8125rem', color: '#c9d1d9', display: 'flex', flexDirection: 'column', gap: '0.25rem', minHeight: '400px' }}>
               {agentLogsContent.map((log, index) => (
                  <div key={index} style={{ wordBreak: 'break-all' }}>
                     <span style={{ color: '#8b949e' }}>{log.substring(0, 26)}</span> 
                     <span style={{ color: log.includes('[ERROR]') ? '#ff7b72' : log.includes('[WARN]') ? '#d2a8ff' : log.includes('[DEBUG]') ? '#8b949e' : '#79c0ff', marginLeft: '0.5rem', fontWeight: 'bold' }}>
                        {log.substring(26, 33)}
                     </span>
                     <span style={{ marginLeft: '0.5rem' }}>{log.substring(33)}</span>
                  </div>
               ))}
               {/* Auto-scroll anchor */}
               <div ref={(el) => { if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
