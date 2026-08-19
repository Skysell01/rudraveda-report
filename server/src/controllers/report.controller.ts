import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validateGenerateReportPayload } from '../validators/report.validator';
import { jobService } from '../services/job.service';
import { reportService } from '../services/report.service';
import { isClaudeConfigured, isProkeralaConfigured } from '../config/env';

export async function generateReportHandler(req: Request, res: Response): Promise<void> {
  // 1. Validate Input via Zod Schema
  const payload = validateGenerateReportPayload(req.body);

  // 2. Generate temporary reportId
  const reportId = uuidv4();

  // 3. Store temporary job state in server memory
  const job = jobService.createJob(reportId, payload.reportType, payload.primaryCustomer);

  // 4. Start asynchronous report generation (Non-blocking)
  reportService.executeReportPipeline(reportId, payload).catch(err => {
    console.error(`❌ Non-blocking pipeline error for ${reportId}:`, err);
    jobService.setFailed(reportId, err.message || 'Report generation failed');
  });

  // 5. Immediately return response without holding HTTP request open
  res.status(202).json({
    success: true,
    reportId,
    jobId: reportId,
    status: 'processing'
  });
}

export function getJobStatusHandler(req: Request, res: Response): void {
  const id = (req.params.id || req.params.jobId || req.params.reportId) as string;
  if (!id) {
    res.status(400).json({ success: false, error: 'Report ID is required' });
    return;
  }

  const job = jobService.getJob(id);
  if (!job) {
    res.status(404).json({ success: false, error: 'Report job not found or has expired from RAM memory' });
    return;
  }

  res.json({
    success: true,
    reportId: job.reportId,
    jobId: job.jobId,
    customerName: job.customerName,
    status: job.status,
    currentStatus: job.status,
    progress: job.progressPercent,
    progressPercent: job.progressPercent,
    message: job.currentStepMessage,
    currentStepMessage: job.currentStepMessage,
    pageCount: job.status === 'COMPLETED' ? job.pageCount : null,
    pdfFileName: formatPdfFileName(job.customerName, job.reportType),
    validationReport: job.validationReport,
    error: job.error
  });
}

function formatPdfFileName(customerName: string, reportType: string): string {
  const cleanCustomer = (customerName || 'Customer').trim().replace(/[^a-zA-Z0-9]/g, '_');
  const cleanReportType = (reportType || 'Astrology').trim().replace(/[^a-zA-Z0-9]/g, '_');
  return `${cleanCustomer}-${cleanReportType}-Astrology-Report.pdf`;
}

export function downloadPdfHandler(req: Request, res: Response): void {
  const id = (req.params.id || req.params.jobId || req.params.reportId) as string;
  if (!id) {
    res.status(400).json({ success: false, error: 'Report ID is required' });
    return;
  }

  const job = jobService.getJob(id);
  if (!job || !job.pdfBuffer) {
    res.status(404).json({ success: false, error: 'PDF report not found, expired, or generation is still in progress' });
    return;
  }

  const fileName = formatPdfFileName(job.customerName, job.reportType);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Length', job.pdfBuffer.length);
  res.send(job.pdfBuffer);
}

export function previewPdfHandler(req: Request, res: Response): void {
  const id = (req.params.id || req.params.jobId || req.params.reportId) as string;
  if (!id) {
    res.status(400).json({ success: false, error: 'Report ID is required' });
    return;
  }

  const job = jobService.getJob(id);
  if (!job || !job.pdfBuffer) {
    res.status(404).json({ success: false, error: 'PDF report not found, expired, or generation is still in progress' });
    return;
  }

  const fileName = formatPdfFileName(job.customerName, job.reportType);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
  res.setHeader('Content-Length', job.pdfBuffer.length);
  res.send(job.pdfBuffer);
}

export function deleteReportHandler(req: Request, res: Response): void {
  const id = (req.params.id || req.params.jobId || req.params.reportId) as string;
  if (id) {
    jobService.deleteJob(id);
  }
  res.json({ success: true, message: 'Report job purged from in-memory RAM' });
}

export function getHealthStatusHandler(req: Request, res: Response): void {
  res.json({
    status: 'online',
    system: 'Rudraveda Ephemeral Report Generator Backend',
    integrations: {
      prokeralaApi: isProkeralaConfigured ? 'CONNECTED (Live OAuth2)' : 'FALLBACK ENGINE (No credentials set)',
      anthropicClaudeApi: isClaudeConfigured ? 'CONNECTED (Claude 3.5 Sonnet)' : 'FALLBACK ENGINE (No API Key set)'
    },
    uptime: process.uptime()
  });
}
