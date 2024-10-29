import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-red-50 p-6">
      <div className="flex items-center">
        <AlertOctagon className="h-8 w-8 text-red-500" />
        <div className="ml-4">
          <h3 className="text-lg font-medium text-red-800">Error</h3>
          <p className="mt-2 text-red-700">{message}</p>
          <p className="mt-2 text-sm text-red-600">
            Please check your connection and try again later.
          </p>
        </div>
      </div>
    </div>
  );
}