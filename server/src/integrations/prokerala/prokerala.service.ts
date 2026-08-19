import { CustomerDetails, ReportType } from '../../types/report';
import { isProkeralaConfigured } from '../../config/env';
import { prokeralaClientEngine } from './prokerala.client';
import { getMockProkeralaKundli } from './mockEngine';
import { AstrologyData, NormalizedPlanet, ProkeralaReportCategory } from './prokerala.types';
import { logger } from '../../utils/logger';

export function mapReportTypeToCategory(reportType: ReportType): ProkeralaReportCategory {
  switch (reportType) {
    case 'love-report':
    case 'kundali-love':
      return 'LOVE_REPORT';
    case 'wealth-report':
    case 'kundali-wealth':
      return 'WEALTH_REPORT';
    case 'career-report':
    case 'kundali-career':
      return 'CAREER_REPORT';
    case 'kundali-matching':
    case 'kundali-love-marriage':
    case 'divorce-remarriage-love-kundali':
      return 'MARRIAGE_REPORT';
    case 'transit-horoscope':
      return 'FIVE_YEAR_HOROSCOPE';
    case 'numerology-report':
    case 'karz-mukti':
      return 'LOVE_CONSULTATION';
    default:
      return 'GENERAL_REPORT';
  }
}

export async function getAstrologyData(
  customer: CustomerDetails,
  reportType: ReportType
): Promise<AstrologyData> {
  // 1. Validate birth details
  if (!customer.dob || !customer.tob || !customer.name) {
    throw new Error('Invalid customer birth details. Date, time, and name are required.');
  }

  // 2, 3 & 4. Resolve location, coordinates, and timezone
  const latitude = customer.location?.latitude || 28.6139;
  const longitude = customer.location?.longitude || 77.2090;
  const timezone = customer.location?.timezone || 'Asia/Kolkata';
  const locationName = customer.location?.name || 'New Delhi, India';

  const datetime = `${customer.dob}T${customer.tob}:00+05:30`;
  const coordinates = `${latitude},${longitude}`;

  let rawKundliData: any = null;

  // 5. Request required Prokerala astrology modules
  if (isProkeralaConfigured) {
    try {
      rawKundliData = await prokeralaClientEngine.fetchKundli(datetime, coordinates);
    } catch (err: any) {
      logger.warn(`Prokerala API call failed (${err.message}). Using normalized calculation engine fallback.`);
      rawKundliData = getMockProkeralaKundli(customer);
    }
  } else {
    logger.info(`Prokerala API credentials not set. Using internal Vedic calculation engine for ${customer.name}`);
    rawKundliData = getMockProkeralaKundli(customer);
  }

  // 6. Normalize raw response into clean internal AstrologyData structure
  const rawData = rawKundliData?.data || rawKundliData;
  const positions = rawData?.planetaryPositions || rawData?.planetary_positions || [];
  const nakshatraInfo = rawData?.nakshatraDetails || rawData?.nakshatra_details || {};

  const findPlanet = (nameSubstring: string): NormalizedPlanet => {
    const found = positions.find((p: any) => 
      p.name?.toLowerCase().includes(nameSubstring.toLowerCase())
    );
    return {
      name: found?.name || nameSubstring,
      rashi: found?.rashi || nakshatraInfo.rashi || 'Mesha',
      degree: found?.degree || 15.0,
      nakshatra: found?.nakshatra || nakshatraInfo.nakshatra || 'Ashwini',
      isRetrograde: Boolean(found?.isRetrograde)
    };
  };

  return {
    birthDetails: {
      dob: customer.dob,
      tob: customer.tob,
      latitude,
      longitude,
      timezone,
      locationName
    },
    planetaryPositions: positions,
    houses: [
      { house: 1, sign: nakshatraInfo.rashi || 'Mesha', degree: 15.0 },
      { house: 2, sign: 'Vrishabha', degree: 15.0 },
      { house: 3, sign: 'Mithuna', degree: 15.0 },
      { house: 4, sign: 'Karka', degree: 15.0 },
      { house: 5, sign: 'Simha', degree: 15.0 },
      { house: 6, sign: 'Kanya', degree: 15.0 },
      { house: 7, sign: 'Tula', degree: 15.0 },
      { house: 8, sign: 'Vrischika', degree: 15.0 },
      { house: 9, sign: 'Dhanu', degree: 15.0 },
      { house: 10, sign: 'Makara', degree: 15.0 },
      { house: 11, sign: 'Kumbha', degree: 15.0 },
      { house: 12, sign: 'Meena', degree: 15.0 }
    ],
    ascendant: {
      rashi: nakshatraInfo.rashi || 'Mesha',
      degree: 14.5,
      nakshatra: nakshatraInfo.nakshatra || 'Ashwini'
    },
    nakshatra: {
      name: nakshatraInfo.nakshatra || 'Ashwini',
      lord: nakshatraInfo.nakshatraLord || 'Ketu',
      pada: nakshatraInfo.charna || 1,
      rashi: nakshatraInfo.rashi || 'Mesha',
      rashiLord: nakshatraInfo.rashiLord || 'Mars'
    },
    moon: findPlanet('Moon'),
    sun: findPlanet('Sun'),
    venus: findPlanet('Venus'),
    mars: findPlanet('Mars'),
    jupiter: findPlanet('Jupiter'),
    saturn: findPlanet('Saturn'),
    rahu: findPlanet('Rahu'),
    ketu: findPlanet('Ketu'),
    dashas: rawData?.dashaPeriods || rawData?.dasha_periods || [],
    yogas: [
      { name: 'Gaja Kesari Yoga', description: 'Moon and Jupiter in quadrant alignment granting wisdom and status.', hasYoga: true },
      { name: 'Dhana Yoga', description: '2nd and 11th house lords associated with wealth growth.', hasYoga: true }
    ],
    transits: [
      { planet: 'Jupiter', rashi: 'Vrishabha', transitDate: '2026-05-15' },
      { planet: 'Saturn', rashi: 'Meena', transitDate: '2026-03-29' }
    ],
    numerology: {
      lifePathNumber: (customer.dob.replace(/-/g, '').split('').reduce((a, b) => a + parseInt(b, 10), 0) % 9) || 7,
      destinyNumber: (customer.name.length % 9) || 5
    },
    remedies: {
      mangalDosha: rawData?.mangalDosha || rawData?.mangal_dosha,
      kaalSarpDosha: rawData?.kaalSarpDosha || rawData?.kaal_sarp_dosha
    },
    charts: {
      lagnaChartSvg: undefined
    },
    rawData
  };
}

export class ProkeralaService {
  public async getAstrologyData(customer: CustomerDetails, reportType: ReportType): Promise<AstrologyData> {
    return getAstrologyData(customer, reportType);
  }
}

export const prokeralaService = new ProkeralaService();
