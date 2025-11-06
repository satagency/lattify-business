// components/manager/VideoAnalyticsSidebar.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Guide, VideoAnalytics } from '@/lib/types';

interface VideoAnalyticsSidebarProps {
  guide: Guide;
  analytics: VideoAnalytics | null;
}

export function VideoAnalyticsSidebar({ guide, analytics }: VideoAnalyticsSidebarProps) {
  if (!analytics) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors shadow-lg text-sm flex items-center gap-2">
            <span>Open video</span>
            <Image src="/icons_lattify.ai/right-arrow.svg" alt="Arrow" width={16} height={16} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="space-y-4">
        {/* Visits */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icons_lattify.ai/visits.svg" alt="Visits" width={16} height={16} className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-900">Visits</span>
            <Image src="/icons_lattify.ai/question.svg" alt="Help" width={12} height={12} className="w-3 h-3" />
          </div>
          <span className="text-sm text-gray-600">
            {analytics.totalVisits} / {analytics.uniqueVisits}
          </span>
        </div>

        {/* Plays */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icons_lattify.ai/play.svg" alt="Plays" width={16} height={16} className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-900">Plays</span>
            <Image src="/icons_lattify.ai/question.svg" alt="Help" width={12} height={12} className="w-3 h-3" />
          </div>
          <span className="text-sm text-gray-600">
            {analytics.totalPlays} / {analytics.uniquePlays}
          </span>
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icons_lattify.ai/Engagement.svg" alt="Engagement" width={16} height={16} className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-900">Engagement</span>
            <Image src="/icons_lattify.ai/question.svg" alt="Help" width={12} height={12} className="w-3 h-3" />
          </div>
          <span className="text-sm text-gray-600">
            {analytics.engagementPercent !== null ? `${analytics.engagementPercent}%` : '--%'}
          </span>
        </div>

        {/* Click-through */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/icons_lattify.ai/Click-through.svg" alt="Click-through" width={16} height={16} className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-900">Click-through</span>
            <Image src="/icons_lattify.ai/question.svg" alt="Help" width={12} height={12} className="w-3 h-3" />
          </div>
          <span className="text-sm text-gray-600">
            {analytics.clickThroughPercent !== null ? `${analytics.clickThroughPercent}%` : '--%'}
          </span>
        </div>
      </div>
    </div>
  );
}

