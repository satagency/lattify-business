// lib/data/mockQuestions.ts

import { Question } from '@/lib/types';

export const mockQuestions: Question[] = [
  {
    id: 'q-001',
    guideId: 'guide-001',
    stepNumber: 4,
    staffId: 'staff-001',
    staffName: 'Maria Lopez',
    question: 'How much pasta water should I reserve? The guide says 100ml but that seems low.',
    answer: 'You\'re right! Based on feedback, we\'ve updated it to 200ml. The pasta water helps create the creamy sauce consistency.',
    status: 'resolved',
    createdAt: new Date('2025-01-20T10:30:00'),
    answeredAt: new Date('2025-01-20T11:15:00'),
  },
  {
    id: 'q-002',
    guideId: 'guide-002',
    stepNumber: 5,
    staffId: 'staff-003',
    staffName: 'Tomasz Nowak',
    question: 'How long should I muddle the orange peel? The guide doesn\'t specify.',
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
    question: 'What do I say if a guest complains about food temperature?',
    status: 'open',
    createdAt: new Date('2025-01-22T16:30:00'),
  },
  {
    id: 'q-005',
    guideId: 'guide-007',
    stepNumber: 4,
    staffId: 'staff-007',
    staffName: 'Sophie Chen',
    question: 'My milk isn\'t creating foam. Should the steam wand be deeper or shallower?',
    answer: 'Keep the wand just below the surface with the tip slightly at an angle. You should hear a paper-tearing sound. If it\'s too deep, you\'ll get bubbles instead of microfoam.',
    status: 'resolved',
    createdAt: new Date('2025-01-21T11:15:00'),
    answeredAt: new Date('2025-01-21T11:30:00'),
  },
  {
    id: 'q-006',
    guideId: 'guide-001',
    stepNumber: 8,
    staffId: 'staff-001',
    staffName: 'Maria Lopez',
    question: 'How hot should the pan be when adding the pasta? The guide says medium heat but I\'m not sure.',
    status: 'open',
    createdAt: new Date('2025-01-22T12:15:00'),
  },
  {
    id: 'q-007',
    guideId: 'guide-005',
    stepNumber: 6,
    staffId: 'staff-006',
    staffName: 'David Martinez',
    question: 'Do I need to wipe down the inside of the ovens or just the outside?',
    status: 'open',
    createdAt: new Date('2025-01-22T21:00:00'),
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
