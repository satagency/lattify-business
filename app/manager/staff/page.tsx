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
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-light tracking-tight mb-3">Staff Management</h1>
        <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl">
          View and manage your team members' training progress.
        </p>
      </div>

      <StaffTable staff={mockStaff} onStaffClick={handleStaffClick} />
    </div>
  );
}

