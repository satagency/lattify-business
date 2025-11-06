// app/manager/page.tsx

'use client';

import { KPICard } from '@/components/manager/KPICard';
import { ActivityCard } from '@/components/manager/ActivityCard';
import { DashboardCharts } from '@/components/manager/DashboardCharts';
import { HotelInfoCard } from '@/components/manager/HotelInfoCard';
import { ManagerInfoCard } from '@/components/manager/ManagerInfoCard';
import { GoalsCard } from '@/components/manager/GoalsCard';
import { RankingsCard } from '@/components/manager/RankingsCard';
import { mockAnalytics } from '@/lib/data/mockAnalytics';
import { mockStaff } from '@/lib/data/mockStaff';
import { mockQuestions } from '@/lib/data/mockQuestions';
import { mockHotelInfo, mockManagerInfo, mockHotelGoals, mockRankings } from '@/lib/data/mockHotelInfo';
import { getOpenQuestions } from '@/lib/data/mockQuestions';
import { mockProgress } from '@/lib/data/mockProgress';
import { CheckCircle2, Clock, MessageSquare, Award, Users, BookOpen, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ManagerDashboard() {
  const openQuestions = getOpenQuestions();
  const pendingProofs = mockAnalytics.pendingProofs;
  
  // Calculate today's activities
  const today = new Date().toISOString().split('T')[0];
  const activeStaff = mockStaff.filter(s => s.status === 'active').length;
  const inProgressGuides = mockProgress.filter(p => p.status === 'in_progress').length;
  const completedToday = mockProgress.filter(p => {
    const pDate = new Date(p.lastStep || new Date()).toISOString().split('T')[0];
    return pDate === today && p.status === 'complete';
  }).length;

  // Calculate metrics with trends (compared to previous week)
  const completionRate = mockAnalytics.completionRate;
  const completionChange = 8; // +8% vs last week
  
  const engagementRate = 87; // % of staff actively using guides
  const engagementChange = 5; // +5% vs last week
  
  const avgResponseTime = 2.3; // hours
  const responseTimeChange = -0.7; // -0.7 hours improvement
  
  const guideUtilization = 72; // % of guides being used
  const utilizationChange = 12; // +12% vs last week

  return (
    <div className="space-y-8">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-2">Dashboard</h1>
          <p className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This month</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white">
            <option>All Departments</option>
            <option>Kitchen</option>
            <option>Front of House</option>
            <option>Cleaning</option>
          </select>
        </div>
      </div>

      {/* Quick Stats Grid - Most Important Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/manager/staff" className="block">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <p className="text-3xl font-light tracking-tight text-black mb-1">{activeStaff}</p>
            <p className="text-sm text-gray-600">Staff Members</p>
          </div>
        </Link>
        <Link href="/manager/library" className="block">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-light tracking-tight text-black mb-1">{mockAnalytics.totalGuides}</p>
            <p className="text-sm text-gray-600">Training Guides</p>
          </div>
        </Link>
        <Link href="/manager/questions" className="block">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-500">Awaiting</span>
            </div>
            <p className="text-3xl font-light tracking-tight text-black mb-1">{openQuestions.length}</p>
            <p className="text-sm text-gray-600">Open Questions</p>
          </div>
        </Link>
        <Link href="/manager/photos" className="block">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <p className="text-3xl font-light tracking-tight text-black mb-1">{pendingProofs}</p>
            <p className="text-sm text-gray-600">Photo Proofs</p>
          </div>
        </Link>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Training Completion Rate"
          value={`${completionRate}%`}
          change={completionChange}
          changeType="increase"
          comparison="vs previous 7 days"
        />
        <KPICard
          title="Staff Engagement"
          value={`${engagementRate}%`}
          change={engagementChange}
          changeType="increase"
          comparison="vs previous 7 days"
        />
        <KPICard
          title="Avg Response Time"
          value={`${avgResponseTime}h`}
          change={Math.abs(responseTimeChange)}
          changeType="decrease"
          comparison="vs previous 7 days"
          subtitle="Response to questions"
        />
        <KPICard
          title="Guide Utilization"
          value={`${guideUtilization}%`}
          change={utilizationChange}
          changeType="increase"
          comparison="vs previous 7 days"
        />
      </div>

      {/* What's Happening Today */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">What's happening today</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-black text-white rounded-lg">Today</button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Tomorrow</button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Next 7 days</button>
          </div>
        </div>
        <p className="text-base text-gray-700 leading-relaxed">
          Today: <Link href="/manager/staff" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><CheckCircle2 className="h-4 w-4" /><span>{completedToday}</span> completions</Link>, <Link href="/manager/staff" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><Clock className="h-4 w-4" /><span>{inProgressGuides}</span> in progress</Link>, <Link href="/manager/questions" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><MessageSquare className="h-4 w-4" /><span>{openQuestions.length}</span> open questions</Link>, and <Link href="/manager/photos" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><AlertCircle className="h-4 w-4" /><span>{pendingProofs}</span> pending proofs</Link>.
        </p>
      </div>

      {/* Performance Charts */}
      <DashboardCharts />

      {/* Hotel Context & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <HotelInfoCard hotel={mockHotelInfo} />
          <GoalsCard goals={mockHotelGoals} />
        </div>
        <div className="space-y-6">
          <ManagerInfoCard manager={mockManagerInfo} />
          <RankingsCard rankings={mockRankings} />
        </div>
      </div>
    </div>
  );
}
