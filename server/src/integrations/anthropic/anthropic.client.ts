import Anthropic from '@anthropic-ai/sdk';
import { env, isClaudeConfigured } from '../../config/env';
import { ClaudeReportContent, GenerateReportContentParams } from './anthropic.types';
import { getMockAIInterpretation } from './mockInterpreter';
import { buildSystemPrompt, buildUserPrompt } from '../../reports/prompts/promptTemplates';
import { logger } from '../../utils/logger';

export class AnthropicClientEngine {
  private anthropic: Anthropic | null = null;

  constructor() {
    if (isClaudeConfigured) {
      this.anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    }
  }

  public async callClaudeForReport(params: GenerateReportContentParams): Promise<ClaudeReportContent> {
    if (!this.anthropic) {
      logger.info(`Anthropic API Key not set. Using internal Vedic fallback compiler for ${params.customer.name}`);
      return this.buildFallbackContent(params);
    }

    const { customer, reportType, astrologyData } = params;

    const systemPrompt = buildSystemPrompt(reportType);
    const userPrompt = buildUserPrompt(customer, reportType, astrologyData);

    try {
      const res = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        temperature: 0.2,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      });

      const text = res.content[0].type === 'text' ? res.content[0].text : '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return this.buildFallbackContent(params);
    } catch (err: any) {
      logger.warn(`Anthropic Claude API call failed (${err.message}). Using fallback Vedic synthesis.`);
      return this.buildFallbackContent(params);
    }
  }

  public async refineReportContent(
    params: GenerateReportContentParams,
    currentContent: ClaudeReportContent,
    mode: 'EXPAND' | 'CONDENSE',
    targetSectionIds: string[]
  ): Promise<ClaudeReportContent> {
    if (!this.anthropic) {
      logger.info(`Refinement mode [${mode}] called without Claude API key. Adjusting fallback content...`);
      return currentContent;
    }

    const { customer, reportType } = params;

    const actionText = mode === 'EXPAND' 
      ? 'EXPAND and elaborate deeply on the specified sections using the 5-step astrological framework (Factor -> Principle -> Application -> Interpretation -> Guidance). Do NOT use filler or repeat paragraphs.' 
      : 'CONDENSE the specified sections into succinct, powerful astrological prose while preserving all core facts.';

    const systemPrompt = `You are a master Vedic Astrologer refining an existing report for ${customer.name}.
Your goal is to ${actionText}
DO NOT fabricate planetary facts or alter birth details.
Return ONLY valid JSON in the exact same schema.`;

    const userPrompt = `REFINEMENT INSTRUCTIONS (${mode}):
Target Section IDs to adjust: ${targetSectionIds.join(', ')}

CURRENT REPORT JSON:
${JSON.stringify(currentContent, null, 2)}

Return the complete updated JSON with target sections refined.`;

    try {
      const res = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        temperature: 0.2,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      });

      const text = res.content[0].type === 'text' ? res.content[0].text : '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return currentContent;
    } catch (err: any) {
      logger.warn(`Anthropic refinement call failed (${err.message}). Returning current content.`);
      return currentContent;
    }
  }

  private buildFallbackContent(params: GenerateReportContentParams): ClaudeReportContent {
    const { customer, reportType, astrologyData } = params;
    const baseAI = getMockAIInterpretation(reportType, customer, {
      nakshatraDetails: {
        nakshatra: astrologyData.nakshatra?.name || 'Rohini',
        nakshatraLord: astrologyData.nakshatra?.lord || 'Moon',
        charna: astrologyData.nakshatra?.pada || 1,
        rashi: astrologyData.moon?.rashi || 'Vrishabha',
        rashiLord: 'Venus',
        gan: 'Deva',
        yoni: 'Gaja',
        nadi: 'Madhya'
      },
      mangalDosha: astrologyData.remedies?.mangalDosha || { hasDosha: false, description: 'No Manglik Dosha.' },
      kaalSarpDosha: astrologyData.remedies?.kaalSarpDosha || { hasDosha: false, description: 'No Kaal Sarp Dosha.' },
      planetaryPositions: astrologyData.planetaryPositions || [],
      dashaPeriods: astrologyData.dashas || []
    });

    return {
      reportTitle: baseAI.title,
      executiveSummary: baseAI.overview,
      sections: [
        {
          id: 'personality',
          title: 'Mind, Temperament & Personality Alignment',
          content: baseAI.personalityAndMind,
          bulletPoints: [
            `Birth Nakshatra: ${astrologyData.nakshatra?.name || 'Rohini'} (Pada ${astrologyData.nakshatra?.pada || 1})`,
            `Ascendant Sign: ${astrologyData.ascendant?.rashi || 'Mesha'} Lagna`,
            `Moon Sign: ${astrologyData.moon?.rashi || 'Vrishabha'}`
          ]
        },
        {
          id: 'career_wealth',
          title: 'Professional Destiny & Financial Growth',
          content: baseAI.careerAndWealth,
          highlights: ['10th House career alignment', 'Dhana Yoga accumulation potential']
        },
        {
          id: 'relationships',
          title: 'Relationships & Family Dynamics',
          content: baseAI.relationshipsAndFamily
        },
        {
          id: 'dasha',
          title: 'Vimshottari Dasha Analysis',
          content: baseAI.dashaAnalysis
        }
      ],
      luckyDays: ['Thursday', 'Friday', 'Monday'],
      luckyNumbers: [astrologyData.numerology?.lifePathNumber || 7, 3, 9],
      luckyColors: ['Yellow', 'Royal Blue', 'Cream White'],
      favorablePeriods: ['Q1 (Jan - Mar)', 'Q4 (Oct - Dec)'],
      remedies: baseAI.planetaryRemedies.map(r => ({
        category: r.category,
        title: r.remedy,
        description: `Prescribed mitigation for planetary balance under ${astrologyData.nakshatra?.name || 'natal'} alignment.`,
        instructions: r.instructions
      })),
      conclusion: `May the cosmic planetary influences guide ${customer.name} towards health, prosperity, and emotional fulfilment.`
    };
  }
}

export const anthropicClientEngine = new AnthropicClientEngine();
