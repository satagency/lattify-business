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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your team's training progress and activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/manager/staff">
          <MetricsCard
            title="Total Staff"
            value={mockAnalytics.totalStaff}
            subtitle="Active team members"
          />
        </Link>
        <Link href="/manager/library">
          <MetricsCard
            title="Training Guides"
            value={mockAnalytics.totalGuides}
            subtitle="Available guides"
          />
        </Link>
        <Link href="/manager/questions">
          <MetricsCard
            title="Open Questions"
            value={openQuestions.length}
            subtitle="Requiring attention"
            className="border-black"
          />
        </Link>
        <Link href="/manager/staff">
          <MetricsCard
            title="Pending Proofs"
            value={pendingProofs}
            subtitle="Awaiting approval"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Completion Rate</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall Progress</span>
              <span className="text-2xl font-bold">{mockAnalytics.completionRate}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all"
                style={{ width: `${mockAnalytics.completionRate}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/manager/library"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">View Guide Library</span>
            </Link>
            <Link
              href="/manager/staff"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">Manage Staff</span>
            </Link>
            <Link
              href="/manager/questions"
              className="block p-3 border border-black rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">Review Questions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

