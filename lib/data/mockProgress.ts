// lib/data/mockProgress.ts

import { GuideProgress } from '@/lib/types';

export const mockProgress: GuideProgress[] = [
  {
    guideId: 'guide-001',
    staffId: 'staff-001',
    completedSteps: 7,
    totalSteps: 7,
    lastStep: 7,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-002',
    staffId: 'staff-001',
    completedSteps: 7,
    totalSteps: 12,
    lastStep: 7,
    proofPhotos: [],
    status: 'in_progress',
  },
  {
    guideId: 'guide-003',
    staffId: 'staff-001',
    completedSteps: 0,
    totalSteps: 8,
    lastStep: 0,
    proofPhotos: [],
    status: 'not_started',
  },
  {
    guideId: 'guide-001',
    staffId: 'staff-003',
    completedSteps: 5,
    totalSteps: 7,
    lastStep: 5,
    proofPhotos: [],
    status: 'in_progress',
  },
  {
    guideId: 'guide-004',
    staffId: 'staff-002',
    completedSteps: 10,
    totalSteps: 10,
    lastStep: 10,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-002',
    completedSteps: 3,
    totalSteps: 9,
    lastStep: 3,
    proofPhotos: [],
    status: 'in_progress',
  },
  {
    guideId: 'guide-005',
    staffId: 'staff-006',
    completedSteps: 6,
    totalSteps: 6,
    lastStep: 6,
    proofPhotos: [],
    status: 'complete',
  },
];

export const getProgressByStaffAndGuide = (
  staffId: string,
  guideId: string
): GuideProgress | undefined => {
  return mockProgress.find(
    p => p.staffId === staffId && p.guideId === guideId
  );
};

export const getProgressByStaffId = (staffId: string): GuideProgress[] => {
  return mockProgress.filter(p => p.staffId === staffId);
};

export const getProgressByGuideId = (guideId: string): GuideProgress[] => {
  return mockProgress.filter(p => p.guideId === guideId);
};

