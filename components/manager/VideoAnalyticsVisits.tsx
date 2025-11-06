// components/manager/VideoAnalyticsVisits.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VideoVisit } from '@/lib/types';
import { formatRecordedDate } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface VideoAnalyticsVisitsProps {
  visits: VideoVisit[];
}

export function VideoAnalyticsVisits({ visits }: VideoAnalyticsVisitsProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const getOSIcon = (os: VideoVisit['os']) => {
    switch (os) {
      case 'macos':
      case 'ios':
        return <Image src="/icons_lattify.ai/apple.svg" alt="Apple" width={16} height={16} className="w-4 h-4" />;
      case 'android':
        return <Image src="/icons_lattify.ai/android.svg" alt="Android" width={16} height={16} className="w-4 h-4" />;
      default:
        return <Image src="/icons_lattify.ai/desktop.svg" alt="Desktop" width={16} height={16} className="w-4 h-4" />;
    }
  };

  const getDeviceIcon = (device: VideoVisit['device']) => {
    switch (device) {
      case 'mobile':
        return <Image src="/icons_lattify.ai/mobile.svg" alt="Mobile" width={16} height={16} className="w-4 h-4" />;
      case 'tablet':
        return <Image src="/icons_lattify.ai/mobile.svg" alt="Tablet" width={16} height={16} className="w-4 h-4" />;
      default:
        return <Image src="/icons_lattify.ai/desktop.svg" alt="Desktop" width={16} height={16} className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image src="/icons_lattify.ai/visits.svg" alt="Visits" width={20} height={20} className="w-5 h-5" />
          <h2 className="text-lg font-semibold text-gray-900">Visits</h2>
          <Image src="/icons_lattify.ai/question.svg" alt="Help" width={16} height={16} className="w-4 h-4 text-gray-400" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200 transition-colors">
              <Image src="/icons_lattify.ai/calendar.svg" alt="Calendar" width={16} height={16} className="w-4 h-4" />
              <span>All time</span>
              <Image src="/icons_lattify.ai/down-chevron.svg" alt="Dropdown" width={16} height={16} className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[160px]">
            <DropdownMenuItem>Last 7 days</DropdownMenuItem>
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>Last 90 days</DropdownMenuItem>
            <DropdownMenuItem>All time</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Visitor</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Played</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Device</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">OS</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">{formatDate(visit.date)}</td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    {visit.visitor !== 'Anonymous' && visit.staffId ? (
                      <Link
                        href={`/manager/staff#${visit.staffId}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-medium text-gray-900">
                          {visit.visitor.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase()}
                        </div>
                        <span>{visit.visitor}</span>
                      </Link>
                    ) : visit.visitor !== 'Anonymous' ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-medium text-gray-900">
                          {visit.visitor.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase()}
                        </div>
                        <span>{visit.visitor}</span>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Anonymous ({visit.visitorId || 'unknown'})</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{visit.email}</td>
                <td className="py-3 px-4 text-sm">
                  {visit.played ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-red-600">✗</span>
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {getDeviceIcon(visit.device)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {getOSIcon(visit.os)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Showing rows 1-{visits.length}
      </div>
    </div>
  );
}

