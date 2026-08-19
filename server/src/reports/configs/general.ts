import { ReportModularConfig } from './types';

export const generalReportConfig: ReportModularConfig = {
  reportType: 'kundali-report',
  title: 'Comprehensive Vedic Janam Kundali Master Life Report',
  subtitle: 'An Exhaustive 35+ Page Life Blueprint of 12 Houses, Yogas & Vimshottari Dasha',
  targetMinPages: 25,
  targetMaxPages: 50,
  totalSections: 25,
  sections: [
    { id: 'cover', sectionNumber: 1, title: 'Cover', subtitle: 'Janam Kundali Life Blueprint', category: 'cover', targetPages: 1, promptGuidance: 'Cover page featuring customer name, birth details, and emblem.' },
    { id: 'introduction', sectionNumber: 2, title: 'Introduction', subtitle: 'Foundations of Vedic Astrology', category: 'overview', targetPages: 1, promptGuidance: 'Overview of Vedic astrology principles.' },
    { id: 'birth_details', sectionNumber: 3, title: 'Birth Details', subtitle: 'Astronomical Audit', category: 'natal', targetPages: 1, promptGuidance: 'Display DOB, TOB, coordinates, and timezone.' },
    { id: 'astrology_overview', sectionNumber: 4, title: 'Astrology Overview', subtitle: 'Cosmic Snapshot', category: 'natal', targetPages: 1, promptGuidance: 'Summarize Lagna, Moon sign, and Nakshatra.' },
    { id: 'natal_chart', sectionNumber: 5, title: 'Natal Chart Renderings', subtitle: 'Lagna & Navamsha (D9) Charts', category: 'natal', targetPages: 1, promptGuidance: 'Render Lagna Kundali SVG chart.' },
    { id: 'personality_lagna', sectionNumber: 6, title: 'Ascendant (Lagna) & Core Identity', subtitle: '1st House Analysis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze ascendant lord and physical demeanor.' },
    { id: 'wealth_finance_2nd_11th', sectionNumber: 7, title: 'Wealth, Finance & Speech', subtitle: '2nd & 11th House Analysis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze savings and income channels.' },
    { id: 'courage_siblings_3rd', sectionNumber: 8, title: 'Courage, Effort & Siblings', subtitle: '3rd House Analysis', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze 3rd house.' },
    { id: 'home_mother_assets_4th', sectionNumber: 9, title: 'Home, Mother & Vehicles', subtitle: '4th House Analysis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze 4th house.' },
    { id: 'intelligence_education_5th', sectionNumber: 10, title: 'Intelligence, Romance & Education', subtitle: '5th House Analysis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze 5th house.' },
    { id: 'health_enemies_debts_6th', sectionNumber: 11, title: 'Health, Obstacles & Debts', subtitle: '6th House Analysis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze 6th house.' },
    { id: 'marriage_partnerships_7th', sectionNumber: 12, title: 'Marriage & Partnerships', subtitle: '7th House Analysis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze 7th house.' },
    { id: 'longevity_transformation_8th', sectionNumber: 13, title: 'Longevity & Transformation', subtitle: '8th House Analysis', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze 8th house.' },
    { id: 'fortune_dharma_spirituality_9th', sectionNumber: 14, title: 'Fortune, Destiny & Spirituality', subtitle: '9th House Analysis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze 9th house.' },
    { id: 'career_profession_status_10th', sectionNumber: 15, title: 'Career, Vocation & Status', subtitle: '10th House Analysis', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze 10th house.' },
    { id: 'expenditure_foreign_liberation_12th', sectionNumber: 16, title: 'Expenditure & Foreign Settlement', subtitle: '12th House Analysis', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze 12th house.' },
    { id: 'dasha_periods_timeline', sectionNumber: 17, title: 'Vimshottari Dasha Major Cycles', subtitle: 'Life Timeline', category: 'predictions', targetPages: 2, promptGuidance: 'Break down major dasha periods.' },
    { id: 'future_3year_prediction', sectionNumber: 18, title: '3-Year Life Forecast', subtitle: 'Quarterly Milestones', category: 'predictions', targetPages: 2, promptGuidance: 'Detailed 3-year prediction breakdown.' },
    { id: 'lucky_days', sectionNumber: 19, title: 'Lucky Days', subtitle: 'Auspicious Days of the Week', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky weekdays.' },
    { id: 'lucky_numbers', sectionNumber: 20, title: 'Lucky Numbers', subtitle: 'Vibrational Numerology', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky numbers.' },
    { id: 'lucky_colors', sectionNumber: 21, title: 'Lucky Colors', subtitle: 'Aura Alignment', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky colors.' },
    { id: 'favorable_periods', sectionNumber: 22, title: 'Favorable Annual Transits', subtitle: 'Jupiter & Saturn Transit Roadmap', category: 'predictions', targetPages: 1.5, promptGuidance: 'Highlight favorable periods.' },
    { id: 'remedies_gemstones', sectionNumber: 23, title: 'Comprehensive Remedies & Gemstones', subtitle: 'Mantras, Yantras & Charities', category: 'remedies', targetPages: 2, promptGuidance: 'Prescribe gemstones and mantras.' },
    { id: 'lifestyle_dharma', sectionNumber: 24, title: 'Dharma & Life Purpose Guidance', subtitle: 'Soul Mission', category: 'remedies', targetPages: 1, promptGuidance: 'Provide spiritual purpose guidance.' },
    { id: 'personalized_conclusion', sectionNumber: 25, title: 'Personalized Kundali Blessing', subtitle: 'Summary & Life Wisdom', category: 'conclusion', targetPages: 1, promptGuidance: 'Empowering Kundali conclusion.' }
  ]
};
