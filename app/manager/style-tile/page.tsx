'use client';

import React, { useState } from 'react';
import { mockGuides } from '@/lib/data/mockGuides';
import { mockStaff } from '@/lib/data/mockStaff';
import { mockQuestions } from '@/lib/data/mockQuestions';
import { X, User, Mail, Phone, Calendar, Clock, MapPin, Bell, LayoutDashboard, Play, CheckCircle2 } from 'lucide-react';
import { formatRecordedDate } from '@/lib/utils';

export default function StyleTilePage() {
  const [selectedDate, setSelectedDate] = useState(21);
  const [selectedTab, setSelectedTab] = useState<'in-person' | 'video'>('in-person');
  const [checkedItems, setCheckedItems] = useState<string[]>(['item-1']);
  const [selectedRadio, setSelectedRadio] = useState('option-1');
  const [tags, setTags] = useState(['Kitchen', 'Front of House', 'Training']);

  const guide = mockGuides[0] || { title: 'Sample Guide', category: 'kitchen', viewCount: 0, duration: '5 min', recordedAt: new Date(), createdAt: new Date() };
  const staff = mockStaff[0] || { name: 'John Doe', role: 'Staff Member' };
  const question = mockQuestions[0] || { question: 'Sample question?', staffName: 'John Doe', status: 'open' };

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  // Generate calendar days
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Component Style Tile</h1>
        <p className="text-gray-600">UI component patterns for the manager dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Guide Listing Card (Property Card Style) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="text-2xl font-semibold text-gray-900 mb-1">{guide.title}</div>
              <div className="text-sm text-gray-600 mb-3">{guide.category.toUpperCase()}</div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  <span>{guide.viewCount} views</span>
                </div>
                <span>•</span>
                <span>{guide.duration}</span>
                <span>•</span>
                <span>{formatRecordedDate(guide.recordedAt || guide.createdAt)}</span>
              </div>
            </div>
            <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Staff Contact Card (Coordinating Agent Style) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Staff Contact
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold text-gray-900">
              {staff.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">{staff.name}</div>
              <div className="text-sm text-gray-600">{staff.role}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Call
            </button>
            <button className="flex-1 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Text
            </button>
            <button className="flex-1 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Email
            </button>
          </div>
        </div>

        {/* Question/Event Card (Design Walkthrough Style) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="font-semibold text-gray-900 mb-2">{question.question}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Calendar className="w-4 h-4" />
            <span>Mon, Jan 22 • 2:30 PM</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>Asked by</span>
              </div>
              <span className="font-medium text-gray-900">{question.staffName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Bell className="w-4 h-4" />
                <span>Status</span>
              </div>
              <span className="font-medium text-gray-900 capitalize">{question.status}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <LayoutDashboard className="w-4 h-4" />
                <span>Guide</span>
              </div>
              <span className="font-medium text-gray-900">{guide.title}</span>
            </div>
          </div>
          <button className="w-full bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
            View Question
          </button>
        </div>

        {/* Informational Card (Mileage Style) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="font-semibold text-gray-900 mb-2">Training Status</div>
          <div className="text-sm text-gray-600">
            Auto tracking has been temporarily disabled. Enter completion status manually.
          </div>
        </div>

        {/* Tour Scheduling Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex gap-4 mb-4 border-b border-gray-200">
            <button
              onClick={() => setSelectedTab('in-person')}
              className={`pb-3 px-2 text-sm font-medium transition-colors ${
                selectedTab === 'in-person'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              In Person
            </button>
            <button
              onClick={() => setSelectedTab('video')}
              className={`pb-3 px-2 text-sm font-medium transition-colors ${
                selectedTab === 'video'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Video Chat
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            {[18, 19, 20, 21, 22].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDate === day
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {['WED', 'THU', 'FRI', 'SAT', 'SUN'][day - 18]} {day} JAN
              </button>
            ))}
          </div>
          <button className="w-full bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-lg font-medium transition-colors mb-3">
            Schedule Training
          </button>
          <div className="text-xs text-gray-500 mb-2">
            Need help? <a href="#" className="text-black underline">Ask a question</a> or call <a href="#" className="text-black underline">(415) 667-5532</a>
          </div>
        </div>

        {/* Calendar Component */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">January 2025</h3>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <span className="text-gray-600">‹</span>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <span className="text-gray-600">›</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={`${day}-${index}`} className="text-center text-xs font-medium text-gray-600 py-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square flex items-center justify-center text-sm transition-colors ${
                  selectedDate === day
                    ? 'bg-black text-white rounded-full'
                    : 'text-gray-700 hover:bg-gray-100 rounded'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Form Elements */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Label
            </label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Checkbox Label
            </label>
            <div className="space-y-2">
              {['item-1', 'item-2', 'item-3', 'item-4'].map((id) => (
                <label key={id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(id)}
                    onChange={() => handleCheckboxChange(id)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">Checkbox label</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Radio Label
            </label>
            <div className="space-y-2">
              {['option-1', 'option-2', 'option-3', 'option-4'].map((id) => (
                <label key={id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="radio-group"
                    checked={selectedRadio === id}
                    onChange={() => setSelectedRadio(id)}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">Radio label</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Tag Labels */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700"
              >
                <span>{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-gray-900 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Home Affordability Calculator Style Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Staff Performance Calculator</h3>
          <p className="text-sm text-gray-600">
            Estimate training completion rates and staff engagement metrics
          </p>
        </div>
      </div>

      {/* Button Styles Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Button Styles</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-black hover:bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            Primary Button
          </button>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors">
            Secondary Button
          </button>
          <button className="text-black hover:text-gray-900 px-6 py-2.5 rounded-lg font-medium transition-colors">
            Text Button
          </button>
        </div>
      </div>
    </div>
  );
}

