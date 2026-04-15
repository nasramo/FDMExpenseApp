import { useRef, useState } from 'react';
import { Upload, X, Camera, Loader, CheckCircle } from 'lucide-react';
import { supabase } from '../../supabaseClient';

interface SubmitExpenseProps {
  user: {
    id: string;
    username: string;
    role: 'employee' | 'manager' | 'admin';
  };
}

export function SubmitExpense({ user }: SubmitExpenseProps) {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // --- OCR Samples (Added as requested) ---
  const ocrSamples = [
    { vendor: 'Trainline', amount: '94.50', currency: 'GBP', date: '2026-04-12', category: 'Travel' },
    { vendor: 'Premier Inn', amount: '185.00', currency: 'GBP', date: '2026-04-10', category: 'Training & Education' },
  ];

  const [formData, setFormData] = useState({
    amount: '',
    currency: 'GBP', 
    category: '',
    date: '',
    project: '',
    notes: '',
  });

  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>('');
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedFrom, setExtractedFrom] = useState(''); // Tracking vendor for display

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

  const currencies = ['GBP', 'USD', 'EUR', 'CAD'];

  // --- OCR Logic Function ---
  const runSimulatedOCR = () => {
    setOcrProcessing(true);
    setExtractedFrom('');

    setTimeout(() => {
      const sample = ocrSamples[Math.floor(Math.random() * ocrSamples.length)];
      
      setFormData({
        ...formData,
        amount: sample.amount,
        currency: sample.currency,
        date: sample.date,
        category: sample.category,
        notes: `Extracted from ${sample.vendor} receipt.`,
      });
      
      setExtractedFrom(sample.vendor);
      setOcrProcessing(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
        runSimulatedOCR(); // Trigger OCR on file selection
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDemo = () => {
    setReceiptPreview('https://images.unsplash.com/photo-1534531173927-aeb928d54385?auto=format&fit=crop&q=80&w=600');
    runSimulatedOCR();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        amount: '',
        currency: 'GBP',
        category: '',
        date: '',
        project: '',
        notes: '',
      });
      setReceipt(null);
      setReceiptPreview('');
      setExtractedFrom('');
    }, 2000);

    try {
      let receiptUrl = null;

      // Upload receipt file to Supabase storage if it exists
      if (receipt) {
        const fileName = `receipts/${Date.now()}_${receipt.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from('expenses')
          .upload(fileName, receipt);

        if (uploadError) {
          throw new Error(`File upload failed: ${uploadError.message}`);
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('expenses')
          .getPublicUrl(fileName);
        receiptUrl = publicUrlData.publicUrl;
      }

      // Save expense to database
      const { data, error: insertError } = await supabase
        .from('expenses')
        .insert([
          {
            amount: parseFloat(formData.amount),
            category: formData.category,
            date: formData.date,
            project: formData.project,
            notes: formData.notes,
            receipt_url: receiptUrl,
            status: 'pending',
            user: user.id
          },
        ])
        .select();

      if (insertError) {
        throw new Error(`Failed to save expense: ${insertError.message}`);
      }

      // Show success message
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        // Reset form
          setFormData({
          amount: '',
          currency: '',
          category: '',
          date: '',
          project: '',
          notes: '',
        });

        setReceipt(null);
        setReceiptPreview('');
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Expense submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveReceipt = () => {
    setReceipt(null);
    setReceiptPreview('');
    setExtractedFrom('');
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Submit Expense</h1>
          <p className="text-muted-foreground">Upload your receipt and fill in the details</p>
        </div>
        {/* Demo Button */}
        <button 
          type="button"
          onClick={handleDemo}
          className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg text-sm font-semibold hover:bg-amber-200 transition-colors border border-amber-200"
        >
          <Upload size={16} />
          Try Demo Auto-Fill
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-xl">
          <p className="text-destructive text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Receipt</h3>

          {!receiptPreview ? (
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer group relative">
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
              <input id="receipt-upload" type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden border border-border bg-muted">
                  <img src={receiptPreview} alt="Receipt" className="w-full max-h-96 object-contain" />
                  <button
                    type="button"
                    onClick={handleRemoveReceipt}
                    className="absolute top-3 right-3 p-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              {ocrProcessing && (
                <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                  <Loader size={20} className="animate-spin text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Processing Receipt...</p>
                    <p className="text-sm text-muted-foreground">Extracting information with OCR</p>
                  </div>
                </div>
              )}

              {extractedFrom && !ocrProcessing && (
                <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-xl animate-in fade-in slide-in-from-top-1">
                  <CheckCircle size={20} className="text-success" />
                  <div>
                    <p className="font-medium text-foreground">OCR Complete</p>
                    <p className="text-sm text-muted-foreground">Data extracted from <strong>{extractedFrom}</strong></p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Expense Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm text-foreground">
                Amount & Currency *
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-24 px-3 py-3 rounded-xl border border-border bg-input-background focus:ring-2 focus:ring-primary outline-none transition-all"
                >
                  {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
                </select>
                <div className="relative flex-1">
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
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
                  <option key={cat} value={cat}>{cat}</option>
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
                  <option key={proj} value={proj}>{proj}</option>
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

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            disabled={isLoading}
            className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit for Approval'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}