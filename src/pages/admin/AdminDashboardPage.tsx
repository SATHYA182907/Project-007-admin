import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  ArrowRight,
  TrendingUp,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { dbService } from '../../services/db';
import { useAuth } from '../../hooks/useAuth';
import type { Submission, AuditLog } from '../../services/types';

export const AdminDashboardPage: React.FC = () => {
  const { admin } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const loadData = async () => {
    const subs = await dbService.getSubmissions();
    const usrs = await dbService.getUsers();
    const logs = await dbService.getAuditLogs();

    setSubmissions(subs);
    setUserCount(usrs.length);
    setAuditLogs(logs.slice(0, 5));
  };

  useEffect(() => {
    loadData();
    const unsub = dbService.subscribe(loadData);
    return () => unsub();
  }, []);

  // Compute exact metrics from database
  const totalSubmissions = submissions.length;
  const pendingCount = submissions.filter((s) => s.status === 'Pending').length;
  const underReviewCount = submissions.filter((s) => s.status === 'Under Review').length;
  const approvedCount = submissions.filter((s) => s.status === 'Approved').length;
  const rejectedCount = submissions.filter((s) => s.status === 'Rejected').length;
  const changesCount = submissions.filter((s) => s.status === 'Changes Requested').length;

  const needsAttentionList = submissions.filter(
    (s) => s.status === 'Pending' || s.status === 'Under Review' || s.status === 'Changes Requested'
  );

  const recentSubmissions = submissions.slice(0, 5);

  // Compute status chart distribution
  const statusData = [
    { name: 'Pending', value: pendingCount, color: '#f59e0b' },
    { name: 'Under Review', value: underReviewCount, color: '#3b82f6' },
    { name: 'Approved', value: approvedCount, color: '#10b981' },
    { name: 'Changes Requested', value: changesCount, color: '#8b5cf6' },
    { name: 'Rejected', value: rejectedCount, color: '#ef4444' },
  ].filter((d) => d.value > 0);

  // Compute trend data by day
  const trendDataMap: Record<string, number> = {};
  submissions.forEach((s) => {
    const dateStr = new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    trendDataMap[dateStr] = (trendDataMap[dateStr] || 0) + 1;
  });
  const trendChartData = Object.keys(trendDataMap).map((k) => ({ date: k, count: trendDataMap[k] }));
  if (trendChartData.length === 1) {
    trendChartData.unshift({ date: 'Prev Day', count: 0 });
  }

  const kpiCards = [
    {
      title: 'TOTAL SUBMISSIONS',
      value: totalSubmissions,
      icon: ClipboardList,
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200/60',
    },
    {
      title: 'PENDING REVIEW',
      value: pendingCount + underReviewCount,
      icon: Clock,
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200/60',
    },
    {
      title: 'APPROVED',
      value: approvedCount,
      icon: CheckCircle2,
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200/60',
    },
    {
      title: 'CHANGES REQUESTED',
      value: changesCount,
      icon: AlertTriangle,
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200/60',
    },
    {
      title: 'REJECTED',
      value: rejectedCount,
      icon: XCircle,
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200/60',
    },
    {
      title: 'TOTAL USERS',
      value: userCount,
      icon: Users,
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200/60',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Welcome back, <span className="text-amber-700">{admin?.name || 'Administrator'}</span> 👋
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage Offscreen Hub activities, submissions and community engagement.
          </p>
        </div>
        <Link
          to="/admin/submissions"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all self-start sm:self-auto"
        >
          <span>View Submissions</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-5 rounded-2xl ${kpi.bg} border ${kpi.border} shadow-xs flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                  {kpi.title}
                </span>
                <div className={`p-2 rounded-xl bg-white shadow-2xs ${kpi.text}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-serif font-bold text-slate-900">{kpi.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">Submission Volume Trend</h3>
              <p className="text-xs text-slate-400">Incoming community submissions over time</p>
            </div>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="h-64">
            {trendChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendChartData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No trend data available yet.
              </div>
            )}
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-slate-900 mb-1">Status Breakdown</h3>
            <p className="text-xs text-slate-400 mb-4">Distribution of current submission statuses</p>
            <div className="h-48 relative">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  No submissions yet.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
            {statusData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-700">{d.name}</span>
                </div>
                <span className="font-bold text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Needs Attention & Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Needs Attention Panel */}
        <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">Needs Your Attention</h3>
                <p className="text-[11px] text-slate-400">Submissions awaiting action</p>
              </div>
            </div>
            <Link to="/admin/submissions" className="text-xs font-bold text-amber-700 hover:text-amber-900">
              Review All ({needsAttentionList.length})
            </Link>
          </div>

          <div className="space-y-3">
            {needsAttentionList.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                All submissions have been reviewed! 🎉
              </div>
            ) : (
              needsAttentionList.slice(0, 4).map((sub) => (
                <Link
                  key={sub.id}
                  to={`/admin/submissions/${sub.id}`}
                  className="block p-3.5 rounded-2xl bg-amber-50/40 hover:bg-amber-100/50 border border-amber-200/50 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-amber-900">
                      {sub.id} — {sub.full_name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sub.status === 'Pending'
                          ? 'bg-amber-200 text-amber-900'
                          : sub.status === 'Under Review'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{sub.category}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Submissions Data Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-serif font-bold text-base text-slate-900">Recent Submissions</h3>
            <Link to="/admin/submissions" className="text-xs font-bold text-amber-700 hover:text-amber-900">
              View All Submissions →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">User</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">Submitted</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-2 font-bold text-slate-900">{sub.id}</td>
                    <td className="py-3 px-2">
                      <p className="font-bold text-slate-800">{sub.full_name}</p>
                      <p className="text-[10px] text-slate-400">{sub.email}</p>
                    </td>
                    <td className="py-3 px-2 text-slate-600 font-medium">{sub.role}</td>
                    <td className="py-3 px-2 text-slate-500 whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          sub.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : sub.status === 'Changes Requested'
                            ? 'bg-purple-100 text-purple-800'
                            : sub.status === 'Under Review'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link
                        to={`/admin/submissions/${sub.id}`}
                        className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[11px] transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline Widget */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">Recent Admin Activity</h3>
              <p className="text-xs text-slate-400">Auditable log of status changes and user submissions</p>
            </div>
          </div>
          <Link to="/admin/activity" className="text-xs font-bold text-amber-700 hover:text-amber-900">
            Full Audit Log →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {auditLogs.length === 0 ? (
            <p className="text-slate-400 italic py-2 col-span-3 text-center">No recent activity recorded.</p>
          ) : (
            auditLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">{log.action}</span>
                <p className="text-slate-500 text-[11px]">Actor: {log.actor_name}</p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
