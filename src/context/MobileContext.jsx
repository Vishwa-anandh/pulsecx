import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useUsers } from './UserContext';

const MobileContext = createContext(null);

const DEFAULT_STATE = {
  deviceStats: {
    android: {
      sessions: 42501,
      crashFree: 99.1,
      startupTime: 1.2,
      osDist: [
        { name: 'Android 14', percentage: 60, color: 'var(--accent-success)' },
        { name: 'Android 13', percentage: 25, color: 'var(--accent-warning)' },
        { name: 'Older', percentage: 15, color: 'var(--border-highlight)' }
      ]
    },
    ios: {
      sessions: 58102,
      crashFree: 99.8,
      startupTime: 0.8,
      osDist: [
        { name: 'iOS 17', percentage: 80, color: 'var(--accent-primary)' },
        { name: 'iOS 16', percentage: 15, color: 'var(--accent-warning)' },
        { name: 'Older', percentage: 5, color: 'var(--border-highlight)' }
      ]
    }
  },
  journeys: [
    { name: 'Login Flow', steps: [{n:'App Open', v:100}, {n:'Input Creds', v:85}, {n:'MFA', v:78}, {n:'Success', v:75}], color: 'var(--accent-primary)' },
    { name: 'Payment Flow', steps: [{n:'Cart', v:100}, {n:'Shipping', v:65}, {n:'Card Entry', v:45}, {n:'Success', v:40}], color: 'var(--accent-success)' },
    { name: 'Search Flow', steps: [{n:'Home', v:100}, {n:'Search Tap', v:50}, {n:'Query Entered', v:45}, {n:'Result Click', v:30}], color: 'var(--accent-warning)' }
  ],
  analytics: {
    uiDelays: Array.from({ length: 24 }).map((_, i) => 10 + Math.random() * 20 + (i === 12 ? 40 : 0)),
    battery: {
      video: 85,
      sync: 15
    }
  },
  isSpiking: false
};

const EMPTY_STATE = {
  deviceStats: {
    android: {
      sessions: 0,
      crashFree: 100,
      startupTime: 0,
      osDist: []
    },
    ios: {
      sessions: 0,
      crashFree: 100,
      startupTime: 0,
      osDist: []
    }
  },
  journeys: [],
  analytics: {
    uiDelays: Array.from({ length: 24 }).map(() => 0),
    battery: {
      video: 0,
      sync: 0
    }
  },
  isSpiking: false
};

export const MobileProvider = ({ children }) => {
  const { currentUser } = useUsers();
  const [mobileState, setMobileState] = useState(currentUser?.isDemo ? DEFAULT_STATE : EMPTY_STATE);

  useEffect(() => {
    if (currentUser?.isDemo) {
      setMobileState(DEFAULT_STATE);
    } else {
      setMobileState(EMPTY_STATE);
    }
  }, [currentUser]);

  const simulateTrafficSpike = useCallback(() => {
    setMobileState({
      deviceStats: {
        android: {
          ...DEFAULT_STATE.deviceStats.android,
          sessions: Math.floor(DEFAULT_STATE.deviceStats.android.sessions * 2.5),
          crashFree: 92.4,
          startupTime: 4.8
        },
        ios: {
          ...DEFAULT_STATE.deviceStats.ios,
          sessions: Math.floor(DEFAULT_STATE.deviceStats.ios.sessions * 3.1),
          crashFree: 95.1,
          startupTime: 3.2
        }
      },
      journeys: [
        { name: 'Login Flow', steps: [{n:'App Open', v:100}, {n:'Input Creds', v:80}, {n:'MFA', v:60}, {n:'Success', v:40}], color: 'var(--accent-danger)' },
        { name: 'Payment Flow', steps: [{n:'Cart', v:100}, {n:'Shipping', v:40}, {n:'Card Entry', v:15}, {n:'Success', v:5}], color: 'var(--accent-danger)' },
        { name: 'Search Flow', steps: [{n:'Home', v:100}, {n:'Search Tap', v:40}, {n:'Query Entered', v:20}, {n:'Result Click', v:5}], color: 'var(--accent-danger)' }
      ],
      analytics: {
        uiDelays: Array.from({ length: 24 }).map(() => 60 + Math.random() * 140),
        battery: {
          video: 98,
          sync: 45
        }
      },
      isSpiking: true
    });
  }, []);

  const resetMetrics = useCallback(() => {
    setMobileState(DEFAULT_STATE);
  }, []);

  return (
    <MobileContext.Provider value={{ mobileState, simulateTrafficSpike, resetMetrics }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = () => useContext(MobileContext);
