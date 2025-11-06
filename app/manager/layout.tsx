// app/manager/layout.tsx

'use client';

import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Sidebar } from '@/components/shared/Sidebar';
import { ViewModeProvider, useViewMode } from '@/lib/contexts/ViewModeContext';

function HeaderWithViewMode({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (open: boolean) => void }) {
  const { viewMode, setViewMode } = useViewMode();
  
  return (
    <Header
      title="Manager Dashboard"
      showMenu={true}
      isMenuOpen={isMenuOpen}
      onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    />
  );
}

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ViewModeProvider>
      <div className="min-h-screen bg-white">
        <HeaderWithViewMode isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex">
          <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          <main className="flex-1 p-6 lg:p-8 bg-white">
            {children}
          </main>
        </div>
      </div>
    </ViewModeProvider>
  );
}

