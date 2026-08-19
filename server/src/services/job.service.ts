import { CustomerDetails, JobStatus, ReportJob, ReportType } from '../types/report';
import { logger } from '../utils/logger';

class JobService {
  private jobs: Map<string, ReportJob> = new Map();
  private TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

  constructor() {
    setInterval(() => this.cleanupExpiredJobs(), 2 * 60 * 1000);
  }

  public createJob(reportId: string, reportType: ReportType, customerData: CustomerDetails): ReportJob {
    const job: ReportJob = {
      reportId,
      jobId: reportId,
      reportType,
      customerName: customerData.name,
      customerData,
      currentStatus: 'VALIDATING_INPUT',
      status: 'VALIDATING_INPUT',
      progressPercent: 10,
      progress: 10,
      currentStepMessage: 'Validating customer parameters & location coordinates',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.jobs.set(reportId, job);
    logger.info(`Job created in memory: reportId=${reportId}, customer=${customerData.name}`);
    return job;
  }

  public getJob(id: string): ReportJob | undefined {
    return this.jobs.get(id);
  }

  public updateProgress(
    id: string,
    status: JobStatus,
    progressPercent: number,
    stepMessage: string
  ): void {
    const job = this.jobs.get(id);
    if (!job) return;

    job.currentStatus = status;
    job.status = status;
    job.progressPercent = progressPercent;
    job.progress = progressPercent;
    job.currentStepMessage = stepMessage;
    job.updatedAt = Date.now();
  }

  public setCompleted(
    id: string,
    pdfBuffer: Buffer,
    pdfFileName: string,
    pageCount: number = 25,
    validationReport?: any
  ): void {
    const job = this.jobs.get(id);
    if (!job) return;

    job.currentStatus = 'COMPLETED';
    job.status = 'COMPLETED';
    job.progressPercent = 100;
    job.progress = 100;
    job.currentStepMessage = 'Report PDF ready for preview & download';
    job.pdfBuffer = pdfBuffer;
    job.pdfFileName = pdfFileName;
    job.pageCount = pageCount;
    job.validationReport = validationReport;
    job.updatedAt = Date.now();

    logger.info(`Job completed: reportId=${id}, fileName=${pdfFileName}, pages=${pageCount}, validationStatus=${validationReport?.status || 'VALID'}`);
  }

  public setFailed(id: string, errorMessage: string): void {
    const job = this.jobs.get(id);
    if (!job) return;

    job.currentStatus = 'FAILED';
    job.status = 'FAILED';
    job.error = errorMessage;
    job.currentStepMessage = `Failed: ${errorMessage}`;
    job.updatedAt = Date.now();

    logger.error(`Job failed: reportId=${id}, error=${errorMessage}`);
  }

  public deleteJob(id: string): void {
    this.jobs.delete(id);
    logger.info(`Job purged from RAM: reportId=${id}`);
  }

  private cleanupExpiredJobs(): void {
    const now = Date.now();
    for (const [id, job] of this.jobs.entries()) {
      if (now - job.createdAt > this.TTL_MS) {
        this.jobs.delete(id);
        logger.info(`Expired job purged from memory: reportId=${id}`);
      }
    }
  }
}

export const jobService = new JobService();
