// app/employee/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { GuideCard } from '@/components/employee/GuideCard';
import { SearchBar } from '@/components/employee/SearchBar';
import { QuestionsList } from '@/components/employee/QuestionsList';
import { mockGuides } from '@/lib/data/mockGuides';
import { mockProgress } from '@/lib/data/mockProgress';
import { mockQuestions } from '@/lib/data/mockQuestions';
import { getProgressByStaffAndGuide } from '@/lib/data/mockProgress';
import { getQuestionsByStaffId } from '@/lib/data/mockQuestions';

// Mock current staff ID - in production, this would come from auth
const CURRENT_STAFF_ID = 'staff-001';

export default function EmployeeDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Get assigned guides for current staff
  const assignedGuideIds = ['guide-001', 'guide-003', 'guide-005'];
  const assignedGuides = mockGuides.filter((guide) =>
    assignedGuideIds.includes(guide.id)
  );

  // Filter guides based on search query
  const filteredGuides = useMemo(() => {
    if (!searchQuery.trim()) return assignedGuides;
    const query = searchQuery.toLowerCase();
    return assignedGuides.filter(
      (guide) =>
        guide.title.toLowerCase().includes(query) ||
        guide.category.toLowerCase().includes(query)
    );
  }, [assignedGuides, searchQuery]);

  // Get progress for each guide
  const guidesWithProgress = filteredGuides.map((guide) => ({
    guide,
    progress: getProgressByStaffAndGuide(CURRENT_STAFF_ID, guide.id),
  }));

  // Get questions for current staff
  const staffQuestions = getQuestionsByStaffId(CURRENT_STAFF_ID);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Training</h1>
        <p className="text-gray-600">
          Complete your assigned training guides to advance your skills.
        </p>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      <div>
        <h2 className="text-xl font-semibold mb-4">Assigned Guides</h2>
        {guidesWithProgress.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No guides found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guidesWithProgress.map(({ guide, progress }) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                progress={progress}
              />
            ))}
          </div>
        )}
      </div>

      {staffQuestions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Questions</h2>
          <QuestionsList questions={staffQuestions} />
        </div>
      )}
    </div>
  );
}

