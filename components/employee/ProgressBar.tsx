// components/employee/ProgressBar.tsx

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  completed: number;
  total: number;
  showCheckmark?: boolean;
  className?: string;
}

export function ProgressBar({
  completed,
  total,
  showCheckmark = false,
  className,
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = completed === total;

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          {completed} of {total} steps
        </span>
        {showCheckmark && isComplete && (
          <Check className="h-5 w-5 text-black" aria-hidden="true" />
        )}
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300',
            isComplete ? 'bg-black' : 'bg-gray-600'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage}% complete`}
        />
      </div>
      {percentage > 0 && percentage < 100 && (
        <span className="text-xs text-gray-500 mt-1 block">{percentage}%</span>
      )}
    </div>
  );
}

