import { CheckCircle2, Download, FileText, RefreshCw, X } from 'lucide-react';
import React from 'react';
import { getDownloadUrl, getPreviewUrl, deleteReport } from '../api/client';

interface PDFPreviewModalProps {
  jobId: string | null;
  fileName: string;
  onClose: () => void;
  onResetForm: () => void;
}

export const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({ jobId, fileName, onClose, onResetForm }) => {
  if (!jobId) return null;

  const downloadUrl = getDownloadUrl(jobId);
  const previewUrl = getPreviewUrl(jobId);

  const handleDownload = () => {
    // Schedule clean up after download initiation
    setTimeout(() => {
      deleteReport(jobId).catch(() => {});
    }, 5000);
  };

  const handleCloseAndClean = () => {
    deleteReport(jobId).catch(() => {});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-900/90 backdrop-blur-lg animate-fadeIn">
      <div className="glass-card rounded-3xl w-full max-w-5xl h-[90vh] border-gold-500/40 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-cosmic-700 bg-cosmic-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">Astrology PDF Report Validated</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  100% VALIDATED
                </span>
              </div>
              <p className="text-xs text-slate-400">{fileName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={downloadUrl}
              download={fileName}
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-amber-500 hover:from-gold-500 hover:to-amber-400 text-cosmic-900 text-xs font-black tracking-wider uppercase flex items-center gap-2 shadow-glow-gold transition-all"
            >
              <Download className="w-4 h-4" />
              Download PDF Report
            </a>

            <button
              onClick={() => {
                handleCloseAndClean();
                onResetForm();
              }}
              className="px-4 py-2.5 rounded-xl bg-cosmic-700 hover:bg-cosmic-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-cosmic-600"
            >
              <RefreshCw className="w-4 h-4" />
              New Report
            </button>

            <button
              onClick={handleCloseAndClean}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-cosmic-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Embedded Iframe Preview */}
        <div className="flex-1 bg-cosmic-950 p-4">
          <iframe
            src={`${previewUrl}#toolbar=0`}
            title="PDF Embedded Preview"
            className="w-full h-full rounded-xl border border-cosmic-800 shadow-inner bg-white"
          />
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 border-t border-cosmic-800 bg-cosmic-900 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-gold-400" />
            Zero-Database State: PDF buffer automatically purges from RAM after download or 15 minutes TTL.
          </span>
          <span className="text-slate-500">Rudraveda Dashboard</span>
        </div>
      </div>
    </div>
  );
};
