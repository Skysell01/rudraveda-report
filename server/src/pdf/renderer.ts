import puppeteer, { Browser } from 'puppeteer';
import fs from 'fs';
import { CustomerDetails, ReportType } from '../types/report';
import { AstrologyData } from '../integrations/prokerala/prokerala.types';
import { ClaudeReportContent } from '../integrations/anthropic/anthropic.types';
import { buildFullReportHtml } from './templates/reportTemplate';
import { validatePdfDocument } from './validator';
import { logger } from '../utils/logger';

export function getSystemBrowserPath(): string | undefined {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

export class PdfRendererEngine {
  public async renderPdfReport(
    reportType: ReportType,
    customer: CustomerDetails,
    astrologyData: AstrologyData,
    claudeContent: ClaudeReportContent
  ): Promise<{ buffer: Buffer; fileName: string; pageCount: number }> {
    const htmlContent = buildFullReportHtml(reportType, customer, astrologyData, claudeContent);
    const executablePath = getSystemBrowserPath();

    let browser: Browser | null = null;
    try {
      const launchOptions: any = {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-first-run',
          '--no-zygote',
          '--single-process'
        ]
      };
      if (executablePath) {
        launchOptions.executablePath = executablePath;
      }
      browser = await puppeteer.launch(launchOptions);

      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 30000 });

      const headerTemplate = `
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #94A3B8; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">
          <span>Rudraveda Astrological Report • ${customer.name}</span>
          <span>Confidential</span>
        </div>
      `;

      const footerTemplate = `
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #94A3B8; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; border-top: 1px solid #E2E8F0; padding-top: 4px;">
          <span>www.rudraveda.com</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `;

      const pdfUint8Array = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '12mm', bottom: '20mm', left: '12mm' },
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate
      });

      const pdfBuffer = Buffer.from(pdfUint8Array);

      // Validate %PDF- signature and calculate page count
      const { isValid, pageCount } = validatePdfDocument(pdfBuffer);
      if (!isValid) {
        throw new Error('Generated PDF buffer failed binary validation check');
      }

      const fileName = `${customer.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${reportType}_report.pdf`;
      logger.info(`Successfully generated A4 PDF (${pageCount} pages, ${pdfBuffer.length} bytes) for ${customer.name}`);

      return { buffer: pdfBuffer, fileName, pageCount };
    } catch (err: any) {
      logger.error(`PDF rendering failed: ${err.message}`);
      throw err;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

export const pdfRendererEngine = new PdfRendererEngine();
