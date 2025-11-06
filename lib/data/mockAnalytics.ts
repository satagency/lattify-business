// lib/data/mockAnalytics.ts

import { Analytics } from '@/lib/types';

export const mockAnalytics: Analytics = {
  totalGuides: 6,
  totalStaff: 6,
  pendingProofs: 3,
  mostViewedGuides: [
    { id: 'guide-001', title: 'Dishwasher Cleaning', views: 45 },
    { id: 'guide-002', title: 'Grill Maintenance', views: 32 },
    { id: 'guide-004', title: 'Customer Service Basics', views: 28 },
    { id: 'guide-003', title: 'Food Prep Station Setup', views: 25 },
  ],
  helpRequests: [
    { step: 'Dishwasher Cleaning - Step 3', count: 8 },
    { step: 'Grill Maintenance - Step 5', count: 5 },
    { step: 'POS System Training - Step 4', count: 4 },
    { step: 'Customer Service Basics - Step 7', count: 3 },
  ],
  completionRate: 68.5,
};

