import React from 'react';
import { Shield, Users, Globe, Trophy, Calendar, Info } from 'lucide-react';
import type { Space } from '../types/api';

interface SpaceDetailsProps {
  space: Space;
}

export function SpaceDetails({ space }: SpaceDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <div className="text-sm text-gray-600">Members</div>
              <div className="text-xl font-bold text-gray-900">
                {space.memberCount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <Shield className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <div className="text-sm text-gray-600">Status</div>
              <div className="text-xl font-bold text-gray-900 capitalize">
                Active
              </div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <Calendar className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <div className="text-sm text-gray-600">Last Updated</div>
              <div className="text-xl font-bold text-gray-900">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}