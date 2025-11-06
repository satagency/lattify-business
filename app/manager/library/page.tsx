// app/manager/library/page.tsx

'use client';

import React from 'react';
import { LibraryList } from '@/components/manager/LibraryList';
import { mockGuides } from '@/lib/data/mockGuides';
import { useRouter } from 'next/navigation';
import { useViewMode } from '@/lib/contexts/ViewModeContext';

export default function LibraryPage() {
  const router = useRouter();
  const { viewMode } = useViewMode();

  const handleGuideClick = (guideId: string) => {
    // In production, navigate to guide detail/edit page
    console.log('View guide:', guideId);
  };

  const handleMenuAction = (action: string, guideId: string) => {
    switch (action) {
      case 'view':
        handleGuideClick(guideId);
        break;
      case 'assign':
        console.log('Assign guide:', guideId);
        // TODO: Open assign dialog/modal
        break;
      case 'duplicate':
        console.log('Duplicate guide:', guideId);
        // TODO: Implement duplicate functionality
        break;
      case 'generate-qr':
        console.log('Generate QR for guide:', guideId);
        // TODO: Generate QR code and show modal/dialog
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this guide?')) {
          console.log('Delete guide:', guideId);
          // TODO: Implement delete functionality
        }
        break;
      default:
        console.log('Unknown action:', action, 'for guide:', guideId);
    }
  };

  return (
    <div className="py-4">
      <LibraryList
        guides={mockGuides}
        onGuideClick={handleGuideClick}
        onMenuAction={handleMenuAction}
        viewMode={viewMode}
      />
    </div>
  );
}

