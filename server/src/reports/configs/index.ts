import { ReportType } from '../../types/report';
import { ReportModularConfig } from './types';
import { loveReportConfig } from './love';
import { wealthReportConfig } from './wealth';
import { careerReportConfig } from './career';
import { marriageReportConfig } from './marriage';
import { fiveYearReportConfig } from './fiveYear';
import { consultationReportConfig } from './consultation';
import { generalReportConfig } from './general';

export * from './types';
export * from './love';
export * from './wealth';
export * from './career';
export * from './marriage';
export * from './fiveYear';
export * from './consultation';
export * from './general';

export function getModularReportConfig(reportType: ReportType): ReportModularConfig {
  switch (reportType) {
    case 'love-report':
    case 'kundali-love':
      return loveReportConfig;
    case 'wealth-report':
    case 'kundali-wealth':
      return wealthReportConfig;
    case 'career-report':
    case 'kundali-career':
      return careerReportConfig;
    case 'kundali-matching':
    case 'kundali-love-marriage':
    case 'divorce-remarriage-love-kundali':
      return marriageReportConfig;
    case 'transit-horoscope':
      return fiveYearReportConfig;
    case 'numerology-report':
    case 'karz-mukti':
    case 'love-consultation':
      return consultationReportConfig;
    default:
      return generalReportConfig;
  }
}
