import { ReportModularConfig } from './types';

export const fiveYearReportConfig: ReportModularConfig = {
  reportType: 'transit-horoscope',
  title: 'Comprehensive 5-Year Vedic Transit Master Report',
  subtitle: 'An Exhaustive 35+ Page Roadmap of Major Planetary Transits (2026 - 2031)',
  targetMinPages: 25,
  targetMaxPages: 50,
  totalSections: 25,
  sections: [
    { id: 'cover', sectionNumber: 1, title: 'Cover', subtitle: '5-Year Planetary Roadmap', category: 'cover', targetPages: 1, promptGuidance: 'Cover page featuring customer name, birth details, and emblem.' },
    { id: 'introduction', sectionNumber: 2, title: 'Introduction', subtitle: 'Vedic Science of Gochara (Planetary Transits)', category: 'overview', targetPages: 1, promptGuidance: 'Overview of slow-moving transits (Jupiter, Saturn, Rahu/Ketu).' },
    { id: 'birth_details', sectionNumber: 3, title: 'Birth Details', subtitle: 'Astronomical & Coordinate Audit', category: 'natal', targetPages: 1, promptGuidance: 'Display DOB, TOB, birth city coordinates, and timezone.' },
    { id: 'astrology_overview', sectionNumber: 4, title: 'Astrology Overview', subtitle: 'Baseline Natal Chart Snapshot', category: 'natal', targetPages: 1, promptGuidance: 'Summarize Lagna, Moon sign, and major planet placements.' },
    { id: 'natal_chart', sectionNumber: 5, title: 'Natal Chart & Gochara Overlay', subtitle: 'Planetary Longitudes', category: 'natal', targetPages: 1, promptGuidance: 'Render Lagna Kundali SVG chart.' },
    { id: 'saturn_transit_analysis', sectionNumber: 6, title: 'Saturn (Shani) 5-Year Transit Audit', subtitle: 'Sade Sati & Dhaiya Assessment', category: 'deep-analysis', targetPages: 2, promptGuidance: 'Evaluate Saturn transit through Meena & Mesha (2026-2031).' },
    { id: 'jupiter_transit_analysis', sectionNumber: 7, title: 'Jupiter (Guru) 5-Year Transit Audit', subtitle: 'Blessings, Expansion & Wealth', category: 'deep-analysis', targetPages: 2, promptGuidance: 'Evaluate Jupiter transit through Vrishabha, Mithuna & Karka.' },
    { id: 'rahu_ketu_transit_analysis', sectionNumber: 8, title: 'Rahu-Ketu 5-Year Axis Transit Audit', subtitle: 'Karmic Shifts & Transformation', category: 'deep-analysis', targetPages: 2, promptGuidance: 'Evaluate Rahu-Ketu transit axis across 5 years.' },
    { id: 'year1_detailed_forecast', sectionNumber: 9, title: 'Year 1 Forecast (2026)', subtitle: 'Quarterly Milestones & Key Events', category: 'predictions', targetPages: 2, promptGuidance: 'Detailed 4-quarter breakdown for 2026.' },
    { id: 'year2_detailed_forecast', sectionNumber: 10, title: 'Year 2 Forecast (2027)', subtitle: 'Quarterly Milestones & Key Events', category: 'predictions', targetPages: 2, promptGuidance: 'Detailed 4-quarter breakdown for 2027.' },
    { id: 'year3_detailed_forecast', sectionNumber: 11, title: 'Year 3 Forecast (2028)', subtitle: 'Quarterly Milestones & Key Events', category: 'predictions', targetPages: 2, promptGuidance: 'Detailed 4-quarter breakdown for 2028.' },
    { id: 'year4_detailed_forecast', sectionNumber: 12, title: 'Year 4 Forecast (2029)', subtitle: 'Quarterly Milestones & Key Events', category: 'predictions', targetPages: 2, promptGuidance: 'Detailed 4-quarter breakdown for 2029.' },
    { id: 'year5_detailed_forecast', sectionNumber: 13, title: 'Year 5 Forecast (2030-2031)', subtitle: 'Quarterly Milestones & Key Events', category: 'predictions', targetPages: 2, promptGuidance: 'Detailed 4-quarter breakdown for 2030-2031.' },
    { id: 'career_5year_roadmap', sectionNumber: 14, title: '5-Year Career & Vocation Roadmap', subtitle: 'Promotions, Switches & Business Expansion', category: 'predictions', targetPages: 1.5, promptGuidance: '5-year professional trajectory.' },
    { id: 'wealth_5year_roadmap', sectionNumber: 15, title: '5-Year Wealth & Property Roadmap', subtitle: 'Real Estate, Assets & Inflows', category: 'predictions', targetPages: 1.5, promptGuidance: '5-year financial trajectory.' },
    { id: 'health_5year_roadmap', sectionNumber: 16, title: '5-Year Health & Wellness Roadmap', subtitle: 'Vitality & Preventive Care', category: 'predictions', targetPages: 1.5, promptGuidance: '5-year health roadmap.' },
    { id: 'relationship_5year_roadmap', sectionNumber: 17, title: '5-Year Relationship & Family Roadmap', subtitle: 'Marriage, Harmony & Progeny', category: 'predictions', targetPages: 1.5, promptGuidance: '5-year relationship roadmap.' },
    { id: 'important_milestone_dates', sectionNumber: 18, title: 'Major Milestone Windows (2026-2031)', subtitle: 'Golden Windows for Big Decisions', category: 'predictions', targetPages: 1.5, promptGuidance: 'Highlight top 5 golden windows in the next 5 years.' },
    { id: 'lucky_days', sectionNumber: 19, title: 'Lucky Days Across 5-Year Horizon', subtitle: 'Auspicious Days of the Week', category: 'remedies', targetPages: 1, promptGuidance: 'Identify lucky weekdays.' },
    { id: 'lucky_numbers', sectionNumber: 20, title: 'Lucky Numbers for 5-Year Goal Setting', subtitle: 'Numerological Vibration', category: 'remedies', targetPages: 1, promptGuidance: 'Provide lucky numbers.' },
    { id: 'lucky_colors', sectionNumber: 21, title: 'Lucky Colors for Long-term Success', subtitle: 'Aura Alignment', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky colors.' },
    { id: 'favorable_periods', sectionNumber: 22, title: 'Peak Transits Summary', subtitle: 'High-Impact Planetary Alignments', category: 'predictions', targetPages: 1.5, promptGuidance: 'Summary of peak transits.' },
    { id: 'transit_remedies', sectionNumber: 23, title: '5-Year Transit Remedies & Mitigations', subtitle: 'Mantras, Gemstones & Yantras', category: 'remedies', targetPages: 2, promptGuidance: 'Prescribe remedies to neutralize malefic transits.' },
    { id: 'karmic_guidance', sectionNumber: 24, title: 'Karmic Evolution & Spiritual Growth', subtitle: 'Soul Destiny in the 5-Year Cycle', category: 'remedies', targetPages: 1, promptGuidance: 'Spiritual guidance for soul growth.' },
    { id: 'personalized_conclusion', sectionNumber: 25, title: 'Personalized 5-Year Blessing', subtitle: 'Summary & Strategic Wisdom', category: 'conclusion', targetPages: 1, promptGuidance: 'Empowering 5-year conclusion.' }
  ]
};
