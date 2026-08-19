import { Activity, Database, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkSystemHealth } from '../api/client';
import { SystemHealth } from '../types';

export const Navbar: React.FC = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const location = useLocation();

  useEffect(() => {
    checkSystemHealth()
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-cosmic-800/90 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-300 flex items-center justify-center shadow-glow-gold transition-transform group-hover:scale-105">
            <span className="font-serif text-2xl text-cosmic-900 font-extrabold">ॐ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-black tracking-widest gold-gradient-text">
                RUDRAVEDA
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-gold-500/10 text-gold-300 border border-gold-500/30 rounded-full">
                NO-DB PRO
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Vedic Astrology PDF Generation Engine
            </div>
          </div>
        </Link>

        {/* Navigation & Status Badges */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/'
                  ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-cosmic-700/50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/samples"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/samples'
                  ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-cosmic-700/50'
              }`}
            >
              Report Specifications
            </Link>
          </nav>

          {/* System Status Indicators */}
          <div className="hidden lg:flex items-center gap-3 text-xs bg-cosmic-900/60 border border-cosmic-700 rounded-xl p-2 px-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>PDF Engine Ready</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-slate-300" title="Zero Database Architecture">
              <Database className="w-3.5 h-3.5 text-gold-400" />
              <span>Pure In-Memory</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{health?.integrations?.prokeralaApi?.includes('CONNECTED') ? 'Live APIs' : 'Vedic Fallbacks'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
