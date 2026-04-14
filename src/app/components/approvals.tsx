import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, User } from 'lucide-react';

export function Approvals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      employee: 'John Smith',
      title: 'Client Dinner - TechStart Inc',
      amount: 185.50,
      category: 'Meals & Entertainment',
      project: 'Client: TechStart Inc',
      date: '2026-04-13',
      submittedDate: '2026-04-13 02:30 PM',
      receipt: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      notes: 'Client meeting to discuss partnership opportunities',
      status: 'pending',
    },
    {
      id: 2,
      employee: 'Emma Wilson',
      title: 'Conference Registration',
      amount: 450.00,
      category: 'Training & Education',
      project: 'Internal',
      date: '2026-04-12',
      submittedDate: '2026-04-12 11:15 AM',
      receipt: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      notes: 'Tech Summit 2026 registration fee',
      status: 'pending',
    },
    {
      id: 3,
      employee: 'Michael Chen',
      title: 'Travel - Client Site Visit',
      amount: 320.00,
      category: 'Travel',
      project: 'Project Beta',
      date: '2026-04-11',
      submittedDate: '2026-04-11 04:00 PM',
      receipt: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400',
      notes: 'Round trip flight for client site assessment',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: number) => {
    setPendingRequests(pendingRequests.filter((req) => req.id !== id));
    setSelectedRequest(null);
    setComment('');
    setShowCommentBox(false);
  };

  const handleReject = (id: number) => {
    if (!comment.trim()) {
      setShowCommentBox(true);
      return;
    }
    setPendingRequests(pendingRequests.filter((req) => req.id !== id));
    setSelectedRequest(null);
    setComment('');
    setShowCommentBox(false);
  };

  const filteredRequests = pendingRequests.filter((req) =>
    req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.employee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = selectedRequest ? pendingRequests.find((r) => r.id === selectedRequest) : null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Approvals</h1>
        <p className="text-muted-foreground">Review and approve team expense requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingRequests.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
              <CheckCircle size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">42</p>
              <p className="text-sm text-muted-foreground">Approved This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <User size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Team Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search by employee or expense..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              onClick={() => setSelectedRequest(request.id)}
              className={`bg-card border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedRequest === request.id
                  ? 'border-primary shadow-md'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyan-600 rounded-full flex items-center justify-center text-white font-medium">
                  {request.employee.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{request.employee}</p>
                  <p className="text-xs text-muted-foreground truncate">{request.title}</p>
                </div>
              </div>
              <p className="text-lg font-bold text-foreground mb-2">${request.amount.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{request.submittedDate}</p>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle size={48} className="mx-auto text-success mb-3" />
              <p className="text-foreground font-medium">All caught up!</p>
              <p className="text-sm text-muted-foreground mt-1">No pending approvals</p>
            </div>
          )}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selected.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selected.employee}</h2>
                      <p className="text-sm text-muted-foreground">{selected.submittedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">${selected.amount.toFixed(2)}</p>
                  </div>
                </div>
                <h3 className="text-lg text-foreground mb-2">{selected.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{selected.category}</span>
                  <span>•</span>
                  <span>{selected.project}</span>
                  <span>•</span>
                  <span>{new Date(selected.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Receipt */}
              <div className="p-6 border-b border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">Receipt</h3>
                <img
                  src={selected.receipt}
                  alt="Receipt"
                  className="w-full rounded-xl border border-border max-h-96 object-cover"
                />
              </div>

              {/* Notes */}
              <div className="p-6 border-b border-border">
                <h3 className="text-sm font-medium text-foreground mb-2">Notes</h3>
                <p className="text-muted-foreground">{selected.notes}</p>
              </div>

              {/* Comment Box */}
              {showCommentBox && (
                <div className="p-6 border-b border-border bg-warning/5">
                  <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-2">
                    Rejection Comment (Required)
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Please provide a reason for rejection..."
                  />
                </div>
              )}

              {/* Actions */}
              <div className="p-6 bg-muted/30 border-t border-border">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReject(selected.id)}
                    className="flex-1 py-3 px-4 border border-destructive text-destructive rounded-xl font-medium hover:bg-destructive hover:text-destructive-foreground transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selected.id)}
                    className="flex-1 py-3 px-4 bg-success text-success-foreground rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <Eye size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Select a request to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
