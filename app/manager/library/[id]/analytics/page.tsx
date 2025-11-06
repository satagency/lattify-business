// app/manager/library/[id]/analytics/page.tsx

'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getGuideById } from '@/lib/data/mockGuides';
import { getVideoAnalytics } from '@/lib/data/mockVideoAnalytics';
import { VideoAnalyticsVisits } from '@/components/manager/VideoAnalyticsVisits';
import { VideoAnalyticsPlays } from '@/components/manager/VideoAnalyticsPlays';
import { VideoAnalyticsEngagement } from '@/components/manager/VideoAnalyticsEngagement';
import { VideoAnalyticsQuestions } from '@/components/manager/VideoAnalyticsQuestions';
import { VideoAnalyticsSidebar } from '@/components/manager/VideoAnalyticsSidebar';

export default function VideoAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const guideId = params.id as string;
  
  const guide = getGuideById(guideId);
  const analytics = getVideoAnalytics(guideId);

  if (!guide) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>Video not found</p>
        <Link
          href="/manager/library"
          className="mt-4 text-blue-600 hover:underline inline-block"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <Link
          href="/manager/library"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Sidebar - Video Preview & Summary Stats */}
        <aside className="w-64 flex-shrink-0">
          <VideoAnalyticsSidebar guide={guide} analytics={analytics} />
        </aside>

        {/* Main Content - Analytics Sections */}
        <main className="flex-1 space-y-8">
          {analytics && (
            <>
              <VideoAnalyticsVisits visits={analytics.visits} />
              <VideoAnalyticsPlays plays={analytics.plays} />
              <VideoAnalyticsEngagement engagement={analytics.engagement} />
              <VideoAnalyticsQuestions />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
