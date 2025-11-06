// app/employee/layout.tsx

'use client';

import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Lattify Training"
        showMenu={false}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {children}
      </main>
    </div>
  );
}

