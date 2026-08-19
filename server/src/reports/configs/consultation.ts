import { ReportModularConfig } from './types';

export const consultationReportConfig: ReportModularConfig = {
  reportType: 'love-consultation',
  title: 'Comprehensive Vedic Astrological Consultation Report',
  subtitle: 'An Exhaustive 30+ Page Specialist Analysis & Remedial Blueprint',
  targetMinPages: 25,
  targetMaxPages: 50,
  totalSections: 25,
  sections: [
    { id: 'cover', sectionNumber: 1, title: 'Cover', subtitle: 'Specialist Astrological Consultation', category: 'cover', targetPages: 1, promptGuidance: 'Cover page featuring customer name, birth details, and emblem.' },
    { id: 'introduction', sectionNumber: 2, title: 'Introduction', subtitle: 'Vedic Consultation Framework', category: 'overview', targetPages: 1, promptGuidance: 'Overview of Vedic consultation methodology.' },
    { id: 'birth_details', sectionNumber: 3, title: 'Birth Details', subtitle: 'Astronomical Audit', category: 'natal', targetPages: 1, promptGuidance: 'Display DOB, TOB, coordinates, and timezone.' },
    { id: 'astrology_overview', sectionNumber: 4, title: 'Astrology Overview', subtitle: 'Natal Chart Snapshot', category: 'natal', targetPages: 1, promptGuidance: 'Summarize Lagna, Moon sign, and Nakshatra lord.' },
    { id: 'natal_chart', sectionNumber: 5, title: 'Natal Chart Renderings', subtitle: 'Planetary Positions', category: 'natal', targetPages: 1, promptGuidance: 'Render Lagna Kundali SVG chart.' },
    { id: 'core_query_analysis', sectionNumber: 6, title: 'Primary Consultation Query Analysis', subtitle: 'Deep Astrological Investigation', category: 'deep-analysis', targetPages: 2, promptGuidance: 'Analyze primary consultation question with house lords.' },
    { id: 'house_lord_strength', sectionNumber: 7, title: 'House Lord & Dignity Assessment', subtitle: 'Shadbala & Planetary Power', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Evaluate Shadbala and planetary dignities.' },
    { id: 'planetary_combustions_retrogrades', sectionNumber: 8, title: 'Combustion & Retrograde Planets Audit', subtitle: 'Hidden Obstacles', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Evaluate retrograde and combust planets.' },
    { id: 'mangal_kaalsarp_dosha', sectionNumber: 9, title: 'Mangal & Kaal Sarp Dosha Evaluation', subtitle: 'Mitigation Audit', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Audit Mangal and Kaal Sarp doshas.' },
    { id: 'dasha_timeline_deepdive', sectionNumber: 10, title: 'Vimshottari Dasha Deep-Dive', subtitle: 'Current & Upcoming Phases', category: 'deep-analysis', targetPages: 2, promptGuidance: 'Deep analysis of active dasha timeline.' },
    { id: 'transit_impact', sectionNumber: 11, title: 'Current Planetary Transit Impact', subtitle: 'Gochara Alignment', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze active Gochara transits.' },
    { id: 'career_wealth_consultation', sectionNumber: 12, title: 'Career & Financial Consultation Guidance', subtitle: '10th & 2nd House Synthesis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Provide career and financial consultation insights.' },
    { id: 'relationship_marriage_consultation', sectionNumber: 13, title: 'Relationship & Family Consultation Guidance', subtitle: '7th House Synthesis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Provide relationship consultation insights.' },
    { id: 'health_vitality_consultation', sectionNumber: 14, title: 'Health & Energy Consultation Guidance', subtitle: '6th & 1st House Synthesis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Provide health consultation insights.' },
    { id: 'karmic_debt_analysis', sectionNumber: 15, title: 'Karmic Debt & Rahu-Ketu Axis', subtitle: 'Past Karma Resolution', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze Rahu-Ketu axis karmic lessons.' },
    { id: 'current_year_outlook', sectionNumber: 16, title: 'Current Year Detailed Outlook', subtitle: 'Quarterly Milestones', category: 'predictions', targetPages: 2, promptGuidance: 'Quarterly prediction breakdown for current year.' },
    { id: 'next_3year_prediction', sectionNumber: 17, title: '3-Year Horizon Prediction', subtitle: 'Strategic Timing', category: 'predictions', targetPages: 2, promptGuidance: '3-year prediction roadmap.' },
    { id: 'decision_timing_windows', sectionNumber: 18, title: 'Golden Decision Timing Windows', subtitle: 'Best Dates for Action', category: 'predictions', targetPages: 1.5, promptGuidance: 'Highlight best dates for key decisions.' },
    { id: 'lucky_days', sectionNumber: 19, title: 'Lucky Days', subtitle: 'Auspicious Days of the Week', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky weekdays.' },
    { id: 'lucky_numbers', sectionNumber: 20, title: 'Lucky Numbers', subtitle: 'Vibrational Numerology', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky numbers.' },
    { id: 'lucky_colors', sectionNumber: 21, title: 'Lucky Colors', subtitle: 'Aura Alignment', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky colors.' },
    { id: 'favorable_periods', sectionNumber: 22, title: 'Favorable Periods', subtitle: 'Annual Highlights', category: 'predictions', targetPages: 1.5, promptGuidance: 'Highlight favorable periods.' },
    { id: 'specialist_remedies', sectionNumber: 23, title: 'Specialist Remedial Prescription', subtitle: 'Mantras, Gemstones & Yantras', category: 'remedies', targetPages: 2, promptGuidance: 'Prescribe remedies to resolve consultation queries.' },
    { id: 'lifestyle_adjustments', sectionNumber: 24, title: 'Vedic Lifestyle & Routine Adjustments', subtitle: 'Holistic Harmony', category: 'remedies', targetPages: 1, promptGuidance: 'Lifestyle and daily routine tips.' },
    { id: 'personalized_conclusion', sectionNumber: 25, title: 'Personalized Consultation Conclusion', subtitle: 'Summary & Blessings', category: 'conclusion', targetPages: 1, promptGuidance: 'Empowering consultation conclusion.' }
  ]
};
