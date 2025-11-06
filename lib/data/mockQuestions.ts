// lib/data/mockQuestions.ts

import { Question } from '@/lib/types';

export const mockQuestions: Question[] = [
  {
    id: 'q-001',
    guideId: 'guide-001',
    stepNumber: 3,
    staffId: 'staff-003',
    staffName: 'Sarah Chen',
    question: 'How much detergent should I use?',
    answer: 'Use 2 tablespoons of detergent for a full load.',
    status: 'resolved',
    createdAt: new Date('2025-01-20T10:30:00'),
    answeredAt: new Date('2025-01-20T11:15:00'),
  },
  {
    id: 'q-002',
    guideId: 'guide-002',
    stepNumber: 5,
    staffId: 'staff-001',
    staffName: 'Maria Lopez',
    question: 'What temperature should the grill be set to?',
    status: 'open',
    createdAt: new Date('2025-01-22T14:20:00'),
  },
  {
    id: 'q-003',
    guideId: 'guide-003',
    stepNumber: 2,
    staffId: 'staff-006',
    staffName: 'David Martinez',
    question: 'Where are the cutting boards stored?',
    answer: 'The cutting boards are in the cabinet above the prep station, labeled "Prep Tools".',
    status: 'resolved',
    createdAt: new Date('2025-01-21T09:45:00'),
    answeredAt: new Date('2025-01-21T10:00:00'),
  },
  {
    id: 'q-004',
    guideId: 'guide-004',
    stepNumber: 7,
    staffId: 'staff-002',
    staffName: 'James Wilson',
    question: 'How do I handle a complaint about food temperature?',
    status: 'open',
    createdAt: new Date('2025-01-22T16:30:00'),
  },
  {
    id: 'q-005',
    guideId: 'guide-006',
    stepNumber: 4,
    staffId: 'staff-005',
    staffName: 'Emily Davis',
    question: 'What if the payment terminal is not responding?',
    status: 'open',
    createdAt: new Date('2025-01-22T12:15:00'),
  },
];

export const getQuestionsByGuideId = (guideId: string): Question[] => {
  return mockQuestions.filter(q => q.guideId === guideId);
};

export const getOpenQuestions = (): Question[] => {
  return mockQuestions.filter(q => q.status === 'open');
};

export const getQuestionsByStaffId = (staffId: string): Question[] => {
  return mockQuestions.filter(q => q.staffId === staffId);
};

export const getQuestionById = (id: string): Question | undefined => {
  return mockQuestions.find(q => q.id === id);
};

