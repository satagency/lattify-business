// components/manager/AnalyticsCharts.tsx

'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Analytics } from '@/lib/types';

interface AnalyticsChartsProps {
  analytics: Analytics;
}

const COLORS = ['#000000', '#404040', '#737373', '#A3A3A3'];

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
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Most Viewed Guides</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mostViewedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
            <XAxis dataKey="name" stroke="#737373" />
            <YAxis stroke="#737373" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E8E8',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="views" fill="#000000" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Help Requests by Step</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={helpRequestsData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
            <XAxis type="number" stroke="#737373" />
            <YAxis dataKey="name" type="category" stroke="#737373" width={200} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E8E8',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="count" fill="#000000" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

