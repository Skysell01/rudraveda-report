import { CustomerDetails, ReportType } from '../../types/report';
import { AstrologyData } from '../prokerala/prokerala.types';

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  bulletPoints?: string[];
  tables?: Array<{ headers: string[]; rows: string[][] }>;
  highlights?: string[];
}

export interface RemedyItem {
  category: string;
  title: string;
  description: string;
  instructions: string;
}

export interface ClaudeReportContent {
  reportTitle: string;
  executiveSummary: string;
  sections: ReportSection[];
  luckyDays: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  favorablePeriods: string[];
  remedies: RemedyItem[];
  conclusion: string;
}

export interface GenerateReportContentParams {
  customer: CustomerDetails;
  reportType: ReportType;
  astrologyData: AstrologyData;
  reportConfiguration?: any;
}
