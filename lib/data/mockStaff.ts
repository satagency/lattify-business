// lib/data/mockStaff.ts

import { StaffMember } from '@/lib/types';

export const mockStaff: StaffMember[] = [
  {
    id: 'staff-001',
    name: 'Maria Lopez',
    role: 'Line Cook',
    assignedGuides: ['guide-001', 'guide-003', 'guide-005'],
    completedGuides: ['guide-001', 'guide-003'],
    lastActivity: new Date('2025-01-22T14:30:00'),
    status: 'active',
  },
  {
    id: 'staff-002',
    name: 'James Wilson',
    role: 'Server',
    assignedGuides: ['guide-004', 'guide-006'],
    completedGuides: ['guide-004'],
    lastActivity: new Date('2025-01-22T16:15:00'),
    status: 'active',
  },
  {
    id: 'staff-003',
    name: 'Tomasz Nowak',
    role: 'Bartender',
    assignedGuides: ['guide-002', 'guide-006'],
    completedGuides: ['guide-002'],
    lastActivity: new Date('2025-01-21T20:45:00'),
    status: 'active',
  },
  {
    id: 'staff-004',
    name: 'Michael Brown',
    role: 'Head Chef',
    assignedGuides: ['guide-001', 'guide-003', 'guide-005'],
    completedGuides: ['guide-001', 'guide-003', 'guide-005'],
    lastActivity: new Date('2025-01-22T18:00:00'),
    status: 'complete',
  },
  {
    id: 'staff-005',
    name: 'Emily Davis',
    role: 'Host',
    assignedGuides: ['guide-004', 'guide-006'],
    completedGuides: [],
    lastActivity: new Date('2025-01-19T12:00:00'),
    status: 'pending',
  },
  {
    id: 'staff-006',
    name: 'David Martinez',
    role: 'Prep Cook',
    assignedGuides: ['guide-003', 'guide-005'],
    completedGuides: ['guide-005'],
    lastActivity: new Date('2025-01-22T10:30:00'),
    status: 'active',
  },
  {
    id: 'staff-007',
    name: 'Sophie Chen',
    role: 'Barista',
    assignedGuides: ['guide-007', 'guide-006'],
    completedGuides: ['guide-007'],
    lastActivity: new Date('2025-01-22T11:20:00'),
    status: 'active',
  },
  {
    id: 'staff-008',
    name: 'Ana Rodriguez',
    role: 'Front Desk',
    assignedGuides: ['guide-008', 'guide-004'],
    completedGuides: ['guide-008'],
    lastActivity: new Date('2025-01-22T15:45:00'),
    status: 'active',
  },
];

export const getStaffById = (id: string): StaffMember | undefined => {
  return mockStaff.find(staff => staff.id === id);
};

export const getStaffByStatus = (status: StaffMember['status']): StaffMember[] => {
  return mockStaff.filter(staff => staff.status === status);
};
