// components/manager/MetricsCard.tsx

'use client';

import React from 'react';
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
        'bg-white border border-gray-200 rounded-lg p-8 transition-all',
        isClickable && 'cursor-pointer hover:border-black hover:shadow-sm',
        className
      )}
      onClick={onClick}
    >
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">{title}</p>
        <p className="text-5xl font-light tracking-tight text-black mb-2">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-600 font-light">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return content;
}

