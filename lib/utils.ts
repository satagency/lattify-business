// lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    kitchen: 'Kitchen',
    foh: 'Front of House',
    cleaning: 'Cleaning',
    maintenance: 'Maintenance',
  };
  return labels[category] || category;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-gray-900',
    pending: 'bg-gray-500',
    complete: 'bg-black',
    not_started: 'bg-gray-200',
    in_progress: 'bg-gray-600',
    awaiting_approval: 'bg-gray-400',
    open: 'bg-black',
    resolved: 'bg-gray-300',
  };
  return colors[status] || 'bg-gray-400';
}

// Helper function to safely convert lastStep (Date | number) to Date
export function lastStepToDate(lastStep: Date | number): Date {
  if (lastStep instanceof Date) {
    return lastStep;
  }
  // If it's a number, treat it as days ago from today
  const date = new Date();
  date.setDate(date.getDate() - lastStep);
  return date;
}

// Format relative date like "Recorded 9 days ago" or "Recorded a month ago"
export function formatRecordedDate(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Recorded today';
  } else if (diffDays === 1) {
    return 'Recorded yesterday';
  } else if (diffDays < 7) {
    return `Recorded ${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? 'Recorded a week ago' : `Recorded ${weeks} weeks ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? 'Recorded a month ago' : `Recorded ${months} months ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return years === 1 ? 'Recorded a year ago' : `Recorded ${years} years ago`;
  }
}

