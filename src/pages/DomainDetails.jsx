import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, ShieldCheck, ShieldAlert, Server, Link, ExternalLink, Key, Database, ChevronRight } from 'lucide-react';

export default function DomainDetails() {
  const { domain } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Certificate Details');

  const isExpired = domain === 'staging.pulsecx.com';
  const isExpiring = domain === 'api.pulsecx.com';
  const status = isExpired ? 'Expired' : isExpiring ? 'Expiring Soon' : 'Healthy';

  const renderCertificateDetails = () => (
    <div className="grid grid-cols-2 gap-6 animate-fade-in">
      <div className="flex-col gap-6">
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={16} className="text-secondary" /> Primary Certificate
          </h3>
          <div className="flex-col gap-4">
            <div className="flex-col gap-1">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Issued To (CN)</span>
              <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>*.{domain || 'pulsecx.com'}</span>
            </div>
            <div className="flex-col gap-1">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Issuer</span>
              <span style={{ color: 'var(--text-primary)' }}>{isExpiring ? 'DigiCert SHA2 Secure Server CA' : 'Let\'s Encrypt Authority X3'}</span>
            </div>
            <div className="flex-col gap-1">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Valid From</span>
              <span style={{ color: 'var(--text-secondary)' }}>Jan 10, 2026 12:00:00 GMT</span>
            </div>
            <div className="flex-col gap-1">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Valid To (Expiry)</span>
              <span style={{ color: isExpired ? 'var(--accent-danger)' : isExpiring ? 'var(--accent-warning)' : 'var(--text-primary)', fontWeight: '600' }}>
                {isExpired ? 'Jun 08, 2026 12:00:00 GMT' : isExpiring ? 'Jun 25, 2026 12:00:00 GMT' : 'Feb 10, 2027 12:00:00 GMT'}
              </span>
            </div>
            <div className="flex-col gap-1">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Serial Number</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>04:92:E3:4A:5B:6C:7D:8E:9F:0A:1B:2C:3D:4E:5F</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col gap-6">
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: '0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link size={16} className="text-secondary" /> Chain of Trust
          </h3>
          <div className="flex-col" style={{ paddingLeft: '0.5rem', borderLeft: '2px dashed var(--border-color)', marginLeft: '1rem', marginTop: '0.5rem', gap: '1.5rem' }}>
            <div className="flex items-center gap-3" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-13px', width: '10px', height: '2px', background: 'var(--border-color)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-success)' }}>
                <ShieldCheck size={16} />
              </div>
              <div className="flex-col">
                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Root CA</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ISRG Root X1</span>
              </div>
            </div>
            <div className="flex items-center gap-3" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-13px', width: '10px', height: '2px', background: 'var(--border-color)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-success)' }}>
                <ShieldCheck size={16} />
              </div>
              <div className="flex-col">
                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Intermediate CA</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{isExpiring ? 'DigiCert SHA2 Secure Server CA' : 'Let\'s Encrypt Authority X3'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-13px', width: '10px', height: '2px', background: isExpired ? 'var(--accent-danger)' : isExpiring ? 'var(--accent-warning)' : 'var(--accent-success)' }}></div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isExpired ? 'rgba(239, 68, 68, 0.1)' : isExpiring ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isExpired ? 'var(--accent-danger)' : isExpiring ? 'var(--accent-warning)' : 'var(--accent-primary)' }}>
                {isExpired ? <ShieldAlert size={16} /> : <Globe size={16} />}
              </div>
              <div className="flex-col">
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: isExpired ? 'var(--accent-danger)' : isExpiring ? 'var(--accent-warning)' : 'var(--text-primary)' }}>*.{domain}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>End-Entity Certificate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDnsRecords = () => (
    <div className="glass-panel animate-fade-in" style={{ padding: '1rem 0', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Type</th>
            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Content</th>
            <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>TTL</th>
          </tr>
        </thead>
        <tbody>
          {[
            { type: 'A', name: domain, content: '192.168.1.100', ttl: '300' },
            { type: 'A', name: domain, content: '192.168.1.101', ttl: '300' },
            { type: 'CNAME', name: `www.${domain}`, content: domain, ttl: '3600' },
            { type: 'MX', name: domain, content: '10 mail.pulsecx.com', ttl: '3600' },
            { type: 'MX', name: domain, content: '20 mail2.pulsecx.com', ttl: '3600' },
            { type: 'TXT', name: domain, content: '"v=spf1 include:_spf.google.com ~all"', ttl: '3600' },
          ].map((rec, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }} className="hover-bg-surface-hover">
              <td style={{ padding: '1rem 1.5rem' }}>
                <span className="badge" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{rec.type}</span>
              </td>
              <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>{rec.name}</td>
              <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{rec.content}</td>
              <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{rec.ttl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      
      {/* Hero Banner */}
      <div className="glass-panel" style={{ 
        background: status === 'Expired' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, var(--bg-surface) 100%)' : status === 'Expiring Soon' ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, var(--bg-surface) 100%)' : 'var(--bg-surface)', 
        border: '1px solid var(--border-color)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
          <button className="btn-icon" onClick={() => navigate('/ssl-dns')} style={{ marginTop: '0.25rem', background: 'var(--bg-base)' }}>
            <ArrowLeft size={18} />
          </button>
          <div className="flex-col gap-2" style={{ flex: 1 }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>Domain Details</span>
              <span className={`badge badge-${status === 'Expired' ? 'danger' : status === 'Expiring Soon' ? 'warning' : 'success'}`}>{status}</span>
            </div>
            <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: '700', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {domain}
            </h1>
            <p className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              Last checked 5 minutes ago
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" style={{ background: 'var(--bg-base)' }}><ExternalLink size={14}/> View Live</button>
          </div>
        </div>
      </div>

      <div className="flex gap-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
        {['Certificate Details', 'DNS Records'].map(tab => (
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
        {activeTab === 'Certificate Details' && renderCertificateDetails()}
        {activeTab === 'DNS Records' && renderDnsRecords()}
      </div>

    </div>
  );
}
