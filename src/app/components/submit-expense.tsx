import { useRef, useState } from 'react';
import { Upload, X, Camera, Loader, CheckCircle } from 'lucide-react';

export function SubmitExpense() {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    project: '',
    notes: '',
  });
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>('');
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Travel',
    'Meals & Entertainment',
    'Office Supplies',
    'Software & Subscriptions',
    'Training & Education',
    'Client Meetings',
    'Other',
  ];

  const projects = [
    'Project Alpha',
    'Project Beta',
    'Project Gamma',
    'Internal',
    'Client: Acme Corp',
    'Client: TechStart Inc',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
        // Simulate OCR processing
        setOcrProcessing(true);
        setTimeout(() => {
          setFormData({
            ...formData,
            amount: '124.50',
            date: '2026-04-14',
            category: 'Meals & Entertainment',
          });
          setOcrProcessing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      // Reset form
      setFormData({
        amount: '',
        category: '',
        date: '',
        project: '',
        notes: '',
      });
      setReceipt(null);
      setReceiptPreview('');
    }, 2000);
  };

  const handleRemoveReceipt = () => {
    setReceipt(null);
    setReceiptPreview('');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-success" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Expense Submitted!</h2>
          <p className="text-muted-foreground mb-8">Your expense has been sent for approval</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Submit Expense</h1>
        <p className="text-muted-foreground">Upload your receipt and fill in the details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Receipt Upload */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Receipt</h3>

          {!receiptPreview ? (
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer group">
              <Upload size={48} className="mx-auto text-muted-foreground group-hover:text-primary transition-colors mb-4" />
              <p className="text-foreground font-medium mb-2">
                Drop your receipt here, or <span className="text-primary">browse</span>
              </p>
              <p className="text-sm text-muted-foreground mb-4">Supports JPG, PNG, PDF up to 10MB</p>
              <div className="flex items-center justify-center gap-4">
                <label
                  htmlFor="receipt-upload"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity inline-block cursor-pointer"
                >
                  Upload File
                </label>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-secondary transition-colors flex items-center gap-2"
                >
                  <Camera size={18} />
                  Take Photo
                </button>
              </div>
              <input
                id="receipt-upload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border border-border">
                <img src={receiptPreview} alt="Receipt" className="w-full max-h-96 object-contain bg-muted" />
                <button
                  type="button"
                  onClick={handleRemoveReceipt}
                  className="absolute top-3 right-3 p-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <X size={18} />
                </button>
              </div>
              {ocrProcessing && (
                <div className="mt-4 flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                  <Loader size={20} className="animate-spin text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Processing Receipt...</p>
                    <p className="text-sm text-muted-foreground">Extracting information with OCR</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Expense Details */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Expense Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="amount" className="block text-sm mb-2 text-foreground">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm mb-2 text-foreground">
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm mb-2 text-foreground">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="project" className="block text-sm mb-2 text-foreground">
                Project/Client *
              </label>
              <select
                id="project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              >
                <option value="">Select project</option>
                {projects.map((proj) => (
                  <option key={proj} value={proj}>
                    {proj}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm mb-2 text-foreground">
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              placeholder="Add any additional details about this expense..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-secondary transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            Submit for Approval
          </button>
        </div>
      </form>
    </div>
  );
}
