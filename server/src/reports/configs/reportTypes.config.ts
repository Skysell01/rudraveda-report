import { ReportType } from '../../types/report';

export interface ReportTypeConfig {
  type: ReportType;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  estimatedPageCount: number;
}

export const REPORT_TYPE_CONFIGS: Record<ReportType, ReportTypeConfig> = {
  'love-report': {
    type: 'love-report',
    title: 'Love & Relationship Report',
    subtitle: 'Vedic Romantic Alignment & Venus Analysis',
    description: 'Detailed analysis of 5th & 7th houses, Venus placement, soulmate timing, and attraction.',
    badge: 'POPULAR',
    estimatedPageCount: 3
  },
  'wealth-report': {
    type: 'wealth-report',
    title: 'Wealth & Prosperity Report',
    subtitle: 'Financial Dhana Yogas & Asset Growth',
    description: 'Dhana Yogas, Laxmi Yogas, 2nd & 11th house strength, investment timing, and prosperity.',
    badge: 'FINANCIAL',
    estimatedPageCount: 3
  },
  'career-report': {
    type: 'career-report',
    title: 'Career & Professional Destiny Report',
    subtitle: '10th House, Promotions & Business Peak',
    description: 'Job vs business suitability, Sun/Saturn placements, promotion periods, and long-term trajectory.',
    badge: 'CAREER',
    estimatedPageCount: 3
  },
  'janam-kundali': {
    type: 'janam-kundali',
    title: 'Full Janam Kundali',
    subtitle: 'Natal Horoscope & Life Predictions',
    description: 'Complete natal horoscope with Lagna Kundali, planetary degrees, Nakshatras & Vimshottari dashas.',
    badge: 'FULL KUNDALI',
    estimatedPageCount: 4
  },
  'kundali-matching': {
    type: 'kundali-matching',
    title: 'Kundali Matching',
    subtitle: 'Matrimonial Ashtakoota Compatibility',
    description: '36 Guna Milan scoring, Gana/Nadi/Bhakoot details, physical/mental alignment & partner remedies.',
    badge: '2 PARTNERS',
    estimatedPageCount: 3
  },
  'dasha-remedies': {
    type: 'dasha-remedies',
    title: 'Dasha & Planetary Remedies',
    subtitle: 'Vimshottari Timelines & Mitigations',
    description: 'Current Mahadasha/Antardasha phases, prescribed Gemstones, Mantras, Yantras & Charities.',
    badge: 'REMEDIAL',
    estimatedPageCount: 3
  },
  'transit-horoscope': {
    type: 'transit-horoscope',
    title: '5-Year Transit Horoscope',
    subtitle: 'Long-term Planetary Transits & Guide',
    description: 'Gochara transits of Jupiter, Saturn, Rahu/Ketu with 5-year predictions.',
    badge: '5-YEAR',
    estimatedPageCount: 4
  },
  'numerology-report': {
    type: 'numerology-report',
    title: 'Numerology Report',
    subtitle: 'Life Path & Name Vibrations',
    description: 'Life Path number, Destiny number, Soul urge, lucky dates, colors & name alignment.',
    badge: 'NUMEROLOGY',
    estimatedPageCount: 3
  },
  'karz-mukti': {
    type: 'karz-mukti',
    title: 'Karz Mukti (Debt Relief)',
    subtitle: 'Financial Freedom & Planetary Remedies',
    description: 'Identify 6th house affliction, debt cycles, Mars remedies, and astrological timing for loan freedom.',
    badge: 'DEBT RELIEF',
    estimatedPageCount: 3
  },
  'kundali-career': {
    type: 'kundali-career',
    title: 'Kundali + Career Report',
    subtitle: 'Combined Natal Chart & Professional Roadmap',
    description: 'Integrated Kundali chart with focused 10th house career analysis, dasha predictions & remedies.',
    badge: 'COMBO',
    estimatedPageCount: 4
  },
  'divorce-remarriage-love-kundali': {
    type: 'divorce-remarriage-love-kundali',
    title: 'Divorce & Remarriage + Love + Kundali',
    subtitle: 'Marital Healing & Second Phase Horoscope',
    description: 'Analysis of marital afflictions, 7th/8th house remedies, remarriage timing & love compatibility.',
    badge: 'SPECIALIST',
    estimatedPageCount: 5
  },
  'kundali-love-marriage': {
    type: 'kundali-love-marriage',
    title: 'Kundali + Love + Marriage',
    subtitle: 'Complete Relationship Master Guide',
    description: 'Natal horoscope combined with love prospects, marriage timing, partner characteristics & remedies.',
    badge: 'ALL-IN-ONE',
    estimatedPageCount: 4
  },
  'kundali-wealth': {
    type: 'kundali-wealth',
    title: 'Kundali + Wealth Report',
    subtitle: 'Natal Chart & Financial Prosperity Guide',
    description: 'Natal chart aligned with Dhana Yogas, property purchase timing & business growth milestones.',
    badge: 'PROSPERITY',
    estimatedPageCount: 4
  },
  'kundali-love': {
    type: 'kundali-love',
    title: 'Kundali + Love Report',
    subtitle: 'Astrological Horoscope & Love Guide',
    description: 'Vedic Kundali overview paired with romantic alignment, Venus/Jupiter dashas & relationship tips.',
    badge: 'FEATURED',
    estimatedPageCount: 4
  },
  'five-year-horoscope': {
    type: 'five-year-horoscope',
    title: '5-Year Horoscope Report',
    subtitle: '5-Year Transit Roadmap & Gochara Matrix',
    description: 'Exhaustive 5-year planetary transits (Saturn, Jupiter, Rahu-Ketu) and quarterly prediction milestones.',
    badge: '5-YEAR',
    estimatedPageCount: 35
  },
  'love-consultation': {
    type: 'love-consultation',
    title: 'Love & Relationship Consultation',
    subtitle: 'Specialist Consultation & Remedial Blueprint',
    description: 'Specialist deep-dive astrological consultation, house lord dignities, and remedial prescriptions.',
    badge: 'CONSULT',
    estimatedPageCount: 30
  }
};
