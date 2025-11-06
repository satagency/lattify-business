// app/manager/library/page.tsx

'use client';

import React from 'react';
import { GuideGrid } from '@/components/manager/GuideGrid';
import { mockGuides } from '@/lib/data/mockGuides';
import { useRouter } from 'next/navigation';

export default function LibraryPage() {
  const router = useRouter();

  const handleGuideClick = (guideId: string) => {
    // In production, navigate to guide detail/edit page
    console.log('View guide:', guideId);
  };

  const handleMenuAction = (action: string, guideId: string) => {
    if (action === 'edit') {
      console.log('Edit guide:', guideId);
    } else if (action === 'delete') {
      if (confirm('Are you sure you want to delete this guide?')) {
        console.log('Delete guide:', guideId);
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-light tracking-tight mb-3">Guide Library</h1>
        <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl">
          Manage your training guides and create new ones.
        </p>
      </div>

      <GuideGrid
        guides={mockGuides}
        onGuideClick={handleGuideClick}
        onMenuAction={handleMenuAction}
      />
    </div>
  );
}

