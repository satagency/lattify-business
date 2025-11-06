// app/manager/photos/page.tsx

'use client';

import React from 'react';
import { PhotoVerification } from '@/components/manager/PhotoVerification';

// Mock photo data - in production, this would come from API
const mockPhotos = [
  {
    id: 'photo-001',
    staffId: 'staff-001',
    staffName: 'Maria Lopez',
    guideId: 'guide-001',
    guideTitle: 'Signature Carbonara',
    stepNumber: 12,
    photoUrl: '/images/photos/carbonara-001.jpg',
    submittedAt: new Date('2025-01-22T14:30:00'),
    status: 'pending' as const,
  },
  {
    id: 'photo-002',
    staffId: 'staff-003',
    staffName: 'Tomasz Nowak',
    guideId: 'guide-002',
    guideTitle: 'Old Fashioned Cocktail',
    stepNumber: 8,
    photoUrl: '/images/photos/cocktail-001.jpg',
    submittedAt: new Date('2025-01-22T16:15:00'),
    status: 'pending' as const,
  },
  {
    id: 'photo-003',
    staffId: 'staff-007',
    staffName: 'Sophie Chen',
    guideId: 'guide-007',
    guideTitle: 'Latte Art Basics',
    stepNumber: 9,
    photoUrl: '/images/photos/latte-001.jpg',
    submittedAt: new Date('2025-01-21T11:20:00'),
    status: 'approved' as const,
  },
  {
    id: 'photo-004',
    staffId: 'staff-006',
    staffName: 'David Martinez',
    guideId: 'guide-005',
    guideTitle: 'End of Shift Cleaning',
    stepNumber: 9,
    photoUrl: '/images/photos/cleaning-001.jpg',
    submittedAt: new Date('2025-01-22T21:00:00'),
    status: 'approved' as const,
  },
];

export default function PhotosPage() {
  const handleApprove = (photoId: string) => {
    // In production, this would update the backend
    console.log('Approve photo:', photoId);
  };

  const handleReject = (photoId: string) => {
    // In production, this would update the backend
    console.log('Reject photo:', photoId);
  };

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-light tracking-tight mb-3">Photo Verification</h1>
        <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl">
          Review and approve staff completion photos.
        </p>
      </div>

      <PhotoVerification
        photos={mockPhotos}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

