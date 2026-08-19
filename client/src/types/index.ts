export type Gender = 'male' | 'female' | 'other';
export type ChartStyle = 'north-indian' | 'south-indian';
export type Language = 'en' | 'hi';

export type ReportType = 
  | 'love-report'
  | 'wealth-report'
  | 'career-report'
  | 'janam-kundali'
  | 'kundali-matching'
  | 'dasha-remedies'
  | 'transit-horoscope'
  | 'numerology-report'
  | 'karz-mukti'
  | 'kundali-career'
  | 'divorce-remarriage-love-kundali'
  | 'kundali-love-marriage'
  | 'kundali-wealth'
  | 'kundali-love'
  | 'five-year-horoscope'
  | 'love-consultation';

export interface LocationInput {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CustomerDetails {
  name: string;
  gender: Gender;
  dob: string;
  tob: string;
  location: LocationInput;
  language?: Language;
  chartStyle?: ChartStyle;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string;
  tob: string;
  birthPlace: string;
  country: string;
  email: string;
  phone: string;
  location: LocationInput;
}

export function formDataToCustomerDetails(formData: CustomerFormData): CustomerDetails {
  const name = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
  return {
    name,
    gender: formData.gender,
    dob: formData.dob,
    tob: formData.tob,
    location: formData.location.name ? formData.location : {
      name: `${formData.birthPlace}, ${formData.country}`,
      latitude: 28.6139,
      longitude: 77.2090,
      timezone: 'Asia/Kolkata'
    }
  };
}

export interface GenerateReportRequest {
  reportType: ReportType;
  primaryCustomer: CustomerDetails;
  secondaryCustomer?: CustomerDetails;
  language?: Language;
  chartStyle?: ChartStyle;
  customNotes?: string;
}

export type JobStatus = 
  | 'VALIDATING_INPUT'
  | 'FETCHING_ASTROLOGY'
  | 'ASTROLOGY_COMPLETE'
  | 'CLAUDE_ANALYSIS'
  | 'CONTENT_GENERATED'
  | 'GENERATING_PDF'
  | 'VALIDATING_PDF'
  | 'REFINING_REPORT'
  | 'COMPLETED'
  | 'FAILED';

export interface JobProgressResponse {
  reportId: string;
  jobId: string;
  status: JobStatus;
  progress: number;
  progressPercent: number;
  message: string;
  currentStepMessage: string;
  pageCount: number | null;
  customerName?: string;
  pdfFileName?: string;
  error?: string;
}

export interface SystemHealth {
  status: string;
  system: string;
  integrations: {
    prokeralaApi: string;
    anthropicClaudeApi: string;
  };
}
