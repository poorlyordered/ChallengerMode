import axios from 'axios';
import { AUTH_CONFIG } from '../config/constants.js';
import { AuthError } from '../utils/errors.js';
import { validateEnvVariables } from '../utils/validation.js';

class AuthService {
  constructor() {
    this.cachedToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken(forceRefresh = false) {
    try {
      validateEnvVariables();

      if (!forceRefresh && this.isTokenValid()) {
        return { access_token: this.cachedToken };
      }

      const response = await axios.post(
        'https://publicapi.challengermode.com/v1/auth/access_keys',
        {
          refreshKey: process.env.REFRESH_KEY
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: AUTH_CONFIG.REQUEST_TIMEOUT
        }
      );

      if (!response.data?.value) {
        throw new AuthError('Invalid token response from server');
      }

      this.cachedToken = response.data.value;
      this.tokenExpiry = new Date(response.data.expiresAt).getTime();

      return {
        access_token: this.cachedToken,
        expires_at: response.data.expiresAt
      };
    } catch (error) {
      console.error('Auth Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      this.clearToken();

      const errorMessage = error.response?.data?.error?.message || 
                         error.response?.data?.message || 
                         error.message || 
                         'Failed to obtain access token';

      throw new AuthError(
        errorMessage,
        error.response?.status || 500,
        error.response?.data
      );
    }
  }

  isTokenValid() {
    return (
      this.cachedToken &&
      this.tokenExpiry &&
      Date.now() < (this.tokenExpiry - (AUTH_CONFIG.TOKEN_EXPIRY_MARGIN * 1000))
    );
  }

  clearToken() {
    this.cachedToken = null;
    this.tokenExpiry = null;
  }
}

export const authService = new AuthService();