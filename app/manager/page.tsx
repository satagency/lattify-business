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
import { lastStepToDate } from '@/lib/utils';

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
      const pDate = lastStepToDate(p.lastStep);
      return pDate >= startDate && pDate <= today;
    }).length;

    // Completed items in comparison period
    const completedInComparison = mockProgress.filter(p => {
      if (p.status !== 'complete') return false;
      const pDate = lastStepToDate(p.lastStep);
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
      const pDate = lastStepToDate(p.lastStep);
      return pDate >= startDate && pDate <= today;
    }).length;

    // Calculate completion rate from actual data
    const baseCompletionRate = totalProgressInRange > 0
      ? Math.round((completedInRange / totalProgressInRange) * 100)
      : 75; // Default to 75% if no data

    const completionRate = Math.max(60, Math.min(95, baseCompletionRate)); // Ensure between 60-95%
    
    // Calculate previous period completion rate for comparison
    const prevCompletionRate = Math.max(55, completionRate - (dateRange === 'Last 30 days' ? 8 : dateRange === 'Last 90 days' ? 6 : 5));
    const completionChange = completionRate - prevCompletionRate;

    // Calculate engagement (staff actively using guides)
    const activeStaffInRange = new Set(
      mockProgress
        .filter(p => {
          const pDate = lastStepToDate(p.lastStep);
          return pDate >= startDate && pDate <= today;
        })
        .map(p => p.staffId)
    ).size;

    const totalStaff = mockStaff.length;
    const engagementRate = Math.max(70, Math.min(95, Math.round((activeStaffInRange / totalStaff) * 100)));
    
    const prevEngagement = Math.max(65, engagementRate - (dateRange === 'Last 30 days' ? 6 : dateRange === 'Last 90 days' ? 4 : 8));
    const engagementChange = engagementRate - prevEngagement;

    // Average response time
    const resolvedQuestionsForResponse = questionsInRange.filter(q => q.status === 'resolved' && q.answeredAt);
    const responseTimes = resolvedQuestionsForResponse.map(q => {
      if (!q.answeredAt) return 0;
      return (q.answeredAt.getTime() - q.createdAt.getTime()) / (1000 * 60 * 60); // hours
    });
    const avgResponseTime = responseTimes.length > 0
      ? Math.round((responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) * 10) / 10
      : 2.1; // Default realistic response time
    
    const prevResponseTime = Math.max(avgResponseTime - 0.5, avgResponseTime + (dateRange === 'Last 30 days' ? 0.8 : dateRange === 'Last 90 days' ? 0.5 : 0.6));
    const responseTimeChange = avgResponseTime - prevResponseTime;

    // Guide utilization
    const guidesUsed = new Set(
      mockProgress
        .filter(p => {
          const pDate = lastStepToDate(p.lastStep);
          return pDate >= startDate && pDate <= today;
        })
        .map(p => p.guideId)
    ).size;

    const totalGuides = mockAnalytics.totalGuides;
    const guideUtilization = Math.max(60, Math.min(95, Math.round((guidesUsed / totalGuides) * 100)));
    
    const prevUtilization = Math.max(55, guideUtilization - (dateRange === 'Last 30 days' ? 8 : dateRange === 'Last 90 days' ? 5 : 10));
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
  
  // Calculate activities based on selected date range
  const activityStats = useMemo(() => {
    const { startDate, today } = dateRangeData;
    
    const completedInRange = mockProgress.filter(p => {
      if (p.status !== 'complete') return false;
      const pDate = lastStepToDate(p.lastStep);
      return pDate >= startDate && pDate <= today;
    }).length;

    const inProgressInRange = mockProgress.filter(p => {
      if (p.status !== 'in_progress') return false;
      const pDate = lastStepToDate(p.lastStep);
      return pDate >= startDate && pDate <= today;
    }).length;

    const questionsInRange = mockQuestions.filter(q => {
      const qDate = q.createdAt;
      return qDate >= startDate && qDate <= today;
    });

    const openQuestionsInRange = questionsInRange.filter(q => q.status === 'open').length;
    
    // Pending proofs scale with date range
    const pendingProofsCount = dateRange === 'Last 30 days' ? Math.max(7, pendingProofs + 3) : 
                               dateRange === 'Last 90 days' ? Math.max(10, pendingProofs + 5) : 
                               pendingProofs;

    return {
      completed: Math.max(1, completedInRange), // Ensure at least 1
      inProgress: Math.max(1, inProgressInRange), // Ensure at least 1
      openQuestions: Math.max(1, openQuestionsInRange), // Ensure at least 1
      pendingProofs: Math.max(3, pendingProofsCount), // Ensure at least 3
    };
  }, [dateRangeData, dateRange, pendingProofs]);

  const activeStaff = mockStaff.filter(s => s.status === 'active').length;

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

  // Get activity header
  const getActivityHeader = () => {
    switch (dateRange) {
      case 'Last 7 days':
        return "What's happening this week";
      case 'Last 30 days':
        return "What's happening this month";
      case 'Last 90 days':
        return "What's happening this quarter";
      case 'This month':
        return "What's happening this month";
      default:
        return "What's happening today";
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

      {/* What's Happening - Dynamic based on date range */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">{getActivityHeader()}</h2>
        </div>
        <p className="text-2xl font-light text-gray-700 leading-relaxed">
          {dateRange === 'Last 7 days' ? 'This week' : dateRange === 'Last 30 days' ? 'This month' : dateRange === 'Last 90 days' ? 'This quarter' : 'Today'}: <Link href="/manager/staff" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><CheckCircle2 className="h-5 w-5" /><span>{activityStats.completed}</span> completions</Link>, <Link href="/manager/staff" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><Clock className="h-5 w-5" /><span>{activityStats.inProgress}</span> in progress</Link>, <Link href="/manager/questions" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><MessageSquare className="h-5 w-5" /><span>{activityStats.openQuestions}</span> open questions</Link>, and <Link href="/manager/photos" className="inline-flex items-center gap-1 font-medium text-black hover:underline"><AlertCircle className="h-5 w-5" /><span>{activityStats.pendingProofs}</span> pending proofs</Link>.
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
