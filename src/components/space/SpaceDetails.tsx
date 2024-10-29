import React from 'react';
import { Info } from 'lucide-react';
import type { Space } from '../../types/api';
import { SpaceHeader } from './SpaceHeader';
import { SpaceMetrics } from './SpaceMetrics';

interface SpaceDetailsProps {
  space: Space;
}

export function SpaceDetails({ space }: SpaceDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <SpaceHeader space={space} />
      
      <div className="p-6">
        {space.description && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              About
            </h2>
            <p className="text-gray-600">{space.description}</p>
          </div>
        )}

        <SpaceMetrics space={space} />
      </div>
    </div>
  );
}