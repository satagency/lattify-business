// components/manager/PhotoVerification.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PhotoVerification {
  id: string;
  staffId: string;
  staffName: string;
  guideId: string;
  guideTitle: string;
  stepNumber: number;
  photoUrl: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

interface PhotoVerificationProps {
  photos: PhotoVerification[];
  onApprove?: (photoId: string) => void;
  onReject?: (photoId: string) => void;
}

export function PhotoVerification({
  photos,
  onApprove,
  onReject,
}: PhotoVerificationProps) {
  const pendingPhotos = photos.filter(p => p.status === 'pending');
  const approvedPhotos = photos.filter(p => p.status === 'approved');
  const rejectedPhotos = photos.filter(p => p.status === 'rejected');

  if (photos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No photos submitted yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingPhotos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Approval ({pendingPhotos.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))}
          </div>
        </div>
      )}

      {approvedPhotos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Check className="h-5 w-5 text-black" />
            Approved ({approvedPhotos.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedPhotos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      )}

      {rejectedPhotos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <X className="h-5 w-5 text-gray-500" />
            Rejected ({rejectedPhotos.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rejectedPhotos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PhotoCard({
  photo,
  onApprove,
  onReject,
}: {
  photo: PhotoVerification;
  onApprove?: (photoId: string) => void;
  onReject?: (photoId: string) => void;
}) {
  const isPending = photo.status === 'pending';

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative aspect-video bg-gray-200">
        {/* Placeholder - will show actual photo when available */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-xs text-gray-500">Photo</p>
        </div>
        {!isPending && (
          <div
            className={cn(
              'absolute top-2 right-2 p-2 rounded-full',
              photo.status === 'approved'
                ? 'bg-black text-white'
                : 'bg-gray-300 text-gray-600'
            )}
          >
            {photo.status === 'approved' ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2">
          <p className="font-medium text-sm">{photo.staffName}</p>
          <p className="text-xs text-gray-600">{photo.guideTitle}</p>
          <p className="text-xs text-gray-500">Step {photo.stepNumber}</p>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          {formatDateTime(photo.submittedAt)}
        </p>
        {isPending && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onApprove?.(photo.id)}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject?.(photo.id)}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

