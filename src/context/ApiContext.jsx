import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUsers } from './UserContext';

const ApiContext = createContext();
const INITIAL_APIS = [
  { 
    id: 'API-001', name: 'Payment Gateway API', endpoint: 'api.pulsecx.com/v1/payments', 
    availability: 99.99, latency: 120, status: 'Healthy', type: 'REST',
    errorRate: 0.01, throughput: 1240, owner: 'Payments Engineering',
    methods: ['POST', 'GET'],
    transactions: [
      { id: 'req-9a8b7', method: 'POST', path: '/v1/payments/process', status: 504, time: '14:32:01', duration: 5012 },
      { id: 'req-9a8b6', method: 'POST', path: '/v1/payments/process', status: 504, time: '14:31:59', duration: 5008 },
      { id: 'req-9a8b5', method: 'GET', path: '/v1/payments/status/1029', status: 200, time: '14:31:45', duration: 145 },
    ]
  },
  { 
    id: 'API-002', name: 'User Authentication', endpoint: 'api.pulsecx.com/v1/auth', 
    availability: 99.95, latency: 85, status: 'Healthy', type: 'GraphQL',
    errorRate: 0.05, throughput: 2150, owner: 'Security',
    methods: ['POST'],
    transactions: []
  },
  { 
    id: 'API-003', name: 'Product Catalog Search', endpoint: 'api.pulsecx.com/v2/search', 
    availability: 98.50, latency: 450, status: 'Degraded', type: 'REST',
    errorRate: 1.50, throughput: 5600, owner: 'Search Eng',
    methods: ['GET'],
    transactions: []
  },
  { 
    id: 'API-004', name: 'Order Processing', endpoint: 'internal.pulsecx.com/orders', 
    availability: 100.00, latency: 45, status: 'Healthy', type: 'gRPC',
    errorRate: 0.00, throughput: 340, owner: 'Backend Systems',
    methods: ['POST', 'PUT', 'DELETE'],
    transactions: []
  },
  { 
    id: 'API-005', name: 'Shipping Webhooks', endpoint: 'api.pulsecx.com/webhooks', 
    availability: 95.20, latency: 850, status: 'Critical', type: 'Webhook',
    errorRate: 4.80, throughput: 110, owner: 'Platform Ops',
    methods: ['POST'],
    transactions: []
  },
];

export function ApiProvider({ children }) {
  const { currentUser } = useUsers();
  const [apis, setApis] = useState(currentUser?.isDemo ? INITIAL_APIS : []);

  useEffect(() => {
    if (currentUser?.isDemo) {
      setApis(INITIAL_APIS);
    } else {
      setApis([]);
    }
  }, [currentUser]);

  const addApi = (apiData) => {
    const newId = `API-00${apis.length + 1}`;
    const newApi = {
      ...apiData,
      id: newId,
      availability: 100.00,
      latency: 0,
      status: 'Healthy',
      errorRate: 0.00,
      throughput: 0,
      transactions: []
    };
    setApis([newApi, ...apis]);
  };

  const updateApi = (id, updates) => {
    setApis(apis.map(api => api.id === id ? { ...api, ...updates } : api));
  };

  const addTransaction = (id, transaction) => {
    setApis(apis.map(api => {
      if (api.id === id) {
        // Calculate new latency purely for demonstration based on the new transaction
        const newLatency = Math.round((api.latency * 0.9) + (transaction.duration * 0.1));
        return {
          ...api,
          latency: newLatency,
          transactions: [transaction, ...api.transactions].slice(0, 50) // Keep last 50
        };
      }
      return api;
    }));
  };

  return (
    <ApiContext.Provider value={{ apis, addApi, updateApi, addTransaction }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApis() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApis must be used within an ApiProvider');
  }
  return context;
}
