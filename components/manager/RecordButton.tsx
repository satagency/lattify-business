// components/manager/RecordButton.tsx

'use client';

import React from 'react';
import { ChevronUp } from 'lucide-react';

interface RecordButtonProps {
  onRecord?: () => void;
  onUpload?: () => void;
}

export function RecordButton({ onRecord, onUpload }: RecordButtonProps) {
  return (
    <div className="inline-flex items-center bg-red-600 hover:bg-red-700 rounded-full transition-colors overflow-hidden">
      {/* Main Record Button */}
      <button
        onClick={onRecord}
        className="flex items-center gap-2.5 text-white px-5 py-2.5 bg-transparent hover:bg-red-700 transition-colors focus-ring border-none outline-none"
      >
        {/* Solid white circle */}
        <div className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
        <span className="font-medium text-sm">Record</span>
      </button>
      
      {/* Separator */}
      <div className="h-4 w-px bg-red-500/40 flex-shrink-0" />
      
      {/* Upload Button (Up Arrow) */}
      <button
        onClick={onUpload}
        className="flex items-center justify-center text-white px-3 py-2.5 bg-transparent hover:bg-red-700 transition-colors focus-ring border-none outline-none flex-shrink-0"
      >
        <ChevronUp className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}

