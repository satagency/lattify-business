// app/employee/guide/[id]/page.tsx

'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, MessageSquare } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { ProgressBar } from '@/components/employee/ProgressBar';
import { Modal } from '@/components/shared/Modal';
import { getGuideById } from '@/lib/data/mockGuides';
import { getProgressByStaffAndGuide } from '@/lib/data/mockProgress';
import { getCategoryLabel } from '@/lib/utils';

// Mock current staff ID - in production, this would come from auth
const CURRENT_STAFF_ID = 'staff-001';

export default function GuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const guideId = params.id as string;
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const guide = getGuideById(guideId);
  const progress = getProgressByStaffAndGuide(CURRENT_STAFF_ID, guideId);

  if (!guide) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Guide not found</p>
        <Button onClick={() => router.push('/employee')} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const completedSteps = progress?.completedSteps || 0;
  const totalSteps = guide.totalSteps;
  const isComplete = completedSteps === totalSteps;

  // Mock step data
  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    number: i + 1,
    title: `Step ${i + 1}: ${guide.title} - Part ${i + 1}`,
    description: `This is step ${i + 1} of ${guide.title}. Follow the instructions carefully to complete this step.`,
  }));

  const handleStepComplete = (stepNumber: number) => {
    // In production, this would update the backend
    if (stepNumber <= totalSteps) {
      setCurrentStep(Math.min(stepNumber + 1, totalSteps));
    }
  };

  const handleSubmitQuestion = () => {
    // In production, this would submit to backend
    console.log('Question submitted:', questionText);
    setQuestionText('');
    setIsQuestionModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
          {/* Placeholder gray div - no images without database */}
          <div className="w-full h-full bg-gray-200" />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded text-sm font-medium">
              {getCategoryLabel(guide.category)}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span>{guide.totalSteps} steps</span>
            <span>•</span>
            <span>{guide.estimatedTime} minutes</span>
          </div>
          <ProgressBar
            completed={completedSteps}
            total={totalSteps}
            showCheckmark={isComplete}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Steps</h2>
          <Button
            variant="outline"
            onClick={() => setIsQuestionModalOpen(true)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask Question
          </Button>
        </div>

        {/* Step-by-step view - future: will show videos/steps like Craft Reels Mode */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index + 1 <= completedSteps;
            const isCurrent = index + 1 === currentStep;

            return (
              <div
                key={step.number}
                className={`
                  border rounded-lg overflow-hidden transition-all
                  ${isCurrent ? 'border-black bg-gray-50 shadow-medium' : 'border-gray-200 bg-white'}
                  ${isCompleted ? 'opacity-75' : ''}
                `}
              >
                {/* Video/Visual Area - Future: full-screen video like Craft Reels Mode */}
                <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 text-white px-3 py-1.5 rounded text-sm font-medium">
                      Step {step.number} of {totalSteps}
                    </span>
                  </div>
                  <div className="text-center text-gray-500">
                    <p className="text-sm">Video/Visual will appear here</p>
                    <p className="text-xs mt-1">Full-screen Craft Reels Mode</p>
                  </div>
                </div>
                
                {/* Step Instructions */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold
                        ${isCompleted ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}
                      `}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      {/* Future: Bottom action bar will go here (Help, Tip, Report Issue, Timer) */}
                      {isCurrent && !isCompleted && (
                        <div className="flex items-center gap-2">
                          <Button onClick={() => handleStepComplete(step.number)}>
                            Mark Step Complete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsQuestionModalOpen(true)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Get Help
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        open={isQuestionModalOpen}
        onOpenChange={setIsQuestionModalOpen}
        title="Ask a Question"
        description="Have a question about this step? Ask your manager for help."
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsQuestionModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitQuestion} disabled={!questionText.trim()}>
              Submit
            </Button>
          </div>
        }
      >
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Type your question here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
          rows={4}
        />
      </Modal>
    </div>
  );
}

