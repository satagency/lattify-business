// components/employee/QuestionsList.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Check } from 'lucide-react';
import { Question } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface QuestionsListProps {
  questions: Question[];
  onQuestionClick?: (questionId: string) => void;
}

export function QuestionsList({ questions, onQuestionClick }: QuestionsListProps) {
  const openQuestions = questions.filter(q => q.status === 'open');
  const resolvedQuestions = questions.filter(q => q.status === 'resolved');

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>No questions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {openQuestions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="bg-black text-white px-2 py-0.5 rounded text-xs">
              {openQuestions.length}
            </span>
            Open Questions
          </h3>
          <div className="space-y-2">
            {openQuestions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                onClick={onQuestionClick}
              />
            ))}
          </div>
        </div>
      )}

      {resolvedQuestions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Check className="h-4 w-4" />
            Resolved ({resolvedQuestions.length})
          </h3>
          <div className="space-y-2">
            {resolvedQuestions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                onClick={onQuestionClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionItem({
  question,
  onClick,
}: {
  question: Question;
  onClick?: (questionId: string) => void;
}) {
  const isResolved = question.status === 'resolved';

  const content = (
    <div
      className={cn(
        'p-4 border rounded-lg transition-colors',
        isResolved
          ? 'border-gray-200 bg-gray-50'
          : 'border-black bg-white hover:bg-gray-50 cursor-pointer'
      )}
      onClick={() => onClick?.(question.id)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="font-medium text-sm mb-1">{question.question}</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              Guide step {question.stepNumber} • {question.staffName}
            </p>
            <p>{formatDateTime(question.createdAt)}</p>
          </div>
          {isResolved && question.answer && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Answer:</p>
              <p className="text-sm text-gray-600">{question.answer}</p>
            </div>
          )}
        </div>
        {isResolved && (
          <Check className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
        )}
      </div>
    </div>
  );

  if (onClick) {
    return content;
  }

  return content;
}

