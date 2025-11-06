// components/manager/HotelInfoCard.tsx

'use client';

import React from 'react';
import { HotelInfo } from '@/lib/types';
import { Building2, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HotelInfoCardProps {
  hotel: HotelInfo;
}

export function HotelInfoCard({ hotel }: HotelInfoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Building2 className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">{hotel.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{hotel.location}</span>
              </div>
              <span>•</span>
              <span>{hotel.propertyType}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < hotel.starRating ? 'fill-gray-900 text-gray-900' : 'text-gray-300'
              )}
            />
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total Rooms</span>
            <p className="font-medium mt-1">{hotel.totalRooms}</p>
          </div>
          {hotel.brand && (
            <div>
              <span className="text-gray-500">Brand</span>
              <p className="font-medium mt-1">{hotel.brand}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


