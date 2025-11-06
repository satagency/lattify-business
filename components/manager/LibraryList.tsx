// components/manager/LibraryList.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Play, Eye, UserPlus, Copy, Trash2, QrCode, MoreVertical, Link2, BarChart3, Layers } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Guide } from '@/lib/types';
import { formatRecordedDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface LibraryListProps {
  guides: Guide[];
  onGuideClick?: (guideId: string) => void;
  onMenuAction?: (action: string, guideId: string) => void;
  viewMode?: 'grid' | 'list';
}

export function LibraryList({
  guides,
  onGuideClick,
  onMenuAction,
  viewMode = 'list',
}: LibraryListProps) {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {guides.map((guide) => (
          <LibraryGridItem
            key={guide.id}
            guide={guide}
            onGuideClick={onGuideClick}
            onMenuAction={onMenuAction}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {guides.map((guide) => (
        <LibraryListItem
          key={guide.id}
          guide={guide}
          onGuideClick={onGuideClick}
          onMenuAction={onMenuAction}
        />
      ))}
    </div>
  );
}

function LibraryGridItem({
  guide,
  onGuideClick,
  onMenuAction,
}: {
  guide: Guide;
  onGuideClick?: (guideId: string) => void;
  onMenuAction?: (action: string, guideId: string) => void;
}) {
  const router = useRouter();
  const recordedDate = guide.recordedAt || guide.createdAt;
  const duration = guide.duration || `${guide.estimatedTime} min`;
  const viewCount = guide.viewCount || 0;

  return (
    <div
      className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
      onClick={() => onGuideClick?.(guide.id)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 w-full">
        {/* Duration badge */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
        {/* Quick actions icon lineup */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <button
            className="p-1.5 bg-black/70 text-white rounded hover:bg-black/90 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onGuideClick?.(guide.id);
            }}
            title="View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 bg-black/70 text-white rounded hover:bg-black/90 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onMenuAction?.('assign', guide.id);
            }}
            title="Assign"
          >
            <UserPlus className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 bg-black/70 text-white rounded hover:bg-black/90 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onMenuAction?.('duplicate', guide.id);
            }}
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 bg-black/70 text-white rounded hover:bg-black/90 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onMenuAction?.('generate-qr', guide.id);
            }}
            title="Generate QR"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 bg-black/70 text-white rounded hover:bg-red-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onMenuAction?.('delete', guide.id);
            }}
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video Details */}
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
          {guide.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formatRecordedDate(recordedDate)}</span>
          <div className="flex items-center gap-1">
            <Play className="w-3 h-3" />
            <span>{viewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LibraryListItem({
  guide,
  onGuideClick,
  onMenuAction,
}: {
  guide: Guide;
  onGuideClick?: (guideId: string) => void;
  onMenuAction?: (action: string, guideId: string) => void;
}) {
  const router = useRouter();
  const recordedDate = guide.recordedAt || guide.createdAt;
  const duration = guide.duration || `${guide.estimatedTime} min`;
  const viewCount = guide.viewCount || 0;

  return (
    <div
      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded transition-colors cursor-pointer group border-b border-gray-100 last:border-b-0"
      onClick={() => onGuideClick?.(guide.id)}
    >
      {/* Thumbnail */}
      <div className="relative w-40 h-24 bg-gray-200 rounded flex-shrink-0">
        {/* Duration badge */}
        <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
          {duration}
        </div>
      </div>

      {/* Video Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-medium text-base text-gray-900 truncate">
            {guide.title}
          </h3>
        </div>
        <p className="text-sm text-gray-500">
          {formatRecordedDate(recordedDate)}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Play Count */}
        <button
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            console.log('View count:', viewCount);
          }}
        >
          <Play className="w-4 h-4" />
          <span>{viewCount}</span>
        </button>

        {/* Quick Actions Icons */}
        <button
          className="p-2 text-gray-600 hover:text-gray-900 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onGuideClick?.(guide.id);
          }}
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          className="p-2 text-gray-600 hover:text-gray-900 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onMenuAction?.('assign', guide.id);
          }}
          title="Assign"
        >
          <UserPlus className="w-4 h-4" />
        </button>
        <button
          className="p-2 text-gray-600 hover:text-gray-900 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onMenuAction?.('duplicate', guide.id);
          }}
          title="Duplicate"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          className="p-2 text-gray-600 hover:text-gray-900 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onMenuAction?.('generate-qr', guide.id);
          }}
          title="Generate QR"
        >
          <QrCode className="w-4 h-4" />
        </button>
        <button
          className="p-2 text-gray-600 hover:text-red-600 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onMenuAction?.('delete', guide.id);
          }}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

