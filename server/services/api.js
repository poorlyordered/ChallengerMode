import axios from 'axios';
import { getAccessToken } from '../auth.js';

const API_BASE_URL = 'https://publicapi.challengermode.com/mk1';

async function createApiClient() {
  const { access_token } = await getAccessToken();
  
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: 15000,
    validateStatus: status => status >= 200 && status < 500
  });
}

export async function fetchSpace(spaceId) {
  try {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    const api = await createApiClient();
    const response = await api.get(`/spaces/${spaceId}`);

    if (response.status === 401) {
      // Token expired, retry once with new token
      cachedToken = null;
      const newApi = await createApiClient();
      const retryResponse = await newApi.get(`/spaces/${spaceId}`);
      
      if (!retryResponse.data) {
        throw new Error('No data received from API after retry');
      }
      
      return retryResponse.data;
    }

    if (!response.data) {
      throw new Error('No data received from API');
    }

    return response.data;
  } catch (error) {
    console.error('Space Fetch Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    const enhancedError = new Error(error.response?.data?.message || 'Failed to fetch space data');
    enhancedError.status = error.response?.status || 500;
    enhancedError.details = error.response?.data;
    throw enhancedError;
  }
}