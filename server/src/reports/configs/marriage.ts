import { ReportModularConfig } from './types';

export const marriageReportConfig: ReportModularConfig = {
  reportType: 'kundali-matching',
  title: 'Comprehensive Vedic Marriage & Ashtakoota Master Report',
  subtitle: 'An Exhaustive 30+ Page Blueprint of 36 Guna Milan, Dosha Audit & Domestic Harmony',
  targetMinPages: 25,
  targetMaxPages: 50,
  totalSections: 25,
  sections: [
    { id: 'cover', sectionNumber: 1, title: 'Cover', subtitle: 'Matrimonial Compatibility Blueprint', category: 'cover', targetPages: 1, promptGuidance: 'Cover page featuring partner names, birth details, and emblem.' },
    { id: 'introduction', sectionNumber: 2, title: 'Introduction', subtitle: 'Vedic Science of Matrimonial Alignment', category: 'overview', targetPages: 1, promptGuidance: 'Overview of Ashtakoota Milan and 7th/8th house dynamics.' },
    { id: 'birth_details', sectionNumber: 3, title: 'Partner Birth Details', subtitle: 'Comparative Coordinate Audit', category: 'natal', targetPages: 1, promptGuidance: 'Display DOB, TOB, and birth locations for both partners.' },
    { id: 'astrology_overview', sectionNumber: 4, title: 'Astrology Overview', subtitle: 'Comparative Cosmic Matrix', category: 'natal', targetPages: 1, promptGuidance: 'Summarize Lagna, Moon sign, and Nakshatra lords of both partners.' },
    { id: 'natal_chart', sectionNumber: 5, title: 'Dual Natal & Navamsha (D9) Charts', subtitle: 'Marital Harmony Renderings', category: 'natal', targetPages: 1, promptGuidance: 'Render Lagna Kundali SVG charts for both partners.' },
    { id: 'guna_milan_summary', sectionNumber: 6, title: '36 Guna Milan Score Breakdown', subtitle: 'Overall Ashtakoota Points Audit', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Detailed table of all 8 Kootas and points obtained out of 36.' },
    { id: 'varna_koota', sectionNumber: 7, title: 'Varna Koota (Ego & Spiritual Harmony)', subtitle: '1 Point Maximum', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze spiritual and psychological compatibility.' },
    { id: 'vashya_koota', sectionNumber: 8, title: 'Vashya Koota (Mutual Attraction & Control)', subtitle: '2 Points Maximum', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze mutual influence and relationship balance.' },
    { id: 'tara_koota', sectionNumber: 9, title: 'Tara Koota (Destiny & Health Harmony)', subtitle: '3 Points Maximum', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze health alignment and long-term well-being.' },
    { id: 'yoni_koota', sectionNumber: 10, title: 'Yoni Koota (Physical & Intimate Affinity)', subtitle: '4 Points Maximum', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze intimacy and physical compatibility.' },
    { id: 'maitri_koota', sectionNumber: 11, title: 'Graha Maitri Koota (Mental & Intellectual Rapport)', subtitle: '5 Points Maximum', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze Moon lord friendship and communication ease.' },
    { id: 'gana_koota', sectionNumber: 12, title: 'Gana Koota (Temperamental Congruence)', subtitle: '6 Points Maximum', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze Deva/Manushya/Rakshasa temperament alignment.' },
    { id: 'bhakoot_koota', sectionNumber: 13, title: 'Bhakoot Koota (Financial Prosperity & Family)', subtitle: '7 Points Maximum', category: 'deep-analysis', targetPages: 1, promptGuidance: 'Analyze Moon sign position (1/7, 2/12, 6/8) and prosperity.' },
    { id: 'nadi_koota', sectionNumber: 14, title: 'Nadi Koota (Genetic & Progeny Health)', subtitle: '8 Points Maximum', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Analyze Adi/Madhya/Antya Nadi for progeny and health.' },
    { id: 'mangal_dosha_audit', sectionNumber: 15, title: 'Mangal Dosha & Mars Compatibility', subtitle: 'Comparative Mars Position', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Evaluate Manglik status of both partners and cancellation rules.' },
    { id: 'seventh_house_synergy', sectionNumber: 16, title: '7th & 8th House Dual Synergy', subtitle: 'Marital Longevity & In-Laws Relationship', category: 'deep-analysis', targetPages: 1.5, promptGuidance: 'Examine 7th/8th lord placement in both charts.' },
    { id: 'current_dasha_impact', sectionNumber: 17, title: 'Current Dasha Synergy for Marriage', subtitle: 'Active Mahadashas Comparison', category: 'predictions', targetPages: 1.5, promptGuidance: 'Compare active dasha periods of both partners.' },
    { id: 'marriage_timing_windows', sectionNumber: 18, title: 'Marriage & Engagement Timing Windows', subtitle: 'Golden Dates & Transits', category: 'predictions', targetPages: 2, promptGuidance: 'Highlight best dates for wedding, engagement, and court registration.' },
    { id: 'family_progeny_prospects', sectionNumber: 19, title: 'Progeny & Family Expansion Prospects', subtitle: '5th House & Jupiter Blessings', category: 'predictions', targetPages: 1.5, promptGuidance: 'Evaluate children, family growth, and parental blessings.' },
    { id: 'lucky_days', sectionNumber: 20, title: 'Lucky Days for Wedding & Rituals', subtitle: 'Auspicious Days of the Week', category: 'remedies', targetPages: 1, promptGuidance: 'Identify lucky weekdays for wedding ceremonies.' },
    { id: 'lucky_numbers', sectionNumber: 21, title: 'Lucky Couple Numbers', subtitle: 'Numerology Compatibility', category: 'remedies', targetPages: 1, promptGuidance: 'Provide lucky numbers for couple accounts and homes.' },
    { id: 'lucky_colors', sectionNumber: 22, title: 'Lucky Colors for Wedding & Home', subtitle: 'Aura Harmony', category: 'remedies', targetPages: 1, promptGuidance: 'List colors to enhance peace and harmony.' },
    { id: 'favorable_periods', sectionNumber: 23, title: 'Favorable Annual Transits', subtitle: 'Jupiter & Venus Transit Support', category: 'predictions', targetPages: 1.5, promptGuidance: 'Annual transit roadmap for marital bliss.' },
    { id: 'marital_remedies', sectionNumber: 24, title: 'Matrimonial Remedies & Puja Guidance', subtitle: 'Mantras, Gemstones & Yantras', category: 'remedies', targetPages: 2, promptGuidance: 'Prescribe Gauri Shankar Rudraksha, Vishnu Sahasranamam, and charities.' },
    { id: 'personalized_conclusion', sectionNumber: 25, title: 'Personalized Matrimonial Blessing', subtitle: 'Final Wedding & Relationship Wisdom', category: 'conclusion', targetPages: 1, promptGuidance: 'Empowering matrimonial blessing.' }
  ]
};
