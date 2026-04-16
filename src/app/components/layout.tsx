import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  CheckSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import fdmLightLogo from '../assets/fdm-light.svg';
import fdmDarkLogo from '../assets/fdm-dark.svg';
import fdmTrackpointLightLogo from '../assets/fdm-trackpoint-light.svg';
import fdmTrackpointDarkLogo from '../assets/fdm-trackpoint-dark.svg';


interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'employee' | 'manager' | 'admin';
  onLogout?: () => void;
}

export function Layout({ children, userRole = 'employee', onLogout }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );
  const location = useLocation();

  useEffect(() => {
    const setTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    setTheme();
    const observer = new MutationObserver(setTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/submit', label: 'Submit Expense', icon: PlusCircle },
    { path: '/requests', label: 'My Requests', icon: FileText },
    ...(userRole === 'manager' || userRole === 'admin'
      ? [{ path: '/approvals', label: 'Approvals', icon: CheckSquare }]
      : []
    ),
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg inline-flex items-center justify-center"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col fixed lg:relative h-full z-50 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border">
          <div className={`${sidebarCollapsed ? 'hidden' : 'flex-1'}`}>
            <div className="w-full h-8 bg-gradient-to-br from-primary via-primary/80 to-primary/40 rounded-lg flex items-center justify-center">
              <img
                src={isDark ? fdmTrackpointDarkLogo : fdmTrackpointLightLogo}
                alt="FDM Trackpoint logo"
                className="h-full w-auto object-contain px-2"
              />
            </div>
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors inline-flex items-center justify-center"
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 py-3 rounded-lg transition-all ${
                    sidebarCollapsed ? 'justify-center px-0' : 'px-3'
                  }
                  ${isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }
                `}
              >
                <Icon size={20} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors ${
              sidebarCollapsed ? 'justify-center px-0' : 'px-3'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            {!sidebarCollapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors ${
              sidebarCollapsed ? 'justify-center px-0' : 'px-3'
            }`}
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto w-full">
        <div className="lg:hidden h-16"></div>
        {children}
      </main>
    </div>
  );
}
