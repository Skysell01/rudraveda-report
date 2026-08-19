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
  firstName?: string;
  lastName?: string;
  name: string;
  gender: Gender;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:mm
  birthPlace?: string;
  country?: string;
  email?: string;
  phone?: string;
  location: LocationInput;
  language?: Language;
  chartStyle?: ChartStyle;
}

export interface GenerateReportPayload {
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

export interface ReportJob {
  reportId: string;
  jobId: string;
  reportType: ReportType;
  customerName: string;
  customerData: CustomerDetails;
  currentStatus: JobStatus;
  status: JobStatus;
  progressPercent: number;
  progress: number;
  currentStepMessage: string;
  createdAt: number;
  updatedAt: number;
  pdfBuffer?: Buffer;
  generatedPdfPath?: string;
  pdfFileName?: string;
  pageCount?: number;
  validationReport?: any;
  error?: string;
}

export interface ProkeralaPlanetaryPosition {
  id: number;
  name: string;
  longitude: number;
  isRetrograde: boolean;
  position: number;
  degree: number;
  rashi: string;
  rashiLord: string;
  nakshatra: string;
  nakshatraLord: string;
  nakshatraPada: number;
}

export interface ProkeralaKundliResponse {
  nakshatraDetails: {
    nakshatra: string;
    nakshatraLord: string;
    charna: number;
    rashi: string;
    rashiLord: string;
    gan: string;
    yoni: string;
    nadi: string;
  };
  mangalDosha: {
    hasDosha: boolean;
    description: string;
  };
  kaalSarpDosha: {
    hasDosha: boolean;
    type?: string;
    description: string;
  };
  planetaryPositions: ProkeralaPlanetaryPosition[];
  dashaPeriods: {
    currentDasha: string;
    currentAntardasha: string;
    startDate: string;
    endDate: string;
  }[];
}

export interface ProkeralaMatchingResponse {
  totalPoints: number;
  obtainedPoints: number;
  compatibilityPercentage: number;
  summary: string;
  kootaDetails: {
    name: string;
    maxPoints: number;
    obtainedPoints: number;
    description: string;
  }[];
}

export interface AIInterpretation {
  title: string;
  overview: string;
  personalityAndMind: string;
  careerAndWealth: string;
  healthAndVitality: string;
  relationshipsAndFamily: string;
  dashaAnalysis: string;
  planetaryRemedies: {
    category: 'Gemstone' | 'Mantra' | 'Charity' | 'Yantra';
    remedy: string;
    instructions: string;
  }[];
  yearlyForecast?: {
    quarter: string;
    prediction: string;
  }[];
}
