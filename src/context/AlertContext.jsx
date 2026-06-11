import React, { createContext, useState, useEffect } from 'react';
import { useUsers } from './UserContext';

export const AlertContext = createContext();

const demoAlerts = [
  { id: 'ALT-901', trigger: 'Latency > 500ms', severity: 'Critical', status: 'Open', journey: 'Checkout Payment Flow', time: '10 mins ago' },
  { id: 'ALT-902', trigger: 'Error Rate > 5%', severity: 'Major', status: 'Acknowledged', journey: 'Login Flow', time: '1 hour ago' },
  { id: 'ALT-903', trigger: 'DB CPU > 80%', severity: 'Minor', status: 'Resolved', journey: 'Search Catalog', time: '2 days ago' }
];

const demoRules = [
  { id: 'RUL-001', name: 'High Latency Alert', condition: 'P99 Latency > 500ms for 5 mins', status: 'Active', channels: ['MS Teams', 'Email'] },
  { id: 'RUL-002', name: 'Payment Failure Spike', condition: '5xx Errors > 2% for 2 mins', status: 'Active', channels: ['PagerDuty', 'SMS'] },
  { id: 'RUL-003', name: 'Low Traffic Warning', condition: 'Requests < 100/min for 10 mins', status: 'Disabled', channels: ['Email'] },
];

const demoChannels = [
  { name: 'Microsoft Teams', desc: 'Send alerts to Teams channels via incoming webhook.', connected: true },
  { name: 'Email', desc: 'Send traditional email alerts to users and distribution lists.', connected: true },
  { name: 'SMS', desc: 'Send critical alerts via SMS using Twilio integration.', connected: false },
  { name: 'Custom Webhook', desc: 'Trigger internal APIs or systems on alert creation.', connected: true }
];

const demoHistory = [
  { id: 'LOG-1029', alert: 'ALT-901', channel: 'MS Teams', recipient: '#ops-alerts', status: 'Sent', time: '10 mins ago' },
  { id: 'LOG-1028', alert: 'ALT-901', channel: 'Email', recipient: 'oncall@pulsecx.com', status: 'Sent', time: '10 mins ago' },
  { id: 'LOG-1027', alert: 'ALT-902', channel: 'SMS', recipient: '+1 (555) 019-2039', status: 'Sent', time: '1 hour ago' },
  { id: 'LOG-1026', alert: 'ALT-903', channel: 'Webhook', recipient: 'https://api.internal/trigger', status: 'Failed', time: '2 days ago' },
];

export const AlertProvider = ({ children }) => {
  const { currentUser } = useUsers();
  const isDemo = currentUser?.isDemo;

  const [alerts, setAlerts] = useState(isDemo ? demoAlerts : []);
  const [rules, setRules] = useState(isDemo ? demoRules : []);
  const [channels, setChannels] = useState(isDemo ? demoChannels : [
    { name: 'Microsoft Teams', desc: 'Send alerts to Teams channels via incoming webhook.', connected: false },
    { name: 'Email', desc: 'Send traditional email alerts to users and distribution lists.', connected: false },
    { name: 'SMS', desc: 'Send critical alerts via SMS using Twilio integration.', connected: false },
    { name: 'Custom Webhook', desc: 'Trigger internal APIs or systems on alert creation.', connected: false }
  ]);
  const [history, setHistory] = useState(isDemo ? demoHistory : []);

  useEffect(() => {
    if (currentUser?.isDemo) {
      setAlerts(demoAlerts);
      setRules(demoRules);
      setChannels(demoChannels);
      setHistory(demoHistory);
    } else {
      setAlerts([]);
      setRules([]);
      setChannels([
        { name: 'Microsoft Teams', desc: 'Send alerts to Teams channels via incoming webhook.', connected: false },
        { name: 'Email', desc: 'Send traditional email alerts to users and distribution lists.', connected: false },
        { name: 'SMS', desc: 'Send critical alerts via SMS using Twilio integration.', connected: false },
        { name: 'Custom Webhook', desc: 'Trigger internal APIs or systems on alert creation.', connected: false }
      ]);
      setHistory([]);
    }
  }, [currentUser]);

  const addAlertRule = (ruleData) => {
    const newRule = {
      id: `RUL-${Math.floor(Math.random() * 900) + 100}`,
      name: ruleData.name,
      condition: ruleData.condition,
      status: 'Active',
      channels: ruleData.channels
    };
    setRules(prev => [newRule, ...prev]);
  };

  const updateRuleStatus = (ruleId, newStatus) => {
    setRules(prev => prev.map(r => r.id === ruleId ? { ...r, status: newStatus } : r));
  };

  const updateChannel = (channelName, isConnected) => {
    setChannels(prev => prev.map(c => c.name === channelName ? { ...c, connected: isConnected } : c));
  };

  const updateAlertStatus = (alertId, newStatus) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: newStatus } : a));
  };

  return (
    <AlertContext.Provider value={{
      alerts, rules, channels, history,
      addAlertRule, updateRuleStatus, updateChannel, updateAlertStatus
    }}>
      {children}
    </AlertContext.Provider>
  );
};
