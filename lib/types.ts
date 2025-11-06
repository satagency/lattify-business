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
  duration?: string; // e.g., "5 min", "2 sec"
  viewCount?: number;
  recordedAt?: Date; // Recording date for display
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
  lastStep: Date | number; // Date when last activity occurred, or step number for backwards compatibility
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

export interface HotelInfo {
  id: string;
  name: string;
  location: string;
  propertyType: string;
  starRating: number;
  totalRooms: number;
  brand?: string;
  image?: string; // Hotel photo/image URL
}

export interface ManagerInfo {
  name: string;
  position: string;
  department: string;
  email: string;
  phone?: string;
}

export interface HotelGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  category: 'training' | 'performance' | 'engagement' | 'quality';
  deadline?: Date;
}

export interface Ranking {
  metric: string;
  rank: number;
  totalCompetitors: number;
  percentile: number; // 0-100
  comparison: 'above' | 'below' | 'average';
  sisterProperties?: Array<{
    name: string;
    value: number;
    rank: number;
  }>;
}

export interface VideoVisit {
  id: string;
  date: Date;
  visitor: string;
  visitorId?: string;
  staffId?: string; // Link to staff member
  email: string | 'Private' | 'N/A';
  played: boolean;
  device: 'desktop' | 'mobile' | 'tablet';
  os: 'macos' | 'ios' | 'android' | 'windows';
}

export interface VideoPlay {
  date: Date;
  count: number;
}

export interface VideoEngagement {
  time: number; // seconds
  engagement: number; // 0-100
}

export interface VideoAnalytics {
  guideId: string;
  visits: VideoVisit[];
  plays: VideoPlay[];
  engagement: VideoEngagement[];
  totalVisits: number;
  uniqueVisits: number;
  totalPlays: number;
  uniquePlays: number;
  engagementPercent: number | null;
  clickThroughPercent: number | null;
}

