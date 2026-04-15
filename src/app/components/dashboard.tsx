import React from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, DollarSign, PlusCircle, Upload } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient';
interface DashboardProps {
  user: {
    id: string;
    username: string;
    role: 'employee' | 'manager' | 'admin';
  };
}

export function Dashboard({ user }: DashboardProps) {
  const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0
});

useEffect(() => {
  loadStats();
}, []);

async function loadStats() {
  const { data, error } = await supabase
  .from("expenses")
  .select("amount, status")
  .eq("user", user.id);

  if (error) {
    console.error("Error loading stats:", error);
    return;
  }

  const total = data.reduce((sum, row) => sum + row.amount, 0);
  const pending = data.filter(r => r.status === "pending").length;
  const approved = data.filter(r => r.status === "approved").length;
  const rejected = data.filter(r => r.status === "rejected").length;

  setStats({ total, pending, approved, rejected });
}

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  useEffect(() => {
  loadRecent();
}, []);
console.log("hello from 1");
async function loadRecent() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user", user.id)
    .order("date", { ascending: false })
    .limit(5);
    console.log("hello from 2");

  if (error) {
    console.error("Error loading recent activity:", error);
    return;
  }

  const mapped = data.map((exp) => ({
    id: exp.id,
    type: exp.status,
    title: `${exp.category} - ${exp.project}`,
    amount: `£${exp.amount.toFixed(2)}`,
    date: formatRelativeTime(exp.date),
    status: exp.status
  }));

  setRecentActivity(mapped);
}
function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}
const statsArray = [
  {
    label: 'Total Expenses',
    value: `£${stats.total.toFixed(2)}`,
    change: '',
    trend: 'neutral',
    icon: DollarSign,
    color: 'primary'
  },
  {
    label: 'Pending',
    value: stats.pending,
    change: '',
    trend: 'neutral',
    icon: Clock,
    color: 'warning'
  },
  {
    label: 'Approved',
    value: stats.approved,
    change: '',
    trend: 'neutral',
    icon: CheckCircle,
    color: 'success'
  },
  {
    label: 'Rejected',
    value: stats.rejected,
    change: '',
    trend: 'neutral',
    icon: XCircle,
    color: 'destructive'
  },
];


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-success/10 text-success border-success/20';
      case 'Pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
      <h1 className="text-4xl font-bold text-foreground mb-2">
        {user.role === 'manager' ? 'Team Overview' : 'Dashboard'}
      </h1>

      <p className="text-muted-foreground">
        {user.role === 'manager'
          ? "Manage your team's expense requests and approvals"
          : 'Track your expenses and manage your requests'}
      </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/submit"
          className="group p-6 bg-gradient-to-br from-primary to-cyan-600 rounded-2xl text-white hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <PlusCircle size={32} className="opacity-90" />
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Quick Action</span>
          </div>
          <h3 className="text-xl font-semibold mb-1">Submit New Expense</h3>
          <p className="text-white/80 text-sm">Upload receipt and submit for approval</p>
        </Link>

        <button className="group p-6 bg-card border border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all text-left">
          <div className="flex items-center justify-between mb-3">
            <Upload size={32} className="text-primary" />
            <span className="text-sm text-muted-foreground">Fast Upload</span>
          </div>
          <h3 className="text-xl font-semibold mb-1 text-foreground">Upload Receipt</h3>
          <p className="text-muted-foreground text-sm">OCR auto-fill from receipt image</p>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsArray.map((stat) => {
          const Icon = stat.icon;
          const trendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : null;

          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <Icon size={24} className={`text-${stat.color}`} />
                </div>
                {trendIcon && (
                  <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {React.createElement(trendIcon, { size: 14 })}
                  </div>
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <p className="text-sm text-muted-foreground mt-1">Your latest expense submissions</p>
        </div>

        <div className="divide-y divide-border">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="p-6 hover:bg-muted/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors min-w-0 break-words">
                      {activity.title}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">{activity.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-muted/30 border-t border-border">
          <Link
            to="/requests"
            className="text-sm text-primary hover:underline font-medium flex items-center justify-center gap-2"
          >
            View All Requests
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}