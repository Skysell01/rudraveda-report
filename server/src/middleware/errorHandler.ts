import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

function sanitizeErrorText(text: string): string {
  if (!text) return text;
  return text
    .replace(/sk-ant-[a-zA-Z0-9_\-]+/g, 'sk-ant-***MASKED***')
    .replace(/client_secret=[^&\s]+/gi, 'client_secret=***MASKED***')
    .replace(/Bearer\s+[a-zA-Z0-9_\-\.]+/gi, 'Bearer ***MASKED***');
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error(`❌ Global Express Error Handler: ${sanitizeErrorText(err.message || 'Internal Error')}`);

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
    return;
  }

  const statusCode = err.statusCode || err.status || 500;
  // Generic safe message for client response to avoid secret leakage
  const clientMessage = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred during processing. Please try again.'
    : sanitizeErrorText(err.message || 'An unexpected internal server error occurred.');

  res.status(statusCode).json({
    success: false,
    error: clientMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: sanitizeErrorText(err.stack || '') })
  });
}
