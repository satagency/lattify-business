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
  completionRate: {
    label: 'Completion Rate',
    color: 'hsl(0, 0%, 0%)',
  },
  requests: {
    label: 'Requests',
    color: 'hsl(0, 0%, 0%)',
  },
  open: {
    label: 'Open',
    color: 'hsl(0, 0%, 0%)',
  },
  resolved: {
    label: 'Resolved',
    color: 'hsl(0, 0%, 40%)',
  },
} satisfies ChartConfig;

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  // Guide completion rates - Line chart
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
          guide: guide?.title.length > 15 ? guide.title.substring(0, 15) + '...' : guide?.title || guideId,
          rate: Math.round((data.completed / data.total) * 100),
        };
      })
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 6);
  }, []);

  // Help requests over time - Stacked Area chart
  const helpRequestsOverTime = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      
      const total = mockQuestions.filter(q => {
        const qDate = q.createdAt.toISOString().split('T')[0];
        return qDate === dateStr;
      }).length;

      const open = mockQuestions.filter(q => {
        const qDate = q.createdAt.toISOString().split('T')[0];
        return qDate === dateStr && q.status === 'open';
      }).length;

      const resolved = mockQuestions.filter(q => {
        const qDate = q.createdAt.toISOString().split('T')[0];
        return qDate === dateStr && q.status === 'resolved';
      }).length;

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        open,
        resolved,
        total,
      };
    });

    return last7Days;
  }, []);

  // Most viewed guides
  const mostViewedData = analytics.mostViewedGuides.map((item) => ({
    guide: item.title.length > 18 ? item.title.substring(0, 18) + '...' : item.title,
    views: item.views,
  }));

  // Help requests by step
  const helpRequestsData = analytics.helpRequests.map((item) => ({
    step: item.step.length > 20 ? item.step.substring(0, 20) + '...' : item.step,
    count: item.count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Guide Completion Rates - Line Chart */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Guide Completion Rates</h3>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <LineChart accessibilityLayer data={guideCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="guide" 
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
            <Line 
              type="monotone"
              dataKey="rate" 
              stroke="var(--color-completionRate)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-completionRate)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Help Requests Trend - Stacked Area Chart */}
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
              dataKey="open" 
              stackId="1"
              fill="var(--color-open)"
              fillOpacity={0.6}
              stroke="var(--color-open)"
              strokeWidth={2}
            />
            <Area 
              type="monotone"
              dataKey="resolved" 
              stackId="1"
              fill="var(--color-resolved)"
              fillOpacity={0.6}
              stroke="var(--color-resolved)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>

      {/* Most Viewed Guides - Bar Chart */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Most Viewed Guides</h3>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={mostViewedData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="guide" 
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

      {/* Help Requests by Step - Horizontal Bar Chart */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Help Requests by Step</h3>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart 
            accessibilityLayer 
            data={helpRequestsData} 
            layout="vertical"
            margin={{ top: 20, right: 30, left: 130, bottom: 20 }}
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
              dataKey="step" 
              type="category" 
              tickLine={false}
              axisLine={false}
              width={120}
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

