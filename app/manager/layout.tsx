// app/manager/layout.tsx

'use client';

import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Sidebar } from '@/components/shared/Sidebar';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Manager Dashboard"
        showMenu={true}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      <div className="flex">
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

