import { z } from 'zod';

// Helper to strip dangerous HTML / script tags from strings
function sanitizeString(str: string): string {
  if (!str) return str;
  return str.replace(/<[^>]*>?/gm, '').trim();
}

const locationSchema = z.object({
  name: z.string().transform(sanitizeString).pipe(z.string().min(1, 'Birth place is required')),
  latitude: z.number().min(-90).max(90).default(28.6139),
  longitude: z.number().min(-180).max(180).default(77.2090),
  timezone: z.string().transform(sanitizeString).default('Asia/Kolkata')
});

const customerSchema = z.object({
  firstName: z.string().transform(sanitizeString).optional(),
  lastName: z.string().transform(sanitizeString).optional(),
  name: z.string().transform(sanitizeString).pipe(z.string().min(1, 'Customer name is required')),
  gender: z.enum(['male', 'female', 'other']).default('male'),
  dob: z.string().transform(sanitizeString).pipe(z.string().min(1, 'Date of birth is required')),
  tob: z.string().transform(sanitizeString).pipe(z.string().min(1, 'Time of birth is required')),
  birthPlace: z.string().transform(sanitizeString).optional(),
  country: z.string().transform(sanitizeString).optional(),
  email: z.string().transform(sanitizeString).pipe(z.string().email().optional().or(z.literal(''))),
  phone: z.string().transform(sanitizeString).optional(),
  location: locationSchema
});

export const generateReportSchema = z.object({
  reportType: z.enum([
    'love-report',
    'wealth-report',
    'career-report',
    'janam-kundali',
    'kundali-matching',
    'dasha-remedies',
    'transit-horoscope',
    'numerology-report',
    'karz-mukti',
    'kundali-career',
    'divorce-remarriage-love-kundali',
    'kundali-love-marriage',
    'kundali-wealth',
    'kundali-love',
    'five-year-horoscope',
    'love-consultation'
  ], { required_error: 'Valid report type is required' }),
  primaryCustomer: customerSchema,
  secondaryCustomer: customerSchema.optional(),
  language: z.enum(['en', 'hi']).optional(),
  chartStyle: z.enum(['north-indian', 'south-indian']).optional(),
  customNotes: z.string().transform(sanitizeString).optional()
});

export function validateGenerateReportPayload(data: any) {
  // Normalize name if firstName & lastName are present
  if (data?.primaryCustomer && !data.primaryCustomer.name && (data.primaryCustomer.firstName || data.primaryCustomer.lastName)) {
    data.primaryCustomer.name = `${data.primaryCustomer.firstName || ''} ${data.primaryCustomer.lastName || ''}`.trim();
  }

  // Ensure location object is present
  if (data?.primaryCustomer && !data.primaryCustomer.location) {
    data.primaryCustomer.location = {
      name: data.primaryCustomer.birthPlace || 'New Delhi, India',
      latitude: 28.6139,
      longitude: 77.2090,
      timezone: 'Asia/Kolkata'
    };
  }

  return generateReportSchema.parse(data);
}
