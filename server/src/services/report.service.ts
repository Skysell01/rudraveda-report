import { GenerateReportPayload } from '../types/report';
import { jobService } from './job.service';
import { prokeralaClient } from '../integrations/prokerala/client';
import { anthropicClient } from '../integrations/anthropic/client';
import { pdfService } from './pdf.service';
import { logger } from '../utils/logger';
import { getAstrologyData } from '../integrations/prokerala/prokerala.service';
import { generateReportContent, refineReportContent } from '../integrations/anthropic/anthropic.service';
import { pdfValidatorEngine } from '../pdf/validator';

class ReportService {
  public async executeReportPipeline(reportId: string, payload: GenerateReportPayload): Promise<void> {
    const { reportType, primaryCustomer, secondaryCustomer, customNotes } = payload;

    try {
      // Status 1: VALIDATING_INPUT (10%)
      jobService.updateProgress(reportId, 'VALIDATING_INPUT', 10, 'Validating customer parameters & birth location coordinates');

      // Status 2: FETCHING_ASTROLOGY (25%)
      jobService.updateProgress(reportId, 'FETCHING_ASTROLOGY', 25, 'Requesting planetary coordinates & dasha timelines from Prokerala API');
      const normalizedAstrology = await getAstrologyData(primaryCustomer, reportType);

      // Status 3: ASTROLOGY_COMPLETE (40%)
      jobService.updateProgress(reportId, 'ASTROLOGY_COMPLETE', 40, 'Astrological planetary positions & house dignities normalized successfully');

      // Status 4: CLAUDE_ANALYSIS (55%)
      jobService.updateProgress(reportId, 'CLAUDE_ANALYSIS', 55, 'Synthesizing deep Vedic predictions & remedies via Anthropic Claude 3.5 Sonnet');
      const claudeContent = await generateReportContent({
        customer: primaryCustomer,
        reportType,
        astrologyData: normalizedAstrology
      });

      // Status 5: CONTENT_GENERATED (70%)
      jobService.updateProgress(reportId, 'CONTENT_GENERATED', 70, 'Astrological analysis & 25-section report blueprint generated');

      // Status 6: GENERATING_PDF (82%)
      jobService.updateProgress(reportId, 'GENERATING_PDF', 82, 'Rendering multi-page HTML/CSS cosmic layout & Lagna SVG chart via Puppeteer');
      
      let currentClaudeContent = claudeContent;
      let renderedPdf = await pdfService.renderPdfReport(
        reportType,
        primaryCustomer,
        normalizedAstrology,
        currentClaudeContent
      );

      // Status 7: VALIDATING_PDF (90%)
      jobService.updateProgress(reportId, 'VALIDATING_PDF', 90, 'Validating PDF binary signature, required sections & 25-50 page count density');

      let sectionIds = (currentClaudeContent.sections || []).map(s => s.id);
      let validationReport = pdfValidatorEngine.analyzePdfStructure(renderedPdf.pageCount, sectionIds, ['personality', 'remedies']);

      // Refinement Loop (Max 3 attempts)
      const MAX_REFINEMENT_ATTEMPTS = 3;
      let attempt = 0;

      while (!validationReport.isValid && attempt < MAX_REFINEMENT_ATTEMPTS) {
        attempt++;
        // Status 8: REFINING_REPORT (95%)
        jobService.updateProgress(reportId, 'REFINING_REPORT', 95, `Refining report content (Attempt ${attempt}/${MAX_REFINEMENT_ATTEMPTS}: ${validationReport.status})`);
        logger.info(`PDF Refinement Attempt ${attempt}/${MAX_REFINEMENT_ATTEMPTS}: Status = ${validationReport.status}, Current Pages = ${validationReport.pageCount}`);

        if (validationReport.status === 'NEEDS_EXPANSION' || validationReport.pageCount < 25) {
          // Identify shortest sections for meaningful expansion
          const sortedSections = [...(currentClaudeContent.sections || [])].sort(
            (a, b) => (a.content || '').length - (b.content || '').length
          );
          const shortestSectionIds = sortedSections.slice(0, 3).map(s => s.id);

          logger.info(`Expanding shortest sections: ${shortestSectionIds.join(', ')}`);
          currentClaudeContent = await refineReportContent(
            { customer: primaryCustomer, reportType, astrologyData: normalizedAstrology },
            currentClaudeContent,
            'EXPAND',
            shortestSectionIds
          );
        } else if (validationReport.status === 'NEEDS_COMPRESSION' || validationReport.pageCount > 50) {
          // Identify longest verbose sections for compression
          const sortedSections = [...(currentClaudeContent.sections || [])].sort(
            (a, b) => (b.content || '').length - (a.content || '').length
          );
          const verboseSectionIds = sortedSections.slice(0, 3).map(s => s.id);

          logger.info(`Condensing verbose sections: ${verboseSectionIds.join(', ')}`);
          currentClaudeContent = await refineReportContent(
            { customer: primaryCustomer, reportType, astrologyData: normalizedAstrology },
            currentClaudeContent,
            'CONDENSE',
            verboseSectionIds
          );
        } else {
          // Valid or unresolvable structural error -> stop refinement loop
          break;
        }

        // Re-render PDF with refined content and re-validate
        renderedPdf = await pdfService.renderPdfReport(
          reportType,
          primaryCustomer,
          normalizedAstrology,
          currentClaudeContent
        );

        sectionIds = (currentClaudeContent.sections || []).map(s => s.id);
        validationReport = pdfValidatorEngine.analyzePdfStructure(renderedPdf.pageCount, sectionIds, ['personality', 'remedies']);
      }

      // Step 8: Completed (100%)
      jobService.setCompleted(reportId, renderedPdf.buffer, renderedPdf.fileName, renderedPdf.pageCount, validationReport);
      logger.info(`Report pipeline completed for reportId: ${reportId} (Final Pages: ${renderedPdf.pageCount}, Validation Status: ${validationReport.status})`);
    } catch (err: any) {
      logger.error(`Report pipeline execution failed for reportId: ${reportId}:`, err);
      jobService.setFailed(reportId, err.message || 'Report generation failed');
    }
  }
}

export const reportService = new ReportService();
