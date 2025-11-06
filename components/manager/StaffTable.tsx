// components/manager/StaffTable.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpDown, Check, Clock } from 'lucide-react';
import { StaffMember } from '@/lib/types';
import { formatDate, getStatusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StaffTableProps {
  staff: StaffMember[];
  onStaffClick?: (staffId: string) => void;
}

type SortField = 'name' | 'role' | 'status' | 'lastActivity';
type SortDirection = 'asc' | 'desc';

export function StaffTable({ staff, onStaffClick }: StaffTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStaff = [...filteredStaff].sort((a, b) => {
    let aValue: string | Date;
    let bValue: string | Date;

    switch (sortField) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'role':
        aValue = a.role;
        bValue = b.role;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'lastActivity':
        aValue = a.lastActivity;
        bValue = b.lastActivity;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-black transition-colors"
    >
      {children}
      <ArrowUpDown className="h-4 w-4" />
    </button>
  );

  if (staff.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No staff members found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search staff..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">
                <SortButton field="name">Name</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton field="role">Role</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="text-left py-3 px-4">Progress</th>
              <th className="text-left py-3 px-4">
                <SortButton field="lastActivity">Last Activity</SortButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStaff.map((member) => {
              const completionRate = member.assignedGuides.length > 0
                ? Math.round((member.completedGuides.length / member.assignedGuides.length) * 100)
                : 0;

              const rowContent = (
                <tr
                  key={member.id}
                  className={cn(
                    'border-b border-gray-100 hover:bg-gray-50 transition-colors',
                    onStaffClick && 'cursor-pointer'
                  )}
                  onClick={() => onStaffClick?.(member.id)}
                >
                  <td className="py-4 px-4 font-medium">{member.name}</td>
                  <td className="py-4 px-4 text-gray-600">{member.role}</td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                        getStatusColor(member.status),
                        member.status === 'active' || member.status === 'complete' || member.status === 'open'
                          ? 'text-white'
                          : 'text-black'
                      )}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black transition-all"
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {member.completedGuides.length}/{member.assignedGuides.length}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {formatDate(member.lastActivity)}
                  </td>
                </tr>
              );

              return rowContent;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

