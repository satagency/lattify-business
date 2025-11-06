// lib/data/mockProgress.ts

import { GuideProgress } from '@/lib/types';

export const mockProgress: GuideProgress[] = [
  // Maria Lopez - Line Cook
  {
    guideId: 'guide-001',
    staffId: 'staff-001',
    completedSteps: 12,
    totalSteps: 12,
    lastStep: 12,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-003',
    staffId: 'staff-001',
    completedSteps: 10,
    totalSteps: 10,
    lastStep: 10,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-005',
    staffId: 'staff-001',
    completedSteps: 3,
    totalSteps: 9,
    lastStep: 3,
    proofPhotos: [],
    status: 'in_progress',
  },
  // James Wilson - Server
  {
    guideId: 'guide-004',
    staffId: 'staff-002',
    completedSteps: 11,
    totalSteps: 11,
    lastStep: 11,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-002',
    completedSteps: 4,
    totalSteps: 7,
    lastStep: 4,
    proofPhotos: [],
    status: 'in_progress',
  },
  // Tomasz Nowak - Bartender
  {
    guideId: 'guide-002',
    staffId: 'staff-003',
    completedSteps: 8,
    totalSteps: 8,
    lastStep: 8,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-003',
    completedSteps: 0,
    totalSteps: 7,
    lastStep: 0,
    proofPhotos: [],
    status: 'not_started',
  },
  // Michael Brown - Head Chef
  {
    guideId: 'guide-001',
    staffId: 'staff-004',
    completedSteps: 12,
    totalSteps: 12,
    lastStep: 12,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-003',
    staffId: 'staff-004',
    completedSteps: 10,
    totalSteps: 10,
    lastStep: 10,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-005',
    staffId: 'staff-004',
    completedSteps: 9,
    totalSteps: 9,
    lastStep: 9,
    proofPhotos: [],
    status: 'complete',
  },
  // Emily Davis - Host
  {
    guideId: 'guide-004',
    staffId: 'staff-005',
    completedSteps: 0,
    totalSteps: 11,
    lastStep: 0,
    proofPhotos: [],
    status: 'not_started',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-005',
    completedSteps: 0,
    totalSteps: 7,
    lastStep: 0,
    proofPhotos: [],
    status: 'not_started',
  },
  // David Martinez - Prep Cook
  {
    guideId: 'guide-003',
    staffId: 'staff-006',
    completedSteps: 6,
    totalSteps: 10,
    lastStep: 6,
    proofPhotos: [],
    status: 'in_progress',
  },
  {
    guideId: 'guide-005',
    staffId: 'staff-006',
    completedSteps: 9,
    totalSteps: 9,
    lastStep: 9,
    proofPhotos: [],
    status: 'complete',
  },
  // Sophie Chen - Barista
  {
    guideId: 'guide-007',
    staffId: 'staff-007',
    completedSteps: 9,
    totalSteps: 9,
    lastStep: 9,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-007',
    completedSteps: 2,
    totalSteps: 7,
    lastStep: 2,
    proofPhotos: [],
    status: 'in_progress',
  },
  // Ana Rodriguez - Front Desk
  {
    guideId: 'guide-008',
    staffId: 'staff-008',
    completedSteps: 8,
    totalSteps: 8,
    lastStep: 8,
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-004',
    staffId: 'staff-008',
    completedSteps: 5,
    totalSteps: 11,
    lastStep: 5,
    proofPhotos: [],
    status: 'in_progress',
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
