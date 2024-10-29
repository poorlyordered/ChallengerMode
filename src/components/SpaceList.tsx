import React from 'react';
import { useQuery } from 'react-query';
import { SpaceCard } from './SpaceCard';
import { SpaceDetails } from './SpaceDetails';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';
import { EmptyState } from './EmptyState';
import { fetchSpaces } from '../services/api';
import type { Space } from '../types/api';

export function SpaceList() {
  const { data: spaces, isLoading, error } = useQuery<Space[], Error>(
    'spaces',
    fetchSpaces,
    {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  if (!spaces || spaces.length === 0) {
    return <EmptyState />;
  }

  // Since we're looking up information about our space,
  // we'll show the first space in detail view
  const primarySpace = spaces[0];
  const otherSpaces = spaces.slice(1);

  return (
    <div className="space-y-8">
      <SpaceDetails space={primarySpace} />
      
      {otherSpaces.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Other Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}