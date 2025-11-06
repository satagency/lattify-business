// components/manager/RankingsCard.tsx

'use client';

import React from 'react';
import { Ranking } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RankingsCardProps {
  rankings: Ranking[];
}

export function RankingsCard({ rankings }: RankingsCardProps) {
  const getComparisonIcon = (comparison: Ranking['comparison']) => {
    switch (comparison) {
      case 'above':
        return TrendingUp;
      case 'below':
        return TrendingDown;
      case 'average':
        return Minus;
      default:
        return Minus;
    }
  };

  const getComparisonColor = (comparison: Ranking['comparison']) => {
    switch (comparison) {
      case 'above':
        return 'text-black';
      case 'below':
        return 'text-gray-500';
      case 'average':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRankingBadge = (rank: number, total: number) => {
    const percentile = ((total - rank + 1) / total) * 100;
    if (percentile >= 75) return 'bg-black text-white';
    if (percentile >= 50) return 'bg-gray-600 text-white';
    return 'bg-gray-300 text-black';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Award className="h-4 w-4 text-gray-500" />
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">Competitive Rankings</h3>
      </div>
      <div className="space-y-6">
        {rankings.map((ranking, index) => {
          const Icon = getComparisonIcon(ranking.comparison);
          const isLast = index === rankings.length - 1;

          return (
            <div key={ranking.metric} className={cn('space-y-4', !isLast && 'pb-6 border-b border-gray-200')}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{ranking.metric}</span>
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs px-2 py-1 rounded font-medium', getRankingBadge(ranking.rank, ranking.totalCompetitors))}>
                    #{ranking.rank} of {ranking.totalCompetitors}
                  </span>
                  <Icon className={cn('h-4 w-4', getComparisonColor(ranking.comparison))} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Percentile</span>
                  <span className="font-medium">{ranking.percentile}th</span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all"
                    style={{ width: `${ranking.percentile}%` }}
                  />
                </div>
              </div>
              {ranking.sisterProperties && ranking.sisterProperties.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Sister Properties</p>
                  <div className="space-y-2">
                    {ranking.sisterProperties.map((property) => (
                      <div key={property.name} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{property.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">#{property.rank}</span>
                          <span className="text-gray-400">/</span>
                          <span className="font-medium">{property.value}</span>
                        </div>
                      </div>
                    ))}
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

