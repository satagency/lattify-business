// components/shared/Sidebar.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, MessageSquare, BarChart3, Camera, X, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isManager = pathname?.startsWith('/manager');

  const managerLinks = [
    { href: '/manager', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/manager/library', label: 'Library', icon: BookOpen },
    { href: '/manager/staff', label: 'Staff', icon: Users },
    { href: '/manager/questions', label: 'Questions', icon: MessageSquare },
    { href: '/manager/photos', label: 'Photos', icon: Camera },
    { href: '/manager/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/manager/style-tile', label: 'Components', icon: Palette },
  ];

  if (!isManager) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:hidden">
            <h2 className="text-sm font-medium uppercase tracking-wide">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 focus-ring rounded"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {managerLinks.map((link) => {
              const Icon = link.icon;
              // Library should be active for /manager/library and all its sub-routes
              const isActive = link.href === '/manager/library' 
                ? pathname?.startsWith('/manager/library')
                : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all focus-ring',
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

