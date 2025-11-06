// components/manager/ActivityCard.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  href?: string;
  className?: string;
}

export function ActivityCard({
  icon: Icon,
  value,
  label,
  href,
  className,
}: ActivityCardProps) {
  const content = (
    <div className={cn(
      'bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all',
      href && 'cursor-pointer hover:border-black hover:shadow-sm',
      className
    )}>
      <Icon className="h-8 w-8 text-gray-600 mb-3" />
      <p className="text-3xl font-light tracking-tight text-black mb-1">{value}</p>
      <p className="text-sm text-gray-600 font-light">{label}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

