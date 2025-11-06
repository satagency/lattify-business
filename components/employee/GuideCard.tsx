// components/employee/GuideCard.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Check } from 'lucide-react';
import { Guide, GuideProgress } from '@/lib/types';
import { ProgressBar } from './ProgressBar';
import { getCategoryLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface GuideCardProps {
  guide: Guide;
  progress?: GuideProgress;
  onClick?: () => void;
}

export function GuideCard({ guide, progress, onClick }: GuideCardProps) {
  const isComplete = progress?.status === 'complete';
  const progressPercentage = progress
    ? Math.round((progress.completedSteps / progress.totalSteps) * 100)
    : 0;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const cardContent = (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-medium cursor-pointer',
        isComplete && 'border-black'
      )}
      onClick={handleClick}
    >
      <div className="relative aspect-video bg-gray-100">
        <Image
          src={guide.thumbnail}
          alt={guide.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isComplete && (
          <div className="absolute top-2 right-2 bg-black text-white p-1.5 rounded-full">
            <Check className="h-4 w-4" />
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
            {getCategoryLabel(guide.category)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{guide.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{guide.estimatedTime} min</span>
          </div>
          <span>{guide.totalSteps} steps</span>
        </div>
        {progress && (
          <ProgressBar
            completed={progress.completedSteps}
            total={progress.totalSteps}
            showCheckmark={isComplete}
          />
        )}
      </div>
    </div>
  );

  if (onClick) {
    return cardContent;
  }

  return (
    <Link href={`/employee/guide/${guide.id}`} className="block">
      {cardContent}
    </Link>
  );
}

