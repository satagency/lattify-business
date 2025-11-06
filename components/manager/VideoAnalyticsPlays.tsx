// components/manager/VideoAnalyticsPlays.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { VideoPlay } from '@/lib/types';

interface VideoAnalyticsPlaysProps {
  plays: VideoPlay[];
}

const chartConfig = {
  plays: {
    label: 'Plays',
    color: '#f97316', // orange-500
  },
} satisfies ChartConfig;

export function VideoAnalyticsPlays({ plays }: VideoAnalyticsPlaysProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  const chartData = plays.map(play => ({
    date: formatDate(play.date),
    plays: play.count,
  }));

  const maxPlays = Math.max(...plays.map(p => p.count), 1);
  const maxYValue = Math.max(4, Math.ceil(maxPlays * 1.2));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Image src="/icons_lattify.ai/play.svg" alt="Plays" width={20} height={20} className="w-5 h-5" />
        <h2 className="text-lg font-semibold text-gray-900">Plays</h2>
        <Image src="/icons_lattify.ai/question.svg" alt="Help" width={16} height={16} className="w-4 h-4 text-gray-400" />
      </div>
      
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillPlays" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11, fill: '#6b7280' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            domain={[0, maxYValue]}
            width={30}
            orientation="right"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="plays"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#fillPlays)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
