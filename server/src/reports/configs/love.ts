import { ReportModularConfig } from './types';

export const loveReportConfig: ReportModularConfig = {
  reportType: 'love-report',
  title: 'Comprehensive Vedic Love & Relationship Master Report',
  subtitle: 'An Exhaustive 30+ Page Astrological Blueprint of Romance, Venus & Soulmate Destiny',
  targetMinPages: 25,
  targetMaxPages: 50,
  totalSections: 25,
  sections: [
    {
      id: 'cover',
      sectionNumber: 1,
      title: 'Cover',
      subtitle: 'Celestial Romance & Natal Overview',
      category: 'cover',
      targetPages: 1,
      promptGuidance: 'Title page featuring customer name, birth details, and cosmic emblem.'
    },
    {
      id: 'introduction',
      sectionNumber: 2,
      title: 'Introduction',
      subtitle: 'Vedic Philosophy of Love & Relationships',
      category: 'overview',
      targetPages: 1,
      promptGuidance: 'Explain 5th house (romance), 7th house (partnership), and Venus as the significator of unconditional love.'
    },
    {
      id: 'birth_details',
      sectionNumber: 3,
      title: 'Birth Details',
      subtitle: 'Astronomical & Coordinate Audit',
      category: 'natal',
      targetPages: 1,
      promptGuidance: 'Display DOB, TOB, birth city coordinates, and timezone parameters.'
    },
    {
      id: 'astrology_overview',
      sectionNumber: 4,
      title: 'Astrology Overview',
      subtitle: 'Cosmic Snapshot & Planetary Matrix',
      category: 'natal',
      targetPages: 1,
      promptGuidance: 'Summarize Lagna, Moon sign, Nakshatra lord, and overall planetary balance.'
    },
    {
      id: 'natal_chart',
      sectionNumber: 5,
      title: 'Natal Chart',
      subtitle: 'South & North Indian Kundali Renderings',
      category: 'natal',
      targetPages: 1,
      promptGuidance: 'Render Lagna Kundali SVG chart and house longitudes table.'
    },
    {
      id: 'personality',
      sectionNumber: 6,
      title: 'Personality',
      subtitle: 'Lagna Lord & Core Demeanor',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Deep analysis of ascendant lord, house placement, and outward relationship disposition.'
    },
    {
      id: 'emotional_nature',
      sectionNumber: 7,
      title: 'Emotional Nature',
      subtitle: 'Moon Sign & Mind Subconscious',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Analyze Moon sign, Nakshatra quarter, and emotional bonding style.'
    },
    {
      id: 'love_personality',
      sectionNumber: 8,
      title: 'Love Personality',
      subtitle: '5th House & Romantic Affection',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Evaluate 5th house lord, planets residing in 5th house, and expression of romance.'
    },
    {
      id: 'venus_analysis',
      sectionNumber: 9,
      title: 'Venus Analysis',
      subtitle: 'Placement of Shukra Deva',
      category: 'deep-analysis',
      targetPages: 2,
      promptGuidance: 'In-depth breakdown of Venus rashi, house position, combustion, aspect, and dignity.'
    },
    {
      id: 'moon_analysis',
      sectionNumber: 10,
      title: 'Moon Analysis',
      subtitle: 'Chandra & Emotional Maturity',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Examine Moon house placement, paksha bala, and emotional security requirements.'
    },
    {
      id: 'relationship_patterns',
      sectionNumber: 11,
      title: 'Relationship Patterns',
      subtitle: 'Behavioral Cycles in Partnerships',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Identify recurring relationship habits, communication modes, and relational dynamics.'
    },
    {
      id: 'attraction_patterns',
      sectionNumber: 12,
      title: 'Attraction Patterns',
      subtitle: 'Magnetism & Partner Traits',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Analyze 7th house sign, 7th lord, and physical/intellectual partner traits attracted.'
    },
    {
      id: 'compatibility',
      sectionNumber: 13,
      title: 'Compatibility',
      subtitle: 'Element & Gana Alignment',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Evaluate Elemental compatibility (Fire, Earth, Air, Water) and Gana alignment.'
    },
    {
      id: 'marriage_potential',
      sectionNumber: 14,
      title: 'Marriage Potential',
      subtitle: '7th & 8th House Longevity',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Analyze 7th lord, Navamsha (D9) chart indicators, and marital stability.'
    },
    {
      id: 'relationship_challenges',
      sectionNumber: 15,
      title: 'Relationship Challenges',
      subtitle: 'Dosha Audit & Afflictions',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Evaluate Mangal Dosha, Saturn aspects on 7th house, Rahu/Ketu axis afflictions.'
    },
    {
      id: 'past_relationship_patterns',
      sectionNumber: 16,
      title: 'Past Relationship Patterns',
      subtitle: 'Karmic Lessons & Resolution',
      category: 'deep-analysis',
      targetPages: 1.5,
      promptGuidance: 'Examine Ketu placement and 12th house karmic influences on past bonds.'
    },
    {
      id: 'current_love_outlook',
      sectionNumber: 17,
      title: 'Current Love Outlook',
      subtitle: 'Active Dasha & Transit Matrix',
      category: 'predictions',
      targetPages: 1.5,
      promptGuidance: 'Analyze active Mahadasha/Antardasha and current Jupiter/Saturn transits.'
    },
    {
      id: 'future_love_outlook',
      sectionNumber: 18,
      title: 'Future Love Outlook',
      subtitle: '3-Year Romantic Timeline',
      category: 'predictions',
      targetPages: 2,
      promptGuidance: 'Detailed 3-year quarterly breakdown of romantic opportunities and meeting windows.'
    },
    {
      id: 'important_periods',
      sectionNumber: 19,
      title: 'Important Periods',
      subtitle: 'Auspicious Windows for Marriage',
      category: 'predictions',
      targetPages: 1.5,
      promptGuidance: 'Identify key golden dates, engagement windows, and high-compatibility transits.'
    },
    {
      id: 'lucky_days',
      sectionNumber: 20,
      title: 'Lucky Days',
      subtitle: 'Day Rulers for Love & Romance',
      category: 'remedies',
      targetPages: 1,
      promptGuidance: 'Identify fortunate weekdays based on Lagna lord and Venus placement.'
    },
    {
      id: 'lucky_numbers',
      sectionNumber: 21,
      title: 'Lucky Numbers',
      subtitle: 'Numerological Resonance',
      category: 'remedies',
      targetPages: 1,
      promptGuidance: 'Provide lucky numbers aligned with Life Path and Venus frequencies.'
    },
    {
      id: 'lucky_colors',
      sectionNumber: 22,
      title: 'Lucky Colors',
      subtitle: 'Aura & Wardrobe Harmony',
      category: 'remedies',
      targetPages: 1,
      promptGuidance: 'List favorable colors to wear during dates, events, and important meetings.'
    },
    {
      id: 'favorable_periods',
      sectionNumber: 23,
      title: 'Favorable Periods',
      subtitle: 'Annual Transit Milestones',
      category: 'predictions',
      targetPages: 1.5,
      promptGuidance: 'Highlight annual periods when Venus and Jupiter bless the natal chart.'
    },
    {
      id: 'remedies',
      sectionNumber: 24,
      title: 'Remedies',
      subtitle: 'Gemstones, Mantras & Charities',
      category: 'remedies',
      targetPages: 2,
      promptGuidance: 'Prescribe gemstones, Mantras, Yantras, and charities to balance Venus and 7th lord.'
    },
    {
      id: 'personalized_conclusion',
      sectionNumber: 25,
      title: 'Personalized Conclusion',
      subtitle: 'Final Astrological Blessings',
      category: 'conclusion',
      targetPages: 1,
      promptGuidance: 'Empowering personalized conclusion offering wisdom and harmony.'
    }
  ]
};
