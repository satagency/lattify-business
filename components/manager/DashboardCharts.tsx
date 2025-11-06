// components/manager/DashboardCharts.tsx

'use client';

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { mockProgress } from '@/lib/data/mockProgress';
import { mockGuides } from '@/lib/data/mockGuides';
import { mockQuestions } from '@/lib/data/mockQuestions';

const chartConfig = {
  completion: {
    label: 'Completion Rate',
    color: 'hsl(var(--chart-1))',
  },
  engagement: {
    label: 'Engagement',
    color: 'hsl(var(--chart-1))',
  },
  questions: {
    label: 'Questions',
    color: 'hsl(var(--chart-1))',
  },
  open: {
    label: 'Open',
    color: 'hsl(var(--chart-1))',
  },
  resolved: {
    label: 'Resolved',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function DashboardCharts() {
  // Completion rate over last 30 days
  const completionData = React.useMemo(() => {
    // Simulate completion rate trend over last 30 days
    const baseRate = 68;
    const dataPoints = [];
    
    for (let i = 29; i >= 0; i -= 3) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate realistic variation with deterministic pattern
      const variation = Math.sin(i / 10) * 5 + Math.cos(i / 7) * 3;
      const rate = Math.max(50, Math.min(95, baseRate + variation));
      
      dataPoints.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completion: Math.round(rate),
      });
    }

    return dataPoints;
  }, []);

  // Question resolution over time
  const questionData = React.useMemo(() => {
    const last14Days = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (13 - i));
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

    return last14Days;
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Completion Rate Trend */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-medium text-gray-900">Completion Rate</h3>
          <span className="text-xs text-gray-500">Last 30 days</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart accessibilityLayer data={completionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
              domain={[0, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="completion"
              fill="var(--color-completion)"
              fillOpacity={0.2}
              stroke="var(--color-completion)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>

      {/* Question Resolution Trend */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-medium text-gray-900">Question Resolution</h3>
          <span className="text-xs text-gray-500">Last 14 days</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={questionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 10 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="resolved" fill="var(--color-resolved)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="open" fill="var(--color-open)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

