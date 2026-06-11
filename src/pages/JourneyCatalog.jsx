import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit2, Copy, PauseCircle, PlayCircle, Trash2, Search, RefreshCcw, Fingerprint, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useJourneys } from '../context/JourneyContext';
import EmptyState from '../components/EmptyState';

export default function JourneyCatalog() {
  const navigate = useNavigate();
  const { journeys, deleteJourney, cloneJourney, togglePause } = useJourneys();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  
  const [selectedJourneys, setSelectedJourneys] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);

  React.useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleSelectAll = () => {
    if (selectedJourneys.length === filteredJourneys.length) {
      setSelectedJourneys([]);
    } else {
      setSelectedJourneys(filteredJourneys.map(j => j.id));
    }
  };

  const handleSelectOne = (e, id) => {
    e.stopPropagation();
    if (selectedJourneys.includes(id)) {
      setSelectedJourneys(selectedJourneys.filter(jId => jId !== id));
    } else {
      setSelectedJourneys([...selectedJourneys, id]);
    }
  };

  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, journeyId: id });
  };

  const handlePasskeyVerify = async () => {
    setVerificationError('');
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: challenge,
          rpId: window.location.hostname,
          allowCredentials: [], 
          userVerification: "preferred"
        }
      });
      
      if (credential) {
        deleteJourney(deleteTarget);
        setDeleteTarget(null);
        setSelectedJourneys([]);
      }
    } catch (err) {
      setVerificationError('Verification failed or cancelled. Please try again or use a password.');
    }
  };

  const handlePasswordVerify = () => {
    if (passwordInput === 'admin') {
      deleteJourney(deleteTarget);
      setDeleteTarget(null);
      setSelectedJourneys([]);
      setPasswordInput('');
      setVerificationError('');
      setUsePassword(false);
    } else {
      setVerificationError('Incorrect password. Please try again.');
    }
  };
  
  const filteredJourneys = useMemo(() => {
    return journeys.filter(j => {
      const matchesFilter = filter === 'All' || j.status === filter;
      const matchesSearch = j.name.toLowerCase().includes(search.toLowerCase()) || j.id.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [journeys, filter, search]);

  return (
    <div className="flex-col gap-4 animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.125rem' }}>Customer Journeys</h1>
          <p className="text-secondary" style={{ fontSize: '0.8125rem' }}>Manage and monitor synthetic customer workflows.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/journeys/create')}>
          <Plus size={14} /> Create New Journey
        </button>
      </div>

      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--panel-padding)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.4rem 0.75rem', width: '18.75rem' }}>
              <Search size={14} className="text-muted" />
              <input type="text" placeholder="Search journeys..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.8125rem', width: '100%' }} />
            </div>

            <div className="flex gap-1" style={{ background: 'var(--bg-base)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              {['All', 'Active', 'Failed', 'Paused'].map(f => (
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

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2" style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <RefreshCcw size={14} className="text-success" style={{ animation: 'spin 4s linear infinite' }} /> 
              <span>Live Updates</span>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-success)', marginLeft: '0.25rem' }} />
            </div>
          </div>
        </div>

        {filteredJourneys.length === 0 ? (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--panel-padding)', flex: 1, display: 'flex' }}>
            <EmptyState 
              title="No journeys found" 
              description={`We couldn't find any journeys matching "${search}". Try a different search term or create a new journey.`}
              actionText="Clear Search"
              onAction={() => setSearch('')}
            />
          </div>
        ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }} role="table">
            <caption className="sr-only">Customer Journeys Catalog</caption>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem 1rem', width: '40px' }}>
                  <input type="checkbox" checked={filteredJourneys.length > 0 && selectedJourneys.length === filteredJourneys.length} onChange={handleSelectAll} style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }} aria-label="Select All Journeys" />
                </th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Journey Name</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Success Rate</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Last Run</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJourneys.map((journey) => (
                <tr key={journey.id} onContextMenu={(e) => handleContextMenu(e, journey.id)} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s', cursor: 'pointer', background: selectedJourneys.includes(journey.id) ? 'var(--bg-surface-hover)' : undefined }} className="hover:bg-[var(--bg-surface-hover)] group">
                  <td style={{ padding: '0.875rem 1rem' }} onClick={(e) => handleSelectOne(e, journey.id)}>
                    <input type="checkbox" checked={selectedJourneys.includes(journey.id)} onChange={(e) => handleSelectOne(e, journey.id)} style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }} aria-label={`Select ${journey.name}`} />
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }} onClick={() => navigate(`/journeys/${journey.id}`)}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{journey.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{journey.id} • {journey.runs} runs</div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div className="flex items-center gap-2">
                      <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); togglePause(journey.id); }} style={{ padding: 0, border: 'none', color: journey.status === 'Paused' ? 'var(--text-secondary)' : 'var(--accent-success)' }}>
                        {journey.status === 'Paused' ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                      </button>
                      <span className={`badge ${
                        journey.status === 'Active' ? 'badge-success' : 
                        journey.status === 'Warning' ? 'badge-warning' : 
                        journey.status === 'Failed' ? 'badge-danger' : ''
                      }`} style={{ 
                        background: journey.status === 'Paused' ? 'var(--bg-base)' : undefined, 
                        color: journey.status === 'Paused' ? 'var(--text-secondary)' : undefined,
                        border: journey.status === 'Paused' ? '1px solid var(--border-color)' : undefined
                      }}>
                        {journey.status}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-surface-hover rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full ${journey.successRate >= 95 ? 'bg-success' : journey.successRate >= 90 ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${journey.successRate}%` }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: '600', width: '30px' }}>{journey.successRate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>
                    {journey.lastRun}
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="btn-ghost" style={{ width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--bg-base)' }} title="View Details" onClick={(e) => { e.stopPropagation(); navigate(`/journeys/${journey.id}`); }}><Eye size={14} /></button>
                      <button className="btn-ghost" style={{ width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--bg-base)' }} title="Edit Workflow" onClick={(e) => { e.stopPropagation(); navigate(`/journeys/builder?id=${journey.id}`); }}><Edit2 size={14} /></button>
                      <button className="btn-ghost" style={{ width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--bg-base)' }} title="Clone" onClick={(e) => { e.stopPropagation(); cloneJourney(journey.id); }}><Copy size={14} /></button>
                      <button className="btn-ghost" style={{ width: '28px', height: '28px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--bg-base)', color: 'var(--accent-danger)' }} title="Delete" onClick={(e) => { e.stopPropagation(); setDeleteTarget(journey.id); setVerificationError(''); setUsePassword(false); setPasswordInput(''); }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {selectedJourneys.length > 0 && createPortal(
        <div className="animate-slide-up" style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: 'var(--panel-gap)', boxShadow: 'var(--shadow-lg)', zIndex: 100 }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: '600' }}>{selectedJourneys.length} selected</div>
          <div style={{ width: '1px', height: '1.5rem', background: 'var(--border-color)' }} />
          <div className="flex gap-2">
            <button className="btn-ghost" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)' }} onClick={() => selectedJourneys.forEach(id => togglePause(id))}>
              <PauseCircle size={14} style={{ marginRight: '0.4rem' }} /> Toggle Pause
            </button>
            <button className="btn-ghost" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-danger)' }} onClick={() => { setDeleteTarget(selectedJourneys[0]); }}>
              <Trash2 size={14} style={{ marginRight: '0.4rem' }} /> Delete Selected
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Context Menu */}
      {contextMenu && createPortal(
        <div style={{ position: 'fixed', top: contextMenu.y, left: contextMenu.x, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.25rem', minWidth: '160px', boxShadow: 'var(--shadow-md)', zIndex: 9999 }}>
          <div className="hover-bg-surface-hover" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-sm)' }} onClick={() => navigate(`/journeys/${contextMenu.journeyId}`)}>
            <Eye size={14} /> View Details
          </div>
          <div className="hover-bg-surface-hover" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-sm)' }} onClick={() => navigate(`/journeys/builder?id=${contextMenu.journeyId}`)}>
            <Edit2 size={14} /> Edit Workflow
          </div>
          <div className="hover-bg-surface-hover" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-sm)' }} onClick={() => cloneJourney(contextMenu.journeyId)}>
            <Copy size={14} /> Clone Journey
          </div>
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.25rem 0' }} />
          <div className="hover-bg-surface-hover" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-sm)', color: 'var(--accent-danger)' }} onClick={() => { setDeleteTarget(contextMenu.journeyId); setVerificationError(''); setUsePassword(false); setPasswordInput(''); }}>
            <Trash2 size={14} /> Delete Journey
          </div>
        </div>,
        document.body
      )}

      {/* Deletion Verification Modal */}
      {deleteTarget && createPortal(
        <div className="animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-surface)', padding: 'var(--panel-padding)', borderRadius: 'var(--radius-lg)', width: '25rem', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-danger)' }}>
              <Trash2 size={20} /> Delete Journey
            </h2>
            <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              This action cannot be undone. Please verify your identity to continue.
            </p>
            
            {verificationError && (
              <div style={{ border: '1px solid var(--accent-danger)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', color: 'var(--accent-danger)', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={14} /> {verificationError}
              </div>
            )}

            {!usePassword ? (
              <div className="flex-col gap-4">
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.875rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }} 
                  onClick={handlePasskeyVerify}
                >
                  <Fingerprint size={18} /> Verify with Biometrics
                </button>

                <div className="flex items-center gap-3" style={{ margin: '0.25rem 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em' }}>OR</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                </div>

                <div 
                  onClick={() => { setUsePassword(true); setVerificationError(''); }}
                  style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s', fontWeight: '500' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  Use Password Instead
                </div>
              </div>
            ) : (
              <div className="flex-col gap-4 animate-fade-in">
                <div className="flex-col gap-1">
                  <label style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Account Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="password" 
                      value={passwordInput}
                      onChange={e => setPasswordInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handlePasswordVerify()}
                      autoFocus
                      placeholder="Enter 'admin' to verify..."
                      style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.2s' }}
                    />
                  </div>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', justifyContent: 'center', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }} onClick={handlePasswordVerify}>Confirm Deletion</button>
                <div 
                  onClick={() => { setUsePassword(false); setVerificationError(''); }}
                  style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s', fontWeight: '500', marginTop: '0.25rem' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  ← Back to Biometrics
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => setDeleteTarget(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: '500', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.target.style.background = 'var(--bg-base)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Cancel Deletion
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
