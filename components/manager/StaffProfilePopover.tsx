// components/manager/StaffProfilePopover.tsx

'use client';

import React from 'react';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { StaffMember } from '@/lib/types';
import { mockProgress } from '@/lib/data/mockProgress';
import { mockGuides } from '@/lib/data/mockGuides';
import { getQuestionsByStaffId } from '@/lib/data/mockQuestions';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, MessageSquare, TrendingUp } from 'lucide-react';

interface StaffProfilePopoverProps {
  staff: StaffMember;
  children: React.ReactNode;
}

export function StaffProfilePopover({ staff, children }: StaffProfilePopoverProps) {
  const [open, setOpen] = React.useState(false);

  // Calculate stats
  const completionRate = staff.assignedGuides.length > 0
    ? Math.round((staff.completedGuides.length / staff.assignedGuides.length) * 100)
    : 0;

  const staffProgress = mockProgress.filter(p => p.staffId === staff.id);
  const inProgressGuides = staffProgress.filter(
    p => p.status === 'in_progress' || p.status === 'awaiting_approval'
  ).length;

  const questions = getQuestionsByStaffId(staff.id);
  const openQuestions = questions.filter(q => q.status === 'open').length;

  // Get guide details with progress
  const guideDetails = staff.assignedGuides.map(guideId => {
    const guide = mockGuides.find(g => g.id === guideId);
    const progress = staffProgress.find(p => p.guideId === guideId);
    return {
      guide,
      progress,
      isCompleted: staff.completedGuides.includes(guideId),
    };
  });

  // Handle click on table row to open popover
  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    setOpen(true);
    
    // Also call the original onClick if it exists
    const childElement = children as React.ReactElement<{ onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void }>;
    const originalOnClick = childElement.props?.onClick;
    if (originalOnClick) {
      originalOnClick(e);
    }
  };

  // Clone children and add onClick handler
  const triggerElement = React.cloneElement(
    children as React.ReactElement<{ onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void }>,
    {
      onClick: handleRowClick,
    }
  );

  return (
    <>
      {triggerElement}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverContent align="start" className="w-96 p-0" side="right">
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-1">{staff.name}</h3>
              <p className="text-sm text-gray-600">{staff.role}</p>
            </div>

            {/* Key Stats */}
            <div className="px-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Completed</span>
                </div>
                <p className="text-2xl font-light">{staff.completedGuides.length}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>In Progress</span>
                </div>
                <p className="text-2xl font-light">{inProgressGuides}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MessageSquare className="h-4 w-4" />
                  <span>Open Questions</span>
                </div>
                <p className="text-2xl font-light">{openQuestions}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <TrendingUp className="h-4 w-4" />
                  <span>Completion Rate</span>
                </div>
                <p className="text-2xl font-light">{completionRate}%</p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="px-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Overall Progress</span>
                <span className="text-sm font-medium">{completionRate}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            {/* Assigned Guides */}
            <div className="px-6 pb-6">
              <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-4">Assigned Guides</h4>
              <div className="space-y-3">
                {guideDetails.map(({ guide, progress, isCompleted }) => {
                  if (!guide) return null;

                  const progressPercent = progress
                    ? Math.round((progress.completedSteps / progress.totalSteps) * 100)
                    : 0;

                  return (
                    <div key={guide.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{guide.title}</span>
                        <span className={cn(
                          'text-xs px-2 py-1 rounded',
                          isCompleted
                            ? 'bg-black text-white'
                            : progress?.status === 'in_progress'
                            ? 'bg-gray-200 text-black'
                            : 'bg-gray-100 text-gray-600'
                        )}>
                          {isCompleted ? 'Complete' : progress?.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                        </span>
                      </div>
                      {progress && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{progress.completedSteps} / {progress.totalSteps} steps</span>
                            <span>{progressPercent}%</span>
                          </div>
                          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-black transition-all"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Last Activity */}
            <div className="px-6 pb-6 border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500">
                Last activity: {formatDate(staff.lastActivity)}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
