// components/manager/GuideGrid.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, List, MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Guide } from '@/lib/types';
import { getCategoryLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface GuideGridProps {
  guides: Guide[];
  onGuideClick?: (guideId: string) => void;
  onMenuAction?: (action: string, guideId: string) => void;
}

type ViewMode = 'grid' | 'list';

export function GuideGrid({
  guides,
  onGuideClick,
  onMenuAction,
}: GuideGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: Array<{ value: string; label: string }> = [
    { value: 'all', label: 'All Categories' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'foh', label: 'Front of House' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'maintenance', label: 'Maintenance' },
  ];

  const filteredGuides =
    selectedCategory === 'all'
      ? guides
      : guides.filter((guide) => guide.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category.value
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 rounded-lg transition-colors',
              viewMode === 'grid'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
            aria-label="Grid view"
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 rounded-lg transition-colors',
              viewMode === 'list'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {filteredGuides.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No guides found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onGuideClick={onGuideClick}
              onMenuAction={onMenuAction}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredGuides.map((guide) => (
            <GuideListItem
              key={guide.id}
              guide={guide}
              onGuideClick={onGuideClick}
              onMenuAction={onMenuAction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function GuideCard({
  guide,
  onGuideClick,
  onMenuAction,
}: {
  guide: Guide;
  onGuideClick?: (guideId: string) => void;
  onMenuAction?: (action: string, guideId: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-medium transition-shadow relative group">
      <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
        {/* Placeholder gray div - no images without database */}
        <div className="w-full h-full bg-gray-200" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GuideMenu guideId={guide.id} onMenuAction={onMenuAction} />
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
            {getCategoryLabel(guide.category)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3
          className="font-semibold text-lg mb-2 cursor-pointer hover:underline"
          onClick={() => onGuideClick?.(guide.id)}
        >
          {guide.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{guide.totalSteps} steps</span>
          <span>{guide.estimatedTime} min</span>
        </div>
      </div>
    </div>
  );
}

function GuideListItem({
  guide,
  onGuideClick,
  onMenuAction,
}: {
  guide: Guide;
  onGuideClick?: (guideId: string) => void;
  onMenuAction?: (action: string, guideId: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-medium transition-shadow flex items-center gap-4 group">
      <div className="w-24 h-16 bg-gray-200 rounded flex-shrink-0">
        {/* Placeholder gray div - no images without database */}
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className="font-semibold text-lg mb-1 cursor-pointer hover:underline truncate"
          onClick={() => onGuideClick?.(guide.id)}
        >
          {guide.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{getCategoryLabel(guide.category)}</span>
          <span>•</span>
          <span>{guide.totalSteps} steps</span>
          <span>•</span>
          <span>{guide.estimatedTime} min</span>
        </div>
      </div>
      <GuideMenu guideId={guide.id} onMenuAction={onMenuAction} />
    </div>
  );
}

function GuideMenu({
  guideId,
  onMenuAction,
}: {
  guideId: string;
  onMenuAction?: (action: string, guideId: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus-ring">
          <MoreVertical className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => onMenuAction?.('edit', guideId)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Edit className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onMenuAction?.('delete', guideId)}
          className="flex items-center gap-2 cursor-pointer text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

