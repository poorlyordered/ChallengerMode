import axios, { AxiosError } from 'axios';
import type { Space, ApiResponse } from '../types/api';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function fetchSpaces(): Promise<Space[]> {
  try {
    const response = await api.get<ApiResponse<Space>>('/spaces');
    
    if (!response.data?.items) {
      throw new Error('Invalid response format');
    }
    
    return response.data.items;
  } catch (error) {
    console.error('API Error:', {
      message: axios.isAxiosError(error) 
        ? error.response?.data?.error?.message || 'Failed to fetch spaces'
        : 'An unexpected error occurred',
      status: axios.isAxiosError(error) ? error.response?.status : undefined,
      path: '/spaces'
    });

    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.error?.message || 'Failed to fetch spaces'
        : 'An unexpected error occurred'
    );
  }
}