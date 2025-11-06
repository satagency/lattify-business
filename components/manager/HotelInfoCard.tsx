// components/manager/HotelInfoCard.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { HotelInfo } from '@/lib/types';
import { Building2, MapPin, Star, Hotel } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HotelInfoCardProps {
  hotel: HotelInfo;
}

export function HotelInfoCard({ hotel }: HotelInfoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-h-[480px] flex flex-col">
      {/* Hotel Photo */}
      {hotel.image ? (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <Building2 className="h-12 w-12 text-gray-400" />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{hotel.name}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{hotel.location}</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="flex-shrink-0">{hotel.propertyType}</span>
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

        {/* Details Section - Clean Grid Layout */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                <Hotel className="h-3.5 w-3.5" />
                <span>Rooms</span>
              </div>
              <p className="text-2xl font-light text-gray-900">{hotel.totalRooms}</p>
            </div>
            {hotel.brand && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Brand
                </div>
                <p className="text-lg font-medium text-gray-900">{hotel.brand}</p>
              </div>
            )}
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Rating
              </div>
              <p className="text-lg font-medium text-gray-900">
                {hotel.starRating} Star{hotel.starRating !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
