import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Camera, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

const categories = [
  'Travel',
  'Accommodation',
  'Meals & Entertainment',
  'Office Supplies',
  'Software & Subscriptions',
  'Client Expenses',
  'Other',
];

const projects = [
  'Tech Solutions Inc.',
  'Retail Platform Upgrade',
  'Banking System Migration',
  'Healthcare App Development',
  'Internal Operations',
];

export function SubmitExpense() {
  const navigate = useNavigate();
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    project: '',
    description: '',
    merchant: '',
  });
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File | null) => {
    if (!file) return;

    setReceiptUploaded(true);
    setIsProcessingOCR(true);

    setTimeout(() => {
      setIsProcessingOCR(false);
      setFormData({
        amount: '156.50',
        category: 'Meals & Entertainment',
        date: '2026-04-12',
        project: 'Tech Solutions Inc.',
        description: 'Client dinner at The Capital Grille',
        merchant: 'The Capital Grille',
      });
    }, 2000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/requests');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-3xl mb-1">Submit Expense</h1>
          <p className="text-muted-foreground">Upload a receipt or manually enter expense details</p>
        </div>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Receipt Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl mb-4">Receipt Upload</h2>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              {isProcessingOCR ? (
                <div className="py-8">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
                  <p className="text-lg mb-2">Processing Receipt...</p>
                  <p className="text-sm text-muted-foreground">
                    Extracting information using OCR technology
                  </p>
                </div>
              ) : receiptUploaded ? (
                <div className="py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-success" />
                  <p className="text-lg mb-2">Receipt Processed Successfully</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please review and edit the extracted information below
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setReceiptUploaded(false);
                      setFormData({
                        amount: '',
                        category: '',
                        date: '',
                        project: '',
                        description: '',
                        merchant: '',
                      });
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Upload different receipt
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-2">Drop your receipt here or click to upload</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports PNG, JPG, PDF up to 10MB
                  </p>
                  <div className="flex gap-3 justify-center">
                    <label className="px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-all inline-flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleFileUpload(new File([], 'camera.jpg'))}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-all inline-flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Photo</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {receiptUploaded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning-foreground mb-1">
                    Review Extracted Data
                  </p>
                  <p className="text-muted-foreground">
                    OCR technology may not be 100% accurate. Please verify all fields before submitting.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Expense Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl mb-6">Expense Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amount */}
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm text-foreground/80">
                  Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-7 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm text-foreground/80">
                  Date *
                </label>
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm text-foreground/80">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
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

              {/* Project/Client */}
              <div className="space-y-2">
                <label htmlFor="project" className="text-sm text-foreground/80">
                  Project/Client *
                </label>
                <select
                  id="project"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
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

              {/* Merchant */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="merchant" className="text-sm text-foreground/80">
                  Merchant/Vendor
                </label>
                <input
                  id="merchant"
                  type="text"
                  value={formData.merchant}
                  onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="e.g., The Capital Grille"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="description" className="text-sm text-foreground/80">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                  placeholder="Describe the business purpose of this expense..."
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all"
            >
              Submit Expense
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-8 bg-secondary text-secondary-foreground py-3 rounded-lg hover:bg-accent transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
