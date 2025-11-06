// lib/data/mockAnalytics.ts

import { Analytics } from '@/lib/types';

export const mockAnalytics: Analytics = {
  totalGuides: 8,
  totalStaff: 8,
  pendingProofs: 7, // Realistic number of pending photo proofs
  mostViewedGuides: [
    { id: 'guide-001', title: 'Signature Carbonara', views: 142 },
    { id: 'guide-002', title: 'Old Fashioned Cocktail', views: 128 },
    { id: 'guide-004', title: 'Table Service Standards', views: 115 },
    { id: 'guide-007', title: 'Latte Art Basics', views: 98 },
    { id: 'guide-003', title: 'Morningside Prep Station Setup', views: 87 },
  ],
  helpRequests: [
    { step: 'Signature Carbonara - Step 4', count: 18 },
    { step: 'Old Fashioned Cocktail - Step 5', count: 14 },
    { step: 'Latte Art Basics - Step 4', count: 12 },
    { step: 'Table Service Standards - Step 7', count: 11 },
    { step: 'POS System Operation - Step 4', count: 9 },
  ],
  completionRate: 72.3,
};
