// components/manager/GoalsCard.tsx

'use client';

import React from 'react';
import { HotelGoal } from '@/lib/types';
import { Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalsCardProps {
  goals: HotelGoal[];
}

export function GoalsCard({ goals }: GoalsCardProps) {
  const getCategoryIcon = (category: HotelGoal['category']) => {
    switch (category) {
      case 'training':
        return Target;
      case 'performance':
        return TrendingUp;
      case 'engagement':
        return TrendingUp;
      case 'quality':
        return Target;
      default:
        return Target;
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'bg-black';
    if (percentage >= 70) return 'bg-gray-600';
    return 'bg-gray-400';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
      <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Hotel Goals</h3>
      <div className="space-y-6 flex-1">
        {goals.map((goal) => {
          const Icon = getCategoryIcon(goal.category);
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isOnTrack = goal.current >= goal.target * 0.85;

          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{goal.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {goal.current}{goal.unit}
                  </span>
                  <span className="text-xs text-gray-400">/</span>
                  <span className="text-sm text-gray-500">
                    {goal.target}{goal.unit}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full transition-all', getProgressColor(goal.current, goal.target))}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{Math.round(progress)}% complete</span>
                  {goal.deadline && (
                    <span>
                      Due {goal.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

