import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../supabaseClient';

interface LoginProps {
  onLogin: (role: 'employee' | 'manager') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Query Supabase for the user
  const { data, error } = await supabase
    .from('Users')
    .select('*')
    .eq('username', email)
    .single();

  if (error || !data) {
    alert('Invalid email or password');
    return;
  }

  // Check password (plain text for prototype)
  if (data.password !== password) {
    alert('Invalid email or password');
    return;
  }

  // Extract role from DB
  const role = data.usertype as 'employee' | 'manager';

  // Pass role to parent
  onLogin(role);
};

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-lg">FDM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">FDM Group</h1>
                <p className="text-sm text-muted-foreground">Expenses Management</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@fdmgroup.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Sign In
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3 px-4 border border-border rounded-xl font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                SSO Sign In
              </button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-8">
              Demo: Use "employee@fdm.com" or "manager@fdm.com" with password "employee123" or "manager123" respectively.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-cyan-500 to-blue-600 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Streamline Your Expense Management
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-8">
            Submit expenses, track approvals, and manage your finances effortlessly with our modern platform.
          </p>
          <div className="space-y-4">
            {[
              'Quick receipt uploads with OCR',
              'Real-time approval tracking',
              'Detailed expense analytics'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
