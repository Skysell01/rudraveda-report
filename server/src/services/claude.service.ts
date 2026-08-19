import Anthropic from '@anthropic-ai/sdk';
import { env, isClaudeConfigured } from '../config/env';
import { AIInterpretation, CustomerDetails, ProkeralaKundliResponse, ProkeralaMatchingResponse, ReportType } from '../types/report';

class ClaudeService {
  private anthropic: Anthropic | null = null;

  constructor() {
    if (isClaudeConfigured) {
      this.anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    }
  }

  public async generateInterpretation(
    reportType: ReportType,
    primaryCustomer: CustomerDetails,
    astrologyData: ProkeralaKundliResponse,
    matchingData?: ProkeralaMatchingResponse,
    secondaryCustomer?: CustomerDetails,
    customNotes?: string
  ): Promise<AIInterpretation> {
    if (!this.anthropic) {
      console.warn('⚠️ Anthropic Claude API key not provided. Generating rich structured fallback interpretation.');
      return this.getFallbackInterpretation(reportType, primaryCustomer, astrologyData, matchingData, secondaryCustomer);
    }

    try {
      const systemPrompt = `You are a revered, highly experienced Vedic Astrologer (Jyotish Acharya) with deep mastery in Parashari Jyotish, Jaimini Sutras, Dasha systems, and remedies.
Your goal is to interpret raw astronomical calculation data into profound, encouraging, practical, and highly detailed astrological interpretations.
Output MUST be strictly valid JSON matching this exact structure without markdown code blocks around it:
{
  "title": "Document Title",
  "overview": "Comprehensive 3-4 sentence summary of natal chart strength and core life destiny",
  "personalityAndMind": "Detailed paragraph analyzing temperament, elemental balance, and mental traits",
  "careerAndWealth": "Detailed paragraph analyzing 10th/2nd/11th house influences, suited professions, and financial timing",
  "healthAndVitality": "Detailed paragraph analyzing Lagna strength, immunity, potential vulnerabilities, and dietary advice",
  "relationshipsAndFamily": "Detailed paragraph analyzing 7th house, marital bliss, and interpersonal dynamics",
  "dashaAnalysis": "Detailed paragraph breaking down current Mahadasha/Antardasha effects and strategic guidance for the next 2-3 years",
  "planetaryRemedies": [
    { "category": "Gemstone", "remedy": "Name of Gemstone", "instructions": "Metal, finger, auspicious day/time to wear" },
    { "category": "Mantra", "remedy": "Specific Sanskrit Mantra", "instructions": "Count (e.g. 108 times daily), best morning time" },
    { "category": "Charity", "remedy": "Item or cause to donate to", "instructions": "Specific weekday and beneficiary" },
    { "category": "Yantra", "remedy": "Name of Sacred Geometric Yantra", "instructions": "Direction to place in worship room" }
  ],
  "yearlyForecast": [
    { "quarter": "Q1 (Jan - Mar)", "prediction": "Prediction string..." },
    { "quarter": "Q2 (Apr - Jun)", "prediction": "Prediction string..." },
    { "quarter": "Q3 (Jul - Sep)", "prediction": "Prediction string..." },
    { "quarter": "Q4 (Oct - Dec)", "prediction": "Prediction string..." }
  ]
}`;

      const userPrompt = `Generate a comprehensive Vedic Astrology interpretation for:
Customer: ${primaryCustomer.name} (${primaryCustomer.gender}, DOB: ${primaryCustomer.dob}, TOB: ${primaryCustomer.tob}, Place: ${primaryCustomer.location.name})
Report Type: ${reportType}
${secondaryCustomer ? `Partner: ${secondaryCustomer.name} (${secondaryCustomer.gender}, DOB: ${secondaryCustomer.dob}, TOB: ${secondaryCustomer.tob})` : ''}

Calculated Astrological Data:
- Moon Sign (Rashi): ${astrologyData.nakshatraDetails.rashi} (Lord: ${astrologyData.nakshatraDetails.rashiLord})
- Birth Star (Nakshatra): ${astrologyData.nakshatraDetails.nakshatra} (Pada ${astrologyData.nakshatraDetails.charna}, Lord: ${astrologyData.nakshatraDetails.nakshatraLord})
- Gana: ${astrologyData.nakshatraDetails.gan}, Yoni: ${astrologyData.nakshatraDetails.yoni}, Nadi: ${astrologyData.nakshatraDetails.nadi}
- Mangal Dosha: ${astrologyData.mangalDosha.description}
- Kaal Sarp Dosha: ${astrologyData.kaalSarpDosha.description}
- Key Planetary Positions: ${astrologyData.planetaryPositions.map(p => `${p.name} in ${p.rashi} (${p.degree}°)`).join(', ')}
- Current Dasha Timeline: ${astrologyData.dashaPeriods.map(d => `${d.currentDasha}-${d.currentAntardasha} (${d.startDate} to ${d.endDate})`).join('; ')}
${matchingData ? `- Kundali Matching Score: ${matchingData.obtainedPoints}/36 (${matchingData.compatibilityPercentage}% compatibility). Summary: ${matchingData.summary}` : ''}
${customNotes ? `- Special focus requested by employee: "${customNotes}"` : ''}

Write a deeply inspiring, authentic, and accurate Vedic interpretation. Response MUST be valid raw JSON only.`;

      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 3000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

      const parsed: AIInterpretation = JSON.parse(cleanJson);
      return parsed;
    } catch (err: any) {
      console.warn('⚠️ Anthropic Claude API call failed or response parse error. Falling back gracefully:', err.message);
      return this.getFallbackInterpretation(reportType, primaryCustomer, astrologyData, matchingData, secondaryCustomer);
    }
  }

