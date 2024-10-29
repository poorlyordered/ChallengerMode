import React from 'react';
import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Search className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No Spaces Found</h3>
        <p className="text-gray-600 max-w-md">
          We couldn't find any spaces at the moment. Please check back later or refresh the page.
        </p>
      </div>
    </div>
  );
}