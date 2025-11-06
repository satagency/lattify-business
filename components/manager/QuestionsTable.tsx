// components/manager/QuestionsTable.tsx

'use client';

import React, { useState } from 'react';
import { ArrowUpDown, Check, Clock } from 'lucide-react';
import { Question } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface QuestionsTableProps {
  questions: Question[];
  onQuestionClick?: (questionId: string) => void;
}

type SortField = 'createdAt' | 'status' | 'staffName';
type SortDirection = 'asc' | 'desc';

export function QuestionsTable({
  questions,
  onQuestionClick,
}: QuestionsTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'resolved'>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredQuestions =
    filterStatus === 'all'
      ? questions
      : questions.filter((q) => q.status === filterStatus);

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    let aValue: string | Date;
    let bValue: string | Date;

    switch (sortField) {
      case 'createdAt':
        aValue = a.createdAt;
        bValue = b.createdAt;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'staffName':
        aValue = a.staffName;
        bValue = b.staffName;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-black transition-colors"
    >
      {children}
      <ArrowUpDown className="h-4 w-4" />
    </button>
  );

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No questions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            filterStatus === 'all'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          All ({questions.length})
        </button>
        <button
          onClick={() => setFilterStatus('open')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            filterStatus === 'open'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          Open ({questions.filter((q) => q.status === 'open').length})
        </button>
        <button
          onClick={() => setFilterStatus('resolved')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            filterStatus === 'resolved'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          Resolved ({questions.filter((q) => q.status === 'resolved').length})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">
                <SortButton field="createdAt">Date</SortButton>
              </th>
              <th className="text-left py-3 px-4">Question</th>
              <th className="text-left py-3 px-4">
                <SortButton field="staffName">Staff</SortButton>
              </th>
              <th className="text-left py-3 px-4">Guide</th>
              <th className="text-left py-3 px-4">
                <SortButton field="status">Status</SortButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedQuestions.map((question) => (
              <tr
                key={question.id}
                className={cn(
                  'border-b border-gray-100 hover:bg-gray-50 transition-colors',
                  onQuestionClick && 'cursor-pointer'
                )}
                onClick={() => onQuestionClick?.(question.id)}
              >
                <td className="py-4 px-4 text-sm text-gray-600">
                  {formatDateTime(question.createdAt)}
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium max-w-md truncate">{question.question}</p>
                  {question.answer && (
                    <p className="text-sm text-gray-600 mt-1 max-w-md truncate">
                      {question.answer}
                    </p>
                  )}
                </td>
                <td className="py-4 px-4 text-sm">{question.staffName}</td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  Step {question.stepNumber}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
                      question.status === 'open'
                        ? 'bg-black text-white'
                        : 'bg-gray-300 text-black'
                    )}
                  >
                    {question.status === 'resolved' && <Check className="h-3 w-3" />}
                    {question.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

