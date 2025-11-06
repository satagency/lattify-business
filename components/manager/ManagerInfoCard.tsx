// components/manager/ManagerInfoCard.tsx

'use client';

import React from 'react';
import { ManagerInfo } from '@/lib/types';
import { User, Mail, Phone } from 'lucide-react';

interface ManagerInfoCardProps {
  manager: ManagerInfo;
}

export function ManagerInfoCard({ manager }: ManagerInfoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-h-[480px] flex flex-col justify-between">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <User className="h-5 w-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1">{manager.name}</h3>
          <p className="text-sm text-gray-600 mb-1">{manager.position}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">{manager.department}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{manager.email}</span>
        </div>
        {manager.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{manager.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}

