import React from 'react';
import { Loader } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loader className="w-8 h-8 animate-spin text-blue-600" />
      <p className="text-gray-600 font-medium">Loading spaces...</p>
    </div>
  );
}