// app/manager/questions/page.tsx

'use client';

import React, { useState } from 'react';
import { QuestionsTable } from '@/components/manager/QuestionsTable';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';
import { mockQuestions } from '@/lib/data/mockQuestions';
import { getQuestionById } from '@/lib/data/mockQuestions';
import { formatDateTime } from '@/lib/utils';

export default function QuestionsPage() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');

  const selectedQuestion = selectedQuestionId
    ? getQuestionById(selectedQuestionId)
    : null;

  const handleQuestionClick = (questionId: string) => {
    setSelectedQuestionId(questionId);
    const question = getQuestionById(questionId);
    if (question?.answer) {
      setAnswerText(question.answer);
    } else {
      setAnswerText('');
    }
  };

  const handleSubmitAnswer = () => {
    // In production, this would submit to backend
    console.log('Answer submitted:', answerText);
    setSelectedQuestionId(null);
    setAnswerText('');
  };

  return (
    <>
      <div className="space-y-10">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-light tracking-tight mb-3">Questions & Answers</h1>
          <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl">
            Review and answer questions from your team members.
          </p>
        </div>

        <QuestionsTable
          questions={mockQuestions}
          onQuestionClick={handleQuestionClick}
        />
      </div>

      <Modal
        open={!!selectedQuestion}
        onOpenChange={(open) => !open && setSelectedQuestionId(null)}
        title={selectedQuestion?.question || 'Question'}
        description={
          selectedQuestion
            ? `Asked by ${selectedQuestion.staffName} on ${formatDateTime(selectedQuestion.createdAt)}`
            : undefined
        }
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedQuestionId(null)}
            >
              Close
            </Button>
            {selectedQuestion?.status === 'open' && (
              <Button onClick={handleSubmitAnswer} disabled={!answerText.trim()}>
                Submit Answer
              </Button>
            )}
          </div>
        }
      >
        {selectedQuestion && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Question:</p>
              <p className="font-medium">{selectedQuestion.question}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Guide:</p>
              <p className="text-sm">Step {selectedQuestion.stepNumber}</p>
            </div>
            {selectedQuestion.status === 'open' ? (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Answer:
                </label>
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  rows={4}
                />
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-2">Answer:</p>
                <p className="text-sm">{selectedQuestion.answer}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

