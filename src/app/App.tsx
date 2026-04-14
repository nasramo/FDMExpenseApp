import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Login } from './components/login';
import { Layout } from './components/layout';
import { Dashboard } from './components/dashboard';
import { SubmitExpense } from './components/submit-expense';
import { Requests } from './components/requests';
import { Approvals } from './components/approvals';
import { Settings } from './components/settings';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'employee' | 'manager'>('employee');

  const handleLogin = (role: 'employee' | 'manager') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('employee');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Layout userRole={userRole} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/submit" element={<SubmitExpense />} />
          <Route path="/requests" element={<Requests />} />
          {(userRole === 'manager' || userRole === 'admin') && (
            <Route path="/approvals" element={<Approvals />} />
          )}
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}