// components/shared/Header.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecordButton } from '@/components/manager/RecordButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function Header({ title, showMenu = false, onMenuToggle, isMenuOpen, viewMode, onViewModeChange }: HeaderProps) {
  const pathname = usePathname();
  const isEmployee = pathname?.startsWith('/employee');
  const isManager = pathname?.startsWith('/manager');
  const isLibrary = pathname === '/manager/library';

  const getPageTitle = () => {
    if (isLibrary) {
      return 'My Guides / Latest';
    }
    return title;
  };

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
          
          {isManager && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 focus-ring px-2 py-1 rounded">
                    Workspace
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[160px]">
                  <DropdownMenuItem>Default Workspace</DropdownMenuItem>
                  <DropdownMenuItem>Create New Workspace</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {isLibrary && (
                <span className="text-sm text-gray-600">/</span>
              )}
              
              {isLibrary && (
                <span className="text-sm text-gray-700">{getPageTitle()}</span>
              )}
            </>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {isLibrary && (
            <>
              <button
                onClick={() => onViewModeChange?.('grid')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'grid' ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900'
                )}
                title="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => onViewModeChange?.('list')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'list' ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900'
                )}
                title="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </>
          )}
          
          {isManager && (
            <RecordButton 
              onRecord={() => console.log('Record clicked')}
              onUpload={() => console.log('Upload video clicked')}
            />
          )}
        </div>
      </div>
    </header>
  );
}

