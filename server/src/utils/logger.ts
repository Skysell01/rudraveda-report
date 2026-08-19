/**
 * Security-Conscious Logger Utility
 * Prevents PII leakage, secret token disclosure, and credential logging.
 */

function sanitizeLogMessage(msg: string): string {
  if (!msg) return msg;
  // Mask Anthropic API Keys (sk-ant-...)
  let sanitized = msg.replace(/sk-ant-[a-zA-Z0-9_\-]+/g, 'sk-ant-***MASKED***');
  // Mask Bearer tokens
  sanitized = sanitized.replace(/Bearer\s+[a-zA-Z0-9_\-\.]+/gi, 'Bearer ***MASKED***');
  // Mask Prokerala secrets
  sanitized = sanitized.replace(/client_secret=[^&\s]+/gi, 'client_secret=***MASKED***');
  return sanitized;
}

export function sanitizeCustomerForLogs(customer: any): { name: string; dob: string } {
  if (!customer) return { name: 'Anonymous', dob: '****-**-**' };
  const nameParts = (customer.name || 'Customer').trim().split(' ');
  const firstName = nameParts[0] || 'Customer';
  const lastInitial = nameParts.length > 1 ? `${nameParts[nameParts.length - 1][0]}.` : '';
  return {
    name: `${firstName} ${lastInitial}`.trim(),
    dob: customer.dob ? customer.dob.replace(/\d{2}$/, '**') : '****-**-**'
  };
}

export const logger = {
  info: (msg: string, ...meta: any[]) => {
    console.log(`[INFO] [${new Date().toISOString()}] ${sanitizeLogMessage(msg)}`, ...meta);
  },
  warn: (msg: string, ...meta: any[]) => {
    console.warn(`[WARN] [${new Date().toISOString()}] ${sanitizeLogMessage(msg)}`, ...meta);
  },
  error: (msg: string, ...meta: any[]) => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${sanitizeLogMessage(msg)}`, ...meta);
  },
  debug: (msg: string, ...meta: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] [${new Date().toISOString()}] ${sanitizeLogMessage(msg)}`, ...meta);
    }
  }
};
