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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search staff..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6">
                <SortButton field="name">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Name</span>
                </SortButton>
              </th>
              <th className="text-left py-4 px-6">
                <SortButton field="role">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Role</span>
                </SortButton>
              </th>
              <th className="text-left py-4 px-6">
                <SortButton field="status">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Status</span>
                </SortButton>
              </th>
              <th className="text-left py-4 px-6">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Progress</span>
              </th>
              <th className="text-left py-4 px-6">
                <SortButton field="lastActivity">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Last Activity</span>
                </SortButton>
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
                  <td className="py-5 px-6">
                    <span className="font-medium text-sm">{member.name}</span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-sm text-gray-600">{member.role}</span>
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className={cn(
                        'inline-flex items-center px-3 py-1 rounded text-xs font-medium tracking-wide',
                        getStatusColor(member.status),
                        member.status === 'active' || member.status === 'complete' || member.status === 'open'
                          ? 'text-white'
                          : 'text-black'
                      )}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black transition-all"
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap font-medium">
                        {member.completedGuides.length}/{member.assignedGuides.length}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-sm text-gray-600">{formatDate(member.lastActivity)}</span>
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

