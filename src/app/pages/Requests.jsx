import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Eye, MessageSquare, FileText } from 'lucide-react';

const mockExpenses = [
  {
    id: 1,
    description: 'Client Dinner - Tech Solutions Inc.',
    merchant: 'The Capital Grille',
    amount: 156.50,
    category: 'Meals & Entertainment',
    project: 'Tech Solutions Inc.',
    date: '2026-04-12',
    submittedDate: '2026-04-12',
    status: 'approved',
    approver: 'Sarah Johnson',
  },
  {
    id: 2,
    description: 'Flight to London - Q1 Review',
    merchant: 'British Airways',
    amount: 450.00,
    category: 'Travel',
    project: 'Banking System Migration',
    date: '2026-04-10',
    submittedDate: '2026-04-10',
    status: 'pending',
  },
  {
    id: 3,
    description: 'Office Supplies - Stationery',
    merchant: 'Staples',
    amount: 45.20,
    category: 'Office Supplies',
    project: 'Internal Operations',
    date: '2026-04-08',
    submittedDate: '2026-04-08',
    status: 'approved',
    approver: 'Michael Chen',
  },
  {
    id: 4,
    description: 'Hotel Stay - Conference',
    merchant: 'Marriott Hotel',
    amount: 320.00,
    category: 'Accommodation',
    project: 'Healthcare App Development',
    date: '2026-04-05',
    submittedDate: '2026-04-05',
    status: 'rejected',
    approver: 'Sarah Johnson',
    comments: 'Please provide additional justification for the room upgrade.',
  },
  {
    id: 5,
    description: 'Software License - Adobe Creative Cloud',
    merchant: 'Adobe',
    amount: 54.99,
    category: 'Software & Subscriptions',
    project: 'Internal Operations',
    date: '2026-04-03',
    submittedDate: '2026-04-03',
    status: 'approved',
    approver: 'Michael Chen',
  },
  {
    id: 6,
    description: 'Client Lunch - Retail Platform',
    merchant: 'Osteria Francescana',
    amount: 89.75,
    category: 'Meals & Entertainment',
    project: 'Retail Platform Upgrade',
    date: '2026-04-01',
    submittedDate: '2026-04-01',
    status: 'pending',
  },
];

export function Requests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ExpenseStatus>('all');
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const filteredExpenses = mockExpenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockExpenses.length,
    pending: mockExpenses.filter((e) => e.status === 'pending').length,
    approved: mockExpenses.filter((e) => e.status === 'approved').length,
    rejected: mockExpenses.filter((e) => e.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-3xl mb-1">My Requests</h1>
          <p className="text-muted-foreground">View and manage your expense submissions</p>
        </div>
      </div>

      <div className="p-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search expenses..."
                className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as ExpenseStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg transition-all capitalize ${
                    statusFilter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {status} ({statusCounts[status]})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Expenses List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredExpenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedExpense(expense)}
                className={`bg-card border rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedExpense?.id === expense.id
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{expense.description}</h3>
                    <p className="text-sm text-muted-foreground">{expense.merchant}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      expense.status === 'approved'
                        ? 'bg-success text-success-foreground'
                        : expense.status === 'pending'
                        ? 'bg-pending text-pending-foreground'
                        : 'bg-destructive text-destructive-foreground'
                    }`}
                  >
                    {expense.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">{expense.category}</span> • {expense.project}
                    </p>
                    <p className="text-muted-foreground">Submitted {expense.submittedDate}</p>
                  </div>
                  <p className="text-2xl">${expense.amount.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}

            {filteredExpenses.length === 0 && (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg mb-2">No expenses found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedExpense ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl p-6 sticky top-8"
              >
                <h2 className="text-xl mb-6">Expense Details</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Amount</p>
                    <p className="text-2xl">${selectedExpense.amount.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        selectedExpense.status === 'approved'
                          ? 'bg-success text-success-foreground'
                          : selectedExpense.status === 'pending'
                          ? 'bg-pending text-pending-foreground'
                          : 'bg-destructive text-destructive-foreground'
                      }`}
                    >
                      {selectedExpense.status}
                    </span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p>{selectedExpense.description}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Merchant</p>
                    <p>{selectedExpense.merchant}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p>{selectedExpense.category}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Project</p>
                    <p>{selectedExpense.project}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Expense Date</p>
                    <p>{selectedExpense.date}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Submitted Date</p>
                    <p>{selectedExpense.submittedDate}</p>
                  </div>

                  {selectedExpense.approver && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {selectedExpense.status === 'approved' ? 'Approved By' : 'Reviewed By'}
                      </p>
                      <p>{selectedExpense.approver}</p>
                    </div>
                  )}

                  {selectedExpense.comments && (
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Manager Comments
                      </p>
                      <p className="text-sm bg-secondary/50 p-3 rounded-lg">
                        {selectedExpense.comments}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-border pt-4">
                    <button className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-all flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      View Receipt
                    </button>

                    {selectedExpense.status === 'rejected' && (
                      <button className="w-full mt-2 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
                        Appeal Decision
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-12 text-center sticky top-8">
                <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg mb-2">Select an expense</p>
                <p className="text-sm text-muted-foreground">
                  Click on an expense to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
