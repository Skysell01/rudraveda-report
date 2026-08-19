import { ReportModularConfig } from './types';

export const wealthReportConfig: ReportModularConfig = {
  reportType: 'wealth-report',
  title: 'Comprehensive Vedic Wealth & Dhana Yoga Master Report',
  subtitle: 'An Exhaustive 30+ Page Blueprint of Prosperity, Financial Yogas & Asset Growth',
  targetMinPages: 25,
  targetMaxPages: 50,
  totalSections: 25,
  sections: [
    { id: 'cover', sectionNumber: 1, title: 'Cover', subtitle: 'Financial Destiny & Natal Blueprint', category: 'cover', targetPages: 1, promptGuidance: 'Cover page featuring customer name, birth details, and gold emblem.' },
    { id: 'introduction', sectionNumber: 2, title: 'Introduction', subtitle: 'Vedic Principles of Wealth & Fortune', category: 'overview', targetPages: 1, promptGuidance: 'Overview of 2nd (wealth), 9th (fortune), and 11th (gains) houses.' },
    { id: 'birth_details', sectionNumber: 3, title: 'Birth Details', subtitle: 'Astronomical & Coordinate Audit', category: 'natal', targetPages: 1, promptGuidance: 'Display DOB, TOB, birth city coordinates, and timezone.' },
    { id: 'astrology_overview', sectionNumber: 4, title: 'Astrology Overview', subtitle: 'Financial Cosmic Matrix', category: 'natal', targetPages: 1, promptGuidance: 'Summarize Lagna, Moon sign, Jupiter position, and 2nd/11th house strength.' },
    { id: 'natal_chart', sectionNumber: 5, title: 'Natal Chart', subtitle: 'Lagna & Hora (D2) Chart Renderings', category: 'natal', targetPages: 1, promptGuidance: 'Render Lagna Kundali SVG chart and planetary longitudes.' },
    { id: 'personality', sectionNumber: 6, title: 'Personality & Money Mindset', subtitle: 'Lagna & Financial Temperament', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze ascendant lord and risk tolerance.' },
    { id: 'wealth_yogas', sectionNumber: 7, title: 'Dhana Yogas & Prosperity Combinations', subtitle: 'Lakshmi & Chandra-Mangal Yogas', category: 'deep-analysis', targetPages: 2, promptGuidance: 'Evaluate active Dhana Yogas in the natal chart.' },
    { id: 'second_house', sectionNumber: 8, title: '2nd House Analysis (Accumulated Wealth)', subtitle: 'Bank Balance & Savings Potential', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'In-depth breakdown of 2nd lord, planets in 2nd house, and savings capacity.' },
    { id: 'eleventh_house', sectionNumber: 9, title: '11th House Analysis (Income & Gains)', subtitle: 'Inflow Channels & Profitability', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'In-depth breakdown of 11th lord and primary income avenues.' },
    { id: 'ninth_house', sectionNumber: 10, title: '9th House Analysis (Fortune & Luck)', subtitle: 'Bhagya Stan & Unexpected Gains', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze 9th house lord, luck factor, and inheritance.' },
    { id: 'jupiter_analysis', sectionNumber: 11, title: 'Jupiter Analysis (Guru - Expansive Wealth)', subtitle: 'Wealth Karaka Dignity', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze Jupiter placement, aspects, and wisdom in finance.' },
    { id: 'mercury_analysis', sectionNumber: 12, title: 'Mercury Analysis (Budh - Trade & Commerce)', subtitle: 'Business Acumen & Analytics', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Evaluate Mercury placement for trading, stocks, and commerce.' },
    { id: 'property_real_estate', sectionNumber: 13, title: '4th House & Property Investments', subtitle: 'Real Estate & Vehicles', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze 4th house and Mars placement for land and property.' },
    { id: 'business_vs_job', sectionNumber: 14, title: 'Business vs Employment Suitability', subtitle: '7th & 10th House Structure', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Compare business partnership potential vs corporate employment.' },
    { id: 'financial_challenges', sectionNumber: 15, title: 'Financial Obstacles & Debt Risks', subtitle: '6th, 8th & 12th House Losses', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Evaluate debt risks, 12th house expenses, and loss prevention.' },
    { id: 'current_wealth_dasha', sectionNumber: 16, title: 'Current Financial Dasha Phase', subtitle: 'Mahadasha & Antardasha Inflows', category: 'predictions', targetPages: 1.5, promptGuidance: 'Analyze current Vimshottari dasha impact on income.' },
    { id: 'future_wealth_outlook', sectionNumber: 17, title: '3-Year Financial Forecast', subtitle: 'Quarterly Income & Investment Windows', category: 'predictions', targetPages: 2, promptGuidance: 'Detailed 3-year quarterly financial prediction.' },
    { id: 'golden_investment_periods', sectionNumber: 18, title: 'Golden Investment Periods', subtitle: 'High Returns & Asset Purchase Windows', category: 'predictions', targetPages: 1.5, promptGuidance: 'Highlight best dates for purchasing property, stocks, and gold.' },
    { id: 'lucky_days', sectionNumber: 19, title: 'Lucky Days for Financial Deals', subtitle: 'Auspicious Days of the Week', category: 'remedies', targetPages: 1, promptGuidance: 'Identify best weekdays for financial transactions.' },
    { id: 'lucky_numbers', sectionNumber: 20, title: 'Lucky Wealth Numbers', subtitle: 'Numerological Prosperity Vibrations', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky numbers for accounts and investments.' },
    { id: 'lucky_colors', sectionNumber: 21, title: 'Lucky Colors for Prosperity', subtitle: 'Aura & Office Decor', category: 'remedies', targetPages: 1, promptGuidance: 'Colors to boost confidence and wealth energy.' },
    { id: 'favorable_periods', sectionNumber: 22, title: 'Favorable Annual Transits', subtitle: 'Jupiter & Saturn Transit Benefits', category: 'predictions', targetPages: 1.5, promptGuidance: 'Annual transit roadmap for financial growth.' },
    { id: 'wealth_remedies', sectionNumber: 23, title: 'Lakshmi & Kubera Remedies', subtitle: 'Mantras, Gemstones & Yantras', category: 'remedies', targetPages: 2, promptGuidance: 'Prescribe Shree Yantra, Kanakdhara Stotram, and Yellow Sapphire.' },
    { id: 'charity_guidance', sectionNumber: 24, title: 'Strategic Charity & Karmic Tithe', subtitle: 'Multiplying Abundance through Giving', category: 'remedies', targetPages: 1, promptGuidance: 'Guidance on donation to dissolve financial blockages.' },
    { id: 'personalized_conclusion', sectionNumber: 25, title: 'Personalized Financial Blessing', subtitle: 'Summary & Prosperity Wisdom', category: 'conclusion', targetPages: 1, promptGuidance: 'Empowering financial conclusion.' }
  ]
};
