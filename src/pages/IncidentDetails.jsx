import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Users, ShieldAlert, CheckCircle2, Clock, Activity, FileText, Image as ImageIcon, MessageSquare, Shield, Globe, Terminal, ExternalLink, AlertTriangle, Radio, Check, ChevronRight, Download, Video, Loader, X } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import { createPortal } from 'react-dom';

export default function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incidents, updateIncident, resolveIncident } = useIncidents();
  
  const [activeTab, setActiveTab] = useState('Timeline');
  const [showWarRoomModal, setShowWarRoomModal] = useState(false);
  const [warRoomState, setWarRoomState] = useState('connecting'); // connecting, joined
  
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionNoteText, setResolutionNoteText] = useState('');

  const incident = incidents.find(i => i.id === id) || {
    id: id || 'INC-1042',
    title: 'Checkout API Timeout',
    status: 'Investigating',
    severity: 'Critical',
    timeElapsed: '14 mins',
    owner: 'Sarah Connor',
    team: 'Payments Engineering',
    service: 'Payment Gateway',
    impactUsers: '~450',
    impactRevenue: '$12,400',
    journey: 'Checkout Payment Flow',
    description: 'Synthetic monitoring detected a critical failure in the Payment Gateway service. The incident appears to be affecting regional traffic.',
    timeline: []
  };

  const tabs = ['Timeline', 'Evidence', 'Resolution'];

  const handleAcknowledge = () => {
    updateIncident(incident.id, { status: 'Acknowledged', owner: 'Admin User' });
  };

  const handleJoinWarRoom = () => {
    setShowWarRoomModal(true);
    setWarRoomState('connecting');
    setTimeout(() => {
      setWarRoomState('joined');
    }, 1500);
  };

  const handleResolveSubmit = (e) => {
    e.preventDefault();
    if (resolutionNoteText.trim()) {
      resolveIncident(incident.id, resolutionNoteText);
      setShowResolveModal(false);
      setResolutionNoteText('');
      setActiveTab('Resolution'); // Switch to resolution tab to show notes
    }
  };

  const getTimelineIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle2 size={12} className="text-success" />;
      case 'danger': return <ShieldAlert size={12} className="text-danger" />;
      case 'warning': return <FileText size={12} className="text-warning" />;
      case 'info': return <MessageSquare size={12} className="text-primary" />;
      default: return <User size={12} className="text-muted" />;
    }
  };

  const getStatusBadge = () => {
    if (incident.status === 'Investigating') return <span className="badge badge-danger pulse-dot"><Radio size={10} style={{ marginRight: '4px' }}/> {incident.status}</span>;
    if (incident.status === 'Acknowledged') return <span className="badge badge-warning"><Check size={10} style={{ marginRight: '4px' }}/> {incident.status}</span>;
    if (incident.status === 'Resolved') return <span className="badge badge-success"><CheckCircle2 size={10} style={{ marginRight: '4px' }}/> {incident.status}</span>;
    return <span className="badge">{incident.status}</span>;
  };

  return (
    <div className="flex-col animate-fade-in" style={{ minHeight: '100%', paddingBottom: '2rem' }}>
      
      {/* Premium Hero Banner */}
      <div style={{ 
        background: incident.severity === 'Critical' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, var(--bg-base) 100%)' : 'var(--bg-surface)', 
        borderBottom: '1px solid var(--border-color)',
        padding: 'var(--panel-padding)',
        margin: '-1.5rem -1.5rem 1.5rem -1.5rem',
        borderTopLeftRadius: 'var(--radius-md)',
        borderTopRightRadius: 'var(--radius-md)'
      }}>
        <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
          <button className="btn-icon" onClick={() => navigate('/incidents')} style={{ marginTop: '0.25rem', background: 'var(--bg-surface)' }}>
            <ArrowLeft size={18} />
          </button>
          <div className="flex-col gap-2" style={{ flex: 1 }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: incident.severity === 'Critical' ? 'var(--accent-danger)' : 'var(--text-secondary)', letterSpacing: '0.05em' }}>{incident.id}</span>
              {getStatusBadge()}
              <span className="badge" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}><Clock size={10} style={{ marginRight: '4px' }}/> T+ {incident.timeElapsed || '14 mins'}</span>
            </div>
            <h1 style={{ margin: 0, fontWeight: '700', letterSpacing: '-0.02em' }}>{incident.title}</h1>
            <p className="text-secondary" style={{ fontSize: '0.875rem', maxWidth: '800px', lineHeight: '1.5' }}>
              {incident.description || `Synthetic monitoring detected a ${incident.severity?.toLowerCase() || 'minor'} failure in the ${incident.service || 'system'} service.`}
            </p>
          </div>
          <div className="flex gap-2">
            {incident.status === 'Investigating' && (
              <button className="btn btn-ghost" onClick={handleAcknowledge} style={{ background: 'var(--bg-surface)' }}>Acknowledge</button>
            )}
            {incident.status !== 'Resolved' && (
              <button className="btn btn-ghost" onClick={() => setShowResolveModal(true)} style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-success)', color: 'var(--accent-success)' }}>Resolve</button>
            )}
            <button className="btn btn-primary" onClick={handleJoinWarRoom} style={{ background: 'var(--text-primary)', color: 'var(--bg-base)', boxShadow: 'none' }}>Join War Room</button>
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-3 gap-4" style={{ alignItems: 'start' }}>
        
        {/* Left Column: Main Investigative Content (Span 2) */}
        <div className="col-span-2 flex-col gap-4">
          
          {/* Internal Tabs */}
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
                {tab}
              </button>
            ))}
          </div>

          <div className="animate-fade-in" style={{ paddingTop: '0.5rem' }}>
            
            {activeTab === 'Timeline' && (
              <div className="flex-col gap-4">
                
                {/* Horizontal RCA Flow */}
                <div className="flex-col gap-4">
                  <h3 className="flex items-center gap-2" style={{ margin: 0 }}>
                    <Activity size={16} className="text-primary" /> Root Cause Flow
                  </h3>
                  <div className="glass-panel" style={{ padding: '2rem 1.5rem', overflowX: 'auto' }}>
                    <div className="flex items-center justify-between min-w-[500px]">
                      {[
                        { icon: <Terminal size={18}/>, label: 'Browser Client', status: 'fail', desc: 'Timeout' },
                        { icon: <Globe size={18}/>, label: 'Route53 DNS', status: 'fail', desc: 'Delayed' },
                        { icon: <Shield size={18}/>, label: 'SSL Handshake', status: 'pass', desc: 'OK' },
                        { icon: <Activity size={18}/>, label: 'Payment API', status: 'root', desc: '504 Gateway' },
                      ].map((node, i, arr) => (
                        <React.Fragment key={i}>
                          <div className="flex-col items-center gap-3 z-10" style={{ width: '100px' }}>
                            <div style={{ 
                              width: '48px', height: '48px', borderRadius: '50%', 
                              background: node.status === 'root' ? 'rgba(239, 68, 68, 0.15)' : node.status === 'pass' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface-hover)', 
                              border: `2px solid ${node.status === 'root' ? 'var(--accent-danger)' : node.status === 'pass' ? 'var(--accent-success)' : 'var(--text-muted)'}`, 
                              display: 'flex', alignItems: 'center', justifyContent: 'center', 
                              color: node.status === 'root' ? 'var(--accent-danger)' : node.status === 'pass' ? 'var(--accent-success)' : 'var(--text-muted)',
                              // Removed glow / box-shadow from root node as requested
                              boxShadow: 'none'
                            }}>
                              {node.icon}
                            </div>
                            <div className="flex-col items-center gap-0.5">
                              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: node.status === 'root' ? 'var(--accent-danger)' : 'var(--text-primary)', textAlign: 'center' }}>{node.label}</span>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{node.desc}</span>
                            </div>
                          </div>
                          {i < arr.length - 1 && (
                            <div style={{ flex: 1, height: '2px', background: arr[i+1].status === 'pass' ? 'var(--accent-success)' : 'var(--accent-danger)', opacity: 0.5, position: 'relative', margin: '0 -10px', top: '-15px' }}>
                               {arr[i+1].status !== 'pass' && <div style={{ position: 'absolute', right: '50%', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-danger)' }}/>}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    
                    <div style={{ marginTop: '2rem', padding: 'var(--panel-padding)', borderLeft: '3px solid var(--accent-danger)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                      <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                        <span style={{ fontWeight: '700', marginRight: '0.5rem' }}>System Diagnosis:</span>
                        The transaction failure originates at the <strong>Payment API</strong>. The resulting 504 Timeout cascaded upwards, causing the Browser Client to fail the overall synthetic journey.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event Log */}
                <div className="flex-col gap-4">
                  <h3 className="flex items-center gap-2" style={{ margin: 0 }}>
                    <Clock size={16} className="text-primary" /> Event Log
                  </h3>
                  <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
                    <div className="flex-col gap-0">
                      {incident.timeline && incident.timeline.length > 0 ? incident.timeline.map((evt, idx, arr) => (
                        <div key={idx} className="flex gap-4" style={{ paddingBottom: idx === arr.length - 1 ? '0' : '1.5rem', position: 'relative' }}>
                          {idx < arr.length - 1 && (
                            <div style={{ position: 'absolute', top: '1.5rem', left: '0.35rem', bottom: 0, width: '1px', background: 'var(--border-color)' }} />
                          )}
                          <div style={{ marginTop: '0.25rem', background: 'var(--bg-surface)', zIndex: 1 }}>
                            {getTimelineIcon(evt.iconType)}
                          </div>
                          <div className="flex-col gap-1" style={{ flex: 1 }}>
                            <div className="flex items-center gap-2">
                              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{evt.time}</span>
                              <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{evt.event}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{evt.desc}</p>
                          </div>
                        </div>
                      )) : (
                        <div style={{ padding: 'var(--panel-padding)', color: 'var(--text-muted)', textAlign: 'center' }}>No timeline events recorded.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Evidence' && (
              <div className="flex-col gap-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel hover-bg-surface-hover" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: 'var(--panel-gap)', cursor: 'pointer' }}>
                    <ImageIcon size={32} />
                    <div className="flex-col items-center gap-1">
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Error Screenshot</span>
                      <span style={{ fontSize: '0.75rem' }}>Captured at 09:01:45</span>
                    </div>
                  </div>
                  <div className="glass-panel hover-bg-surface-hover" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: 'var(--panel-gap)', cursor: 'pointer' }}>
                    <Activity size={32} />
                    <div className="flex-col items-center gap-1">
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Network HAR Dump</span>
                      <span style={{ fontSize: '0.75rem' }}>Full request trace</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Resolution' && (
              <div className="glass-panel" style={{ padding: 'var(--panel-padding)', textAlign: 'center', color: 'var(--text-muted)' }}>
                {incident.status === 'Resolved' ? (
                  <>
                    <CheckCircle2 size={32} className="text-success" style={{ margin: '0 auto 1rem auto' }} />
                    <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-primary)' }}>Incident Resolved</h3>
                    <div style={{ background: 'var(--bg-base)', padding: 'var(--panel-padding)', borderRadius: 'var(--radius-md)', textAlign: 'left', border: '1px solid var(--border-color)' }}>
                      <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resolution Notes / Post-Mortem</h4>
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>{incident.resolutionNote}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={32} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Awaiting Resolution</h3>
                    <p style={{ fontSize: '0.8125rem', maxWidth: '400px', margin: '0 auto' }}>This incident is currently active. Resolution notes and post-mortem links will be available once the incident is closed.</p>
                  </>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Persistent Metadata Sidebar */}
        <div className="flex-col gap-4">
          
          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em' }}>Assignment</h4>
            <div className="flex-col gap-4">
              <div className="flex items-center gap-3">
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={14} color="white" />
                </div>
                <div className="flex-col gap-0.5">
                  <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>{incident.owner}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Incident Commander</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div style={{ width: '2rem', height: '2rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-base)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={14} className="text-secondary" />
                </div>
                <div className="flex-col gap-0.5">
                  <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>{incident.team}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Responding Team</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em' }}>Business Impact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex-col gap-1">
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: incident.severity === 'Critical' ? 'var(--accent-warning)' : 'var(--text-primary)' }}>{incident.impactUsers}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Users Affected</span>
              </div>
              <div className="flex-col gap-1">
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: incident.severity === 'Critical' ? 'var(--accent-danger)' : 'var(--text-primary)' }}>{incident.impactRevenue}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Revenue at Risk</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 'var(--panel-padding)' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em' }}>Affected Service</h4>
            <div className="flex-col gap-3">
              <div className="flex items-center justify-between">
                <span style={{ fontSize: '0.8125rem', fontWeight: '500' }}>{incident.service}</span>
                <span className="badge badge-danger">Offline</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border-color)' }} />
              <div 
                className="flex items-center justify-between group" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/journeys/J-209')}
              >
                <div className="flex-col gap-0.5">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Triggered by Journey</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: '500', color: 'var(--text-primary)', transition: 'color 0.2s' }} className="group-hover:text-[var(--accent-primary)]">{incident.journey}</span>
                </div>
                <ChevronRight size={14} className="text-muted" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* War Room Modal */}
      {showWarRoomModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '400px', background: 'var(--bg-surface)', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--panel-gap)', textAlign: 'center' }}>
            
            {warRoomState === 'connecting' ? (
              <>
                <Loader className="pulse-dot" size={32} style={{ color: 'var(--accent-primary)' }} />
                <div className="flex-col gap-1">
                  <h3 style={{ margin: 0 }}>Connecting to War Room...</h3>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Initiating Slack channel and Zoom bridge for {incident.id}</p>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Video size={24} />
                </div>
                <div className="flex-col gap-1">
                  <h3 style={{ margin: 0 }}>War Room Ready</h3>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>You have successfully joined the active incident call.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowWarRoomModal(false)} style={{ width: '100%' }}>Return to Dashboard</button>
              </>
            )}

            {warRoomState === 'connecting' && (
              <button className="btn btn-ghost" onClick={() => setShowWarRoomModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem' }}><X size={16}/></button>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Resolve Incident Modal */}
      {showResolveModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '500px', background: 'var(--bg-surface)', padding: 'var(--panel-padding)', display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
            <div className="flex justify-between items-center">
              <h2 style={{ margin: 0, color: 'var(--accent-success)' }}>Resolve Incident</h2>
              <button className="btn-icon" onClick={() => setShowResolveModal(false)}><X size={16}/></button>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>You are about to mark <strong>{incident.id}</strong> as resolved. Please provide a brief resolution note or post-mortem summary.</p>
            
            <form onSubmit={handleResolveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--panel-gap)' }}>
              <div className="flex-col gap-2">
                <label style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Resolution Note</label>
                <textarea required rows={5} value={resolutionNoteText} onChange={(e) => setResolutionNoteText(e.target.value)} placeholder="Explain the root cause and the steps taken to resolve it..." style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }} />
              </div>
              
              <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowResolveModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ background: 'var(--accent-success)', color: 'white', border: 'none' }}>Mark as Resolved</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
