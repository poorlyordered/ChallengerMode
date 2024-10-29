import React from 'react';
import { Users, Globe, Trophy } from 'lucide-react';
import type { Space } from '../types/api';

interface SpaceCardProps {
  space: Space;
}

export function SpaceCard({ space }: SpaceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {space.bannerUrl ? (
          <img
            src={space.bannerUrl}
            alt={`${space.name} banner`}
            className="w-full h-32 object-cover"
          />
        ) : (
          <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
        )}
        <div className="absolute bottom-0 transform translate-y-1/2 left-6">
          <div className="bg-white p-1 rounded-full shadow-lg">
            {space.avatarUrl ? (
              <img
                src={space.avatarUrl}
                alt={`${space.name} avatar`}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 pt-12">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{space.name}</h2>
        {space.description && (
          <p className="mt-2 text-gray-600 line-clamp-2">{space.description}</p>
        )}
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{space.memberCount.toLocaleString()} members</span>
          </div>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            <span className="capitalize">{space.visibility}</span>
          </div>
        </div>
      </div>
    </div>
  );
}