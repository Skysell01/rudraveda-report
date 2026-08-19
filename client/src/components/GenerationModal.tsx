import { AlertCircle, CheckCircle2, Cpu, FileCheck, Loader2, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { pollJobProgress } from '../api/client';
import { JobProgressResponse } from '../types';

interface GenerationModalProps {
  jobId: string | null;
  onClose: () => void;
  onComplete: (jobId: string, fileName: string) => void;
}

export const GenerationModal: React.FC<GenerationModalProps> = ({ jobId, onClose, onComplete }) => {
  const [progress, setProgress] = useState<JobProgressResponse | null>(null);

  useEffect(() => {
    if (!jobId) return;

    let intervalId: any = null;

    const check = async () => {
      try {
        const data = await pollJobProgress(jobId);
        setProgress(data);

        if (data.status === 'COMPLETED') {
          clearInterval(intervalId);
          setTimeout(() => {
            onComplete(jobId, data.pdfFileName || 'report.pdf');
          }, 800);
        } else if (data.status === 'FAILED') {
          clearInterval(intervalId);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    check();
    intervalId = setInterval(check, 1000);

    return () => clearInterval(intervalId);
  }, [jobId, onComplete]);

  if (!jobId || !progress) return null;

  const steps = [
    { key: 'FETCHING_ASTROLOGY_DATA', label: 'Prokerala Astrology Engine', desc: 'Fetching planetary coordinates & dasha timelines' },
    { key: 'INTERPRETING_WITH_AI', label: 'Anthropic Claude AI Interpreter', desc: 'Synthesizing Vedic predictions & remedies' },
    { key: 'COMPILING_PDF_LAYOUT', label: 'HTML/CSS Layout Compiler', desc: 'Formatting cosmic design & Kundali chart SVG' },
    { key: 'VALIDATING_PDF', label: 'Puppeteer PDF & Validation', desc: 'Rendering PDF buffer & verifying binary integrity' }
  ];

  const getStepState = (stepKey: string) => {
    const statusOrder = ['INITIALIZING', 'FETCHING_ASTROLOGY_DATA', 'INTERPRETING_WITH_AI', 'COMPILING_PDF_LAYOUT', 'VALIDATING_PDF', 'COMPLETED'];
    const currentIndex = statusOrder.indexOf(progress.status);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (progress.status === 'FAILED') return 'error';
    if (currentIndex > stepIndex || progress.status === 'COMPLETED') return 'completed';
    if (currentIndex === stepIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-900/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card rounded-3xl p-8 max-w-lg w-full border-gold-500/40 shadow-2xl relative overflow-hidden">
        
        {/* Glowing Background Accent */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-gold-600/20 to-amber-500/20 border border-gold-500/30 text-gold-400 mb-3 shadow-glow-gold">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">Generating Astrology PDF</h3>
          <p className="text-xs text-slate-400 mt-1">
            Customer: <span className="text-gold-300 font-semibold">{progress.customerName}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">{progress.currentStepMessage}</span>
            <span className="text-gold-400">{progress.progressPercent}%</span>
          </div>
          <div className="h-3 w-full bg-cosmic-900 rounded-full overflow-hidden border border-cosmic-700 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-gold-600 via-amber-400 to-gold-300 rounded-full transition-all duration-500 shadow-glow-gold"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Multi-stage Steps Indicator */}
        <div className="space-y-3 mb-6">
          {steps.map((st, idx) => {
            const state = getStepState(st.key);
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all ${
                  state === 'active'
                    ? 'bg-gold-500/10 border-gold-500/40 text-white shadow-glow-gold'
                    : state === 'completed'
                    ? 'bg-cosmic-900/50 border-emerald-500/30 text-slate-300'
                    : 'bg-cosmic-900/20 border-cosmic-700/40 text-slate-500'
                }`}
              >
                <div className="shrink-0">
                  {state === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : state === 'active' ? (
                    <Loader2 className="w-5 h-5 text-gold-400 animate-spin" />
                  ) : state === 'error' ? (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <Cpu className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">{st.label}</div>
                  <div className="text-[11px] text-slate-400 truncate">{st.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Failed Error Message */}
        {progress.status === 'FAILED' && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Generation Error
            </div>
            <div>{progress.error || 'An unexpected error occurred during PDF compilation.'}</div>
          </div>
        )}

        {/* Action Button */}
        {progress.status === 'FAILED' && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-cosmic-700 hover:bg-cosmic-600 text-white text-xs font-bold transition-colors"
          >
            Close & Retry
          </button>
        )}
      </div>
    </div>
  );
};
