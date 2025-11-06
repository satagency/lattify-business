// components/manager/MetricsCard.tsx

'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export function MetricsCard({
  title,
  value,
  subtitle,
  onClick,
  className,
}: MetricsCardProps) {
  const isClickable = !!onClick;

  const content = (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-lg p-6',
        isClickable && 'cursor-pointer hover:shadow-medium transition-shadow',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-black">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>
        {isClickable && (
          <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
        )}
      </div>
    </div>
  );

  return content;
}

