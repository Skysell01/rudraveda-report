import axios from 'axios';
import { env, isProkeralaConfigured } from '../../config/env';
import { logger } from '../../utils/logger';

export class ProkeralaAuth {
  private static accessToken: string | null = null;
  private static tokenExpiresAt: number = 0;

  public static async getAccessToken(): Promise<string> {
    if (!isProkeralaConfigured) {
      throw new Error('Prokerala API credentials are not set in environment variables');
    }

    // Return cached token if valid (with 60 second safety buffer)
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
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 8000
        }
      );

      if (!res.data || !res.data.access_token) {
        throw new Error('Invalid response structure from Prokerala authentication server');
      }

      this.accessToken = res.data.access_token;
      this.tokenExpiresAt = Date.now() + (res.data.expires_in || 3600) * 1000;

      logger.info('Prokerala OAuth2 access token acquired and cached successfully');
      return this.accessToken!;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error_description || err.message || 'OAuth2 authentication failed';
      logger.error(`Prokerala OAuth2 authentication failure: ${errorMsg}`);
      throw new Error(`Prokerala OAuth2 authentication error: ${errorMsg}`);
    }
  }

  public static clearCache(): void {
    this.accessToken = null;
    this.tokenExpiresAt = 0;
  }
}
