import Anthropic from '@anthropic-ai/sdk';
import { env, isClaudeConfigured } from '../../config/env';
import { AIInterpretation, CustomerDetails, ProkeralaKundliResponse, ProkeralaMatchingResponse, ReportType } from '../../types/report';
import { getMockAIInterpretation } from './mockInterpreter';
import { logger } from '../../utils/logger';

class AnthropicClient {
  private anthropic: Anthropic | null = null;

  constructor() {
    if (isClaudeConfigured) {
      this.anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    }
  }

  public async generateInterpretation(
    reportType: ReportType,
    primary: CustomerDetails,
    astrology: ProkeralaKundliResponse,
    matching?: ProkeralaMatchingResponse,
    secondary?: CustomerDetails,
    customNotes?: string
  ): Promise<AIInterpretation> {
    if (!this.anthropic) {
      logger.info(`Using Claude AI Fallback Interpreter for reportType: ${reportType}`);
      return getMockAIInterpretation(reportType, primary, astrology);
    }

    try {
      const prompt = `You are a world-renowned Vedic Astrologer. Analyze the following astronomical coordinates and produce a structured JSON report.
Report Type: ${reportType}
Customer Name: ${primary.name}
Date of Birth: ${primary.dob} ${primary.tob}
Nakshatra: ${astrology.nakshatraDetails.nakshatra} (Lord: ${astrology.nakshatraDetails.nakshatraLord})
Rashi: ${astrology.nakshatraDetails.rashi} (Lord: ${astrology.nakshatraDetails.rashiLord})
Mangal Dosha: ${astrology.mangalDosha.hasDosha ? 'Yes' : 'No'}
${customNotes ? `Employee Notes: ${customNotes}` : ''}

Respond ONLY with valid JSON matching this schema:
{
  "title": "string",
  "overview": "string",
  "personalityAndMind": "string",
  "careerAndWealth": "string",
  "healthAndVitality": "string",
  "relationshipsAndFamily": "string",
  "dashaAnalysis": "string",
  "planetaryRemedies": [
    { "category": "Gemstone|Mantra|Charity|Yantra", "remedy": "string", "instructions": "string" }
  ],
  "yearlyForecast": [
    { "quarter": "string", "prediction": "string" }
  ]
}`;

      const res = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }]
      });

      const text = res.content[0].type === 'text' ? res.content[0].text : '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return getMockAIInterpretation(reportType, primary, astrology);
    } catch (err: any) {
      logger.warn(`Claude API interpretation failed (${err.message}). Using internal Vedic interpreter fallback.`);
      return getMockAIInterpretation(reportType, primary, astrology);
    }
  }
}

export const anthropicClient = new AnthropicClient();
