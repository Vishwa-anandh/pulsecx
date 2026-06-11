import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, ShieldX, Clock, Globe, Search, Filter, Server, ChevronRight } from 'lucide-react';

const MOCK_DOMAINS = [
  { domain: 'pulsecx.com', expiry: 'in 240 days', status: 'Healthy', resolutionTime: '12ms', availability: '100%', issuer: 'Let\'s Encrypt' },
  { domain: 'api.pulsecx.com', expiry: 'in 15 days', status: 'Expiring Soon', resolutionTime: '15ms', availability: '99.99%', issuer: 'DigiCert' },
  { domain: 'staging.pulsecx.com', expiry: 'Expired 2 days ago', status: 'Expired', resolutionTime: '45ms', availability: '98.50%', issuer: 'Let\'s Encrypt' },
  { domain: 'cdn.pulsecx.com', expiry: 'in 300 days', status: 'Healthy', resolutionTime: '8ms', availability: '100%', issuer: 'Cloudflare' },
  { domain: 'internal.pulsecx.com', expiry: 'in 45 days', status: 'Healthy', resolutionTime: '10ms', availability: '100%', issuer: 'Internal CA' },
];

export default function SslDnsHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('SSL Certificates');

  const renderSslTab = () => (
    <div className="flex-col gap-6 animate-fade-in">
      {/* 7.1 SSL Dashboard KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>24</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Healthy Certificates</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>3</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Expiring Soon (&lt; 30 days)</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldX size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>1</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Expired</span>
          </div>
        </div>
      </div>

      {/* 7.2 Certificate Inventory */}
      <div className="glass-panel" style={{ padding: '1rem 0' }}>
        <div style={{ padding: '0 1.5rem 1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1rem' }}>Certificate Inventory</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Domain</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Issuer</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Expiry</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '0.75rem 1.5rem', width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DOMAINS.map(item => (
              <tr key={item.domain} onClick={() => navigate(`/ssl-dns/${item.domain}`)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover-bg-surface-hover group">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-secondary" /> {item.domain}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{item.issuer}</td>
                <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: item.status === 'Expired' ? 'var(--accent-danger)' : item.status === 'Expiring Soon' ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{item.expiry}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge badge-${item.status === 'Expired' ? 'danger' : item.status === 'Expiring Soon' ? 'warning' : 'success'}`}>{item.status}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}><ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDnsTab = () => (
    <div className="flex-col gap-6 animate-fade-in">
      {/* 7.4 DNS Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>12ms</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Global Avg Resolution Time</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Server size={24} />
          </div>
          <div className="flex-col gap-1">
            <span style={{ fontSize: '2rem', fontWeight: '700', lineHeight: 1 }}>100%</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Nameserver Availability</span>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1rem 0' }}>
        <div style={{ padding: '0 1.5rem 1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1rem' }}>Monitored Domains</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Domain</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Resolution Time</th>
              <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Availability</th>
              <th style={{ padding: '0.75rem 1.5rem', width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DOMAINS.map(item => (
              <tr key={item.domain} onClick={() => navigate(`/ssl-dns/${item.domain}`)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background-color 0.2s' }} className="hover-bg-surface-hover group">
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-secondary" /> {item.domain}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.resolutionTime}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--accent-success)' }}>{item.availability}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}><ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/></td>
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
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Domain Security & Routing</h1>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage SSL certificates and DNS configurations across all active domains.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost"><Filter size={14} /> Filter</button>
          <div className="search-bar" style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search domains..." style={{ padding: '0.5rem 1rem 0.5rem 2rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', width: '250px' }} />
          </div>
        </div>
      </div>

      <div className="flex gap-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
        {['SSL Certificates', 'DNS Monitoring'].map(tab => (
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
        {activeTab === 'SSL Certificates' && renderSslTab()}
        {activeTab === 'DNS Monitoring' && renderDnsTab()}
      </div>
    </div>
  );
}
