import React, { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { User, Settings, Shield, Bell, Camera, Sun, Moon, Monitor, Save, Key, Smartphone, Laptop, Mail, MessageSquare, AlertTriangle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

export default function UserSettings() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { theme, setTheme } = useTheme();

  const [profileData, setProfileData] = useState({
    firstName: 'Mark',
    lastName: 'Bennet',
    jobTitle: 'Senior Platform Engineer',
    email: 'mark.bennet@pulsecx.com'
  });

  const [isModified, setIsModified] = useState(false);

  // If no tab is specified, default to profile
  if (!tab) {
    return <Navigate to="/settings/profile" replace />;
  }

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    addToast('Profile successfully updated.', 'success');
    setIsModified(false);
  };

  const navItems = [
    { id: 'profile', name: 'Your Profile', icon: <User size={18} />, desc: 'Public identity and personal details' },
    { id: 'preferences', name: 'Preferences', icon: <Settings size={18} />, desc: 'Application theme and regional settings' },
    { id: 'security', name: 'Security', icon: <Shield size={18} />, desc: 'Passwords and authentication' },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} />, desc: 'Email and push alert routing' }
  ];

  const renderProfile = () => (
    <div className="flex-col gap-4 animate-fade-in" style={{ maxWidth: '800px' }}>
      
      <div>
        <h2 style={{ marginBottom: '0.5rem' }}>Your Profile</h2>
        <p className="text-secondary">Manage your public and private details across PulseCX.</p>
      </div>

      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)', padding: 'var(--panel-padding)' }}>
         <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
               {profileData.firstName[0]}{profileData.lastName[0]}
            </div>
            <button className="btn-icon" style={{ position: 'absolute', bottom: -5, right: -5, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '50%', padding: '0.4rem', boxShadow: 'var(--shadow-sm)' }} title="Upload new picture">
               <Camera size={14} />
            </button>
         </div>
         <div className="flex-col gap-1" style={{ flexGrow: 1 }}>
            <h3 style={{ margin: 0 }}>Profile Picture</h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>We support PNG, JPG, and GIF up to 5MB. A square image works best.</p>
         </div>
         <div className="flex gap-3" style={{ flexShrink: 0 }}>
            <button className="btn btn-secondary btn-sm">Upload Picture</button>
            <button className="btn btn-ghost btn-sm text-danger">Remove</button>
         </div>
      </div>

      <form className="glass-panel flex-col gap-4" onSubmit={handleSaveProfile} style={{ padding: 'var(--panel-padding)' }}>
         <div className="grid grid-cols-2 gap-4">
            <div className="flex-col gap-2">
               <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>First Name</label>
               <input type="text" name="firstName" value={profileData.firstName} onChange={handleProfileChange} className="input-field" style={{ width: '100%' }} />
            </div>
            <div className="flex-col gap-2">
               <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Last Name</label>
               <input type="text" name="lastName" value={profileData.lastName} onChange={handleProfileChange} className="input-field" style={{ width: '100%' }} />
            </div>
         </div>

         <div className="flex-col gap-2">
            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Job Title</label>
            <input type="text" name="jobTitle" value={profileData.jobTitle} onChange={handleProfileChange} className="input-field" style={{ width: '100%' }} />
         </div>

         <div className="flex-col gap-2">
            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Email Address</label>
            <input type="email" name="email" value={profileData.email} disabled className="input-field" style={{ width: '100%', opacity: 0.7, cursor: 'not-allowed' }} title="Email is managed by your Identity Provider." />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email addresses are managed by your organization's IdP (e.g. Okta, Azure AD).</span>
         </div>

         <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" disabled={!isModified}>
               <Save size={16} style={{ marginRight: '0.5rem' }} /> Save Changes
            </button>
         </div>
      </form>
    </div>
  );

  const renderPreferences = () => (
    <div className="flex-col gap-4 animate-fade-in" style={{ maxWidth: '800px' }}>
      
      <div>
        <h2 style={{ marginBottom: '0.5rem' }}>Application Preferences</h2>
        <p className="text-secondary">Customize your local experience and workspace settings.</p>
      </div>

      {/* Appearance Section */}
      <div className="glass-panel flex-col gap-4" style={{ padding: 'var(--panel-padding)' }}>
         <div className="flex-col gap-1">
            <h3 style={{ margin: 0 }}>Appearance</h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Select your preferred theme for the PulseCX interface.</p>
         </div>

         <div className="grid grid-cols-3 gap-4">
            <div 
               className="hover-bg-surface-hover"
               style={{ border: `2px solid ${theme === 'light' ? 'var(--accent-primary)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-md)', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--panel-gap)', cursor: 'pointer', transition: 'all 0.2s', background: theme === 'light' ? 'var(--bg-surface)' : 'transparent' }}
               onClick={() => { setTheme('light'); addToast('Theme changed to Light', 'success'); }}
            >
               <div style={{ padding: 'var(--panel-padding)', borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <Sun size={24} className={theme === 'light' ? 'text-primary' : 'text-muted'} />
               </div>
               <span style={{ fontWeight: theme === 'light' ? '600' : '400', color: theme === 'light' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Light Mode</span>
            </div>

            <div 
               className="hover-bg-surface-hover"
               style={{ border: `2px solid ${theme === 'dark' ? 'var(--accent-primary)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-md)', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--panel-gap)', cursor: 'pointer', transition: 'all 0.2s', background: theme === 'dark' ? 'var(--bg-surface)' : 'transparent' }}
               onClick={() => { setTheme('dark'); addToast('Theme changed to Dark', 'success'); }}
            >
               <div style={{ padding: 'var(--panel-padding)', borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <Moon size={24} className={theme === 'dark' ? 'text-primary' : 'text-muted'} />
               </div>
               <span style={{ fontWeight: theme === 'dark' ? '600' : '400', color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Dark Mode</span>
            </div>

            <div 
               className="hover-bg-surface-hover tooltip-container"
               style={{ border: `2px solid var(--border-color)`, borderRadius: 'var(--radius-md)', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--panel-gap)', cursor: 'not-allowed', opacity: 0.6 }}
               title="Requires browser permission to detect system theme."
            >
               <div style={{ padding: 'var(--panel-padding)', borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <Monitor size={24} className="text-muted" />
               </div>
               <span style={{ color: 'var(--text-secondary)' }}>System Auto</span>
            </div>
         </div>
      </div>

      {/* Regional Settings */}
      <div className="glass-panel flex-col gap-4" style={{ padding: 'var(--panel-padding)' }}>
         <div className="flex-col gap-1">
            <h3 style={{ margin: 0 }}>Regional Settings</h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Configure timezones and formatting for your dashboards.</p>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="flex-col gap-2">
               <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Timezone</label>
               <select className="input-field" style={{ width: '100%', cursor: 'pointer' }} defaultValue="America/New_York" onChange={(e) => addToast('Timezone updated to ' + e.target.value, 'success')}>
                  <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                  <option value="America/Chicago">Central Time (US & Canada)</option>
                  <option value="America/New_York">Eastern Time (US & Canada)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
               </select>
            </div>
            <div className="flex-col gap-2">
               <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Date & Time Format</label>
               <select className="input-field" style={{ width: '100%', cursor: 'pointer' }} defaultValue="12h" onChange={(e) => addToast('Time format updated', 'success')}>
                  <option value="12h">MM/DD/YYYY - 12h (02:30 PM)</option>
                  <option value="24h">DD/MM/YYYY - 24h (14:30)</option>
                  <option value="iso">ISO 8601 (YYYY-MM-DD HH:mm:ss)</option>
               </select>
            </div>
         </div>
      </div>

      {/* Startup */}
      <div className="glass-panel flex-col gap-4" style={{ padding: 'var(--panel-padding)' }}>
         <div className="flex-col gap-1">
            <h3 style={{ margin: 0 }}>Startup Preferences</h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Choose what you see when you first log in.</p>
         </div>

         <div className="flex-col gap-2">
            <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Default Dashboard</label>
            <select className="input-field" style={{ width: '100%', maxWidth: '400px', cursor: 'pointer' }} defaultValue="overview" onChange={(e) => addToast('Startup dashboard updated', 'success')}>
               <option value="overview">Executive Overview</option>
               <option value="operations">Operations & Engineering</option>
               <option value="monitoring">Monitoring & Alerts</option>
               <option value="incidents">Incident Center</option>
            </select>
         </div>
      </div>

    </div>
  );

  const renderSecurity = () => (
    <div className="flex-col gap-4 animate-fade-in" style={{ maxWidth: '800px' }}>
      
      <div>
        <h2 style={{ marginBottom: '0.5rem' }}>Security & Authentication</h2>
        <p className="text-secondary">Manage your passwords, two-factor authentication, and active sessions.</p>
      </div>

      <div className="glass-panel flex-col gap-4" style={{ padding: 'var(--panel-padding)' }}>
         <div className="flex-col gap-1">
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key size={18} className="text-primary" /> Password
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Update your account password securely.</p>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="flex-col gap-2 col-span-2">
               <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Current Password</label>
               <input type="password" placeholder="Enter current password" className="input-field" style={{ width: '100%' }} />
            </div>
            <div className="flex-col gap-2">
               <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>New Password</label>
               <input type="password" placeholder="Enter new password" className="input-field" style={{ width: '100%' }} />
            </div>
            <div className="flex-col gap-2">
               <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Confirm New Password</label>
               <input type="password" placeholder="Confirm new password" className="input-field" style={{ width: '100%' }} />
            </div>
         </div>
         <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
            <button className="btn btn-secondary">Update Password</button>
         </div>
      </div>

      <div className="glass-panel flex-col gap-4" style={{ padding: 'var(--panel-padding)' }}>
         <div className="flex justify-between items-start">
           <div className="flex-col gap-1">
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Smartphone size={18} className="text-primary" /> Two-Factor Authentication (2FA)
              </h3>
              <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Add an extra layer of security to your account.</p>
           </div>
           <div className="badge badge-success">Enabled</div>
         </div>
         <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
           Authenticator app (e.g., Google Authenticator, Authy) is currently configured.
         </p>
         <div style={{ display: 'flex', gap: 'var(--panel-gap)' }}>
            <button className="btn btn-secondary">Reconfigure</button>
            <button className="btn btn-ghost text-danger">Disable 2FA</button>
         </div>
      </div>

      <div className="glass-panel flex-col gap-4" style={{ padding: 'var(--panel-padding)' }}>
         <div className="flex-col gap-1">
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Laptop size={18} className="text-primary" /> Active Sessions
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Devices currently logged into your account.</p>
         </div>

         <div className="flex-col gap-4">
            <div className="flex items-center justify-between" style={{ padding: 'var(--panel-padding)', background: 'var(--bg-base)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
               <div className="flex items-center gap-4">
                 <Laptop size={24} className="text-muted" />
                 <div className="flex-col">
                   <span style={{ fontWeight: '600' }}>Windows 11 • Chrome</span>
                   <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>192.168.1.42 • Seattle, WA</span>
                 </div>
               </div>
               <div className="badge badge-primary">Current Session</div>
            </div>
            
            <div className="flex items-center justify-between" style={{ padding: 'var(--panel-padding)', background: 'var(--bg-base)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
               <div className="flex items-center gap-4">
                 <Smartphone size={24} className="text-muted" />
                 <div className="flex-col">
                   <span style={{ fontWeight: '600' }}>iOS 17 • Safari</span>
                   <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10.0.0.15 • Portland, OR (2 hours ago)</span>
                 </div>
               </div>
               <button className="btn btn-ghost text-danger btn-sm">Revoke</button>
            </div>
         </div>
      </div>

    </div>
  );

  const renderNotifications = () => (
    <div className="flex-col gap-4 animate-fade-in" style={{ maxWidth: '800px' }}>
      
      <div>
        <h2 style={{ marginBottom: '0.5rem' }}>Notification Preferences</h2>
        <p className="text-secondary">Control how and when you receive alerts from PulseCX.</p>
      </div>

      <div className="glass-panel flex-col gap-4" style={{ padding: 'var(--panel-padding)' }}>
         <div className="flex-col gap-1">
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} className="text-primary" /> Email Notifications
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Alerts sent directly to your inbox.</p>
         </div>

         <div className="flex-col gap-4">
            <div className="flex justify-between items-center">
               <div className="flex-col">
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Critical Incidents</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Get emailed immediately when an incident is triggered.</span>
               </div>
               <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }} onChange={() => addToast('Preference updated', 'info')} />
            </div>
            <div style={{ height: '1px', background: 'var(--border-color)', opacity: 0.5 }}></div>
            <div className="flex justify-between items-center">
               <div className="flex-col">
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Weekly Reports</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>A summary of system health and metrics every Monday.</span>
               </div>
               <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }} onChange={() => addToast('Preference updated', 'info')} />
            </div>
            <div style={{ height: '1px', background: 'var(--border-color)', opacity: 0.5 }}></div>
            <div className="flex justify-between items-center">
               <div className="flex-col">
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Product Updates</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>News about new features and platform maintenance.</span>
               </div>
               <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }} onChange={() => addToast('Preference updated', 'info')} />
            </div>
         </div>
      </div>

      <div className="glass-panel flex-col gap-4" style={{ padding: 'var(--panel-padding)' }}>
         <div className="flex-col gap-1">
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={18} className="text-primary" /> In-App & Push
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>Notifications delivered within the PulseCX dashboard.</p>
         </div>

         <div className="flex-col gap-4">
            <div className="flex justify-between items-center">
               <div className="flex-col">
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Mentions & Comments</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Notify me when I am @mentioned in an incident or alert.</span>
               </div>
               <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }} onChange={() => addToast('Preference updated', 'info')} />
            </div>
            <div style={{ height: '1px', background: 'var(--border-color)', opacity: 0.5 }}></div>
            <div className="flex justify-between items-center">
               <div className="flex-col">
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Threshold Warnings</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Show toasts when approaching system rate limits.</span>
               </div>
               <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }} onChange={() => addToast('Preference updated', 'info')} />
            </div>
         </div>
      </div>

    </div>
  );

  return (
    <div className="page-container" style={{ padding: '2rem 3rem' }}>
      
      <div className="settings-grid">
         
         {/* Left Navigation Sidebar */}
         <div className="flex-col gap-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <h1 style={{ letterSpacing: '-0.02em', margin: 0 }}>Settings</h1>
               <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage your account and preferences.</p>
            </div>

            <nav className="flex-col gap-2">
               {navItems.map(item => (
                  <button 
                     key={item.id}
                     className={`btn ${tab === item.id ? 'btn-primary' : 'btn-ghost'}`}
                     style={{ 
                        justifyContent: 'flex-start', 
                        padding: '0.75rem 1rem', 
                        height: 'auto',
                        width: '100%',
                        cursor: 'pointer'
                     }}
                     onClick={() => navigate(`/settings/${item.id}`)}
                  >
                     <div className="flex items-center gap-3">
                        <div style={{ color: tab === item.id ? 'inherit' : 'var(--text-muted)' }}>
                           {item.icon}
                        </div>
                        <div className="flex-col" style={{ alignItems: 'flex-start' }}>
                           <span style={{ fontWeight: '600' }}>{item.name}</span>
                           <span style={{ fontSize: '0.7rem', color: tab === item.id ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontWeight: 'normal' }}>{item.desc}</span>
                        </div>
                     </div>
                  </button>
               ))}
            </nav>
         </div>

         {/* Right Content Area */}
         <div style={{ paddingBottom: '3rem' }}>
            {tab === 'profile' && renderProfile()}
            {tab === 'preferences' && renderPreferences()}
            {tab === 'security' && renderSecurity()}
            {tab === 'notifications' && renderNotifications()}
         </div>

      </div>
    </div>
  );
}
