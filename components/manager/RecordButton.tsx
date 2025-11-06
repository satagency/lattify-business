// components/manager/RecordButton.tsx

'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Upload, FileVideo } from 'lucide-react';

interface RecordButtonProps {
  onRecord?: () => void;
  onUpload?: (file: File) => void;
  className?: string;
}

export function RecordButton({ 
  onRecord, 
  onUpload,
  className 
}: RecordButtonProps) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRecordClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRecord?.();
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsUploadDialogOpen(true);
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      onUpload?.(file);
      setIsUploadDialogOpen(false);
    } else {
      alert('Please select a video file');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div 
        className={cn(
          'inline-flex items-center rounded-full bg-orange-500 hover:bg-orange-600 transition-colors',
          className
        )}
        role="group"
      >
        <button
          type="button"
          onClick={handleRecordClick}
          className={cn(
            'flex items-center gap-2.5 px-5 py-2.5 text-white',
            'hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2',
            'transition-colors rounded-l-full'
          )}
          aria-label="Record video"
        >
          <span className="w-2 h-2 rounded-full bg-white" aria-hidden="true" />
          <span className="text-sm font-medium">Record</span>
        </button>

        <div 
          className="h-4 w-px bg-orange-400/40 flex-shrink-0" 
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={handleUploadClick}
          className={cn(
            'relative flex items-center justify-center px-3 py-2.5 text-white',
            'hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2',
            'transition-colors rounded-r-full group'
          )}
          aria-label="Upload video"
        >
          <div className="group-hover:animate-bounce">
            <Image 
              src="/icons_lattify.ai/up-arrow.svg" 
              alt="Upload" 
              width={16} 
              height={16} 
              className="w-4 h-4 brightness-0 invert" 
              aria-hidden="true"
            />
          </div>
          {/* Tooltip */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Upload
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></span>
          </span>
        </button>
      </div>

      {/* Video Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogDescription>
              Upload a video file to add to your library
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
                isDragging
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              )}
              onClick={handleBrowseClick}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-gray-900 mb-1">
                Drag and drop your video here
              </p>
              <p className="text-xs text-gray-500 mb-4">
                or click to browse files
              </p>
              <p className="text-xs text-gray-400">
                Supported formats: MP4, MOV, AVI, WebM
              </p>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Upload from Computer Button */}
            <button
              type="button"
              onClick={handleBrowseClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors text-sm font-medium"
            >
              <FileVideo className="h-4 w-4" />
              Upload from Computer
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
