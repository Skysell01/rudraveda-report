import fs from 'fs';
import puppeteer, { Browser } from 'puppeteer';
import { AIInterpretation, CustomerDetails, ProkeralaKundliResponse, ProkeralaMatchingResponse, ReportType } from '../types/report';
import { validatePdfBuffer } from '../utils/pdfValidator';
import { renderReportHtml } from './templates/reportRenderer';
import { logger } from '../utils/logger';

class PdfEngine {
  private browser: Browser | null = null;

  private findSystemBrowserPath(): string | undefined {
    const possiblePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      process.env.PUPPETEER_EXECUTABLE_PATH
    ].filter(Boolean);

    for (const p of possiblePaths) {
      if (p && fs.existsSync(p)) {
        return p;
      }
    }
    return undefined;
  }

  private async getBrowser(): Promise<Browser> {
    if (!this.browser || !this.browser.connected) {
      const executablePath = this.findSystemBrowserPath();
      const launchOptions: any = {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
        ]
      };
      if (executablePath) {
        launchOptions.executablePath = executablePath;
      }
      this.browser = await puppeteer.launch(launchOptions);
    }
    return this.browser;
  }

  public async compilePdf(
    reportType: ReportType,
    primary: CustomerDetails,
    astrology: ProkeralaKundliResponse,
    ai: AIInterpretation,
    matching?: ProkeralaMatchingResponse,
    secondary?: CustomerDetails
  ): Promise<{ buffer: Buffer; fileName: string; pageCount: number }> {
    const html = renderReportHtml(reportType, primary, astrology, ai, matching, secondary);
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    try {
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfUint8Array = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
        preferCSSPageSize: true
      });

      const pdfBuffer = Buffer.from(pdfUint8Array);
      const validation = validatePdfBuffer(pdfBuffer);

      const sanitizedName = primary.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const fileName = `rudraveda_${reportType}_${sanitizedName}.pdf`;

      logger.info(`PDF compiled successfully. Size: ${validation.bufferSize} bytes, Pages: ${validation.pageCount}`);

      return {
        buffer: pdfBuffer,
        fileName,
        pageCount: validation.pageCount
      };
    } finally {
      await page.close().catch(() => {});
    }
  }
}

export const pdfEngine = new PdfEngine();
