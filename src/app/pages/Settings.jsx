import { motion } from 'motion/react';
import { Moon, Sun, Bell, Lock, User, Mail, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export function Settings() {
  const { user, theme, toggleTheme } = useApp();
  const [notifications, setNotifications] = useState({
    emailApproval: true,
    emailRejection: true,
    emailReminder: false,
    pushApproval: true,
    pushRejection: true,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-3xl mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      <div className="p-8 max-w-4xl mx-auto space-y-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-xl mb-6">Profile Information</h2>

          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
                  Change Photo
                </button>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, GIF or PNG. Max size 2MB
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm text-foreground/80 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-foreground/80 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm text-foreground/80 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Role
              </label>
              <input
                type="text"
                defaultValue={user?.role}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg capitalize"
                disabled
              />
            </div>

            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
              Save Changes
            </button>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-xl mb-6">Appearance</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-warning" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    {theme === 'light' ? 'Light mode' : 'Dark mode'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-xl mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="font-medium">Email - Approval Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when expenses are approved
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, emailApproval: !notifications.emailApproval })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.emailApproval ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.emailApproval ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="font-medium">Email - Rejection Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when expenses are rejected
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, emailRejection: !notifications.emailRejection })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.emailRejection ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.emailRejection ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="font-medium">Email - Weekly Summary</p>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary of your expenses
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, emailReminder: !notifications.emailReminder })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.emailReminder ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.emailReminder ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="font-medium">Push - Approval Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications for approvals
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, pushApproval: !notifications.pushApproval })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.pushApproval ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.pushApproval ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="font-medium">Push - Rejection Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications for rejections
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, pushRejection: !notifications.pushRejection })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications.pushRejection ? 'bg-primary' : 'bg-switch-background'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.pushRejection ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-xl mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </h2>

          <div className="space-y-4">
            <button className="w-full p-4 bg-secondary/50 rounded-lg hover:bg-accent transition-all text-left">
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-muted-foreground">
                Update your password to keep your account secure
              </p>
            </button>

            <button className="w-full p-4 bg-secondary/50 rounded-lg hover:bg-accent transition-all text-left">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </button>

            <button className="w-full p-4 bg-secondary/50 rounded-lg hover:bg-accent transition-all text-left">
              <p className="font-medium">Active Sessions</p>
              <p className="text-sm text-muted-foreground">
                Manage devices where you're currently logged in
              </p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
