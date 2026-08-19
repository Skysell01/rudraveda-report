import axios from 'axios';
import { env, isProkeralaConfigured } from '../../config/env';
import { CustomerDetails, ProkeralaKundliResponse, ProkeralaMatchingResponse } from '../../types/report';
import { getMockProkeralaKundli, getMockProkeralaMatching } from './mockEngine';
import { logger } from '../../utils/logger';

class ProkeralaClient {
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  private async getAccessToken(): Promise<string> {
    if (!isProkeralaConfigured) {
      throw new Error('Prokerala API credentials are not configured');
    }

    if (this.accessToken && Date.now() < this.tokenExpiresAt - 60000) {
      return this.accessToken;
    }

    try {
      const res = await axios.post(
        'https://api.prokerala.com/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: env.PROKERALA_CLIENT_ID,
          client_secret: env.PROKERALA_CLIENT_SECRET
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      this.accessToken = res.data.access_token;
      this.tokenExpiresAt = Date.now() + res.data.expires_in * 1000;
      return this.accessToken!;
    } catch (err: any) {
      logger.error('Prokerala OAuth2 Token Error:', err.message);
      throw new Error(`Prokerala authentication failed: ${err.message}`);
    }
  }

  public async fetchKundliData(customer: CustomerDetails): Promise<ProkeralaKundliResponse> {
    if (!isProkeralaConfigured) {
      logger.info(`Using Prokerala Fallback Engine for customer: ${customer.name}`);
      return getMockProkeralaKundli(customer);
    }

    try {
      const token = await this.getAccessToken();
      const datetime = `${customer.dob}T${customer.tob}:00+05:30`;
      const coordinates = `${customer.location.latitude},${customer.location.longitude}`;

      const res = await axios.get('https://api.prokerala.com/v2/astrology/kundli', {
        headers: { Authorization: `Bearer ${token}` },
        params: { datetime, coordinates }
      });

      return {
        nakshatraDetails: res.data?.data?.nakshatra_details || getMockProkeralaKundli(customer).nakshatraDetails,
        mangalDosha: res.data?.data?.mangal_dosha || getMockProkeralaKundli(customer).mangalDosha,
        kaalSarpDosha: res.data?.data?.kaal_sarp_dosha || getMockProkeralaKundli(customer).kaalSarpDosha,
        planetaryPositions: res.data?.data?.planetary_positions || getMockProkeralaKundli(customer).planetaryPositions,
        dashaPeriods: res.data?.data?.dasha_periods || getMockProkeralaKundli(customer).dashaPeriods
      };
    } catch (err: any) {
      logger.warn(`Prokerala API call failed (${err.message}). Falling back to internal engine.`);
      return getMockProkeralaKundli(customer);
    }
  }

  public async fetchMatchingData(primary: CustomerDetails, secondary: CustomerDetails): Promise<ProkeralaMatchingResponse> {
    if (!isProkeralaConfigured) {
      return getMockProkeralaMatching(primary, secondary);
    }

    try {
      const token = await this.getAccessToken();
      const res = await axios.get('https://api.prokerala.com/v2/astrology/kundli/matching', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          boy_dob: `${primary.dob}T${primary.tob}:00+05:30`,
          boy_coordinates: `${primary.location.latitude},${primary.location.longitude}`,
          girl_dob: `${secondary.dob}T${secondary.tob}:00+05:30`,
          girl_coordinates: `${secondary.location.latitude},${secondary.location.longitude}`
        }
      });
      return res.data?.data || getMockProkeralaMatching(primary, secondary);
    } catch (err: any) {
      logger.warn(`Prokerala Matching API call failed (${err.message}). Falling back to internal engine.`);
      return getMockProkeralaMatching(primary, secondary);
    }
  }
}

export const prokeralaClient = new ProkeralaClient();
