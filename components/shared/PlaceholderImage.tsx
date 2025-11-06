// components/shared/PlaceholderImage.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface PlaceholderImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}

export function PlaceholderImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
}: PlaceholderImageProps) {
  const [imgError, setImgError] = React.useState(false);

  if (imgError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className || ''}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <ImageIcon className="h-8 w-8 text-gray-400" />
      </div>
    );
  }

  const imageProps = fill
    ? {
        fill: true,
        className,
        sizes,
      }
    : {
        width,
        height,
        className,
      };

  return (
    <Image
      src={src}
      alt={alt}
      {...imageProps}
      onError={() => setImgError(true)}
      unoptimized
    />
  );
}

