import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { 
  generateReportHandler, 
  getJobStatusHandler, 
  downloadPdfHandler, 
  previewPdfHandler,
  deleteReportHandler,
  getHealthStatusHandler 
} from '../controllers/report.controller';

const router = Router();

// Primary endpoints
router.post('/generate', asyncHandler(generateReportHandler));
router.get('/:id/status', getJobStatusHandler);
router.get('/:id/download', downloadPdfHandler);
router.get('/:id/preview', previewPdfHandler);
router.delete('/:id', deleteReportHandler);

// Compatibility aliases
router.get('/status/:jobId', getJobStatusHandler);
router.get('/download/:jobId', downloadPdfHandler);
router.get('/preview/:jobId', previewPdfHandler);
router.get('/health', getHealthStatusHandler);

export default router;
