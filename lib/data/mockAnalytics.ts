// lib/data/mockAnalytics.ts

import { Analytics } from '@/lib/types';

export const mockAnalytics: Analytics = {
  totalGuides: 8,
  totalStaff: 8,
  pendingProofs: 3,
  mostViewedGuides: [
    { id: 'guide-001', title: 'Signature Carbonara', views: 47 },
    { id: 'guide-002', title: 'Old Fashioned Cocktail', views: 35 },
    { id: 'guide-004', title: 'Table Service Standards', views: 32 },
    { id: 'guide-007', title: 'Latte Art Basics', views: 28 },
    { id: 'guide-003', title: 'Morningside Prep Station Setup', views: 26 },
  ],
  helpRequests: [
    { step: 'Signature Carbonara - Step 4', count: 12 },
    { step: 'Old Fashioned Cocktail - Step 5', count: 8 },
    { step: 'Latte Art Basics - Step 4', count: 7 },
    { step: 'Table Service Standards - Step 7', count: 5 },
    { step: 'POS System Operation - Step 4', count: 4 },
  ],
  completionRate: 68.5,
};
