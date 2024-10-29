import { useQuery } from 'react-query';
import type { Space } from '../types/api';

async function fetchSpaces(): Promise<Space[]> {
  try {
    const response = await fetch('/api/spaces');
    if (!response.ok) {
      throw new Error('Failed to fetch spaces');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An error occurred');
  }
}

export function useSpaces() {
  return useQuery<Space[], Error>('spaces', fetchSpaces, {
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    onError: (error) => {
      console.error('Error fetching spaces:', error);
    }
  });
}