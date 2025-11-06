// lib/data/mockVideoAnalytics.ts

import { VideoAnalytics, VideoVisit, VideoPlay, VideoEngagement } from '@/lib/types';
import { mockStaff } from './mockStaff';

export function getVideoAnalytics(guideId: string): VideoAnalytics | null {
  const analytics = mockVideoAnalytics[guideId];
  if (!analytics) {
    // Return default analytics if not found
    return {
      guideId,
      visits: [],
      plays: [],
      engagement: [],
      totalVisits: 0,
      uniqueVisits: 0,
      totalPlays: 0,
      uniquePlays: 0,
      engagementPercent: null,
      clickThroughPercent: null,
    };
  }
  
  const visits = analytics.visits.map(v => ({ ...v, date: new Date(v.date) }));
  const uniqueVisitors = new Set(visits.map(v => v.visitor));
  const playedVisits = visits.filter(v => v.played);
  const uniquePlayedVisitors = new Set(playedVisits.map(v => v.visitor));
  
  return {
    ...analytics,
    visits,
    plays: analytics.plays.map(p => ({ ...p, date: new Date(p.date) })),
    totalVisits: visits.length,
    uniqueVisits: uniqueVisitors.size,
    totalPlays: playedVisits.length,
    uniquePlays: uniquePlayedVisitors.size,
  };
}

// Helper function to generate visits with staff members
function generateVisitsForGuide(guideId: string): Array<Omit<VideoVisit, 'date'> & { date: string }> {
  // Get staff members assigned to this guide
  const assignedStaff = mockStaff.filter(staff => 
    staff.assignedGuides.includes(guideId) || 
    staff.completedGuides.includes(guideId)
  );
  
  // Take first 5-6 staff members, or all if less than 6
  const selectedStaff = assignedStaff.slice(0, 6);
  
  // If we don't have enough staff, add some from the general list
  if (selectedStaff.length < 5) {
    const additionalStaff = mockStaff
      .filter(s => !selectedStaff.includes(s))
      .slice(0, 5 - selectedStaff.length);
    selectedStaff.push(...additionalStaff);
  }
  
  const visits: Array<Omit<VideoVisit, 'date'> & { date: string }> = [];
  
  // Add staff visits
  selectedStaff.forEach((staff, index) => {
    visits.push({
      id: `visit-${guideId}-${staff.id}-${index}`,
      date: new Date(Date.now() - (index + 1) * 2 * 24 * 60 * 60 * 1000).toISOString(),
      visitor: staff.name,
      staffId: staff.id,
      email: 'Private',
      played: index % 2 === 0, // Alternate played status
      device: index % 3 === 0 ? 'mobile' : 'desktop',
      os: index % 2 === 0 ? 'ios' : 'macos',
    });
  });
  
  // Add 1 anonymous visit
  visits.push({
    id: `visit-${guideId}-anonymous`,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    visitor: 'Anonymous',
    visitorId: 'fc2a8',
    email: 'N/A',
    played: false,
    device: 'mobile',
    os: 'android',
  });
  
  // Sort by date (most recent first)
  return visits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const mockVideoAnalytics: Record<string, Omit<VideoAnalytics, 'visits' | 'plays'> & { visits: Array<Omit<VideoVisit, 'date'> & { date: string }>, plays: Array<Omit<VideoPlay, 'date'> & { date: string }> }> = {
  'guide-001': {
    guideId: 'guide-001',
    visits: generateVisitsForGuide('guide-001'),
    plays: [
      { date: new Date('2024-10-27').toISOString(), count: 0 },
      { date: new Date('2024-10-28').toISOString(), count: 0 },
      { date: new Date('2024-10-29').toISOString(), count: 0 },
      { date: new Date('2024-10-30').toISOString(), count: 0 },
      { date: new Date('2024-10-31').toISOString(), count: 0 },
      { date: new Date('2024-11-01').toISOString(), count: 0 },
      { date: new Date('2024-11-02').toISOString(), count: 1 },
      { date: new Date('2024-11-03').toISOString(), count: 0 },
      { date: new Date('2024-11-04').toISOString(), count: 0 },
      { date: new Date('2024-11-05').toISOString(), count: 0 },
    ],
    engagement: [
      { time: 0, engagement: 45 },
      { time: 34, engagement: 60 },
      { time: 59, engagement: 75 },
      { time: 83, engagement: 80 },
      { time: 107, engagement: 65 },
      { time: 131, engagement: 70 },
      { time: 155, engagement: 55 },
    ],
    totalVisits: 0, // Will be calculated from visits array
    uniqueVisits: 0, // Will be calculated from visits array
    totalPlays: 0, // Will be calculated from visits array
    uniquePlays: 0, // Will be calculated from visits array
    engagementPercent: null,
    clickThroughPercent: null,
  },
};

// Generate analytics for other guides
['guide-002', 'guide-003', 'guide-004', 'guide-005', 'guide-006', 'guide-007', 'guide-008'].forEach((id) => {
  const visits = generateVisitsForGuide(id);
  mockVideoAnalytics[id] = {
    guideId: id,
    visits,
    plays: Array.from({ length: 10 }, (_, i) => ({
      date: new Date(Date.now() - (10 - i) * 24 * 60 * 60 * 1000).toISOString(),
      count: Math.floor(Math.random() * 5),
    })),
    engagement: Array.from({ length: 7 }, (_, i) => ({
      time: i * 30,
      engagement: Math.floor(Math.random() * 50) + 30,
    })),
    totalVisits: visits.length,
    uniqueVisits: visits.filter((v, i, arr) => arr.findIndex(x => x.visitor === v.visitor) === i).length,
    totalPlays: visits.filter(v => v.played).length,
    uniquePlays: visits.filter((v, i, arr) => v.played && arr.findIndex(x => x.visitor === v.visitor && x.played) === i).length,
    engagementPercent: null,
    clickThroughPercent: null,
  };
});

