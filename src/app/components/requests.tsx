import { useEffect, useState } from 'react';
import { Search, Filter, Eye, MessageSquare, Calendar, DollarSign } from 'lucide-react';
import { useSearchParams } from 'react-router';

export function Requests() {
  const [searchParams] = useSearchParams();
  const statusFromQuery = searchParams.get('status') ?? 'all';
  const normalizedStatus = ['Pending', 'Approved', 'Rejected', 'all'].includes(statusFromQuery)
    ? statusFromQuery
    : 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(normalizedStatus);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);

  const requests = [
    {
      id: 1,
      title: 'Client Lunch - Acme Corp',
      amount: 124.50,
      category: 'Meals & Entertainment',
      project: 'Client: Acme Corp',
      date: '2026-04-12',
      submittedDate: '2026-04-12',
      status: 'Approved',
      receipt: 'https://images.unsplash.com/photo-1554224311-beee4f7e4fc7?w=400',
      notes: 'Business lunch with client to discuss Q2 strategy',
      timeline: [
        { action: 'Submitted', date: '2026-04-12 09:30 AM', user: 'You' },
        { action: 'Approved', date: '2026-04-12 02:15 PM', user: 'Sarah Johnson' },
      ],
    },
    {
      id: 2,
      title: 'Travel - London Office',
      amount: 850.00,
      category: 'Travel',
      project: 'Internal',
      date: '2026-04-10',
      submittedDate: '2026-04-13',
      status: 'Pending',
      receipt: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
      notes: 'Flight tickets for London office visit',
      timeline: [
        { action: 'Submitted', date: '2026-04-13 11:00 AM', user: 'You' },
      ],
    },
    {
      id: 3,
      title: 'Office Supplies',
      amount: 42.99,
      category: 'Office Supplies',
      project: 'Internal',
      date: '2026-04-11',
      submittedDate: '2026-04-11',
      status: 'Approved',
      receipt: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400',
      notes: 'Notebooks and pens for team',
      timeline: [
        { action: 'Submitted', date: '2026-04-11 03:45 PM', user: 'You' },
        { action: 'Approved', date: '2026-04-11 04:30 PM', user: 'Sarah Johnson' },
      ],
    },
    {
      id: 4,
      title: 'Team Dinner',
      amount: 280.00,
      category: 'Meals & Entertainment',
      project: 'Internal',
      date: '2026-04-08',
      submittedDate: '2026-04-09',
      status: 'Rejected',
      receipt: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      notes: 'Team celebration dinner',
      timeline: [
        { action: 'Submitted', date: '2026-04-09 10:00 AM', user: 'You' },
        { action: 'Rejected', date: '2026-04-09 05:20 PM', user: 'Sarah Johnson' },
      ],
      rejectionReason: 'Team dinners require pre-approval. Please submit a request before the event.',
    },
    {
      id: 5,
      title: 'Software Subscription',
      amount: 99.00,
      category: 'Software & Subscriptions',
      project: 'Project Alpha',
      date: '2026-04-05',
      submittedDate: '2026-04-05',
      status: 'Approved',
      receipt: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      notes: 'Annual Figma subscription',
      timeline: [
        { action: 'Submitted', date: '2026-04-05 09:15 AM', user: 'You' },
        { action: 'Approved', date: '2026-04-05 02:45 PM', user: 'Sarah Johnson' },
      ],
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

  useEffect(() => {
    setStatusFilter(normalizedStatus);
  }, [normalizedStatus]);

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selected = selectedRequest ? requests.find((r) => r.id === selectedRequest) : null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Requests</h1>
        <p className="text-muted-foreground">View and manage all your expense submissions</p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
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
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground text-sm line-clamp-1">
                  {request.title}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <p className="text-lg font-bold text-foreground mb-2">${request.amount.toFixed(2)}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={12} />
                <span>{new Date(request.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No requests found</p>
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
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{selected.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(selected.date).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{selected.category}</span>
                      <span>•</span>
                      <span>{selected.project}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">${selected.amount.toFixed(2)}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selected.status)}`}>
                      {selected.status}
                    </span>
                  </div>
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

              {/* Rejection Reason */}
              {selected.status === 'Rejected' && selected.rejectionReason && (
                <div className="p-6 border-b border-border bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <MessageSquare size={18} className="text-destructive mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-1">Rejection Reason</h3>
                      <p className="text-sm text-muted-foreground">{selected.rejectionReason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="p-6">
                <h3 className="text-sm font-medium text-foreground mb-4">Timeline</h3>
                <div className="space-y-4">
                  {selected.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            event.action === 'Approved'
                              ? 'bg-success'
                              : event.action === 'Rejected'
                              ? 'bg-destructive'
                              : 'bg-primary'
                          }`}
                        ></div>
                        {index < selected.timeline.length - 1 && (
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium text-foreground text-sm">{event.action}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                        <p className="text-xs text-muted-foreground">by {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {selected.status === 'Rejected' && (
                <div className="p-6 bg-muted/30 border-t border-border">
                  <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
                    Appeal Decision
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <Eye size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Select a request to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
