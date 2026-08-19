import { CustomerDetails, ReportType } from '../../types/report';
import { AstrologyData } from '../../integrations/prokerala/prokerala.types';
import { getModularReportConfig } from '../configs';

export function buildSystemPrompt(reportType: ReportType): string {
  const modularConfig = getModularReportConfig(reportType);

  return `You are a master Vedic Astrologer, scholar, and author generating a professional personalized astrology report titled "${modularConfig.title}".

CORE RULES & MANDATES:
1. GROUNDED IN TRUTH: Use ONLY the supplied astrology data. Every single interpretation MUST be strictly grounded in the provided planetary positions, houses, Nakshatras, Dashas, transits, and numerology. Do NOT invent missing facts or uncalculated planets.
2. 5-STEP INTERPRETATION FRAMEWORK: For every important astrological interpretation in every section, follow this 5-step methodology:
   a. Identify the relevant astrological factor (e.g., Venus in 5th House in Rohini Nakshatra).
   b. Explain the underlying Vedic astrological principle.
   c. Explain how it specifically applies to this customer based on their birth parameters.
   d. Provide the in-depth personalized interpretation.
   e. Where appropriate, provide practical, actionable real-world guidance.
3. 25-50 PAGE DEPTH: The report must contain rich, thorough, professional prose detailed enough to produce a 25 to 50 page PDF. Major sections must be expansive and occupy their full allocated portion of the PDF. Do NOT produce extremely short 1-paragraph sections.
4. NO FILLER OR REPETITION: Do NOT repeat paragraphs, phrases, or generic horoscope boilerplate. Do NOT attempt to fake page count. The PDF rendering engine validates page density and uniqueness separately.
5. CLEAN CUSTOMER DISCLOSURE: Do NOT mention AI, Claude, Anthropic, Prokerala, APIs, prompts, or backend technical implementation anywhere in the output.
6. STAGING & STRUCTURE: Use clear headings, subheadings, paragraphs, bullet points, tables, and structured highlights where appropriate.
7. STRICT JSON OUTPUT: Return ONLY a single valid JSON object adhering strictly to the required schema. No markdown formatting code blocks, backticks, or preamble text outside JSON.`;
}

