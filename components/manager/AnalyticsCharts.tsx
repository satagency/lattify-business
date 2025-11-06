// components/manager/AnalyticsCharts.tsx

'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Analytics } from '@/lib/types';
import { mockProgress } from '@/lib/data/mockProgress';
import { mockGuides } from '@/lib/data/mockGuides';
import { mockQuestions } from '@/lib/data/mockQuestions';

interface AnalyticsChartsProps {
  analytics: Analytics;
}

const chartConfig = {
  views: {
    label: 'Views',
    color: 'hsl(0, 0%, 0%)',
  },
  count: {
    label: 'Help Requests',
    color: 'hsl(0, 0%, 0%)',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(0, 0%, 0%)',
  },
  inProgress: {
    label: 'In Progress',
    color: 'hsl(0, 0%, 40%)',
  },
  questions: {
    label: 'Questions',
    color: 'hsl(0, 0%, 0%)',
  },
} satisfies ChartConfig;

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  // Guide completion rates
  const guideCompletionData = React.useMemo(() => {
    const guideCompletionMap = new Map<string, { completed: number; total: number }>();
    
    mockProgress.forEach(progress => {
      const existing = guideCompletionMap.get(progress.guideId) || { completed: 0, total: 0 };
      guideCompletionMap.set(progress.guideId, {
        completed: existing.completed + (progress.status === 'complete' ? 1 : 0),
        total: existing.total + 1,
      });
    });

    return Array.from(guideCompletionMap.entries())
      .map(([guideId, data]) => {
        const guide = mockGuides.find(g => g.id === guideId);
        return {
          name: guide?.title || guideId,
          completionRate: Math.round((data.completed / data.total) * 100),
          completed: data.completed,
          total: data.total,
        };
      })
      .sort((a, b) => b.completionRate - a.completionRate)
      .slice(0, 5);
  }, []);

  // Help requests over time (last 7 days)
  const helpRequestsOverTime = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      
      const count = mockQuestions.filter(q => {
        const qDate = q.createdAt.toISOString().split('T')[0];
        return qDate === dateStr;
      }).length;

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        requests: count,
      };
    });

    return last7Days;
  }, []);

  // Most viewed guides
  const mostViewedData = analytics.mostViewedGuides.map((item) => ({
    name: item.title.length > 18 ? item.title.substring(0, 18) + '...' : item.title,
    views: item.views,
  }));

  // Help requests by step
  const helpRequestsData = analytics.helpRequests.map((item) => ({
    name: item.step.length > 22 ? item.step.substring(0, 22) + '...' : item.step,
    count: item.count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Guide Completion Rates */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Guide Completion Rates</h3>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={guideCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
              domain={[0, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="completionRate" 
              fill="var(--color-completed)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Help Requests Over Time */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Help Requests Trend</h3>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={helpRequestsOverTime} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area 
              type="monotone"
              dataKey="requests" 
              fill="var(--color-questions)"
              fillOpacity={0.2}
              stroke="var(--color-questions)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>

      {/* Most Viewed Guides */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Most Viewed Guides</h3>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={mostViewedData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="views" 
              fill="var(--color-views)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Help Requests by Step */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Help Requests by Step</h3>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart 
            accessibilityLayer 
            data={helpRequestsData} 
            layout="vertical"
            margin={{ top: 20, right: 30, left: 140, bottom: 20 }}
          >
            <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tickLine={false}
              axisLine={false}
              width={130}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="count" 
              fill="var(--color-count)" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

