import React, { createContext, useContext, useState } from 'react';

const SetupContext = createContext(null);

export function SetupProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 11;

  const [setupData, setSetupData] = useState({
    // Step 1
    appName: '',
    environment: 'Production',
    websiteUrl: '',
    
    // Step 2
    monitoringType: '',
    
    // Step 3
    locations: [],
    frequency: '5 Minutes',
    
    // Step 4
    journeySteps: [],
    
    // Step 5
    validationRules: {},
    
    // Step 6
    evidenceCapture: {
      screenshot: true,
      consoleLogs: true,
      networkLogs: true,
      harFile: true,
      apiErrors: true,
      dns: true,
      ssl: true
    },
    
    // Step 7
    alerts: {
      recipients: ['NOC Team', 'Application Team', 'Service Desk'],
      channels: ['Teams', 'Email']
    },
    
    // Step 8
    incidentRules: {
      condition: 'Journey Fails 2 Consecutive Times',
      severity: 'Critical',
      assignment: 'Application Support Team'
    }
  });

  const updateData = (newData) => {
    setSetupData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <SetupContext.Provider value={{ currentStep, setCurrentStep, totalSteps, setupData, updateData, nextStep, prevStep }}>
      {children}
    </SetupContext.Provider>
  );
}

export function useSetup() {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error('useSetup must be used within a SetupProvider');
  }
  return context;
}
