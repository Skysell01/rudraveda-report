import { AIInterpretation, CustomerDetails, ProkeralaKundliResponse, ReportType } from '../../types/report';

export function getMockAIInterpretation(
  reportType: ReportType,
  customer: CustomerDetails,
  astrology: ProkeralaKundliResponse
): AIInterpretation {
  const nakshatra = astrology.nakshatraDetails.nakshatra || 'Rohini';
  const rashi = astrology.nakshatraDetails.rashi || 'Vrishabha';

  const typeTitles: Record<string, string> = {
    'love-report': 'Vedic Love & Relationship Synthesis',
    'wealth-report': 'Dhana Yoga & Wealth Accumulation Analysis',
    'career-report': 'Professional Destiny & 10th House Forecast',
    'janam-kundali': 'Comprehensive Natal Chart & Destiny Analysis',
    'transit-horoscope': '5-Year Planetary Transit Roadmap',
    'numerology-report': 'Life Path & Numerological Vibrations',
    'karz-mukti': 'Karz Mukti Debt Relief & Financial Healing',
    'kundali-career': 'Natal Chart & Career Peak Forecast',
    'divorce-remarriage-love-kundali': 'Marital Healing & Second Phase Horoscope',
    'kundali-love-marriage': 'Kundali Relationship Master Analysis',
    'kundali-wealth': 'Natal Chart & Wealth Prosperity Guide',
    'kundali-love': 'Astrological Horoscope & Love Guide'
  };

  return {
    title: typeTitles[reportType] || 'Vedic Astrology Cosmic Interpretation',
    overview: `Born under the auspicious celestial influence of ${nakshatra} Nakshatra and ${rashi} Moon sign, ${customer.name} possesses a deeply resonant natal configuration. The alignment of planetary rulers indicates strong intuition, determination, and high growth potential across life cycles.`,
    personalityAndMind: `${customer.name} demonstrates a balanced temperament guided by ${astrology.nakshatraDetails.nakshatraLord}. Mind and emotions are stable, with strong aesthetic sensitivity, clear communication skills, and a high level of resilience under challenging situations.`,
    careerAndWealth: `The 10th and 11th houses show strong support for professional growth. Key opportunities peak during Mahadasha transitions. Wealth accumulation is favored through structured investments, specialized skills, and strategic financial planning.`,
    healthAndVitality: `Physical vitality remains robust. Maintaining regular sleep schedules, practicing yoga/meditation, and staying hydrated will safeguard energy levels during retrograde transits.`,
    relationshipsAndFamily: `Harmonious relationship dynamics are indicated. Open communication and mutual respect will resolve transient planetary tensions. Venus placement favors deep emotional bonding and domestic warmth.`,
    dashaAnalysis: `Currently operating under the major influence of ${astrology.dashaPeriods[0]?.currentDasha || 'Jupiter'} Mahadasha and ${astrology.dashaPeriods[0]?.currentAntardasha || 'Mercury'} Antardasha. This timeline activates creative intelligence, material growth, and spiritual insights.`,
    planetaryRemedies: [
      {
        category: 'Gemstone',
        remedy: 'Yellow Sapphire (Pukhraj) or Blue Sapphire (Neelam) in Gold/Silver ring',
        instructions: 'Wear on the right-hand index/middle finger on Thursday morning during Shukla Paksha after chanting Om Graam Greem Groom Sah Gurave Namah.'
      },
      {
        category: 'Mantra',
        remedy: 'Maha Mrityunjaya & Gayatri Mantra Chanting',
        instructions: 'Recite 108 times daily at sunrise facing East for mental clarity and protection.'
      },
      {
        category: 'Charity',
        remedy: 'Donation of Yellow Grains / Sesame Seeds',
        instructions: 'Donate food grains or warm blankets to the needy on Saturdays.'
      },
      {
        category: 'Yantra',
        remedy: 'Shree Yantra Worship',
        instructions: 'Place a sanctified Copper Shree Yantra in the North-East quadrant of your home/office.'
      }
    ],
    yearlyForecast: [
      { quarter: 'Q1 (Jan - Mar)', prediction: 'Strong momentum in career initiatives, new projects, and financial gain.' },
      { quarter: 'Q2 (Apr - Jun)', prediction: 'Emphasis on family harmony, travel, and skill enhancement.' },
      { quarter: 'Q3 (Jul - Sep)', prediction: 'Consolidation of wealth, minor health care, and strategic investments.' },
      { quarter: 'Q4 (Oct - Dec)', prediction: 'Major breakthroughs in goals, spiritual peace, and relationship happiness.' }
    ]
  };
}
