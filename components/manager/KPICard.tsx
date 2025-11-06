// components/manager/KPICard.tsx

'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number; // percentage change
  changeType?: 'increase' | 'decrease' | 'neutral';
  subtitle?: string;
  comparison?: string; // e.g., "vs previous 7 days"
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeType,
  subtitle,
  comparison,
  className,
}: KPICardProps) {
  const getTrendIcon = () => {
    if (changeType === 'increase') return TrendingUp;
    if (changeType === 'decrease') return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (changeType === 'increase') return 'text-black';
    if (changeType === 'decrease') return 'text-gray-500';
    return 'text-gray-400';
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg p-6', className)}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</p>
        {change !== undefined && changeType && (
          <div className={cn('flex items-center gap-1 text-xs font-medium', getTrendColor())}>
            <TrendIcon className="h-3 w-3" />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <p className="text-4xl font-light tracking-tight text-black mb-1">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-600 font-light mb-2">{subtitle}</p>
      )}
      {comparison && (
        <p className="text-xs text-gray-400">{comparison}</p>
      )}
    </div>
  );
}

