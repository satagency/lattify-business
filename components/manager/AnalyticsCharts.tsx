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
        const title = guide?.title || guideId;
        const shortTitle = title.length > 12 ? title.substring(0, 12) + '...' : title;
        return {
          guide: shortTitle,
          completion: Math.round((data.completed / data.total) * 100),
        };
      })
      .sort((a, b) => b.completion - a.completion)
      .slice(0, 6);
  }, []);

  // Help requests over time
  const helpRequestsData = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      
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
      };
    });

    return last7Days;
  }, []);

  // Most viewed guides
  const mostViewedData = analytics.mostViewedGuides.map((item) => ({
    guide: item.title.length > 14 ? item.title.substring(0, 14) + '...' : item.title,
    views: item.views,
  }));

  // Help requests by step
  const stepRequestsData = analytics.helpRequests.map((item) => ({
    step: item.step.length > 18 ? item.step.substring(0, 18) + '...' : item.step,
    requests: item.count,
  }));

  const completionConfig = {
    completion: {
      label: "Completion Rate",
      color: "hsl(0, 0%, 0%)",
    },
  } satisfies ChartConfig;

  const requestsConfig = {
    open: {
      label: "Open",
      color: "hsl(0, 0%, 0%)",
    },
    resolved: {
      label: "Resolved",
      color: "hsl(0, 0%, 40%)",
    },
  } satisfies ChartConfig;

  const viewsConfig = {
    views: {
      label: "Views",
      color: "hsl(0, 0%, 0%)",
    },
  } satisfies ChartConfig;

  const stepConfig = {
    requests: {
      label: "Requests",
      color: "hsl(0, 0%, 0%)",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Guide Completion Rates - Line Chart */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Guide Completion Rates</h3>
        <ChartContainer config={completionConfig} className="min-h-[300px] w-full">
          <LineChart accessibilityLayer data={guideCompletionData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="guide"
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
              domain={[0, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="completion"
              stroke="var(--color-completion)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Help Requests Trend - Stacked Area Chart */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Help Requests Trend</h3>
        <ChartContainer config={requestsConfig} className="min-h-[300px] w-full">
          <AreaChart accessibilityLayer data={helpRequestsData}>
            <CartesianGrid vertical={false} />
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
        <ChartContainer config={viewsConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={mostViewedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="guide"
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
            <Bar
              dataKey="views"
              fill="var(--color-views)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Help Requests by Step - Horizontal Bar Chart */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Help Requests by Step</h3>
        <ChartContainer config={stepConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={stepRequestsData}
            layout="vertical"
          >
            <CartesianGrid horizontal={true} vertical={false} />
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
              dataKey="requests"
              fill="var(--color-requests)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
