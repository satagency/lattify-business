// lib/data/mockHotelInfo.ts

import { HotelInfo, ManagerInfo, HotelGoal, Ranking } from '@/lib/types';

export const mockHotelInfo: HotelInfo = {
  id: 'hotel-001',
  name: 'The Grand Morningside',
  location: 'San Francisco, CA',
  propertyType: 'Boutique Hotel',
  starRating: 4,
  totalRooms: 120,
  brand: 'Morningside Hospitality',
};

export const mockManagerInfo: ManagerInfo = {
  name: 'Sarah Chen',
  position: 'Director of Operations',
  department: 'Food & Beverage',
  email: 'sarah.chen@morningside.com',
  phone: '+1 (415) 555-0123',
};

export const mockHotelGoals: HotelGoal[] = [
  {
    id: 'goal-001',
    title: 'Training Completion Rate',
    target: 95,
    current: 78,
    unit: '%',
    category: 'training',
    deadline: new Date('2025-03-31'),
  },
  {
    id: 'goal-002',
    title: 'Staff Engagement Score',
    target: 4.5,
    current: 4.2,
    unit: '/5.0',
    category: 'engagement',
    deadline: new Date('2025-06-30'),
  },
  {
    id: 'goal-003',
    title: 'Guide Utilization',
    target: 85,
    current: 72,
    unit: '%',
    category: 'performance',
    deadline: new Date('2025-04-30'),
  },
  {
    id: 'goal-004',
    title: 'Response Time to Questions',
    target: 2,
    current: 3.5,
    unit: 'hours',
    category: 'performance',
    deadline: new Date('2025-02-28'),
  },
];

export const mockRankings: Ranking[] = [
  {
    metric: 'Training Completion Rate',
    rank: 3,
    totalCompetitors: 12,
    percentile: 75,
    comparison: 'above',
    sisterProperties: [
      { name: 'Morningside Downtown', value: 82, rank: 2 },
      { name: 'Morningside Airport', value: 71, rank: 5 },
      { name: 'Morningside Marina', value: 68, rank: 6 },
    ],
  },
  {
    metric: 'Staff Engagement',
    rank: 5,
    totalCompetitors: 12,
    percentile: 58,
    comparison: 'average',
    sisterProperties: [
      { name: 'Morningside Downtown', value: 4.5, rank: 3 },
      { name: 'Morningside Airport', value: 4.0, rank: 7 },
      { name: 'Morningside Marina', value: 4.3, rank: 4 },
    ],
  },
  {
    metric: 'Response Time',
    rank: 8,
    totalCompetitors: 12,
    percentile: 33,
    comparison: 'below',
    sisterProperties: [
      { name: 'Morningside Downtown', value: 1.8, rank: 2 },
      { name: 'Morningside Airport', value: 2.5, rank: 4 },
      { name: 'Morningside Marina', value: 2.2, rank: 3 },
    ],
  },
];

