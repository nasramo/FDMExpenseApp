import { Outlet, Navigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

export function Layout() {
  const { isAuthenticated } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      <main className={`flex-1 transition-all lg:${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Outlet />
      </main>
    </div>
  );
}
