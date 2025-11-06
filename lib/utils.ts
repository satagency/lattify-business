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

