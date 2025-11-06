// components/shared/Modal.tsx

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  const pathname = usePathname();
  const isEmployee = pathname?.startsWith('/employee');
  const isManager = pathname?.startsWith('/manager');

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        sizeClasses[size],
        isEmployee && 'bg-gray-900 border-gray-800',
        isManager && 'bg-white border-gray-200'
      )}>
        <DialogHeader>
          <DialogTitle className={isEmployee ? 'text-white' : 'text-black'}>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className={isEmployee ? 'text-gray-400' : 'text-gray-600'}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="py-4">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

