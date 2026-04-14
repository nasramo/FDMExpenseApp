import { motion } from 'motion/react';
import { DollarSign, Clock, CheckCircle, XCircle, Plus, Upload, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', amount: 2400 },
  { month: 'Feb', amount: 1398 },
  { month: 'Mar', amount: 3800 },
  { month: 'Apr', amount: 3908 },
  { month: 'May', amount: 4800 },
  { month: 'Jun', amount: 3800 },
];

const recentActivity = [
  { id: 1, description: 'Client Dinner - Tech Solutions Inc.', amount: 156.50, status: 'approved', date: '2026-04-12' },
  { id: 2, description: 'Flight to London - Q1 Review', amount: 450.00, status: 'pending', date: '2026-04-10' },
  { id: 3, description: 'Office Supplies - Stationery', amount: 45.20, status: 'approved', date: '2026-04-08' },
  { id: 4, description: 'Hotel Stay - Conference', amount: 320.00, status: 'rejected', date: '2026-04-05' },
];

export function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Total Expenses',
      value: '$4,256.80',
      icon: DollarSign,
      color: 'text-foreground',
      bgColor: 'bg-secondary',
      trend: '+12.5%'
    },
    {
      label: 'Pending Approval',
      value: '$850.00',
      icon: Clock,
      color: 'text-pending-foreground',
      bgColor: 'bg-pending',
      count: 3
    },
    {
      label: 'Approved',
      value: '$3,286.80',
      icon: CheckCircle,
      color: 'text-success-foreground',
      bgColor: 'bg-success',
      count: 12
    },
    {
      label: 'Rejected',
      value: '$120.00',
      icon: XCircle,
      color: 'text-destructive-foreground',
      bgColor: 'bg-destructive',
      count: 1
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-3xl mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your expense activity</p>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1 text-success text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.trend}</span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-2xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.count && (
                  <p className="text-xs text-muted-foreground mt-1">{stat.count} requests</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/submit')}
              className="flex items-center gap-4 p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all group"
            >
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <Plus className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-medium">Submit New Expense</p>
                <p className="text-sm opacity-80">Add a new expense claim</p>
              </div>
            </button>
            <button
              onClick={() => navigate('/submit')}
              className="flex items-center gap-4 p-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-all group"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Upload Receipt</p>
                <p className="text-sm text-muted-foreground">Scan and upload a receipt</p>
              </div>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spending Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl mb-6">Monthly Spending</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="amount" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium mb-1">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-medium mb-1">${activity.amount.toFixed(2)}</p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        activity.status === 'approved'
                          ? 'bg-success text-success-foreground'
                          : activity.status === 'pending'
                          ? 'bg-pending text-pending-foreground'
                          : 'bg-destructive text-destructive-foreground'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
