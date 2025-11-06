// components/manager/RecordButton.tsx

'use client';

import React from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordButtonProps {
  onRecord?: () => void;
  onUpload?: () => void;
  className?: string;
}

export function RecordButton({ 
  onRecord, 
  onUpload,
  className 
}: RecordButtonProps) {
  const handleRecordClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRecord?.();
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onUpload?.();
  };

  return (
    <div 
      className={cn(
        'inline-flex items-center rounded-full bg-red-600 hover:bg-red-700 transition-colors',
        className
      )}
      role="group"
    >
      <button
        type="button"
        onClick={handleRecordClick}
        className={cn(
          'flex items-center gap-2.5 px-5 py-2.5 text-white',
          'hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
          'transition-colors rounded-l-full'
        )}
        aria-label="Record video"
      >
        <span className="w-2 h-2 rounded-full bg-white" aria-hidden="true" />
        <span className="text-sm font-medium">Record</span>
      </button>

      <div 
        className="h-4 w-px bg-red-500/40 flex-shrink-0" 
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={handleUploadClick}
        className={cn(
          'flex items-center justify-center px-3 py-2.5 text-white',
          'hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
          'transition-colors rounded-r-full'
        )}
        aria-label="Upload video"
      >
        <ChevronUp className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
