import React, { useState } from 'react';
import { ShieldAlert, Search, Filter, AlertTriangle, AlertCircle, Info, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIncidents } from '../context/IncidentContext';
import { createPortal } from 'react-dom';

export default function IncidentCenter() {
  const navigate = useNavigate();
  const { incidents, addIncident } = useIncidents();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Advanced Filter state
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Report Modal state
  const [newIncidentTitle, setNewIncidentTitle] = useState('');
  const [newIncidentSeverity, setNewIncidentSeverity] = useState('Minor');
  const [newIncidentService, setNewIncidentService] = useState('Payment Gateway');

  const filteredIncidents = incidents.filter(inc => {
    const matchesFilter = filter === 'All' || inc.severity === filter;
    const matchesSearch = inc.title.toLowerCase().includes(search.toLowerCase()) || inc.id.toLowerCase().includes(search.toLowerCase());
    const matchesService = serviceFilter === 'All' || inc.service === serviceFilter;
    const matchesStatus = statusFilter === 'All' || inc.status === statusFilter;
    
    return matchesFilter && matchesSearch && matchesService && matchesStatus;
  });

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'Critical': return <AlertTriangle size={14} className="text-danger" />;
      case 'Major': return <AlertCircle size={14} className="text-warning" />;
      case 'Minor': return <Info size={14} className="text-primary" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Investigating': return <span className="badge badge-danger pulse-dot">Investigating</span>;
      case 'Acknowledged': return <span className="badge badge-warning">Acknowledged</span>;
      case 'Identified': return <span className="badge badge-warning">Identified</span>;
      case 'Resolved': return <span className="badge" style={{ background: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}><CheckCircle2 size={10} style={{ marginRight: '4px' }}/>Resolved</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (newIncidentTitle) {
      addIncident({
        title: newIncidentTitle,
        severity: newIncidentSeverity,
        service: newIncidentService
      });
      setShowReportModal(false);
      setNewIncidentTitle('');
    }
  };

  const uniqueServices = ['All', ...new Set(incidents.map(i => i.service))];
  const uniqueStatuses = ['All', 'Investigating', 'Acknowledged', 'Identified', 'Resolved'];

  return (
    <div className="flex-col gap-4 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.125rem' }}>Incident Center</h1>
          <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Track, investigate, and resolve system anomalies.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowReportModal(true)}>
          <ShieldAlert size={14} /> Report Incident
        </button>
      </div>

      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.4rem 0.75rem', width: '18.75rem' }}>
              <Search size={14} className="text-muted" />
              <input type="text" placeholder="Search incidents by ID or title..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.8125rem', width: '100%' }} />
            </div>

            <div className="flex gap-1" style={{ background: 'var(--bg-base)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              {['All', 'Critical', 'Major', 'Minor'].map(f => (
                <button 
                  key={f} 
                  className="btn btn-ghost" 
                  onClick={() => setFilter(f)}
                  style={{ 
                    padding: '0.25rem 0.75rem', 
                    border: 'none', 
                    background: filter === f ? 'var(--bg-surface-hover)' : 'transparent',
                    color: filter === f ? 'var(--text-primary)' : 'var(--text-muted)'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            className="btn btn-ghost" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            style={{ background: showAdvancedFilters ? 'var(--bg-surface-hover)' : 'transparent' }}
          >
            <Filter size={14}/> Advanced Filters
          </button>
        </div>

        {showAdvancedFilters && (
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-base)', display: 'flex', gap: '2rem' }} className="animate-fade-in">
            <div className="flex-col gap-2">
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)'}}>Filter by Service</label>
              <select 
                value={serviceFilter} 
                onChange={(e) => setServiceFilter(e.target.value)}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', outline: 'none', width: '200px' }}
              >
                {uniqueServices.map(srv => <option key={srv} value={srv}>{srv}</option>)}
              </select>
            </div>
            <div className="flex-col gap-2">
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)'}}>Filter by Status</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', outline: 'none', width: '200px' }}
              >
                {uniqueStatuses.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-hover)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Incident ID</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Title & Service</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Severity</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Reported Time</th>
                <th style={{ padding: '0.75rem 1rem', width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.length > 0 ? filteredIncidents.map((inc) => (
                <tr key={inc.id} onClick={() => navigate(`/incidents/${inc.id}`)} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s', cursor: 'pointer' }} className="hover:bg-[var(--bg-surface-hover)] group">
                  <td style={{ padding: '0.875rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{inc.id}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.125rem' }}>{inc.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Affected: {inc.service}</div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(inc.severity)}
                      <span style={{ fontWeight: '500' }}>{inc.severity}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>{getStatusBadge(inc.status)}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-muted)' }}>{inc.time}</td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-muted)' }}>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No incidents match your current filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Incident Modal */}
      {showReportModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '400px', background: 'var(--bg-surface)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="flex justify-between items-center">
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Report New Incident</h2>
              <button className="btn-icon" onClick={() => setShowReportModal(false)}><X size={16}/></button>
            </div>
            
            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="flex-col gap-2">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Incident Title</label>
                <input required type="text" value={newIncidentTitle} onChange={(e) => setNewIncidentTitle(e.target.value)} placeholder="e.g. Cache nodes offline" style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex-col gap-2">
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Severity</label>
                  <select value={newIncidentSeverity} onChange={(e) => setNewIncidentSeverity(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}>
                    <option>Minor</option>
                    <option>Major</option>
                    <option>Critical</option>
                  </select>
                </div>
                
                <div className="flex-col gap-2">
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Affected Service</label>
                  <select value={newIncidentService} onChange={(e) => setNewIncidentService(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none' }}>
                    <option>Payment Gateway</option>
                    <option>Global CDN</option>
                    <option>User DB Replica</option>
                    <option>Auth Domain</option>
                    <option>ElasticSearch Cluster</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowReportModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Incident</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
