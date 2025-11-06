// app/manager/staff/page.tsx

'use client';

import React from 'react';
import { StaffTable } from '@/components/manager/StaffTable';
import { mockStaff } from '@/lib/data/mockStaff';
import { useRouter } from 'next/navigation';

export default function StaffPage() {
  const router = useRouter();

  const handleStaffClick = (staffId: string) => {
    // In production, navigate to staff detail page
    console.log('View staff:', staffId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
        <p className="text-gray-600">
          View and manage your team members' training progress.
        </p>
      </div>

      <StaffTable staff={mockStaff} onStaffClick={handleStaffClick} />
    </div>
  );
}

