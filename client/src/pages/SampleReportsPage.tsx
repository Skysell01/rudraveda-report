import { CheckCircle2, Cpu, Database, FileCode, ShieldCheck, Sparkles } from 'lucide-react';
import React from 'react';

export const SampleReportsPage: React.FC = () => {
  const specs = [
    {
      title: 'Zero-Database Guarantee',
      desc: 'No customer data, report logs, or employee records are ever persisted in disk databases (MongoDB, PostgreSQL, Supabase, Firebase, MySQL). Job state & PDF binary buffers reside strictly in RAM with a 15-minute TTL.',
      icon: Database
    },
    {
      title: 'Prokerala Astrology Engine',
      desc: 'Calculates raw planetary coordinates, Nakshatras, Ganas, Yonis, Nadis, Vimshottari Dasha periods, Mangal Dosha, Kaal Sarp Dosha, and 36-point Ashtakoota Guna Milan.',
      icon: Cpu
    },
    {
      title: 'Anthropic Claude AI Interpreter',
      desc: 'Synthesizes raw astronomical coordinates into deep, personalized, structured Vedic predictions (personality, career, finance, health, dasha timing, gemstones, mantras).',
      icon: Sparkles
    },
    {
      title: 'Puppeteer PDF Compilation & Validation',
      desc: 'Compiles custom styled HTML/CSS print templates with North/South Indian Kundali SVG charts, headers/footers, and page-break rules. Validates PDF binary headers before output.',
      icon: FileCode
    }
  ];

  return (
    <div className="min-h-screen bg-cosmic-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> System Specifications & Architecture
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-white">
            RUDRAVEDA ASTROLOGY REPORT ENGINE
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            A production-ready, security-hardened, zero-persistence Vedic astrology report generator built for high-throughput enterprise operations.
          </p>
        </div>

        {/* Core Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="glass-card rounded-2xl p-6 border-gold-500/20 hover:border-gold-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* API Keys Security Rule */}
        <div className="glass-card rounded-2xl p-6 border-emerald-500/30 bg-cosmic-800/40">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-base font-bold text-white">API Key Security & Backend Isolation</h4>
              <p className="text-xs text-slate-300 mt-1">
                All external API keys (<code className="text-gold-300">PROKERALA_CLIENT_ID</code>, <code className="text-gold-300">PROKERALA_CLIENT_SECRET</code>, <code className="text-gold-300">ANTHROPIC_API_KEY</code>) reside exclusively inside backend Node.js environment variables. Frontend client code contains zero API credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
