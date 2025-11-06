// components/manager/StepAnalytics.tsx

'use client';

import React from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProblem {
  guideId: string;
  guideTitle: string;
  stepNumber: number;
  helpRequestRate: number; // percentage
  averageRate: number; // average across all steps
  helpRequests: number;
  totalAttempts: number;
}

interface StepAnalyticsProps {
  problems: StepProblem[];
}

export function StepAnalytics({ problems }: StepAnalyticsProps) {
  if (problems.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No problem steps identified</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-black" />
        <h3 className="text-lg font-semibold">Problem Steps</h3>
        <span className="text-sm text-gray-500">
          Steps with high help request rates
        </span>
      </div>

      <div className="space-y-3">
        {problems.map((problem) => {
          const isSevere = problem.helpRequestRate > problem.averageRate * 2;
          const difference = problem.helpRequestRate - problem.averageRate;

          return (
            <div
              key={`${problem.guideId}-${problem.stepNumber}`}
              className={cn(
                'border rounded-lg p-4',
                isSevere ? 'border-black bg-gray-50' : 'border-gray-200'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="font-medium">
                    {problem.guideTitle} - Step {problem.stepNumber}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {problem.helpRequests} help requests out of {problem.totalAttempts} attempts
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{problem.helpRequestRate}%</p>
                  <p className="text-xs text-gray-500">help rate</p>
                </div>
              </div>

              {/* Simple progress bar comparison */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-20">This step:</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        isSevere ? 'bg-black' : 'bg-gray-600'
                      )}
                      style={{ width: `${Math.min(problem.helpRequestRate, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium w-12 text-right">
                    {problem.helpRequestRate}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-20">Average:</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-300"
                      style={{ width: `${Math.min(problem.averageRate, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">
                    {problem.averageRate}%
                  </span>
                </div>
              </div>

              {difference > 0 && (
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>
                    {difference.toFixed(1)}% above average
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

