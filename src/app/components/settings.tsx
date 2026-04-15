import { useState } from 'react';
import { User, Bell, Shield, Globe, Palette, Save } from 'lucide-react';
interface SettingsProps {
  user: {
    id: string;
    username: string;
    role: 'employee' | 'manager' | 'admin';
  };
}

export function Settings({ user }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState({
    emailApproval: true,
    emailRejection: true,
    emailReminders: false,
    pushApproval: true,
    pushRejection: true,
    pushReminders: false,
  });

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@fdmgroup.com',
    department: 'Engineering',
    manager: 'Sarah Johnson',
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Profile Information</h2>
                  <p className="text-sm text-muted-foreground">Update your personal details</p>
                </div>

                <div className="flex items-center gap-6 pb-6 border-b border-border">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-cyan-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity mb-2">
                      Change Photo
                    </button>
                    <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={profile.department}
                      onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Line Manager
                    </label>
                    <input
                      type="text"
                      value={profile.manager}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Notifications</h2>
                  <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'emailApproval', label: 'Expense Approved', desc: 'Get notified when your expense is approved' },
                        { key: 'emailRejection', label: 'Expense Rejected', desc: 'Get notified when your expense is rejected' },
                        { key: 'emailReminders', label: 'Pending Reminders', desc: 'Weekly summary of pending expenses' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-start gap-4 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.label}
                            </p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'pushApproval', label: 'Expense Approved', desc: 'Real-time push notifications for approvals' },
                        { key: 'pushRejection', label: 'Expense Rejected', desc: 'Real-time push notifications for rejections' },
                        { key: 'pushReminders', label: 'Pending Reminders', desc: 'Daily reminders for pending actions' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-start gap-4 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.label}
                            </p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Appearance</h2>
                  <p className="text-sm text-muted-foreground">Customize how the app looks</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-4">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        if (isDark) toggleTheme();
                      }}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        !isDark
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-full h-24 bg-gradient-to-br from-white to-gray-100 rounded-lg mb-3 border border-gray-200"></div>
                      <p className="font-medium text-foreground">Light Mode</p>
                      <p className="text-sm text-muted-foreground mt-1">Clean and bright interface</p>
                    </button>

                    <button
                      onClick={() => {
                        if (!isDark) toggleTheme();
                      }}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        isDark
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-full h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-3 border border-gray-700"></div>
                      <p className="font-medium text-foreground">Dark Mode</p>
                      <p className="text-sm text-muted-foreground mt-1">Easy on the eyes</p>
                    </button>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Display</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Compact Mode</p>
                        <p className="text-sm text-muted-foreground">Show more content in less space</p>
                      </div>
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Show Animations</p>
                        <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Security</h2>
                  <p className="text-sm text-muted-foreground">Manage your security preferences</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-4">Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground mb-1">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-muted rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Windows - Chrome</p>
                        <p className="text-sm text-muted-foreground">London, UK • Active now</p>
                      </div>
                      <span className="px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-xs font-medium">
                        Current
                      </span>
                    </div>

                    <div className="p-4 bg-muted rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">iPhone - Safari</p>
                        <p className="text-sm text-muted-foreground">London, UK • 2 hours ago</p>
                      </div>
                      <button className="text-sm text-destructive hover:underline">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Save size={18} />
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
