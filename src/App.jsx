import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import AdministrationHub from './pages/AdministrationHub';
import LoginPage from './pages/LoginPage';
import OnboardingWizard from './pages/OnboardingWizard';
import UserSettings from './pages/UserSettings';
import { JourneyProvider } from './context/JourneyContext';
import { IncidentProvider } from './context/IncidentContext';
import { AlertProvider } from './context/AlertContext';
import { ApiProvider } from './context/ApiContext';
import { UserProvider, useUsers } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';
import { MobileProvider } from './context/MobileContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUsers();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ErrorBoundary>
    <ThemeProvider>
    <NotificationProvider>
      <UserProvider>
      <IncidentProvider>
        <AlertProvider>
          <JourneyProvider>
            <ApiProvider>
              <MobileProvider>
                <ToastProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/setup" element={<OnboardingWizard />} />
                      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
                        <Route path="administration" element={<AdministrationHub />} />
                        <Route path="administration/:tab" element={<AdministrationHub />} />
                        <Route path="settings" element={<UserSettings />} />
                        <Route path="settings/:tab" element={<UserSettings />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </ToastProvider>
              </MobileProvider>
            </ApiProvider>
          </JourneyProvider>
        </AlertProvider>
      </IncidentProvider>
    </UserProvider>
    </NotificationProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
