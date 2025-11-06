// components/manager/VideoAnalyticsQuestions.tsx

'use client';

import React from 'react';
import Image from 'next/image';

export function VideoAnalyticsQuestions() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Image src="/icons_lattify.ai/question.svg" alt="Questions" width={20} height={20} className="w-5 h-5" />
        <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
        <Image src="/icons_lattify.ai/question.svg" alt="Help" width={16} height={16} className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
        <span className="text-gray-500">Coming soon</span>
      </div>
    </div>
  );
}

