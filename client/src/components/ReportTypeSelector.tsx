import React from 'react';
import { 
  Heart, 
  Coins, 
  Briefcase, 
  Moon, 
  Compass, 
  Hash, 
  ShieldCheck, 
  Sparkles, 
  Repeat, 
  HeartHandshake, 
  Gem, 
  Flame 
} from 'lucide-react';
import { ReportType } from '../types';

interface ReportTypeSelectorProps {
  selectedType: ReportType;
  onSelect: (type: ReportType) => void;
}

interface ReportOption {
  type: ReportType;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  pageCount: string;
}

const REPORT_OPTIONS: ReportOption[] = [
  {
    type: 'love-report',
    title: 'Love Report',
    subtitle: 'Romantic Alignment & Venus Analysis',
    description: 'Detailed analysis of 7th & 5th houses, Venus placement, soulmate compatibility, and romantic timing.',
    icon: Heart,
    badge: 'POPULAR',
    pageCount: '3 Pages'
  },
  {
    type: 'wealth-report',
    title: 'Wealth Report',
    subtitle: 'Financial Yogas & Prosperity',
    description: 'Dhana Yogas, 2nd & 11th house strength, Laxmi Yogas, investment periods, and wealth accumulation timing.',
    icon: Coins,
    badge: 'FINANCIAL',
    pageCount: '3 Pages'
  },
  {
    type: 'career-report',
    title: 'Career Report',
    subtitle: '10th House, Promotion & Business',
    description: 'Professional destiny, Sun/Saturn placements, job vs business suitability, and upcoming career peaks.',
    icon: Briefcase,
    badge: 'CAREER',
    pageCount: '3 Pages'
  },
  {
    type: 'janam-kundali',
    title: 'Kundali Report',
    subtitle: 'Complete Natal Chart & Planets',
    description: 'Vedic natal chart with Lagna, Moon sign, planetary degrees, Nakshatra details, Mangal/Kaal Sarp doshas.',
    icon: Moon,
    badge: 'FULL KUNDALI',
    pageCount: '4 Pages'
  },
  {
    type: 'transit-horoscope',
    title: '5-Year Horoscope',
    subtitle: 'Long-term Planetary Movements',
    description: '5-Year roadmap with major Jupiter, Saturn, and Rahu/Ketu transits and year-by-year predictions.',
    icon: Compass,
    badge: '5-YEAR',
    pageCount: '4 Pages'
  },
  {
    type: 'numerology-report',
    title: 'Numerology Report',
    subtitle: 'Life Path & Name Vibrations',
    description: 'Life Path number, Destiny number, Soul urge, lucky dates, colors, and name spelling alignment.',
    icon: Hash,
    badge: 'NUMEROLOGY',
    pageCount: '3 Pages'
  },
  {
    type: 'karz-mukti',
    title: 'Karz Mukti (Debt Relief)',
    subtitle: 'Financial Recovery & Remedies',
    description: 'Identify 6th house affliction, debt cycles, Mars remedies, and astrological timing for loan freedom.',
    icon: ShieldCheck,
    badge: 'DEBT RELIEF',
    pageCount: '3 Pages'
  },
  {
    type: 'kundali-career',
    title: 'Kundali + Career Report',
    subtitle: 'Combined Natal & Job Roadmap',
    description: 'Integrated Kundali chart with focused 10th house career analysis, dasha predictions, and remedies.',
    icon: Sparkles,
    badge: 'COMBO',
    pageCount: '4 Pages'
  },
  {
    type: 'divorce-remarriage-love-kundali',
    title: 'Divorce & Remarriage + Love + Kundali',
    subtitle: 'Marital Healing & Second Phase',
    description: 'Deep analysis of marital afflictions, 7th/8th house remedies, remarriage timing, and love compatibility.',
    icon: Repeat,
    badge: 'SPECIALIST',
    pageCount: '5 Pages'
  },
  {
    type: 'kundali-love-marriage',
    title: 'Kundali + Love + Marriage',
    subtitle: 'Complete Relationship Master',
    description: 'Natal horoscope combined with love prospects, marriage timing, partner characteristics, and remedies.',
    icon: HeartHandshake,
    badge: 'ALL-IN-ONE',
    pageCount: '4 Pages'
  },
  {
    type: 'kundali-wealth',
    title: 'Kundali + Wealth',
    subtitle: 'Natal Chart & Financial Prosperity',
    description: 'Natal chart aligned with Dhana Yogas, property purchase timing, and business growth milestones.',
    icon: Gem,
    badge: 'PROSPERITY',
    pageCount: '4 Pages'
  },
  {
    type: 'kundali-love',
    title: 'Kundali + Love Report',
    subtitle: 'Astrological Horoscope & Love Guide',
    description: 'Vedic Kundali overview paired with romantic alignment, Venus/Jupiter dashas, and relationship tips.',
    icon: Flame,
    badge: 'FEATURED',
    pageCount: '4 Pages'
  }
];

export const ReportTypeSelector: React.FC<ReportTypeSelectorProps> = ({ selectedType, onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-slate-100 flex items-center gap-2">
          <span>Select Report Type</span>
          <span className="text-xs font-normal text-gold-400 font-sans">({REPORT_OPTIONS.length} Options Available)</span>
        </h3>
        <span className="text-xs text-slate-400">All reports include validated PDF formatting</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[560px] overflow-y-auto pr-1 custom-scrollbar">
        {REPORT_OPTIONS.map(opt => {
          const Icon = opt.icon;
          const isSelected = selectedType === opt.type;

          return (
            <div
              key={opt.type}
              onClick={() => onSelect(opt.type)}
              className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-cosmic-800 to-cosmic-900 border-gold-500 shadow-glow-gold scale-[1.01]'
                  : 'glass-card glass-card-hover border-cosmic-700/60'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-xl pointer-events-none" />
              )}

              <div className="flex items-start justify-between gap-2 mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-tr from-gold-600 to-amber-400 text-cosmic-950 shadow-md'
                    : 'bg-cosmic-800 text-gold-400 border border-cosmic-700'
                }`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-cosmic-900/90 text-gold-300 border border-gold-500/30 rounded-md">
                    {opt.pageCount}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                    isSelected ? 'bg-gold-500 text-cosmic-950' : 'bg-cosmic-900 text-slate-400 border border-cosmic-700'
                  }`}>
                    {opt.badge}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-slate-100 leading-snug">{opt.title}</h4>
                <div className="text-[11px] text-gold-400 font-medium mb-1">{opt.subtitle}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {opt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
