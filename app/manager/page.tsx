// app/manager/page.tsx

import { MetricsCard } from '@/components/manager/MetricsCard';
import { mockAnalytics } from '@/lib/data/mockAnalytics';
import { mockStaff } from '@/lib/data/mockStaff';
import { mockQuestions } from '@/lib/data/mockQuestions';
import { getOpenQuestions } from '@/lib/data/mockQuestions';
import Link from 'next/link';

export default function ManagerDashboard() {
  const openQuestions = getOpenQuestions();
  const pendingProofs = mockAnalytics.pendingProofs;

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-light tracking-tight mb-3">Dashboard</h1>
        <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl">
          Overview of your team's training progress and activity.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/manager/staff" className="block">
          <MetricsCard
            title="Total Staff"
            value={mockAnalytics.totalStaff}
            subtitle="Active team members"
          />
        </Link>
        <Link href="/manager/library" className="block">
          <MetricsCard
            title="Training Guides"
            value={mockAnalytics.totalGuides}
            subtitle="Available guides"
          />
        </Link>
        <Link href="/manager/questions" className="block">
          <MetricsCard
            title="Open Questions"
            value={openQuestions.length}
            subtitle="Requiring attention"
            className="border-black"
          />
        </Link>
        <Link href="/manager/photos" className="block">
          <MetricsCard
            title="Pending Proofs"
            value={pendingProofs}
            subtitle="Awaiting approval"
          />
        </Link>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Completion Rate */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-lg font-medium mb-6 tracking-wide uppercase text-xs text-gray-500">Completion Rate</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                <span className="text-4xl font-light tracking-tight">{mockAnalytics.completionRate}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all"
                  style={{ width: `${mockAnalytics.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-lg font-medium mb-6 tracking-wide uppercase text-xs text-gray-500">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/manager/library"
              className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
            >
              <span className="font-medium text-sm group-hover:text-black">View Guide Library</span>
            </Link>
            <Link
              href="/manager/staff"
              className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
            >
              <span className="font-medium text-sm group-hover:text-black">Manage Staff</span>
            </Link>
            <Link
              href="/manager/questions"
              className="block p-4 border border-black rounded-lg hover:bg-gray-50 transition-all group"
            >
              <span className="font-medium text-sm group-hover:text-black">Review Questions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

