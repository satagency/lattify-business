// app/manager/analytics/page.tsx

import { AnalyticsCharts } from '@/components/manager/AnalyticsCharts';
import { StepAnalytics } from '@/components/manager/StepAnalytics';
import { MetricsCard } from '@/components/manager/MetricsCard';
import { mockAnalytics } from '@/lib/data/mockAnalytics';
import { mockStepProblems } from '@/lib/data/mockStepProblems';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-600">
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

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <StepAnalytics problems={mockStepProblems} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <AnalyticsCharts analytics={mockAnalytics} />
      </div>
    </div>
  );
}

