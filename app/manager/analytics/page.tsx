// app/manager/analytics/page.tsx

import { AnalyticsCharts } from '@/components/manager/AnalyticsCharts';
import { MetricsCard } from '@/components/manager/MetricsCard';
import { mockAnalytics } from '@/lib/data/mockAnalytics';

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-light tracking-tight mb-3">Analytics</h1>
        <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl">
          Detailed insights into your training program performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Guides"
          value={mockAnalytics.totalGuides}
        />
        <MetricsCard
          title="Total Staff"
          value={mockAnalytics.totalStaff}
        />
        <MetricsCard
          title="Completion Rate"
          value={`${mockAnalytics.completionRate}%`}
        />
        <MetricsCard
          title="Pending Proofs"
          value={mockAnalytics.pendingProofs}
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <AnalyticsCharts analytics={mockAnalytics} />
      </div>
    </div>
  );
}

