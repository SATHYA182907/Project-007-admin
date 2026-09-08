import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  CheckSquare,
  Square,
} from 'lucide-react';
import { dbService } from '../../services/db';
import { useAuth } from '../../hooks/useAuth';
import type { Submission, SubmissionStatus } from '../../services/types';

export const AdminSubmissionsPage: React.FC = () => {
  const { admin } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Filters & Controls state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'OLDEST' | 'UPDATED' | 'STATUS'>('NEWEST');

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkActionTarget, setBulkActionTarget] = useState<SubmissionStatus>('Approved');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const fetchSubmissions = async () => {
    const data = await dbService.getSubmissions();
    setSubmissions(data);
  };

  useEffect(() => {
    fetchSubmissions();
    const unsub = dbService.subscribe(fetchSubmissions);
    return () => unsub();
  }, []);

  // Filter and Sort logic
  const filteredSubmissions = submissions
    .filter((s) => {
      if (statusFilter !== 'ALL' && s.status !== statusFilter) return false;
      if (roleFilter !== 'ALL' && s.role !== roleFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchId = s.id.toLowerCase().includes(q);
        const matchName = s.full_name.toLowerCase().includes(q);
        const matchEmail = s.email.toLowerCase().includes(q);
        const matchPhone = s.phone.toLowerCase().includes(q);
        const matchCat = s.category.toLowerCase().includes(q);
        return matchId || matchName || matchEmail || matchPhone || matchCat;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'NEWEST') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'OLDEST') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'UPDATED') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      if (sortBy === 'STATUS') return a.status.localeCompare(b.status);
      return 0;
    });

  // Pagination bounds
  const totalRecords = filteredSubmissions.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;
  const paginatedData = filteredSubmissions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Bulk Selection Toggles
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((s) => s.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // CSV Export
  const handleExportCSV = async () => {
    const csvContent = await dbService.exportSubmissionsCSV(filteredSubmissions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `offscreen_hub_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Execute Bulk Action
  const handleConfirmBulkAction = async () => {
    if (selectedIds.length === 0) return;
    await dbService.bulkUpdateSubmissions(
      selectedIds,
      bulkActionTarget,
      admin?.name || 'Admin',
      admin?.email || 'admin@offscreenhub.com'
    );
    setSelectedIds([]);
    setIsBulkModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Submissions Management</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Review, verify and respond to community requests from the user portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by ID, name, email, phone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Changes Requested">Changes Requested</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Role / Category Filter */}
          <div>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Role Categories</option>
              <option value="Parent">Parent</option>
              <option value="Volunteer">Volunteer</option>
              <option value="School / Partner">School / Partner</option>
              <option value="Brand / Sponsor">Brand / Sponsor</option>
              <option value="Community Member">Community Member</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="NEWEST">Sort: Newest First</option>
              <option value="OLDEST">Sort: Oldest First</option>
              <option value="UPDATED">Sort: Recently Updated</option>
              <option value="STATUS">Sort: Status</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions Bar (if any items selected) */}
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <CheckSquare className="w-4 h-4 text-amber-700" />
              <span>{selectedIds.length} submission(s) selected</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={bulkActionTarget}
                onChange={(e) => setBulkActionTarget(e.target.value as SubmissionStatus)}
                className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-semibold text-slate-800"
              >
                <option value="Approved">Bulk Approve</option>
                <option value="Rejected">Bulk Reject</option>
                <option value="Under Review">Bulk Under Review</option>
              </select>
              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
              >
                Apply Bulk Action
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 w-10">
                  <button onClick={handleSelectAll} className="focus:outline-none">
                    {selectedIds.length > 0 && selectedIds.length === paginatedData.length ? (
                      <CheckSquare className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-3">Submission ID</th>
                <th className="py-3.5 px-3">Applicant Name</th>
                <th className="py-3.5 px-3">Contact</th>
                <th className="py-3.5 px-3">Category Track</th>
                <th className="py-3.5 px-3">Date Submitted</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Assigned</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-xs text-slate-400">
                    No submissions found matching the criteria.
                  </td>
                </tr>
              ) : (
                paginatedData.map((sub) => {
                  const isSelected = selectedIds.includes(sub.id);
                  return (
                    <tr
                      key={sub.id}
                      className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-amber-50/30' : ''}`}
                    >
                      <td className="py-4 px-4">
                        <button onClick={() => handleToggleSelect(sub.id)} className="focus:outline-none">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-300" />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-3 font-mono font-bold text-slate-900">{sub.id}</td>
                      <td className="py-4 px-3">
                        <p className="font-bold text-slate-900">{sub.full_name}</p>
                        <span className="text-[10px] text-slate-400 block">{sub.role}</span>
                      </td>
                      <td className="py-4 px-3">
                        <p className="text-slate-700 font-medium">{sub.email}</p>
                        <p className="text-[10px] text-slate-400">{sub.phone}</p>
                      </td>
                      <td className="py-4 px-3 text-slate-700 font-medium max-w-[180px] truncate">
                        {sub.category}
                      </td>
                      <td className="py-4 px-3 text-slate-500 whitespace-nowrap">
                        {new Date(sub.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                            sub.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/50'
                              : sub.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300/50'
                              : sub.status === 'Changes Requested'
                              ? 'bg-purple-100 text-purple-800 border border-purple-300/50'
                              : sub.status === 'Under Review'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300/50'
                              : 'bg-amber-100 text-amber-900 border border-amber-300/50'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-500 text-[11px]">
                        {sub.assigned_admin || 'Unassigned'}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          to={`/admin/submissions/${sub.id}`}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] shadow-2xs transition-colors inline-block"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{totalRecords > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="font-bold text-slate-800">{Math.min(currentPage * pageSize, totalRecords)}</span> of{' '}
            <span className="font-bold text-slate-800">{totalRecords}</span> submissions
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 disabled:opacity-40 font-semibold hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            <span className="px-3 py-1 font-bold text-slate-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 disabled:opacity-40 font-semibold hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Bulk Actions */}
      <AnimatePresence>
        {isBulkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200"
            >
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Confirm Bulk Status Update</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Are you sure you want to change the status of <span className="font-bold text-amber-800">{selectedIds.length}</span> selected submission(s) to <span className="font-bold uppercase text-amber-800">{bulkActionTarget}</span>?
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsBulkModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBulkAction}
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 shadow-md"
                >
                  Confirm & Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
