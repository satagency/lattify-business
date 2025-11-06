// lib/data/mockStepProblems.ts

export interface StepProblem {
  guideId: string;
  guideTitle: string;
  stepNumber: number;
  helpRequestRate: number;
  averageRate: number;
  helpRequests: number;
  totalAttempts: number;
}

export const mockStepProblems: StepProblem[] = [
  {
    guideId: 'guide-001',
    guideTitle: 'Signature Carbonara',
    stepNumber: 4,
    helpRequestRate: 70,
    averageRate: 15,
    helpRequests: 12,
    totalAttempts: 17,
  },
  {
    guideId: 'guide-002',
    guideTitle: 'Old Fashioned Cocktail',
    stepNumber: 5,
    helpRequestRate: 55,
    averageRate: 15,
    helpRequests: 8,
    totalAttempts: 15,
  },
  {
    guideId: 'guide-007',
    guideTitle: 'Latte Art Basics',
    stepNumber: 4,
    helpRequestRate: 45,
    averageRate: 15,
    helpRequests: 7,
    totalAttempts: 16,
  },
  {
    guideId: 'guide-004',
    guideTitle: 'Table Service Standards',
    stepNumber: 7,
    helpRequestRate: 35,
    averageRate: 15,
    helpRequests: 5,
    totalAttempts: 14,
  },
];

