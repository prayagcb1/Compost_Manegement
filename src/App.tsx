import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import StaffLoginForm from './components/Auth/StaffLoginForm';

// Central Admin Pages
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import ServiceLogs from './pages/ServiceLogs';
import Inventory from './pages/Inventory';
import KnowledgeBase from './pages/KnowledgeBase';
import Composters from './pages/Composters';
import Buildings from './pages/Buildings';
import Shredders from './pages/Shredders';
import Tasks from './pages/Tasks';
import Staff from './pages/Staff';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import SupervisorForm from './pages/SupervisorForm';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import MyComposters from './pages/customer/MyComposters';
import ServiceHistory from './pages/customer/ServiceHistory';
import HarvestTracking from './pages/customer/HarvestTracking';
import Support from './pages/customer/Support';
import Profile from './pages/customer/Profile';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffWorkForm from './pages/staff/StaffWorkForm';

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Check if we're on staff login route
    const isStaffRoute = window.location.pathname.includes('/staff-login');
    return isStaffRoute ? <StaffLoginForm /> : <LoginForm />;
  }

  // Staff users get the simplified dashboard with limited navigation
  if (user.role === 'staff') {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="work-form" element={<StaffWorkForm />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    );
  }

  const getDefaultRoute = () => {
    switch (user.role) {
      case 'customer':
        return '/customer/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={getDefaultRoute()} replace />} />
          
          {/* Supervisor & Central Admin Routes */}
          {(user.role === 'supervisor' || user.role === 'central-admin') && (
            <>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="buildings" element={<Buildings />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="staff" element={<Staff />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="service-logs" element={<ServiceLogs />} />
              <Route path="supervisor-form" element={<SupervisorForm />} />
            </>
          )}
          
          {/* Central Admin Only Routes */}
          {user.role === 'central-admin' && (
            <>
              <Route path="composters" element={<Composters />} />
              <Route path="shredders" element={<Shredders />} />
              <Route path="settings" element={<Settings />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="knowledge-base" element={<KnowledgeBase />} />
            </>
          )}
          
          {/* Customer Routes */}
          {user.role === 'customer' && (
            <>
              <Route path="customer/dashboard" element={<CustomerDashboard />} />
              <Route path="my-composters" element={<MyComposters />} />
              <Route path="service-history" element={<ServiceHistory />} />
              <Route path="harvest-tracking" element={<HarvestTracking />} />
              <Route path="support" element={<Support />} />
              <Route path="profile" element={<Profile />} />
            </>
          )}
          
          {/* Fallback for unauthorized routes */}
          <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;