import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUsers } from './UserContext';

const JourneyContext = createContext();

const initialJourneys = [
  { id: 'J-104', name: 'User Registration Flow', status: 'Active', successRate: 98.4, lastRun: '2 mins ago', runs: 1450 },
  { id: 'J-209', name: 'Checkout Payment', status: 'Warning', successRate: 85.2, lastRun: '5 mins ago', runs: 3200 },
  { id: 'J-401', name: 'Password Reset', status: 'Active', successRate: 99.1, lastRun: '15 mins ago', runs: 850 },
  { id: 'J-505', name: 'Add to Cart (Mobile)', status: 'Paused', successRate: 0, lastRun: '2 days ago', runs: 0 },
  { id: 'J-612', name: 'Enterprise Login SAML', status: 'Failed', successRate: 42.1, lastRun: '1 min ago', runs: 410 },
];

export function JourneyProvider({ children }) {
  const { currentUser } = useUsers();
  const [journeys, setJourneys] = useState(currentUser?.isDemo ? initialJourneys : []);

  useEffect(() => {
    if (currentUser?.isDemo) {
      setJourneys(initialJourneys);
    } else {
      setJourneys([]);
    }
  }, [currentUser]);

  const addJourney = (journey) => {
    const id = `J-${Math.floor(Math.random() * 900) + 100}`;
    const newJourney = {
      id,
      ...journey,
      status: 'Active',
      successRate: 100,
      lastRun: 'Just now',
      runs: 0
    };
    setJourneys([newJourney, ...journeys]);
    return id;
  };

  const deleteJourney = (id) => {
    setJourneys(journeys.filter(j => j.id !== id));
  };

  const cloneJourney = (id) => {
    const journeyToClone = journeys.find(j => j.id === id);
    if (journeyToClone) {
      setJourneys([{
        ...journeyToClone,
        id: `J-${Math.floor(Math.random() * 900) + 100}`,
        name: `${journeyToClone.name} (Copy)`,
        status: 'Paused',
        successRate: 0,
        runs: 0,
        lastRun: 'Never'
      }, ...journeys]);
    }
  };

  const togglePause = (id) => {
    setJourneys(journeys.map(j => {
      if (j.id === id) {
        return { ...j, status: j.status === 'Paused' ? 'Active' : 'Paused' };
      }
      return j;
    }));
  };

  return (
    <JourneyContext.Provider value={{ journeys, addJourney, deleteJourney, cloneJourney, togglePause }}>
      {children}
    </JourneyContext.Provider>
  );
}

export const useJourneys = () => useContext(JourneyContext);
