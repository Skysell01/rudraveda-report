import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  FileText, 
  Download, 
  Eye, 
  RefreshCw, 
  AlertCircle, 
  ShieldCheck
} from 'lucide-react';
import { pollJobProgress, getDownloadUrl } from '../api/client';
import { JobProgressResponse } from '../types';

interface GenerationWorkspaceProps {
  jobId: string;
  reportTypeTitle: string;
  customerName: string;
  onPreview: (jobId: string, fileName: string) => void;
  onReset: () => void;
}

const WORKSPACE_STEPS = [
  { statusKey: 'VALIDATING_INPUT', step: 1, title: 'Validating Input', desc: 'Verifying customer birth parameters & coordinates' },
  { statusKey: 'FETCHING_ASTROLOGY', step: 2, title: 'Fetching Astrology', desc: 'Requesting planetary positions & dasha timelines from Prokerala' },
  { statusKey: 'ASTROLOGY_COMPLETE', step: 3, title: 'Astrology Complete', desc: 'Normalizing Lagna, Nakshatras & house dignities' },
  { statusKey: 'CLAUDE_ANALYSIS', step: 4, title: 'Claude AI Analysis', desc: 'Synthesizing deep Vedic predictions & remedies via Claude 3.5 Sonnet' },
  { statusKey: 'CONTENT_GENERATED', step: 5, title: 'Content Generated', desc: 'Structuring 25-section report blueprint' },
  { statusKey: 'GENERATING_PDF', step: 6, title: 'Generating PDF', desc: 'Rendering multi-page HTML/CSS cosmic layout & Lagna SVG chart' },
  { statusKey: 'VALIDATING_PDF', step: 7, title: 'Validating PDF', desc: 'Checking PDF binary signature & 25-50 page count density' },
  { statusKey: 'REFINING_REPORT', step: 8, title: 'Refining Report', desc: 'Running section expansion/compression refinement loop' },
  { statusKey: 'COMPLETED', step: 9, title: 'Completed', desc: 'PDF report validated and ready for preview & download' }
];

