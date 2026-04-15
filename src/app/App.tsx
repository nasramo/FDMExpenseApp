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

  const [user, setUser] = useState<{
    id: string;
    username: string;
    role: 'employee' | 'manager' | 'admin';
  } | null>(null);

  const handleLogin = (userData: {
    id: string;
    username: string;
    role: 'employee' | 'manager' | 'admin';
  }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated || !user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Layout userRole={user.role} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard user={user} />} />

          <Route path="/submit" element={<SubmitExpense user={user} />} />

          <Route path="/requests" element={<Requests user={user} />} />

          {user.role === 'manager' && (
            <Route path="/approvals" element={<Approvals user={user} />} />
          )}

          <Route path="/settings" element={<Settings user={user} />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
