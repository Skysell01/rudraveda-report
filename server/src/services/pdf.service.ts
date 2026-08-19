import { CustomerDetails, ReportType } from '../types/report';
import { AstrologyData } from '../integrations/prokerala/prokerala.types';
import { ClaudeReportContent } from '../integrations/anthropic/anthropic.types';
import { pdfRendererEngine } from '../pdf/renderer';

class PdfService {
  public async renderPdfReport(
    reportType: ReportType,
    customer: CustomerDetails,
    astrologyData: AstrologyData,
    claudeContent: ClaudeReportContent
  ): Promise<{ buffer: Buffer; fileName: string; pageCount: number }> {
    return pdfRendererEngine.renderPdfReport(reportType, customer, astrologyData, claudeContent);
  }
}

export const pdfService = new PdfService();
