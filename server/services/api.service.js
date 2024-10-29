import axios from 'axios';
import { AUTH_CONFIG } from '../config/constants.js';
import { ApiError } from '../utils/errors.js';
import { authService } from './auth.service.js';

class ApiService {
  async createApiClient() {
    const { access_token } = await authService.getAccessToken();
    
    return axios.create({
      baseURL: AUTH_CONFIG.API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: AUTH_CONFIG.REQUEST_TIMEOUT
    });
  }

  async fetchSpace(spaceId) {
    if (!spaceId) {
      throw new ApiError('Space ID is required', 400);
    }

    try {
      const api = await this.createApiClient();
      const response = await api.get(`/spaces/${spaceId}`);

      if (!response.data) {
        throw new ApiError('No data received from API');
      }

      return response.data;
    } catch (error) {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        path: `/spaces/${spaceId}`
      });

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        authService.clearToken();
        try {
          const newApi = await this.createApiClient();
          const retryResponse = await newApi.get(`/spaces/${spaceId}`);
          return retryResponse.data;
        } catch (retryError) {
          throw new ApiError(
            'Failed to fetch space data after token refresh',
            retryError.response?.status || 500,
            retryError.response?.data
          );
        }
      }

      throw new ApiError(
        'Failed to fetch space data',
        error.response?.status || 500,
        error.response?.data
      );
    }
  }
}

export const apiService = new ApiService();