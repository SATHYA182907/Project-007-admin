import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart as PieIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { dbService } from '../../services/db';
import type { Submission } from '../../services/types';

export const AdminAnalyticsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '3M' | '1Y'>('30D');

  useEffect(() => {
    const fetchData = async () => {
      const subs = await dbService.getSubmissions();
      setSubmissions(subs);
    };
    fetchData();
  }, []);

  // Category breakdown metrics
  const categoryMap: Record<string, number> = {};
  submissions.forEach((s) => {
    categoryMap[s.role] = (categoryMap[s.role] || 0) + 1;
  });
  const categoryChartData = Object.keys(categoryMap).map((k) => ({
    name: k,
    count: categoryMap[k],
  }));

  // Status breakdown metrics
  const statusMap: Record<string, number> = {};
  submissions.forEach((s) => {
    statusMap[s.status] = (statusMap[s.status] || 0) + 1;
  });
  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444'];
  const statusPieData = Object.keys(statusMap).map((k, i) => ({
    name: k,
    value: statusMap[k],
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Analytics & Insights</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time analytics calculated directly from community database records.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
          {(['7D', '30D', '3M', '1Y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                timeRange === range
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">Submissions by Role Category</h3>
              <p className="text-xs text-slate-400">Distribution across Parent, Volunteer, School tracks</p>
            </div>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                  }}
                />
                <Bar dataKey="count" fill="#d97706" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">Status Allocation</h3>
              <p className="text-xs text-slate-400">Proportions of pending, approved, and rejected items</p>
            </div>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <PieIcon className="w-5 h-5" />
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusPieData} innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
