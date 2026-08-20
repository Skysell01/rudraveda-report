import axios, { AxiosRequestConfig } from 'axios';
import { isProkeralaConfigured } from '../../config/env';
import { ProkeralaAuth } from './prokerala.auth';
import { getMockProkeralaKundli, getMockProkeralaMatching } from './mockEngine';
import { logger } from '../../utils/logger';

export class ProkeralaClient {
  private static BASE_URL = 'https://api.prokerala.com/v2/astrology';
  private static TIMEOUT = 10000;

  public async fetchEndpoint(endpoint: string, params: Record<string, any>, retries = 2): Promise<any> {
    if (!isProkeralaConfigured) {
      throw new Error('Prokerala API is not configured');
    }

    let token = await ProkeralaAuth.getAccessToken();

    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${ProkeralaClient.BASE_URL}${endpoint}`,
      headers: { Authorization: `Bearer ${token}` },
      params,
      timeout: ProkeralaClient.TIMEOUT
    };

    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        const response = await axios(config);
        return response.data;
      } catch (err: any) {
        const status = err.response?.status;

        // Handle 401 Unauthorized (Expired Token)
        if (status === 401 && attempt === 1) {
          logger.warn('Prokerala API returned 401. Refreshing token and retrying...');
          ProkeralaAuth.clearCache();
          token = await ProkeralaAuth.getAccessToken();
          config.headers!['Authorization'] = `Bearer ${token}`;
          continue;
        }

        // Handle 429 Rate Limit
        if (status === 429) {
          logger.warn(`Prokerala API Rate Limit (429) hit on attempt ${attempt}. Waiting 1500ms...`);
          await new Promise(res => setTimeout(res, 1500));
          continue;
        }

        // Handle transient 5xx errors
        if (status >= 500 && attempt <= retries) {
          logger.warn(`Prokerala API Transient Server Error (${status}) on attempt ${attempt}. Retrying...`);
          await new Promise(res => setTimeout(res, 1000 * attempt));
          continue;
        }

        logger.error(`Prokerala API call failed on ${endpoint}: ${err.message}`);
        throw err;
      }
    }
  }

  public async fetchKundli(datetime: string, coordinates: string): Promise<any> {
    return this.fetchEndpoint('/kundli', { datetime, coordinates, ayanamsa: 1 });
  }

  public async fetchPanchang(datetime: string, coordinates: string): Promise<any> {
    return this.fetchEndpoint('/panchang', { datetime, coordinates });
  }

  public async fetchMatching(boyDob: string, boyCoords: string, girlDob: string, girlCoords: string): Promise<any> {
    return this.fetchEndpoint('/kundli/matching', {
      boy_dob: boyDob,
      boy_coordinates: boyCoords,
      girl_dob: girlDob,
      girl_coordinates: girlCoords
    });
  }
}

export const prokeralaClientEngine = new ProkeralaClient();
