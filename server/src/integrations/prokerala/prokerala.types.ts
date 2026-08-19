import { CustomerDetails, ReportType } from '../../types/report';

export type ProkeralaReportCategory = 
  | 'LOVE_REPORT'
  | 'WEALTH_REPORT'
  | 'CAREER_REPORT'
  | 'MARRIAGE_REPORT'
  | 'FIVE_YEAR_HOROSCOPE'
  | 'LOVE_CONSULTATION'
  | 'GENERAL_REPORT';

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

export interface NormalizedPlanet {
  name?: string;
  rashi: string;
  degree: number;
  nakshatra: string;
  isRetrograde?: boolean;
}

export interface AstrologyData {
  birthDetails: {
    dob: string;
    tob: string;
    latitude: number;
    longitude: number;
    timezone: string;
    locationName: string;
  };
  planetaryPositions: ProkeralaPlanetaryPosition[];
  houses: Array<{ house: number; sign: string; degree: number }>;
  ascendant: { rashi: string; degree: number; nakshatra: string };
  nakshatra: { name: string; lord: string; pada: number; rashi: string; rashiLord: string };
  moon: NormalizedPlanet;
  sun: NormalizedPlanet;
  venus: NormalizedPlanet;
  mars: NormalizedPlanet;
  jupiter: NormalizedPlanet;
  saturn: NormalizedPlanet;
  rahu: NormalizedPlanet;
  ketu: NormalizedPlanet;
  dashas: Array<{ currentDasha: string; currentAntardasha: string; startDate: string; endDate: string }>;
  yogas: Array<{ name: string; description: string; hasYoga: boolean }>;
  transits: Array<{ planet: string; rashi: string; transitDate: string }>;
  numerology: { lifePathNumber?: number; destinyNumber?: number };
  remedies: {
    mangalDosha?: { hasDosha: boolean; description: string };
    kaalSarpDosha?: { hasDosha: boolean; description: string };
  };
  charts: { lagnaChartSvg?: string };
  rawData?: any;
}
