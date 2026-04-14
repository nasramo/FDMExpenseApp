import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, User, Calendar, FileText, MessageSquare } from 'lucide-react';

interface PendingExpense {
  id: number;
  employeeName: string;
  employeeEmail: string;
  description: string;
  merchant: string;
  amount: number;
  category: string;
  project: string;
  date: string;
  submittedDate: string;
}

const mockPendingExpenses: PendingExpense[] = [
  {
    id: 1,
    employeeName: 'John Smith',
    employeeEmail: 'john.smith@fdm.com',
    description: 'Client Lunch - Retail Platform Discussion',
    merchant: 'Osteria Francescana',
    amount: 89.75,
    category: 'Meals & Entertainment',
    project: 'Retail Platform Upgrade',
    date: '2026-04-01',
    submittedDate: '2026-04-01',
  },
  {
    id: 2,
    employeeName: 'Emily Watson',
    employeeEmail: 'emily.watson@fdm.com',
    description: 'Flight to London - Q1 Review',
    merchant: 'British Airways',
    amount: 450.00,
    category: 'Travel',
    project: 'Banking System Migration',
    date: '2026-04-10',
    submittedDate: '2026-04-10',
  },
  {
    id: 3,
    employeeName: 'David Lee',
    employeeEmail: 'david.lee@fdm.com',
    description: 'Conference Registration - Tech Summit 2026',
    merchant: 'TechConf Inc.',
    amount: 599.00,
    category: 'Travel',
    project: 'Internal Operations',
    date: '2026-04-13',
    submittedDate: '2026-04-13',
  },
];

export function Approvals() {
  const [selectedExpense, setSelectedExpense] = useState<PendingExpense | null>(null);
  const [comment, setComment] = useState('');
  const [expenses, setExpenses] = useState(mockPendingExpenses);

  const handleApprove = () => {
    if (!selectedExpense) return;
    setExpenses(expenses.filter((e) => e.id !== selectedExpense.id));
    setSelectedExpense(null);
    setComment('');
  };

  const handleReject = () => {
    if (!selectedExpense || !comment.trim()) {
      alert('Please provide a comment when rejecting an expense');
      return;
    }
    setExpenses(expenses.filter((e) => e.id !== selectedExpense.id));
    setSelectedExpense(null);
    setComment('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-3xl mb-1">Approval Dashboard</h1>
          <p className="text-muted-foreground">
            Review and approve expense submissions from your team
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
              <div className="p-2 bg-pending/20 rounded-lg">
                <Calendar className="w-5 h-5 text-pending-foreground" />
              </div>
            </div>
            <p className="text-3xl">{expenses.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl">
              ${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Unique Employees</p>
              <div className="p-2 bg-success/20 rounded-lg">
                <User className="w-5 h-5 text-success-foreground" />
              </div>
            </div>
            <p className="text-3xl">{new Set(expenses.map((e) => e.employeeEmail)).size}</p>
          </motion.div>
        </div>

        {/* Approval Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-4">
            {expenses.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-success" />
                <p className="text-lg mb-2">All caught up!</p>
                <p className="text-sm text-muted-foreground">
                  No pending expense approvals at this time
                </p>
              </div>
            ) : (
              expenses.map((expense, index) => (
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
                  {/* Employee Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      {expense.employeeName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{expense.employeeName}</p>
                      <p className="text-sm text-muted-foreground">{expense.employeeEmail}</p>
                    </div>
                  </div>

                  {/* Expense Details */}
                  <div className="mb-4">
                    <h3 className="font-medium mb-1">{expense.description}</h3>
                    <p className="text-sm text-muted-foreground">{expense.merchant}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">{expense.category}</span> •{' '}
                        {expense.project}
                      </p>
                      <p className="text-muted-foreground">Submitted {expense.submittedDate}</p>
                    </div>
                    <p className="text-2xl">${expense.amount.toFixed(2)}</p>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExpense(expense);
                        handleApprove();
                      }}
                      className="flex-1 py-2 px-4 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExpense(expense);
                      }}
                      className="flex-1 py-2 px-4 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </motion.div>
              ))
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
                <h2 className="text-xl mb-6">Review Expense</h2>

                <div className="space-y-4">
                  {/* Employee */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Employee</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        {selectedExpense.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{selectedExpense.employeeName}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedExpense.employeeEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-1">Amount</p>
                    <p className="text-2xl">${selectedExpense.amount.toFixed(2)}</p>
                  </div>

                  <div>
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

                  <div className="border-t border-border pt-4">
                    <button className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-all flex items-center justify-center gap-2 mb-4">
                      <FileText className="w-4 h-4" />
                      View Receipt
                    </button>
                  </div>

                  {/* Comment Section */}
                  <div className="border-t border-border pt-4">
                    <label htmlFor="comment" className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Add Comment (required for rejection)
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none mb-4"
                      placeholder="Add notes or feedback for the employee..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={handleApprove}
                      className="w-full py-3 px-4 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Approve Expense</span>
                    </button>
                    <button
                      onClick={handleReject}
                      className="w-full py-3 px-4 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Reject Expense</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-12 text-center sticky top-8">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg mb-2">Select an expense</p>
                <p className="text-sm text-muted-foreground">
                  Click on an expense to review details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
