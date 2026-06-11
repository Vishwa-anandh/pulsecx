import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUsers } from './UserContext';

const IncidentContext = createContext();

const INITIAL_INCIDENTS = [
  { 
    id: 'INC-1042', title: 'Checkout API Timeout', severity: 'Critical', status: 'Investigating', time: '10 mins ago', service: 'Payment Gateway', owner: 'Sarah Connor', team: 'Payments Engineering', journey: 'Checkout Payment Flow', impactUsers: '~450', impactRevenue: '$12,400',
    description: 'Synthetic monitoring detected a critical failure in the Payment Gateway service. The incident appears to be affecting regional traffic.',
    timeline: [
      { time: '09:00:12', event: 'Monitor Started', desc: 'Synthetic journey initiated from EU region.', iconType: 'success' },
      { time: '09:01:45', event: 'Login Failed', desc: 'Authentication service returned 504 Gateway Timeout.', iconType: 'danger' },
      { time: '09:02:01', event: 'Incident Created', desc: 'Automated alert generated INC-1042.', iconType: 'warning' },
      { time: '09:03:15', event: 'Alert Sent', desc: 'PagerDuty notification dispatched to Payments Engineering.', iconType: 'info' }
    ]
  },
  { 
    id: 'INC-1041', title: 'High Latency in EU Region', severity: 'Major', status: 'Identified', time: '1 hour ago', service: 'Global CDN', owner: 'John Doe', team: 'Platform Ops', journey: 'Global Routing', impactUsers: '~1,200', impactRevenue: '$4,000',
    description: 'Cloudflare routing anomalies observed causing elevated latency spikes across central Europe.',
    timeline: [
      { time: '08:15:00', event: 'Incident Created', desc: 'Automated alert generated INC-1041.', iconType: 'warning' },
      { time: '08:20:00', event: 'Acknowledged', desc: 'John Doe acknowledged the incident.', iconType: 'default' },
      { time: '08:45:00', event: 'Root Cause Identified', desc: 'Upstream transit provider packet loss confirmed.', iconType: 'info' }
    ]
  },
  { id: 'INC-1040', title: 'Database Sync Delay', severity: 'Minor', status: 'Resolved', time: '3 hours ago', service: 'User DB Replica', owner: 'Alice Smith', team: 'Data Eng', journey: 'Profile Update', impactUsers: '~12', impactRevenue: '$0', timeline: [], resolutionNote: 'Replica lag caught up after manual vacuum.' },
  { id: 'INC-1039', title: 'SSL Certificate Expiring', severity: 'Minor', status: 'Resolved', time: '1 day ago', service: 'Auth Domain', owner: 'Bob Jones', team: 'Security', journey: 'Login Flow', impactUsers: '0', impactRevenue: '$0', timeline: [], resolutionNote: 'Certificate renewed successfully.' },
  { id: 'INC-1038', title: 'Search Engine Degradation', severity: 'Critical', status: 'Resolved', time: '2 days ago', service: 'ElasticSearch Cluster', owner: 'Eve Adams', team: 'Search Eng', journey: 'Product Search', impactUsers: '~5,000', impactRevenue: '$45,000', timeline: [], resolutionNote: 'Cluster scaled up by 2 data nodes to handle query load.' },
];

export function IncidentProvider({ children }) {
  const { currentUser } = useUsers();
  const [incidents, setIncidents] = useState(currentUser?.isDemo ? INITIAL_INCIDENTS : []);

  useEffect(() => {
    if (currentUser?.isDemo) {
      setIncidents(INITIAL_INCIDENTS);
    } else {
      setIncidents([]);
    }
  }, [currentUser]);

  const addIncident = (incidentData) => {
    const newId = `INC-${1043 + incidents.length}`; // Simple ID generation
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newIncident = {
      ...incidentData,
      id: newId,
      status: 'Investigating',
      time: 'Just now',
      impactUsers: 'Calculating...',
      impactRevenue: 'Calculating...',
      timeline: [
        { time: timeString, event: 'Incident Created', desc: `Manually reported by ${incidentData.owner || 'System'}.`, iconType: 'warning' },
        { time: timeString, event: 'Alert Sent', desc: `PagerDuty notification dispatched to ${incidentData.team || 'assigned team'}.`, iconType: 'info' }
      ]
    };
    setIncidents([newIncident, ...incidents]);
  };

  const updateIncident = (id, updates) => {
    setIncidents(incidents.map(inc => {
      if (inc.id === id) {
        const updatedInc = { ...inc, ...updates };
        // If status changes to Acknowledged, add a timeline event
        if (updates.status === 'Acknowledged' && inc.status !== 'Acknowledged') {
          const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          updatedInc.timeline = [...(updatedInc.timeline || []), { time: timeString, event: 'Acknowledged', desc: `${updatedInc.owner} acknowledged the incident.`, iconType: 'default' }];
        }
        return updatedInc;
      }
      return inc;
    }));
  };

  const addTimelineEvent = (id, eventData) => {
    setIncidents(incidents.map(inc => {
      if (inc.id === id) {
        return { ...inc, timeline: [...(inc.timeline || []), eventData] };
      }
      return inc;
    }));
  };

  const resolveIncident = (id, resolutionNote) => {
    setIncidents(incidents.map(inc => {
      if (inc.id === id) {
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return { 
          ...inc, 
          status: 'Resolved', 
          resolutionNote,
          timeline: [...(inc.timeline || []), { time: timeString, event: 'Resolved', desc: 'Incident was marked as resolved.', iconType: 'success' }] 
        };
      }
      return inc;
    }));
  };

  return (
    <IncidentContext.Provider value={{ incidents, addIncident, updateIncident, addTimelineEvent, resolveIncident }}>
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidents() {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
}
