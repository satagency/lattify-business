// lib/types.ts

export interface Guide {
  id: string;
  title: string;
  thumbnail: string;
  category: 'kitchen' | 'foh' | 'cleaning' | 'maintenance';
  totalSteps: number;
  estimatedTime: number; // minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  assignedGuides: string[]; // Guide IDs
  completedGuides: string[];
  lastActivity: Date;
  status: 'active' | 'pending' | 'complete';
}

export interface GuideProgress {
  guideId: string;
  staffId: string;
  completedSteps: number;
  totalSteps: number;
  lastStep: number;
  proofPhotos: string[];
  status: 'not_started' | 'in_progress' | 'awaiting_approval' | 'complete';
}

export interface Question {
  id: string;
  guideId: string;
  stepNumber: number;
  staffId: string;
  staffName: string;
  question: string;
  answer?: string;
  status: 'open' | 'resolved';
  createdAt: Date;
  answeredAt?: Date;
}

export interface Analytics {
  totalGuides: number;
  totalStaff: number;
  pendingProofs: number;
  mostViewedGuides: Array<{ id: string; title: string; views: number }>;
  helpRequests: Array<{ step: string; count: number }>;
  completionRate: number;
}

