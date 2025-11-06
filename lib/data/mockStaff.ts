// lib/data/mockStaff.ts

import { StaffMember } from '@/lib/types';

export const mockStaff: StaffMember[] = [
  {
    id: 'staff-001',
    name: 'Maria Lopez',
    role: 'Line Cook',
    assignedGuides: ['guide-001', 'guide-002', 'guide-003'],
    completedGuides: ['guide-001', 'guide-002'],
    lastActivity: new Date('2025-01-22'),
    status: 'active',
  },
  {
    id: 'staff-002',
    name: 'James Wilson',
    role: 'Server',
    assignedGuides: ['guide-004', 'guide-006'],
    completedGuides: ['guide-004'],
    lastActivity: new Date('2025-01-21'),
    status: 'active',
  },
  {
    id: 'staff-003',
    name: 'Sarah Chen',
    role: 'Dishwasher',
    assignedGuides: ['guide-001', 'guide-005'],
    completedGuides: ['guide-001'],
    lastActivity: new Date('2025-01-20'),
    status: 'pending',
  },
  {
    id: 'staff-004',
    name: 'Michael Brown',
    role: 'Kitchen Manager',
    assignedGuides: ['guide-002', 'guide-003'],
    completedGuides: ['guide-002', 'guide-003'],
    lastActivity: new Date('2025-01-22'),
    status: 'complete',
  },
  {
    id: 'staff-005',
    name: 'Emily Davis',
    role: 'Host',
    assignedGuides: ['guide-004', 'guide-006'],
    completedGuides: [],
    lastActivity: new Date('2025-01-19'),
    status: 'active',
  },
  {
    id: 'staff-006',
    name: 'David Martinez',
    role: 'Prep Cook',
    assignedGuides: ['guide-003', 'guide-005'],
    completedGuides: ['guide-005'],
    lastActivity: new Date('2025-01-21'),
    status: 'active',
  },
];

export const getStaffById = (id: string): StaffMember | undefined => {
  return mockStaff.find(staff => staff.id === id);
};

export const getStaffByStatus = (status: StaffMember['status']): StaffMember[] => {
  return mockStaff.filter(staff => staff.status === status);
};

