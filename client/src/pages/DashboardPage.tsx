import React, { useEffect, useState } from 'react';
import { Sparkles, Wand2, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { requestReportGeneration, checkSystemHealth } from '../api/client';
import { CustomerForm } from '../components/CustomerForm';
import { ReportTypeSelector } from '../components/ReportTypeSelector';
import { Sidebar } from '../components/Sidebar';
import { GenerationWorkspace } from '../components/GenerationWorkspace';
import { PDFPreviewModal } from '../components/PDFPreviewModal';
import { 
  CustomerFormData, 
  ReportType, 
  SystemHealth, 
  formDataToCustomerDetails 
} from '../types';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'generate'>('dashboard');
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('janam-kundali');
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);

  // Form State
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    gender: 'male',
    dob: '1996-08-15',
    tob: '09:30',
    birthPlace: 'New Delhi, India',
    country: 'India',
    email: '',
    phone: '',
    location: {
      name: 'New Delhi, India',
      latitude: 28.6139,
      longitude: 77.2090,
      timezone: 'Asia/Kolkata'
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [previewJob, setPreviewJob] = useState<{ jobId: string; fileName: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Poll system health once on mount
  useEffect(() => {
    checkSystemHealth().then(setSystemHealth).catch(() => {});
  }, []);

  // Form Validation Logic
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.tob) newErrors.tob = 'Time of Birth is required';
    if (!formData.birthPlace.trim()) newErrors.birthPlace = 'Birth Place is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = 
    formData.firstName.trim().length > 0 &&
    formData.lastName.trim().length > 0 &&
    formData.dob.length > 0 &&
    formData.tob.length > 0 &&
    formData.birthPlace.trim().length > 0 &&
    formData.country.trim().length > 0 &&
    !!selectedReportType;

  // Handle Form Submit
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validateForm()) return;

    try {
      const primaryCustomer = formDataToCustomerDetails(formData);
      const res = await requestReportGeneration({
        reportType: selectedReportType,
        primaryCustomer
      });

      setActiveJobId(res.jobId);
    } catch (err: any) {
      console.error('Failed to submit report job:', err);
      setErrorMsg(err.response?.data?.error || 'Failed to connect to backend report server');
    }
  };

  const handleResetForm = () => {
    setActiveJobId(null);
    setPreviewJob(null);
    setFormData(prev => ({
      ...prev,
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }));
    setErrors({});
  };

  // Helper title for report type
  const getReportTitle = (type: ReportType): string => {
    const titles: Record<ReportType, string> = {
      'love-report': 'Love Report',
      'wealth-report': 'Wealth Report',
      'career-report': 'Career Report',
      'janam-kundali': 'Kundali Report',
      'transit-horoscope': '5-Year Horoscope',
      'numerology-report': 'Numerology Report',
      'karz-mukti': 'Karz Mukti (Debt Relief)',
      'kundali-career': 'Kundali + Career Report',
      'divorce-remarriage-love-kundali': 'Divorce & Remarriage + Love + Kundali',
      'kundali-love-marriage': 'Kundali + Love + Marriage',
      'kundali-wealth': 'Kundali + Wealth Report',
      'kundali-love': 'Kundali + Love Report',
      'kundali-matching': 'Kundali Matching',
      'dasha-remedies': 'Dasha & Remedies',
      'five-year-horoscope': '5-Year Horoscope',
      'love-consultation': 'Love Consultation'
    };
    return titles[type] || 'Astrology Report';
  };

  const customerFullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Customer';

  return (
    <div className="flex min-h-screen bg-cosmic-900 text-slate-100 font-sans">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'dashboard' && activeJobId) {
            // Keep workspace state intact
          }
        }}
        systemHealth={systemHealth}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-16 overflow-y-auto">
        {/* Header Section */}
        <header className="bg-gradient-to-b from-cosmic-800/90 to-cosmic-900 border-b border-cosmic-700/60 py-7 px-6 lg:px-10 sticky top-0 z-20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[11px] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Internal SaaS Dashboard • Zero-Database Mode
              </div>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Astrology Report Generator
              </h1>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Generate personalized astrology reports in minutes.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-cosmic-950/80 px-4 py-2.5 rounded-2xl border border-cosmic-800 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">PDF Compiler</div>
                <div className="text-xs font-bold text-gold-300">Puppeteer Headless Ready</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-10 mt-8">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs font-medium flex items-center justify-between">
              <span>⚠️ {errorMsg}</span>
              <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white font-bold ml-4">
                ✕
              </button>
            </div>
          )}

          {/* Active Job Workspace View */}
          {activeJobId ? (
            <GenerationWorkspace
              jobId={activeJobId}
              reportTypeTitle={getReportTitle(selectedReportType)}
              customerName={customerFullName}
              onPreview={(jobId, fileName) => setPreviewJob({ jobId, fileName })}
              onReset={handleResetForm}
            />
          ) : (
            /* Report Generation Form View */
            <form onSubmit={handleGenerate} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Form Fields (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <CustomerForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                  />
                </div>

                {/* Right Column: Report Type Selector & Submit Action (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <ReportTypeSelector
                    selectedType={selectedReportType}
                    onSelect={setSelectedReportType}
                  />

                  {/* Submit Action Box */}
                  <div className="glass-card rounded-2xl p-6 border-gold-500/40 space-y-4">
                    <div className="text-xs text-slate-300 flex items-center justify-between">
                      <span>Engine:</span>
                      <span className="font-bold text-gold-300">Prokerala + Anthropic Claude</span>
                    </div>
                    <div className="text-xs text-slate-300 flex items-center justify-between">
                      <span>Retention:</span>
                      <span className="font-bold text-emerald-400">Pure Ephemeral RAM (Zero Persistence)</span>
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full py-4 px-6 rounded-2xl font-serif text-sm font-black tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 ${
                        isFormValid
                          ? 'bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 hover:from-gold-500 hover:to-amber-200 text-cosmic-950 shadow-glow-gold transform hover:-translate-y-0.5 cursor-pointer'
                          : 'bg-cosmic-800 text-slate-500 border border-cosmic-700 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <Wand2 className="w-5 h-5" />
                      Generate Report
                    </button>

                    {!isFormValid && (
                      <p className="text-[11px] text-amber-400/90 text-center">
                        ⚠️ Please fill in all required customer details (* marked) to enable report generation.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Embedded PDF Preview Modal */}
        {previewJob && (
          <PDFPreviewModal
            jobId={previewJob.jobId}
            fileName={previewJob.fileName}
            onClose={() => setPreviewJob(null)}
            onResetForm={handleResetForm}
          />
        )}
      </main>
    </div>
  );
};
