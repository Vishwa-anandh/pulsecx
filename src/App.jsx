import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import OperationsDashboard from './pages/OperationsDashboard';
import EngineeringDashboard from './pages/EngineeringDashboard';
import JourneyCatalog from './pages/JourneyCatalog';
import CreateJourney from './pages/CreateJourney';
import JourneyBuilder from './pages/JourneyBuilder';
import JourneyDetails from './pages/JourneyDetails';
import MonitoringDashboard from './pages/MonitoringDashboard';
import IncidentCenter from './pages/IncidentCenter';
import IncidentDetails from './pages/IncidentDetails';
import AlertsHub from './pages/AlertsHub';
import AlertDetails from './pages/AlertDetails';
import ApiDashboard from './pages/ApiDashboard';
import ApiDetails from './pages/ApiDetails';
import SslDnsHub from './pages/SslDnsHub';
import DomainDetails from './pages/DomainDetails';
import MobileHub from './pages/MobileHub';
import AnalyticsHub from './pages/AnalyticsHub';
import SettingsHub from './pages/SettingsHub';
import LoginPage from './pages/LoginPage';
import OnboardingWizard from './pages/OnboardingWizard';
import { JourneyProvider } from './context/JourneyContext';
import { IncidentProvider } from './context/IncidentContext';

function App() {
  return (
    <JourneyProvider>
      <IncidentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup" element={<OnboardingWizard />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ExecutiveDashboard />} />
            <Route path="operations" element={<OperationsDashboard />} />
            <Route path="engineering" element={<EngineeringDashboard />} />
            <Route path="journeys" element={<JourneyCatalog />} />
            <Route path="journeys/create" element={<CreateJourney />} />
            <Route path="journeys/builder" element={<JourneyBuilder />} />
            <Route path="journeys/:id" element={<JourneyDetails />} />
            <Route path="monitoring" element={<MonitoringDashboard />} />
            <Route path="incidents" element={<IncidentCenter />} />
            <Route path="incidents/:id" element={<IncidentDetails />} />
            <Route path="alerts" element={<AlertsHub />} />
            <Route path="alerts/:id" element={<AlertDetails />} />
            <Route path="api" element={<ApiDashboard />} />
            <Route path="api/:id" element={<ApiDetails />} />
            <Route path="ssl-dns" element={<SslDnsHub />} />
            <Route path="ssl-dns/:domain" element={<DomainDetails />} />
            <Route path="mobile" element={<MobileHub />} />
            <Route path="analytics" element={<AnalyticsHub />} />
            <Route path="settings" element={<SettingsHub />} />
            <Route path="settings/:tab" element={<SettingsHub />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </IncidentProvider>
    </JourneyProvider>
  );
}

export default App;
