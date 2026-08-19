import { ClaudeReportContent, GenerateReportContentParams } from './anthropic.types';
import { anthropicClientEngine } from './anthropic.client';

export async function generateReportContent(params: GenerateReportContentParams): Promise<ClaudeReportContent> {
  return anthropicClientEngine.callClaudeForReport(params);
}

export async function refineReportContent(
  params: GenerateReportContentParams,
  currentContent: ClaudeReportContent,
  mode: 'EXPAND' | 'CONDENSE',
  targetSectionIds: string[]
): Promise<ClaudeReportContent> {
  return anthropicClientEngine.refineReportContent(params, currentContent, mode, targetSectionIds);
}

export class AnthropicService {
  public async generateReportContent(params: GenerateReportContentParams): Promise<ClaudeReportContent> {
    return generateReportContent(params);
  }

  public async refineReportContent(
    params: GenerateReportContentParams,
    currentContent: ClaudeReportContent,
    mode: 'EXPAND' | 'CONDENSE',
    targetSectionIds: string[]
  ): Promise<ClaudeReportContent> {
    return refineReportContent(params, currentContent, mode, targetSectionIds);
  }
}

export const anthropicService = new AnthropicService();