export const GenerationWorkspace: React.FC<GenerationWorkspaceProps> = ({
  jobId,
  reportTypeTitle,
  customerName,
  onPreview,
  onReset
}) => {
  const [progress, setProgress] = useState<JobProgressResponse | null>(null);

  useEffect(() => {
    if (!jobId) return;

    let intervalId: any = null;

    const poll = async () => {
      try {
        const data = await pollJobProgress(jobId);
        setProgress(data);

        // Stop polling on COMPLETED or FAILED
        if (data.status === 'COMPLETED' || data.status === 'FAILED') {
          if (intervalId) clearInterval(intervalId);
        }
      } catch (err) {
        console.error('Failed to poll job status:', err);
      }
    };

    poll();
    // Poll every 2 seconds per requirement
    intervalId = setInterval(poll, 2000);
    return () => clearInterval(intervalId);
  }, [jobId]);

  const isCompleted = progress?.status === 'COMPLETED';
  const isFailed = progress?.status === 'FAILED';
  const currentPct = isCompleted ? 100 : progress?.progress || progress?.progressPercent || 10;
  const currentMsg = progress?.message || progress?.currentStepMessage || 'Processing workflow...';
  const pdfFileName = progress?.pdfFileName || `${customerName.toLowerCase().replace(/\s+/g, '_')}_report.pdf`;
  const downloadUrl = getDownloadUrl(jobId);

  return (
    <div className="glass-card rounded-3xl p-8 border-gold-500/40 shadow-2xl relative overflow-hidden space-y-8 animate-fadeIn">
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cosmic-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Live Report Progress • Job ID: {jobId.slice(0, 8)}
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-white">
            {isCompleted ? (
              <span className="text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-8 h-8" /> Report Ready ({progress?.pageCount || 25} Pages)
              </span>
            ) : isFailed ? (
              <span className="text-red-400 flex items-center gap-2">
                <AlertCircle className="w-8 h-8" /> Generation Interrupted
              </span>
            ) : (
              <span>Generating {reportTypeTitle}</span>
            )}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Customer: <span className="text-gold-300 font-semibold">{customerName}</span>
          </p>
        </div>

        {/* Global Progress % Badge */}
        {!isCompleted && !isFailed && (
          <div className="bg-cosmic-900/90 p-4 rounded-2xl border border-cosmic-700 text-right shrink-0">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall Progress</div>
            <div className="font-serif text-2xl font-black text-gold-400">
              {currentPct}%
            </div>
          </div>
        )}
      </div>

      {/* Main Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-slate-300">{currentMsg}</span>
          <span className="text-gold-400">{currentPct}%</span>
        </div>
        <div className="h-3 w-full bg-cosmic-950 rounded-full overflow-hidden border border-cosmic-700 p-0.5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 shadow-glow-gold ${
              isCompleted
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : isFailed
                ? 'bg-red-500'
                : 'bg-gradient-to-r from-gold-600 via-amber-400 to-gold-300'
            }`}
            style={{ width: `${currentPct}%` }}
          />
        </div>
      </div>

      {/* Workflow Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {WORKSPACE_STEPS.map(st => {
          const isCurrentStatus = progress?.status === st.statusKey;
          const isPastStatus = isCompleted || (currentPct >= 90 && st.step < 7);

          return (
            <div
              key={st.step}
              className={`p-3 rounded-xl border transition-all duration-300 flex items-start gap-2.5 ${
                isPastStatus
                  ? 'bg-cosmic-900/80 border-emerald-500/30 text-slate-200'
                  : isCurrentStatus
                  ? 'bg-gold-500/10 border-gold-500/50 text-white shadow-glow-gold scale-[1.01]'
                  : 'bg-cosmic-950/40 border-cosmic-800/80 text-slate-500'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isPastStatus ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrentStatus ? (
                  <Loader2 className="w-4 h-4 text-gold-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500">
                    {st.step}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-xs font-bold ${isPastStatus ? 'text-slate-200' : isCurrentStatus ? 'text-gold-300' : 'text-slate-500'}`}>
                  {st.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{st.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Error state alert */}
      {isFailed && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <AlertCircle className="w-4 h-4" /> Pipeline Error
          </div>
          <p>{progress?.error || 'An unexpected error occurred during report synthesis.'}</p>
        </div>
      )}

      {/* Completed State: Report Details & Action Buttons */}
      {isCompleted && (
        <div className="bg-cosmic-950/80 rounded-2xl p-6 border border-emerald-500/30 space-y-6 animate-fadeIn">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-cosmic-800 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Report Type</span>
              <span className="font-bold text-gold-300">{reportTypeTitle}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer Name</span>
              <span className="font-bold text-white">{customerName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Page Count</span>
              <span className="font-bold text-emerald-400">{progress?.pageCount || 25} Pages Verified</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Validation Status</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Validated
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Preview PDF */}
            <button
              onClick={() => onPreview(jobId, pdfFileName)}
              className="flex-1 min-w-[140px] py-3 px-5 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-white text-xs font-bold flex items-center justify-center gap-2 border border-cosmic-700 transition-all shadow-md"
            >
              <Eye className="w-4 h-4 text-gold-400" />
              Preview PDF Report
            </button>

            {/* Download PDF */}
            <a
              href={downloadUrl}
              download={pdfFileName}
              className="flex-1 min-w-[160px] py-3 px-5 rounded-xl bg-gradient-to-r from-gold-600 via-amber-500 to-gold-400 hover:from-gold-500 hover:to-amber-300 text-cosmic-950 font-serif text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-glow-gold transition-all"
            >
              <Download className="w-4 h-4" />
              Download PDF Report
            </a>

            {/* Generate Another Report */}
            <button
              onClick={onReset}
              className="py-3 px-5 rounded-xl bg-cosmic-900 hover:bg-cosmic-800 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-cosmic-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Generate Another Report
            </button>
          </div>
        </div>
      )}

      {/* Error Reset Button */}
      {isFailed && (
        <button
          onClick={onReset}
          className="w-full py-3.5 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Back to Form & Retry
        </button>
      )}
    </div>
  );
};
