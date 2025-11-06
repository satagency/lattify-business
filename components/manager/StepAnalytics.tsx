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
      <div className="text-center py-16">
        <p className="text-sm text-gray-500">No problem steps identified</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-black" />
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500">Problem Steps</h3>
            <p className="text-xs text-gray-500 mt-1">Steps with high help request rates</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {problems.map((problem) => {
          const isSevere = problem.helpRequestRate > problem.averageRate * 2;
          const difference = problem.helpRequestRate - problem.averageRate;

          return (
            <div
              key={`${problem.guideId}-${problem.stepNumber}`}
              className={cn(
                'border rounded-lg p-6 transition-all',
                isSevere ? 'border-black bg-gray-50' : 'border-gray-200 bg-white'
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">
                    {problem.guideTitle}
                  </p>
                  <p className="text-xs text-gray-600 mb-2">
                    Step {problem.stepNumber}
                  </p>
                  <p className="text-xs text-gray-500">
                    {problem.helpRequests} help requests • {problem.totalAttempts} attempts
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light tracking-tight">{problem.helpRequestRate}%</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">help rate</p>
                </div>
              </div>

              {/* Progress bar comparison */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">This Step</span>
                    <span className="text-xs font-medium text-black">{problem.helpRequestRate}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        isSevere ? 'bg-black' : 'bg-gray-600'
                      )}
                      style={{ width: `${Math.min(problem.helpRequestRate, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Average</span>
                    <span className="text-xs text-gray-500">{problem.averageRate}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-300"
                      style={{ width: `${Math.min(problem.averageRate, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {difference > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="font-medium">
                      {difference.toFixed(1)}% above average
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

