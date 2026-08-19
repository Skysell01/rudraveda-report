import React from 'react';
import { LayoutDashboard, FileText, Sparkles, Server, ShieldCheck } from 'lucide-react';
import { SystemHealth } from '../types';

interface SidebarProps {
  activeTab: 'dashboard' | 'generate';
  setActiveTab: (tab: 'dashboard' | 'generate') => void;
  systemHealth: SystemHealth | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, systemHealth }) => {
  return (
    <aside className="w-64 bg-cosmic-950/90 border-r border-cosmic-800 flex flex-col justify-between shrink-0 min-h-screen select-none sticky top-0 h-screen z-30">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-cosmic-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 via-amber-500 to-gold-300 text-cosmic-950 flex items-center justify-center shadow-glow-gold">
              <Sparkles className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-black text-white tracking-wide leading-tight">
                RUDRAVEDA
              </h1>
              <span className="text-[10px] font-bold tracking-wider text-gold-400 uppercase bg-gold-500/10 px-1.5 py-0.5 rounded border border-gold-500/20">
                SaaS Engine
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Internal Operations
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/10 text-gold-300 border border-gold-500/40 shadow-glow-gold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-cosmic-900/60'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-gold-400' : 'text-slate-400'}`} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('generate')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'generate'
                ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/10 text-gold-300 border border-gold-500/40 shadow-glow-gold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-cosmic-900/60'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'generate' ? 'text-gold-400' : 'text-slate-400'}`} />
            <span>Generate Report</span>
          </button>
        </nav>
      </div>

      {/* Footer System Status Badge */}
      <div className="p-4 border-t border-cosmic-800/80 bg-cosmic-950/60 space-y-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-slate-400" /> Server Engine
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {systemHealth ? 'Online' : 'Connected'}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-cosmic-900/90 border border-cosmic-800 text-[10px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between font-bold text-slate-300">
            <span className="flex items-center gap-1 text-gold-400">
              <ShieldCheck className="w-3 h-3" /> Pure RAM Mode
            </span>
            <span className="text-slate-500">No-DB</span>
          </div>
          <p className="text-[9.5px] leading-tight text-slate-400">
            Ephemeral job state. Zero customer data stored in DB.
          </p>
        </div>
      </div>
    </aside>
  );
};
