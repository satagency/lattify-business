// components/manager/VideoAnalyticsEngagement.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { VideoEngagement } from '@/lib/types';

interface VideoAnalyticsEngagementProps {
  engagement: VideoEngagement[];
}

export function VideoAnalyticsEngagement({ engagement }: VideoAnalyticsEngagementProps) {
  const maxEngagement = Math.max(...engagement.map(e => e.engagement), 1);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = engagement.length > 0 
    ? Math.max(...engagement.map(e => e.time))
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Image src="/icons_lattify.ai/Engagement.svg" alt="Engagement" width={20} height={20} className="w-5 h-5" />
        <h2 className="text-lg font-semibold text-gray-900">Engagement</h2>
        <Image src="/icons_lattify.ai/question.svg" alt="Help" width={16} height={16} className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="relative h-32 mb-4">
        <div className="flex items-end gap-1 h-full">
          {engagement.map((item, i) => {
            const height = (item.engagement / maxEngagement) * 100;
            const isComingSoon = i === Math.floor(engagement.length / 2);
            
            return (
              <div
                key={i}
                className="flex-1 relative group"
                style={{ height: `${height}%` }}
              >
                <div
                  className="w-full bg-pink-300 hover:bg-pink-400 transition-colors rounded-t"
                  style={{ height: '100%' }}
                />
                {isComingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-gray-600 bg-white/90 px-2 py-1 rounded">
                      Coming soon
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Time markers */}
      <div className="flex justify-between text-xs text-gray-500">
        {engagement.map((item, i) => {
          if (i % Math.ceil(engagement.length / 6) === 0 || i === engagement.length - 1) {
            return (
              <span key={i}>{formatTime(item.time)}</span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

