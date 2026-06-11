import React, { createContext, useContext, useState } from 'react';

const IncidentContext = createContext();

const INITIAL_INCIDENTS = [
  { id: 'INC-1042', title: 'Checkout API Timeout', severity: 'Critical', status: 'Investigating', time: '10 mins ago', service: 'Payment Gateway', owner: 'Sarah Connor', team: 'Payments Engineering', journey: 'Checkout Payment Flow', impactUsers: '~450', impactRevenue: '$12,400' },
  { id: 'INC-1041', title: 'High Latency in EU Region', severity: 'Major', status: 'Identified', time: '1 hour ago', service: 'Global CDN', owner: 'John Doe', team: 'Platform Ops', journey: 'Global Routing', impactUsers: '~1,200', impactRevenue: '$4,000' },
  { id: 'INC-1040', title: 'Database Sync Delay', severity: 'Minor', status: 'Resolved', time: '3 hours ago', service: 'User DB Replica', owner: 'Alice Smith', team: 'Data Eng', journey: 'Profile Update', impactUsers: '~12', impactRevenue: '$0' },
  { id: 'INC-1039', title: 'SSL Certificate Expiring', severity: 'Minor', status: 'Resolved', time: '1 day ago', service: 'Auth Domain', owner: 'Bob Jones', team: 'Security', journey: 'Login Flow', impactUsers: '0', impactRevenue: '$0' },
  { id: 'INC-1038', title: 'Search Engine Degradation', severity: 'Critical', status: 'Resolved', time: '2 days ago', service: 'ElasticSearch Cluster', owner: 'Eve Adams', team: 'Search Eng', journey: 'Product Search', impactUsers: '~5,000', impactRevenue: '$45,000' },
];

export function IncidentProvider({ children }) {
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);

  const addIncident = (incidentData) => {
    const newId = `INC-${1043 + incidents.length}`; // Simple ID generation
    const newIncident = {
      ...incidentData,
      id: newId,
      status: 'Investigating',
      time: 'Just now',
      owner: 'Unassigned',
      team: 'TBD',
      impactUsers: 'Calculating...',
      impactRevenue: 'Calculating...',
      journey: 'Multiple'
    };
    setIncidents([newIncident, ...incidents]);
  };

  const updateIncident = (id, updates) => {
    setIncidents(incidents.map(inc => inc.id === id ? { ...inc, ...updates } : inc));
  };

  return (
    <IncidentContext.Provider value={{ incidents, addIncident, updateIncident }}>
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
