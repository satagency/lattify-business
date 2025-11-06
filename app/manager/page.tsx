// app/manager/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
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

type DateRange = 'Last 7 days' | 'Last 30 days' | 'Last 90 days' | 'This month';

export default function ManagerDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>('Last 7 days');
  const [department, setDepartment] = useState<string>('All Departments');

  // Calculate date range boundaries
  const dateRangeData = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let startDate: Date;
    let comparisonStartDate: Date;
    let comparisonEndDate: Date;

    switch (dateRange) {
      case 'Last 7 days':
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 7);
        comparisonStartDate = new Date(startDate);
        comparisonStartDate.setDate(comparisonStartDate.getDate() - 7);
        comparisonEndDate = new Date(startDate);
        break;
      case 'Last 30 days':
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 30);
        comparisonStartDate = new Date(startDate);
        comparisonStartDate.setDate(comparisonStartDate.getDate() - 30);
        comparisonEndDate = new Date(startDate);
        break;
      case 'Last 90 days':
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 90);
        comparisonStartDate = new Date(startDate);
        comparisonStartDate.setDate(comparisonStartDate.getDate() - 90);
        comparisonEndDate = new Date(startDate);
        break;
      case 'This month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        comparisonStartDate = lastMonth;
        comparisonEndDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      default:
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 7);
        comparisonStartDate = new Date(startDate);
        comparisonStartDate.setDate(comparisonStartDate.getDate() - 7);
        comparisonEndDate = new Date(startDate);
    }

    return { startDate, today, comparisonStartDate, comparisonEndDate };
  }, [dateRange]);

  // Calculate stats based on date range
  const stats = useMemo(() => {
    const { startDate, today, comparisonStartDate, comparisonEndDate } = dateRangeData;
    
    // Completed items in date range
    const completedInRange = mockProgress.filter(p => {
      if (p.status !== 'complete') return false;
      const pDate = p.lastStep ? new Date(p.lastStep) : new Date();
      return pDate >= startDate && pDate <= today;
    }).length;

    // Completed items in comparison period
    const completedInComparison = mockProgress.filter(p => {
      if (p.status !== 'complete') return false;
      const pDate = p.lastStep ? new Date(p.lastStep) : new Date();
      return pDate >= comparisonStartDate && pDate <= comparisonEndDate;
    }).length;

    // Questions in date range
    const questionsInRange = mockQuestions.filter(q => {
      const qDate = q.createdAt;
      return qDate >= startDate && qDate <= today;
    });

    const openQuestionsInRange = questionsInRange.filter(q => q.status === 'open').length;
    const resolvedQuestionsInRange = questionsInRange.filter(q => q.status === 'resolved').length;

    // Calculate completion rate
    const totalProgressInRange = mockProgress.filter(p => {
      const pDate = p.lastStep ? new Date(p.lastStep) : new Date();
      return pDate >= startDate && pDate <= today;
    }).length;

    // Base completion rate varies by date range
    let baseCompletionRate: number;
    if (dateRange === 'Last 30 days' || dateRange === 'Last 90 days' || dateRange === 'This month') {
      // For longer periods, show higher completion rates (more historical data)
      baseCompletionRate = totalProgressInRange > 0
        ? Math.round((completedInRange / totalProgressInRange) * 100)
        : 0;
      // If no data in range, simulate based on period length
      if (baseCompletionRate === 0) {
        baseCompletionRate = dateRange === 'Last 30 days' ? 78 : dateRange === 'Last 90 days' ? 82 : 75;
      } else {
        // Boost for longer periods to show more completion
        baseCompletionRate = Math.min(95, baseCompletionRate + (dateRange === 'Last 90 days' ? 8 : 5));
      }
    } else {
      baseCompletionRate = totalProgressInRange > 0
        ? Math.round((completedInRange / totalProgressInRange) * 100)
        : 68;
    }

    const completionRate = baseCompletionRate;
    const prevCompletionRate = dateRange === 'Last 30 days' ? 65 : dateRange === 'Last 90 days' ? 72 : 60;
    const completionChange = Math.abs(completionRate - prevCompletionRate);

    // Calculate engagement (staff actively using guides)
    const activeStaffInRange = new Set(
      mockProgress
        .filter(p => {
          const pDate = p.lastStep ? new Date(p.lastStep) : new Date();
          return pDate >= startDate && pDate <= today;
        })
        .map(p => p.staffId)
    ).size;

    const totalStaff = mockStaff.length;
    let engagementRate = Math.round((activeStaffInRange / totalStaff) * 100);
    
    // Show higher engagement for longer periods
    if (dateRange === 'Last 30 days' || dateRange === 'Last 90 days' || dateRange === 'This month') {
      engagementRate = Math.min(95, engagementRate + (dateRange === 'Last 90 days' ? 12 : 8));
    }
    
    const prevEngagement = dateRange === 'Last 30 days' ? 72 : dateRange === 'Last 90 days' ? 78 : 82;
    const engagementChange = engagementRate - prevEngagement;

    // Average response time
    const resolvedQuestions = mockQuestions.filter(q => q.status === 'resolved' && q.answeredAt);
    const responseTimes = resolvedQuestions.map(q => {
      if (!q.answeredAt) return 0;
      return (q.answeredAt.getTime() - q.createdAt.getTime()) / (1000 * 60 * 60); // hours
    });
    const avgResponseTime = responseTimes.length > 0
      ? Math.round((responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) * 10) / 10
      : 2.3;
    
    const prevResponseTime = avgResponseTime + (dateRange === 'Last 30 days' ? 1.2 : 0.7);
    const responseTimeChange = avgResponseTime - prevResponseTime;

    // Guide utilization
    const guidesUsed = new Set(
      mockProgress
        .filter(p => {
          const pDate = p.lastStep ? new Date(p.lastStep) : new Date();
          return pDate >= startDate && pDate <= today;
        })
        .map(p => p.guideId)
    ).size;

    const totalGuides = mockAnalytics.totalGuides;
    let guideUtilization = Math.round((guidesUsed / totalGuides) * 100);
    
    // Show higher utilization for longer periods
    if (dateRange === 'Last 30 days' || dateRange === 'Last 90 days' || dateRange === 'This month') {
      guideUtilization = Math.min(95, guideUtilization + (dateRange === 'Last 90 days' ? 15 : 10));
    }
    
    const prevUtilization = dateRange === 'Last 30 days' ? 58 : dateRange === 'Last 90 days' ? 65 : 70;
    const utilizationChange = guideUtilization - prevUtilization;

    return {
      completionRate,
      completionChange,
      engagementRate,
      engagementChange,
      avgResponseTime,
      responseTimeChange,
      guideUtilization,
      utilizationChange,
      completedInRange,
      openQuestionsInRange,
      resolvedQuestionsInRange,
    };
  }, [dateRangeData]);

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

  // Get comparison text
  const getComparisonText = () => {
    switch (dateRange) {
      case 'Last 7 days':
        return 'vs previous 7 days';
      case 'Last 30 days':
        return 'vs previous 30 days';
      case 'Last 90 days':
        return 'vs previous 90 days';
      case 'This month':
        return 'vs last month';
      default:
        return 'vs previous period';
    }
  };

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
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This month</option>
          </select>
          <select 
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
          >
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
          value={`${stats.completionRate}%`}
          change={Math.abs(stats.completionChange)}
          changeType={stats.completionChange >= 0 ? "increase" : "decrease"}
          comparison={getComparisonText()}
        />
        <KPICard
          title="Staff Engagement"
          value={`${stats.engagementRate}%`}
          change={Math.abs(stats.engagementChange)}
          changeType={stats.engagementChange >= 0 ? "increase" : "decrease"}
          comparison={getComparisonText()}
        />
        <KPICard
          title="Avg Response Time"
          value={`${stats.avgResponseTime}h`}
          change={Math.abs(stats.responseTimeChange)}
          changeType={stats.responseTimeChange <= 0 ? "decrease" : "increase"}
          comparison={getComparisonText()}
          subtitle="Response to questions"
        />
        <KPICard
          title="Guide Utilization"
          value={`${stats.guideUtilization}%`}
          change={Math.abs(stats.utilizationChange)}
          changeType={stats.utilizationChange >= 0 ? "increase" : "decrease"}
          comparison={getComparisonText()}
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
        <p className="text-2xl font-light text-gray-700 leading-relaxed">
          Today: <Link href="/manager/staff" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><CheckCircle2 className="h-5 w-5" /><span>{completedToday}</span> completions</Link>, <Link href="/manager/staff" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><Clock className="h-5 w-5" /><span>{inProgressGuides}</span> in progress</Link>, <Link href="/manager/questions" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><MessageSquare className="h-5 w-5" /><span>{openQuestions.length}</span> open questions</Link>, and <Link href="/manager/photos" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><AlertCircle className="h-5 w-5" /><span>{pendingProofs}</span> pending proofs</Link>.
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