  private getFallbackInterpretation(
    reportType: ReportType,
    primary: CustomerDetails,
    astrologyData: ProkeralaKundliResponse,
    matchingData?: ProkeralaMatchingResponse,
    secondary?: CustomerDetails
  ): AIInterpretation {
    const rashi = astrologyData.nakshatraDetails.rashi;
    const nakshatra = astrologyData.nakshatraDetails.nakshatra;
    const lord = astrologyData.nakshatraDetails.rashiLord;

    if (reportType === 'kundali-matching' && secondary && matchingData) {
      return {
        title: `Vedic Marriage Compatibility Analysis: ${primary.name} & ${secondary.name}`,
        overview: `The celestial alignment between ${primary.name} (${rashi}) and ${secondary.name} reveals an exceptionally balanced Guna Milan score of ${matchingData.obtainedPoints} out of 36 (${matchingData.compatibilityPercentage}% compatibility). This portends mutual spiritual alignment, financial prosperity, and emotional security.`,
        personalityAndMind: `${primary.name}'s ${nakshatra} lunar nakshatra brings intuitive wisdom and structured analytical thinking, which beautifully complements ${secondary.name}'s dynamic vitality and steady temperament. Communication flows naturally with minimal ego friction.`,
        careerAndWealth: `The joint financial axis shows mutual growth. ${primary.name}'s birth chart indicates stable asset accumulation, while ${secondary.name}'s horoscopic influences encourage entrepreneurial expansions and long-term security.`,
        healthAndVitality: `Nadi Koota scoring indicates favorable bio-energetic and genetic compatibility. Both partners carry complementary vitality markers, supporting long-term physical wellness and domestic peace.`,
        relationshipsAndFamily: `Emotional bonding (Bhakoot Koota) receives top ratings. The couple is blessed with deep mutual respect, shared devotion to family heritage, and harmonious co-existence with in-laws and relatives.`,
        dashaAnalysis: `The synchronized dasha periods for both individuals enter a highly supportive phase. Shared Jupiter and Venus sub-periods over the coming 3 years create ideal timings for marriage, home acquisition, and domestic celebrations.`,
        planetaryRemedies: [
          { category: 'Mantra', remedy: 'Om Lakshmi Narayana Namah', instructions: 'Recite 108 times together every Friday morning facing East.' },
          { category: 'Gemstone', remedy: 'Yellow Sapphire (Pukhraj)', instructions: 'For primary applicant on index finger in Gold on Thursday.' },
          { category: 'Charity', remedy: 'Distribution of Sweets & Milk', instructions: 'Donate to underprivileged children on auspicious Tuesdays.' },
          { category: 'Yantra', remedy: 'Shri Yantra', instructions: 'Install consecrated brass Shri Yantra in home altar facing North-East.' }
        ],
        yearlyForecast: [
          { quarter: 'Q1 (Jan - Mar)', prediction: 'Auspicous engagement or marriage declaration period with strong family blessings.' },
          { quarter: 'Q2 (Apr - Jun)', prediction: 'Joint travel and investment opportunities manifest under Venus transit.' },
          { quarter: 'Q3 (Jul - Sep)', prediction: 'Career milestones and stabilization of combined domestic assets.' },
          { quarter: 'Q4 (Oct - Dec)', prediction: 'Harmonious domestic bliss, spiritual celebrations, and family expansion.' }
        ]
      };
    }

    return {
      title: `Vedic Horoscope & Destiny Analysis for ${primary.name}`,
      overview: `${primary.name} is born under the exalted star of ${nakshatra} in ${rashi}, governed by ${lord}. This cosmic configuration grants sharp intellect, leadership qualities, resilience during adversity, and an innate alignment with prosperity and higher knowledge.`,
      personalityAndMind: `With the Moon situated in ${nakshatra}, your mind is characterized by intuitive clarity, emotional depth, and steady determination. You possess natural diplomacy combined with an unyielding commitment to truth. Elemental balance favors fire and earth, granting both vision and practical execution skills.`,
      careerAndWealth: `The 10th house of profession and 2nd house of accumulated wealth indicate significant career advancement. Benefic influences from ${astrologyData.planetaryPositions[4]?.name || 'Jupiter'} suggest success in advisory roles, executive management, technology, finance, or creative arts. Major wealth expansion is indicated during benefic dasha periods.`,
      healthAndVitality: `Your Lagna lord is well-fortified, conferring robust baseline vitality and immunity. Minor digestive or nervous fatigue may surface during intense work phases. Incorporating daily pranayama, warm sattvic meals, and grounding nature walks will maintain peak physical energy.`,
      relationshipsAndFamily: `The 7th house dynamic reflects high loyalty and deep expectations in partnerships. ${astrologyData.mangalDosha.hasDosha ? 'Mild Mars influence encourages open communication and avoiding impulsive decisions in close ties.' : 'Benefic aspects foster warm family relations, unconditional support from spouse, and happiness through offspring.'}`,
      dashaAnalysis: `You are currently experiencing the major influence of ${astrologyData.dashaPeriods[0]?.currentDasha || 'Jupiter'} Mahadasha. This cycle opens doors to prestige, higher learning, and asset creation. The upcoming transition into ${astrologyData.dashaPeriods[1]?.currentAntardasha || 'Mercury'} Antardasha will accelerate financial gains and long-distance opportunities.`,
      planetaryRemedies: [
        { category: 'Gemstone', remedy: `${lord === 'Sun' ? 'Ruby (Manik)' : lord === 'Venus' ? 'Diamond / White Sapphire' : lord === 'Jupiter' ? 'Yellow Sapphire (Pukhraj)' : 'Blue Sapphire / Amethyst'}`, instructions: 'Wear on designated finger set in Gold or Silver after morning rituals on your auspicious weekday.' },
        { category: 'Mantra', remedy: `Om Hram Hreem Hroum Sah ${lord}aye Namah`, instructions: 'Chant 108 times daily during sunrise using a Rudraksha or Sphatik rosary.' },
        { category: 'Charity', remedy: 'Feed Green Fodder to Cows / Food to Needy', instructions: 'Perform on Wednesdays or Saturdays to alleviate planetary afflictions.' },
        { category: 'Yantra', remedy: 'Navagraha Yantra', instructions: 'Place on clean altar facing East; offer incense every morning.' }
      ],
      yearlyForecast: [
        { quarter: 'Q1 (Jan - Mar)', prediction: 'Fresh professional opportunities and strategic financial investments yield high returns.' },
        { quarter: 'Q2 (Apr - Jun)', prediction: 'Expansion in social circle, beneficial travel, and mental peace through spiritual practice.' },
        { quarter: 'Q3 (Jul - Sep)', prediction: 'Consolidation of career achievements, potential promotion or business breakthrough.' },
        { quarter: 'Q4 (Oct - Dec)', prediction: 'Celebrations with family, personal growth, and strong health alignment.' }
      ]
    };
  }
}

export const claudeService = new ClaudeService();
