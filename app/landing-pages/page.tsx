// app/landing-pages/page.tsx

'use client';

import React from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useRouter } from 'next/navigation';

const landingPages = [
  {
    id: 'a',
    name: 'Option A',
    filename: 'option_a_wireframe.html',
    description: 'The Transformation Story',
  },
  {
    id: 'b',
    name: 'Option B',
    filename: 'option_b_wireframe.html',
    description: 'Wireframe',
  },
  {
    id: 'c',
    name: 'Option C',
    filename: 'option_c_wireframe.html',
    description: 'Wireframe',
  },
  {
    id: 'd',
    name: 'Option D',
    filename: 'option_d_wireframe.html',
    description: 'Wireframe',
  },
];

export default function LandingPagesPage() {
  const router = useRouter();

  const handleView = (filename: string) => {
    window.open(`/landing-pages/${filename}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-black">Marketing Landing Pages</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-8">
          View and compare all 4 marketing landing page options.
        </p>

        {/* Grid of Landing Page Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landingPages.map((page) => (
            <div
              key={page.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-black transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-black mb-1">{page.name}</h2>
                  <p className="text-sm text-gray-600">{page.description}</p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => handleView(page.filename)}
                  variant="primary"
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Landing Page
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

