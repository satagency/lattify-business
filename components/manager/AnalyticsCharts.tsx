// components/manager/AnalyticsCharts.tsx

'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Analytics } from '@/lib/types';

interface AnalyticsChartsProps {
  analytics: Analytics;
}

const chartConfig = {
  views: {
    label: 'Views',
    color: 'hsl(0, 0%, 0%)',
  },
  count: {
    label: 'Requests',
    color: 'hsl(0, 0%, 0%)',
  },
} satisfies ChartConfig;

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  const mostViewedData = analytics.mostViewedGuides.map((item) => ({
    name: item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title,
    views: item.views,
  }));

  const helpRequestsData = analytics.helpRequests.map((item) => ({
    name: item.step.length > 25 ? item.step.substring(0, 25) + '...' : item.step,
    count: item.count,
  }));

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Most Viewed Guides</h3>
        <ChartContainer config={chartConfig} className="min-h-[320px] w-full">
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
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
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

      <div>
        <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-6">Help Requests by Step</h3>
        <ChartContainer config={chartConfig} className="min-h-[320px] w-full">
          <BarChart 
            accessibilityLayer 
            data={helpRequestsData} 
            layout="vertical"
            margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
          >
            <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tickLine={false}
              axisLine={false}
              width={140}
              tick={{ fontSize: 12 }}
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

