// lib/data/mockGuides.ts

import { Guide } from '@/lib/types';

export const mockGuides: Guide[] = [
  {
    id: 'guide-001',
    title: 'Dishwasher Cleaning',
    thumbnail: '/images/guide-thumbnails/dishwasher.jpg',
    category: 'cleaning',
    totalSteps: 7,
    estimatedTime: 15,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-20'),
  },
  {
    id: 'guide-002',
    title: 'Grill Maintenance',
    thumbnail: '/images/guide-thumbnails/grill.jpg',
    category: 'maintenance',
    totalSteps: 12,
    estimatedTime: 30,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-18'),
  },
  {
    id: 'guide-003',
    title: 'Food Prep Station Setup',
    thumbnail: '/images/guide-thumbnails/prep.jpg',
    category: 'kitchen',
    totalSteps: 8,
    estimatedTime: 20,
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-19'),
  },
  {
    id: 'guide-004',
    title: 'Customer Service Basics',
    thumbnail: '/images/guide-thumbnails/service.jpg',
    category: 'foh',
    totalSteps: 10,
    estimatedTime: 25,
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-21'),
  },
  {
    id: 'guide-005',
    title: 'Floor Cleaning Protocol',
    thumbnail: '/images/guide-thumbnails/floor.jpg',
    category: 'cleaning',
    totalSteps: 6,
    estimatedTime: 18,
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-20'),
  },
  {
    id: 'guide-006',
    title: 'POS System Training',
    thumbnail: '/images/guide-thumbnails/pos.jpg',
    category: 'foh',
    totalSteps: 9,
    estimatedTime: 22,
    createdAt: new Date('2025-01-11'),
    updatedAt: new Date('2025-01-22'),
  },
];

export const getGuideById = (id: string): Guide | undefined => {
  return mockGuides.find(guide => guide.id === id);
};

export const getGuidesByCategory = (category: Guide['category']): Guide[] => {
  return mockGuides.filter(guide => guide.category === category);
};