export function buildUserPrompt(
  customer: CustomerDetails,
  reportType: ReportType,
  astrologyData: AstrologyData
): string {
  const modularConfig = getModularReportConfig(reportType);

  const sectionBlueprintList = modularConfig.sections
    .map(s => `[Section ${s.sectionNumber}: ${s.id}]
Title: "${s.title}"
Subtitle: "${s.subtitle}"
Target Pages: ${s.targetPages} page(s)
Guidance: ${s.promptGuidance}`)
    .join('\n\n');

  return `GENERATE PERSONALIZED VEDIC ASTROLOGY REPORT:

CUSTOMER PROFILE:
- Full Name: ${customer.name}
- Gender: ${customer.gender}
- Date of Birth: ${customer.dob}
- Time of Birth: ${customer.tob}
- Birth Place: ${customer.location.name} (Latitude: ${customer.location.latitude}, Longitude: ${customer.location.longitude}, Timezone: ${customer.location.timezone})
- Selected Report Type: ${reportType}

REQUIRED SECTION BLUEPRINTS (${modularConfig.totalSections} SECTIONS TARGETING ${modularConfig.targetMinPages}-${modularConfig.targetMaxPages} PAGES):
${sectionBlueprintList}

SUPPLIED ASTROLOGICAL DATA (STRICT SOURCE OF TRUTH):
- Ascendant (Lagna): ${astrologyData.ascendant?.rashi || 'Mesha'} (${astrologyData.ascendant?.degree || 15}°) | Nakshatra: ${astrologyData.ascendant?.nakshatra || 'Ashwini'}
- Moon Sign (Rashi): ${astrologyData.moon?.rashi || 'Vrishabha'} (${astrologyData.moon?.degree || 15}°) | Nakshatra: ${astrologyData.nakshatra?.name || 'Rohini'} (Lord: ${astrologyData.nakshatra?.lord || 'Moon'}, Pada: ${astrologyData.nakshatra?.pada || 1})
- Sun Position: ${astrologyData.sun?.rashi || 'Simha'} (${astrologyData.sun?.degree || 15}°) | Nakshatra: ${astrologyData.sun?.nakshatra || 'Magha'}
- Venus Position: ${astrologyData.venus?.rashi || 'Vrishabha'} (${astrologyData.venus?.degree || 15}°) | Nakshatra: ${astrologyData.venus?.nakshatra || 'Rohini'}
- Mars Position: ${astrologyData.mars?.rashi || 'Vrischika'} (${astrologyData.mars?.degree || 15}°) | Nakshatra: ${astrologyData.mars?.nakshatra || 'Anuradha'}
- Jupiter Position: ${astrologyData.jupiter?.rashi || 'Dhanu'} (${astrologyData.jupiter?.degree || 15}°) | Nakshatra: ${astrologyData.jupiter?.nakshatra || 'Mula'}
- Saturn Position: ${astrologyData.saturn?.rashi || 'Makara'} (${astrologyData.saturn?.degree || 15}°) | Nakshatra: ${astrologyData.saturn?.nakshatra || 'Uttara Ashadha'}
- Rahu Position: ${astrologyData.rahu?.rashi || 'Kumbha'} (${astrologyData.rahu?.degree || 15}°) | Nakshatra: ${astrologyData.rahu?.nakshatra || 'Shatabhisha'}
- Ketu Position: ${astrologyData.ketu?.rashi || 'Simha'} (${astrologyData.ketu?.degree || 15}°) | Nakshatra: ${astrologyData.ketu?.nakshatra || 'Magha'}
- Mangal Dosha: ${astrologyData.remedies?.mangalDosha?.hasDosha ? 'Present: ' + (astrologyData.remedies.mangalDosha.description || 'Mars placement requires remedy') : 'Absent'}
- Kaal Sarp Dosha: ${astrologyData.remedies?.kaalSarpDosha?.hasDosha ? 'Present: ' + (astrologyData.remedies.kaalSarpDosha.description || 'Naga dosha alignment') : 'Absent'}
- Active Vimshottari Dasha: ${astrologyData.dashas[0]?.currentDasha || 'Jupiter'} Mahadasha - ${astrologyData.dashas[0]?.currentAntardasha || 'Mercury'} Antardasha (${astrologyData.dashas[0]?.startDate || 'Current'} to ${astrologyData.dashas[0]?.endDate || 'Future'})
- Numerology Life Path: ${astrologyData.numerology?.lifePathNumber || 7} (Destiny Number: ${astrologyData.numerology?.destinyNumber || 5})

STRICT JSON OUTPUT FORMAT TO RETURN:
{
  "reportTitle": "${modularConfig.title}",
  "executiveSummary": "Deep 2-paragraph executive overview summarizing core soul mission, ascendant lord, Moon nakshatra, and major dasha phase.",
  "sections": [
    {
      "id": "section_id",
      "title": "Section Title",
      "content": "Expansive 3 to 5 paragraph analysis following the 5-step interpretation framework (Factor identification -> Principle explanation -> Customer application -> Personalized interpretation -> Practical guidance).",
      "bulletPoints": ["Detailed key takeaway 1", "Detailed key takeaway 2", "Detailed key takeaway 3"],
      "tables": [
        {
          "headers": ["Astrological Factor", "Placement / Sign", "Vedic Significance", "Personal Impact"],
          "rows": [
            ["Moon Sign", "Vrishabha", "Exalted Moon", "High emotional stability and creative intuition"],
            ["Birth Nakshatra", "Rohini Pada 1", "Brahma Energy", "Magnetic attraction and artistic inclination"]
          ]
        }
      ],
      "highlights": ["Key cosmic insight or highlight banner message"]
    }
  ],
  "luckyDays": ["Thursday", "Friday", "Monday"],
  "luckyNumbers": [7, 3, 9, 21],
  "luckyColors": ["Royal Gold", "Ocean Blue", "Cream White"],
  "favorablePeriods": ["Q1 (Jan 15 - Mar 30): High planetary momentum", "Q3 (Jul 10 - Sep 25): Beneficial transit windows"],
  "remedies": [
    {
      "category": "Gemstone Therapy",
      "title": "Natural Yellow Sapphire (Pukhraj)",
      "description": "Strengthens Jupiter (Guru) as the lord of wisdom and luck.",
      "instructions": "Wear a 5+ carat unheated Yellow Sapphire set in Gold on the index finger of the right hand on Thursday morning during Shukla Paksha."
    },
    {
      "category": "Mantra Sadhana",
      "title": "Shree Shukra Beej Mantra",
      "description": "Harmonizes Venus and enhances relationship peace.",
      "instructions": "Chant 'Om Dram Dreem Droom Sah Shukraya Namah' 108 times daily facing East using a Sphatik mala."
    }
  ],
  "conclusion": "Comprehensive final astrological blessing and empowering closing advice."
}`;
}
