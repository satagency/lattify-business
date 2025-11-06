// app/employee/guide/[id]/page.tsx

'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, MessageSquare, X, RotateCcw, Sparkles, Play, Pause } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { ProgressBar } from '@/components/employee/ProgressBar';
import { Modal } from '@/components/shared/Modal';
import { getGuideById } from '@/lib/data/mockGuides';
import { getProgressByStaffAndGuide } from '@/lib/data/mockProgress';
import { getCategoryLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

// Mock current staff ID - in production, this would come from auth
const CURRENT_STAFF_ID = 'staff-001';

export default function GuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const guideId = params.id as string;
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const guide = getGuideById(guideId);
  const progress = getProgressByStaffAndGuide(CURRENT_STAFF_ID, guideId);

  if (!guide) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>Guide not found</p>
        <Button onClick={() => router.push('/employee')} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const completedSteps = progress?.completedSteps || 0;
  const totalSteps = guide.totalSteps;
  const isComplete = completedSteps === totalSteps;

  // Mock step data - matching consumer platform style
  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    number: i + 1,
    title: `Step ${i + 1}: ${guide.title}`,
    instruction: `This is step ${i + 1} of ${guide.title}. Follow the instructions carefully to complete this step.`,
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

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with close button */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => router.push('/employee')}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Video/Image Area - matching consumer platform */}
      <div className="relative aspect-video bg-gray-900">
        {/* Video placeholder - will show actual video */}
        <div className="w-full h-full bg-gray-900" />
        {/* Video controls overlay - matching consumer platform */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={() => {}}
              className="bg-black/60 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/80 transition-colors"
              aria-label="Rewind 15 seconds"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-black/60 backdrop-blur-sm rounded-full p-4 text-white hover:bg-black/80 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>
            <button 
              onClick={() => {}}
              className="bg-black/60 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/80 transition-colors"
              aria-label="Fast forward 15 seconds"
            >
              <RotateCcw className="h-5 w-5 rotate-180" />
            </button>
          </div>
        </div>
        {/* Step indicator overlay */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded text-sm font-medium text-white">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Step Title */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-4">{currentStepData.title}</h1>
      </div>

      {/* Instructions - matching consumer platform style (light gray cards) */}
      <div className="px-4 space-y-3 pb-24">
        <div className="bg-gray-700 text-gray-100 rounded-lg p-4">
          <p>{currentStepData.instruction}</p>
        </div>
        
        {/* Show all steps as instruction cards */}
        {steps.map((step, index) => {
          const isCompleted = index + 1 <= completedSteps;
          const isCurrent = index + 1 === currentStep;
          
          if (index + 1 === currentStep) {
            return null; // Current step instruction shown above
          }
          
          return (
            <div
              key={step.number}
              className={cn(
                'bg-gray-700 text-gray-100 rounded-lg p-4',
                isCompleted && 'opacity-60'
              )}
            >
              <p>{step.instruction}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar - matching consumer platform */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className="flex-1 bg-gray-700 text-gray-100 rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm font-medium">Repeat</span>
          </button>
          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="flex-1 bg-gray-600 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-500 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Get Help</span>
          </button>
          <button
            onClick={() => handleStepComplete(currentStep)}
            disabled={isComplete}
            className="flex-1 bg-white text-black rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Check className="h-4 w-4" />
            <span className="text-sm">Mark Complete</span>
          </button>
        </div>
      </div>

      {/* Help Modal */}
      <Modal
        open={isQuestionModalOpen}
        onOpenChange={setIsQuestionModalOpen}
        title="Ask for Help"
        description={`Step ${currentStep}: ${currentStepData.title}`}
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
        <div className="space-y-4">
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Ask for help..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            rows={4}
          />
        </div>
      </Modal>
    </div>
  );
}
