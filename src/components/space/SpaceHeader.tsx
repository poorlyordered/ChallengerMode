import React from 'react';
import { Trophy, Globe } from 'lucide-react';
import type { Space } from '../../types/api';

interface SpaceHeaderProps {
  space: Space;
}

export function SpaceHeader({ space }: SpaceHeaderProps) {
  return (
    <div className="relative h-48">
      {space.bannerUrl ? (
        <img
          src={space.bannerUrl}
          alt={`${space.name} banner`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600" />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="absolute bottom-4 left-4 flex items-center">
        <div className="mr-4">
          {space.avatarUrl ? (
            <img
              src={space.avatarUrl}
              alt={`${space.name} avatar`}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Trophy className="w-10 h-10 text-blue-600" />
            </div>
          )}
        </div>
        <div className="text-white">
          <h1 className="text-3xl font-bold">{space.name}</h1>
          <div className="flex items-center mt-1">
            <Globe className="w-4 h-4 mr-1" />
            <span className="capitalize text-sm">{space.visibility}</span>
          </div>
        </div>
      </div>
    </div>
  );
}