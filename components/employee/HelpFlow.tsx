// components/employee/HelpFlow.tsx

'use client';

import React, { useState } from 'react';
import { Sparkles, MessageSquare, Send, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { cn } from '@/lib/utils';

interface HelpFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepNumber: number;
  stepTitle: string;
  guideId: string;
}

type HelpView = 'ai' | 'manager';

export function HelpFlow({
  open,
  onOpenChange,
  stepNumber,
  stepTitle,
  guideId,
}: HelpFlowProps) {
  const [currentView, setCurrentView] = useState<HelpView>('ai');
  const [questionText, setQuestionText] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [managerMessage, setManagerMessage] = useState('');
  const [isManagerRequested, setIsManagerRequested] = useState(false);

  const handleClose = () => {
    setCurrentView('ai');
    setQuestionText('');
    setAiResponse(null);
    setIsManagerRequested(false);
    setManagerMessage('');
    onOpenChange(false);
  };

  const handleAiSubmit = async () => {
    if (!questionText.trim()) return;

    setIsAiLoading(true);
    // Simulate AI response - in production, this would call an AI API
    setTimeout(() => {
      setAiResponse(
        `Based on Step ${stepNumber}, here's some helpful guidance: ${questionText}. This is a wireframe AI response that will be replaced with actual AI assistance.`
      );
      setIsAiLoading(false);
    }, 1500);
  };

  const handleAskManager = () => {
    setCurrentView('manager');
  };

  const handleManagerSubmit = () => {
    if (!managerMessage.trim()) return;
    // In production, this would send to manager
    console.log('Manager request:', {
      stepNumber,
      stepTitle,
      guideId,
      message: managerMessage,
    });
    setIsManagerRequested(true);
    // Close after a moment
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title={
        currentView === 'ai' ? 'AI Assistance' : 'Ask Your Manager'
      }
      description={`Step ${stepNumber}: ${stepTitle}`}
      size="lg"
      footer={null}
    >
      <div className="space-y-4">
        {currentView === 'ai' ? (
          // AI Assistance View
          <>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">AI Assistant</h3>
                  <p className="text-gray-400 text-sm">
                    Ask me anything about this step. I'll provide contextual help based on the guide.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Chat Area */}
            <div className="space-y-3">
              {questionText && !aiResponse && (
                <div className="flex justify-end">
                  <div className="bg-gray-800 text-white rounded-lg px-4 py-2 max-w-[80%]">
                    <p className="text-sm">{questionText}</p>
                  </div>
                </div>
              )}

              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-white rounded-lg px-4 py-2 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}

              {aiResponse && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-white rounded-lg px-4 py-2 max-w-[80%]">
                    <p className="text-sm">{aiResponse}</p>
                  </div>
                </div>
              )}

              {!aiResponse && !isAiLoading && (
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Ask for help with this step..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              {!aiResponse ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAiSubmit}
                    disabled={!questionText.trim() || isAiLoading}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Ask AI
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuestionText('');
                      setAiResponse(null);
                    }}
                    className="flex-1"
                  >
                    Ask Another Question
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleAskManager}
                    className="flex-1"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Still Need Help? Ask Manager
                  </Button>
                </>
              )}
            </div>
          </>
        ) : (
          // Manager Request View
          <>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">Contact Your Manager</h3>
                  <p className="text-gray-400 text-sm">
                    If the AI assistance didn't help, you can send a message to your manager for additional support.
                  </p>
                </div>
              </div>
            </div>

            {!isManagerRequested ? (
              <>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <textarea
                      value={managerMessage}
                      onChange={(e) => setManagerMessage(e.target.value)}
                      placeholder="Describe what you need help with..."
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentView('ai')}
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to AI
                  </Button>
                  <Button
                    onClick={handleManagerSubmit}
                    disabled={!managerMessage.trim()}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Manager
                  </Button>
                </div>
              </>
            ) : (
              <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 text-center">
                <p className="text-green-400 font-medium mb-1">Message Sent!</p>
                <p className="text-gray-400 text-sm">
                  Your manager will be notified and will respond soon.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

