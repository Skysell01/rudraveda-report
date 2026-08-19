import { ReportModularConfig } from './types';

export const careerReportConfig: ReportModularConfig = {
  reportType: 'career-report',
  title: 'Comprehensive Vedic Career & Professional Destiny Master Report',
  subtitle: 'An Exhaustive 30+ Page Blueprint of 10th House, Promotions & Leadership',
  targetMinPages: 25,
  targetMaxPages: 50,
  totalSections: 25,
  sections: [
    { id: 'cover', sectionNumber: 1, title: 'Cover', subtitle: 'Professional Destiny & Natal Blueprint', category: 'cover', targetPages: 1, promptGuidance: 'Cover page featuring customer name, birth details, and emblem.' },
    { id: 'introduction', sectionNumber: 2, title: 'Introduction', subtitle: 'Vedic Philosophy of Karma & Vocation', category: 'overview', targetPages: 1, promptGuidance: 'Overview of 10th house (KarmaStan) and Sun/Saturn significators.' },
    { id: 'birth_details', sectionNumber: 3, title: 'Birth Details', subtitle: 'Astronomical & Coordinate Audit', category: 'natal', targetPages: 1, promptGuidance: 'Display DOB, TOB, birth city coordinates, and timezone.' },
    { id: 'astrology_overview', sectionNumber: 4, title: 'Astrology Overview', subtitle: 'Professional Cosmic Matrix', category: 'natal', targetPages: 1, promptGuidance: 'Summarize Lagna, Sun position, Saturn placement, and 10th lord.' },
    { id: 'natal_chart', sectionNumber: 5, title: 'Natal & Dasamsha (D10) Chart', subtitle: 'Vocation & Corporate Power', category: 'natal', targetPages: 1, promptGuidance: 'Render Lagna Kundali SVG chart and house longitudes.' },
    { id: 'personality', sectionNumber: 6, title: 'Leadership & Work Style', subtitle: 'Ascendant Lord & Professional Aura', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze leadership capabilities and work ethic.' },
    { id: 'tenth_house', sectionNumber: 7, title: '10th House Analysis (KarmaStan)', subtitle: 'Primary Vocation & Public Status', category: 'deep-analysis', targetPages: 2, promptGuidance: 'In-depth breakdown of 10th lord, planets in 10th house, and career field.' },
    { id: 'sun_analysis', sectionNumber: 8, title: 'Sun Analysis (Authority & Government)', subtitle: 'Surya Deva & Command', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Evaluate Sun placement for government jobs, administrative power, and executive authority.' },
    { id: 'saturn_analysis', sectionNumber: 9, title: 'Saturn Analysis (Shani - Work Ethic & Perseverance)', subtitle: 'Karma Karaka Stability', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze Saturn dignity, discipline, and long-term career resilience.' },
    { id: 'mercury_mars_analysis', sectionNumber: 10, title: 'Mercury & Mars Analysis (Intellect & Execution)', subtitle: 'Technical Skill & Enterprise', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Evaluate Mercury for IT/finance and Mars for engineering/management.' },
    { id: 'suitable_professions', sectionNumber: 11, title: 'Top Recommended Career Domains', subtitle: 'Industry & Sector Alignment', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'List ideal career sectors (e.g. Technology, Finance, Medicine, Public Service).' },
    { id: 'entrepreneurship_vs_job', sectionNumber: 12, title: 'Entrepreneurship vs Employment', subtitle: '7th & 10th House Synergy', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze business ownership potential vs corporate career.' },
    { id: 'job_changes_promotions', sectionNumber: 13, title: 'Job Changes & Promotion Cycles', subtitle: 'Transit & Dasha Windows', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Identify job switch indicators and promotion periods.' },
    { id: 'workplace_relationships', sectionNumber: 14, title: 'Workplace Harmony & Superior Relations', subtitle: '6th & 11th House Dynamics', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Evaluate relations with bosses, colleagues, and subordinates.' },
    { id: 'career_challenges', sectionNumber: 15, title: 'Career Obstacles & Burnout Prevention', subtitle: 'Malefic Aspects on 10th House', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Identify career instability risks and stress mitigation.' },
    { id: 'current_career_dasha', sectionNumber: 16, title: 'Current Vocation Dasha Phase', subtitle: 'Mahadasha & Antardasha Impact', category: 'predictions', targetPages: 1.5, promptGuidance: 'Analyze active Vimshottari dasha impact on job.' },
    { id: 'future_career_outlook', sectionNumber: 17, title: '3-Year Career Growth Forecast', subtitle: 'Quarterly Milestones & Promotion Windows', category: 'predictions', targetPages: 2, promptGuidance: 'Detailed 3-year quarterly career trajectory.' },
    { id: 'foreign_travel_career', sectionNumber: 18, title: 'Foreign Assignment & Onsite Opportunities', subtitle: '9th & 12th House Travel Indicators', category: 'predictions', targetPages: 1.5, promptGuidance: 'Evaluate international work travel and foreign relocation.' },
    { id: 'lucky_days', sectionNumber: 19, title: 'Lucky Days for Interviews & Launch', subtitle: 'Auspicious Days of the Week', category: 'remedies', targetPages: 1, promptGuidance: 'Identify best weekdays for interviews and business launches.' },
    { id: 'lucky_numbers', sectionNumber: 20, title: 'Lucky Career Numbers', subtitle: 'Vibrational Numerology', category: 'remedies', targetPages: 1, promptGuidance: 'List lucky numbers for resume, office, and deals.' },
    { id: 'lucky_colors', sectionNumber: 21, title: 'Lucky Colors for Authority', subtitle: 'Executive Wardrobe & Presence', category: 'remedies', targetPages: 1, promptGuidance: 'Executive dress colors to enhance authority and success.' },
    { id: 'favorable_periods', sectionNumber: 22, title: 'Favorable Annual Transits', subtitle: 'Jupiter & Saturn Transit Support', category: 'predictions', targetPages: 1.5, promptGuidance: 'Annual transit roadmap for professional elevation.' },
    { id: 'career_remedies', sectionNumber: 23, title: 'Sun & Saturn Career Remedies', subtitle: 'Mantras, Gemstones & Yantras', category: 'remedies', targetPages: 2, promptGuidance: 'Prescribe Ruby, Blue Sapphire, Aditya Hrudayam Stotram, and Shani Mantra.' },
    { id: 'karma_yoga_guidance', sectionNumber: 24, title: 'Karma Yoga & Executive Ethics', subtitle: 'Vedic Principles of Work', category: 'remedies', targetPages: 1, promptGuidance: 'Ethical practices to sustain long-term reputation.' },
    { id: 'personalized_conclusion', sectionNumber: 25, title: 'Personalized Career Blessing', subtitle: 'Summary & Leadership Wisdom', category: 'conclusion', targetPages: 1, promptGuidance: 'Empowering professional conclusion.' }
  ]
};
