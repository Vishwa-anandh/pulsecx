import React, { createContext, useContext, useState, useMemo } from 'react';

const NotificationContext = createContext();

const initialNotifications = [
  {
    id: 'n1',
    type: 'alert',
    title: 'High CPU Utilization',
    message: 'API Gateway cluster is experiencing 90%+ CPU load for over 5 minutes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    read: false,
    link: '/alerts'
  },
  {
    id: 'n2',
    type: 'mention',
    title: 'Mark Bennet mentioned you',
    message: 'Can you take a look at the database timeout incident?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    link: '/incidents'
  },
  {
    id: 'n3',
    type: 'system',
    title: 'Scheduled Maintenance',
    message: 'PulseCX will undergo scheduled maintenance this Sunday at 2 AM UTC.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    link: '/settings'
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
