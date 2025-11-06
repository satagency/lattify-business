// components/shared/Header.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export function Header({ title, showMenu = false, onMenuToggle, isMenuOpen }: HeaderProps) {
  const pathname = usePathname();
  const isEmployee = pathname?.startsWith('/employee');
  const isManager = pathname?.startsWith('/manager');

  return (
    <header className={cn(
      "sticky top-0 z-50 border-b backdrop-blur-sm",
      "bg-white border-gray-200 dark:bg-black/80 dark:border-gray-800"
    )}>
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          {showMenu && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 -ml-2 focus-ring rounded"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-black dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-black dark:text-white" />
              )}
            </button>
          )}
          <Link href={isEmployee ? '/employee' : isManager ? '/manager' : '/'}>
            <h1 className="text-xl font-bold text-black dark:text-white">{title}</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          {isEmployee && (
            <>
              <Link href="/employee" className="text-sm hover:underline text-gray-700 dark:text-gray-300">
                My Training
              </Link>
            </>
          )}
          {isManager && (
            <>
              <Link href="/manager" className="text-sm hover:underline text-gray-700">
                Dashboard
              </Link>
              <Link href="/manager/library" className="text-sm hover:underline text-gray-700">
                Library
              </Link>
              <Link href="/manager/staff" className="text-sm hover:underline text-gray-700">
                Staff
              </Link>
              <Link href="/manager/questions" className="text-sm hover:underline text-gray-700">
                Questions
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

