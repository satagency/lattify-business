// lib/data/mockProgress.ts

import { GuideProgress } from '@/lib/types';

// Helper to get dates distributed across the last 90 days
const getDateDaysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const mockProgress: GuideProgress[] = [
  // Maria Lopez - Line Cook
  {
    guideId: 'guide-001',
    staffId: 'staff-001',
    completedSteps: 12,
    totalSteps: 12,
    lastStep: getDateDaysAgo(5), // Completed 5 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-003',
    staffId: 'staff-001',
    completedSteps: 10,
    totalSteps: 10,
    lastStep: getDateDaysAgo(12), // Completed 12 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-005',
    staffId: 'staff-001',
    completedSteps: 3,
    totalSteps: 9,
    lastStep: getDateDaysAgo(1), // Last activity yesterday
    proofPhotos: [],
    status: 'in_progress',
  },
  // James Wilson - Server
  {
    guideId: 'guide-004',
    staffId: 'staff-002',
    completedSteps: 11,
    totalSteps: 11,
    lastStep: getDateDaysAgo(8), // Completed 8 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-002',
    completedSteps: 4,
    totalSteps: 7,
    lastStep: getDateDaysAgo(2), // Last activity 2 days ago
    proofPhotos: [],
    status: 'in_progress',
  },
  // Tomasz Nowak - Bartender
  {
    guideId: 'guide-002',
    staffId: 'staff-003',
    completedSteps: 8,
    totalSteps: 8,
    lastStep: getDateDaysAgo(15), // Completed 15 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-003',
    completedSteps: 2,
    totalSteps: 7,
    lastStep: getDateDaysAgo(20), // Last activity 20 days ago
    proofPhotos: [],
    status: 'in_progress',
  },
  // Michael Brown - Head Chef
  {
    guideId: 'guide-001',
    staffId: 'staff-004',
    completedSteps: 12,
    totalSteps: 12,
    lastStep: getDateDaysAgo(3), // Completed 3 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-003',
    staffId: 'staff-004',
    completedSteps: 10,
    totalSteps: 10,
    lastStep: getDateDaysAgo(7), // Completed 7 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-005',
    staffId: 'staff-004',
    completedSteps: 9,
    totalSteps: 9,
    lastStep: getDateDaysAgo(10), // Completed 10 days ago
    proofPhotos: [],
    status: 'complete',
  },
  // Emily Davis - Host
  {
    guideId: 'guide-004',
    staffId: 'staff-005',
    completedSteps: 3,
    totalSteps: 11,
    lastStep: getDateDaysAgo(18), // Last activity 18 days ago
    proofPhotos: [],
    status: 'in_progress',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-005',
    completedSteps: 1,
    totalSteps: 7,
    lastStep: getDateDaysAgo(25), // Last activity 25 days ago
    proofPhotos: [],
    status: 'in_progress',
  },
  // David Martinez - Prep Cook
  {
    guideId: 'guide-003',
    staffId: 'staff-006',
    completedSteps: 6,
    totalSteps: 10,
    lastStep: getDateDaysAgo(4), // Last activity 4 days ago
    proofPhotos: [],
    status: 'in_progress',
  },
  {
    guideId: 'guide-005',
    staffId: 'staff-006',
    completedSteps: 9,
    totalSteps: 9,
    lastStep: getDateDaysAgo(14), // Completed 14 days ago
    proofPhotos: [],
    status: 'complete',
  },
  // Sophie Chen - Barista
  {
    guideId: 'guide-007',
    staffId: 'staff-007',
    completedSteps: 9,
    totalSteps: 9,
    lastStep: getDateDaysAgo(6), // Completed 6 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-007',
    completedSteps: 2,
    totalSteps: 7,
    lastStep: getDateDaysAgo(3), // Last activity 3 days ago
    proofPhotos: [],
    status: 'in_progress',
  },
  // Ana Rodriguez - Front Desk
  {
    guideId: 'guide-008',
    staffId: 'staff-008',
    completedSteps: 8,
    totalSteps: 8,
    lastStep: getDateDaysAgo(9), // Completed 9 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-004',
    staffId: 'staff-008',
    completedSteps: 5,
    totalSteps: 11,
    lastStep: getDateDaysAgo(11), // Last activity 11 days ago
    proofPhotos: [],
    status: 'in_progress',
  },
  // Additional historical data for 30-90 day ranges
  {
    guideId: 'guide-001',
    staffId: 'staff-006',
    completedSteps: 12,
    totalSteps: 12,
    lastStep: getDateDaysAgo(35), // Completed 35 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-002',
    staffId: 'staff-002',
    completedSteps: 8,
    totalSteps: 8,
    lastStep: getDateDaysAgo(42), // Completed 42 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-003',
    staffId: 'staff-007',
    completedSteps: 10,
    totalSteps: 10,
    lastStep: getDateDaysAgo(28), // Completed 28 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-004',
    staffId: 'staff-001',
    completedSteps: 11,
    totalSteps: 11,
    lastStep: getDateDaysAgo(45), // Completed 45 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-007',
    staffId: 'staff-003',
    completedSteps: 9,
    totalSteps: 9,
    lastStep: getDateDaysAgo(38), // Completed 38 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-005',
    staffId: 'staff-002',
    completedSteps: 9,
    totalSteps: 9,
    lastStep: getDateDaysAgo(55), // Completed 55 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-008',
    staffId: 'staff-005',
    completedSteps: 8,
    totalSteps: 8,
    lastStep: getDateDaysAgo(32), // Completed 32 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-006',
    staffId: 'staff-004',
    completedSteps: 7,
    totalSteps: 7,
    lastStep: getDateDaysAgo(60), // Completed 60 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-002',
    staffId: 'staff-005',
    completedSteps: 5,
    totalSteps: 8,
    lastStep: getDateDaysAgo(48), // Last activity 48 days ago
    proofPhotos: [],
    status: 'in_progress',
  },
  {
    guideId: 'guide-001',
    staffId: 'staff-007',
    completedSteps: 12,
    totalSteps: 12,
    lastStep: getDateDaysAgo(70), // Completed 70 days ago
    proofPhotos: [],
    status: 'complete',
  },
  {
    guideId: 'guide-003',
    staffId: 'staff-002',
    completedSteps: 10,
    totalSteps: 10,
    lastStep: getDateDaysAgo(65), // Completed 65 days ago
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
