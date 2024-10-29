import axios from 'axios';
import type { Space } from '../types/api';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchSpaces(): Promise<Space[]> {
  try {
    const response = await api.get<Space[]>('/spaces');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch spaces');
    }
    throw error;
  }
}