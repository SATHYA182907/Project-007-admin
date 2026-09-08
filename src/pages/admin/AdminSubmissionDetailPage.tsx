import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  FileText,
  MessageSquare,
  Lock,
  Plus,
  Edit3,
  History,
  File,
  Download,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { dbService } from '../../services/db';
import { useAuth } from '../../hooks/useAuth';
import type {
  Submission,
  AdminNote,
  SubmissionStatusHistory,
} from '../../services/types';

export const AdminSubmissionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { admin } = useAuth();

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [history, setHistory] = useState<SubmissionStatusHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [activeModal, setActiveModal] = useState<'APPROVE' | 'REJECT' | 'CHANGES' | 'EDIT' | null>(null);
  const [modalReason, setModalReason] = useState('');
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
  });

  // New Note state
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const loadData = async () => {
    if (!id) return;
    setIsLoading(true);
    const sub = await dbService.getSubmissionById(id);
    if (sub) {
      setSubmission(sub);
      setEditForm({
        full_name: sub.full_name,
        email: sub.email,
        phone: sub.phone,
        category: sub.category,
        message: sub.message,
      });
      const nts = await dbService.getAdminNotes(id);
      setNotes(nts);
      const hst = await dbService.getStatusHistory(id);
      setHistory(hst);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    const unsub = dbService.subscribe(loadData);
    return () => unsub();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Loading submission details...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200">
        <h2 className="text-xl font-serif font-bold text-slate-800">Submission Not Found</h2>
        <p className="text-xs text-slate-500">The requested submission ID does not exist in the database.</p>
        <Link
          to="/admin/submissions"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Submissions
        </Link>
      </div>
    );
  }

  // Action handlers
  const handleApprove = async () => {
    setIsActionLoading(true);
    await dbService.updateSubmissionStatus(
      submission.id,
      'Approved',
      admin?.name || 'Admin',
      admin?.email || 'admin@offscreenhub.com'
    );
    setIsActionLoading(false);
    setActiveModal(null);
  };

  const handleReject = async () => {
    if (!modalReason.trim()) return;
    setIsActionLoading(true);
    await dbService.updateSubmissionStatus(
      submission.id,
      'Rejected',
      admin?.name || 'Admin',
      admin?.email || 'admin@offscreenhub.com',
      modalReason
    );
    setIsActionLoading(false);
    setModalReason('');
    setActiveModal(null);
  };

  const handleRequestChanges = async () => {
    if (!modalReason.trim()) return;
    setIsActionLoading(true);
    await dbService.updateSubmissionStatus(
      submission.id,
      'Changes Requested',
      admin?.name || 'Admin',
      admin?.email || 'admin@offscreenhub.com',
      modalReason
    );
    setIsActionLoading(false);
    setModalReason('');
    setActiveModal(null);
  };

  const handleSaveEdit = async () => {
    setIsActionLoading(true);
    await dbService.editSubmission(
      submission.id,
      editForm,
      admin?.name || 'Admin',
      admin?.email || 'admin@offscreenhub.com'
    );
    setIsActionLoading(false);
    setActiveModal(null);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    setIsAddingNote(true);
    await dbService.addAdminNote(
      submission.id,
      newNoteContent,
      admin?.name || 'Admin',
      admin?.email || 'admin@offscreenhub.com'
    );
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/submissions')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Submissions
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              submission.status === 'Approved'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : submission.status === 'Rejected'
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : submission.status === 'Changes Requested'
                ? 'bg-purple-100 text-purple-800 border border-purple-300'
                : submission.status === 'Under Review'
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            {submission.status}
          </span>
        </div>
      </div>

      {/* Main Details Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono font-bold text-lg text-amber-700">{submission.id}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider">
              {submission.role}
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">{submission.full_name}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Submitted on {new Date(submission.created_at).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => setActiveModal('EDIT')}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4 text-slate-600" />
          <span>Edit Submission</span>
        </button>
      </div>

      {/* Grid: Left Column (User & Form Info) / Right Column (Action Controls & Internal Notes) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Information Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>User Information</span>
              </h3>
              {submission.user_id && (
                <Link
                  to={`/admin/users/${submission.user_id}`}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
                >
                  <span>View User Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Full Name
                </span>
                <p className="font-bold text-slate-900">{submission.full_name}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Email Address
                </span>
                <p className="font-bold text-slate-900 truncate">{submission.email}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Phone Number
                </span>
                <p className="font-bold text-slate-900">{submission.phone}</p>
              </div>
            </div>
          </div>

          {/* Submitted Form Information Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Submitted Details & Inquiry</span>
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Category / Program Request
                </span>
                <p className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 font-serif font-bold text-amber-900 text-sm">
                  {submission.category}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Full Inquiry / Message Content
                </span>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                  {submission.message || 'No additional message provided.'}
                </div>
              </div>

              {/* Status Feedback Notes (if Rejection or Changes Requested) */}
              {submission.status === 'Rejected' && submission.rejection_reason && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800">
                  <span className="font-bold text-[11px] block mb-1">Rejection Reason:</span>
                  <p className="text-xs">{submission.rejection_reason}</p>
                </div>
              )}

              {submission.status === 'Changes Requested' && submission.changes_requested_note && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900">
                  <span className="font-bold text-[11px] block mb-1">Changes Requested Feedback:</span>
                  <p className="text-xs">{submission.changes_requested_note}</p>
                </div>
              )}
            </div>
          </div>

          {/* Attached Files & Documents */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <File className="w-4 h-4 text-amber-600" />
                <span>Attached Files & Documentation</span>
              </h3>
            </div>

            {submission.files && submission.files.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {submission.files.map((file) => (
                  <div
                    key={file.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                        PDF
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-slate-900 text-xs truncate">{file.name}</p>
                        <p className="text-[10px] text-slate-400">{file.size}</p>
                      </div>
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white hover:bg-amber-50 text-slate-600 hover:text-amber-800 border border-slate-200"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-2 italic">No attached files for this submission.</p>
            )}
          </div>
        </div>

        {/* RIGHT 1 COLUMN (Action Controls & Internal Admin Notes) */}
        <div className="space-y-6">
          {/* Status Management Action Controls */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Status Management
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => setActiveModal('APPROVE')}
                disabled={submission.status === 'Approved'}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve Submission
              </button>

              <button
                onClick={() => setActiveModal('CHANGES')}
                disabled={submission.status === 'Changes Requested'}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <AlertTriangle className="w-4 h-4" /> Request Changes
              </button>

              <button
                onClick={() => setActiveModal('REJECT')}
                disabled={submission.status === 'Rejected'}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <XCircle className="w-4 h-4" /> Reject Submission
              </button>
            </div>
          </div>

          {/* INTERNAL ADMIN NOTES PANEL */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <span>Admin Notes</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" /> INTERNAL
              </span>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Internal notes are private to administrators and never displayed to users.
            </p>

            {/* Existing Notes List */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-xs text-slate-400 py-2 text-center">No internal notes added yet.</p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                      <span>{note.admin_name}</span>
                      <span>{new Date(note.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-xs text-slate-800 leading-snug">{note.note_content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-slate-100">
              <textarea
                rows={2}
                placeholder="Write internal note..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isAddingNote || !newNoteContent.trim()}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-40 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Internal Note
              </button>
            </form>
          </div>

          {/* Activity & Timeline */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-amber-600" />
              <span>Status History</span>
            </h3>

            <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-3 before:w-0.5 before:bg-slate-200 pl-8 text-xs">
              <div className="relative">
                <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-white" />
                <p className="font-bold text-slate-900">Submission Received</p>
                <span className="text-[10px] text-slate-400 block">
                  {new Date(submission.created_at).toLocaleString()}
                </span>
              </div>

              {history.map((h) => (
                <div key={h.id} className="relative">
                  <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
                  <p className="font-bold text-slate-900">
                    Status changed to <span className="text-amber-800">{h.new_status}</span>
                  </p>
                  <p className="text-[10px] text-slate-500">By: {h.changed_by}</p>
                  {h.notes && <p className="text-[11px] text-slate-600 italic mt-0.5">{h.notes}</p>}
                  <span className="text-[10px] text-slate-400 block">
                    {new Date(h.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Modals */}
      <AnimatePresence>
        {/* APPROVE MODAL */}
        {activeModal === 'APPROVE' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200"
            >
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Approve Submission?</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Are you sure you want to approve submission <span className="font-bold text-amber-800">{submission.id}</span>? The user will be notified of approval in the user portal.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isActionLoading}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md flex items-center gap-1.5"
                >
                  {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Approval'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* REJECT MODAL */}
        {activeModal === 'REJECT' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4"
            >
              <h3 className="text-lg font-serif font-bold text-slate-900">Reject Submission</h3>
              <p className="text-xs text-slate-600">Please provide a reason for rejecting this submission:</p>

              <textarea
                rows={3}
                required
                placeholder="Reason for rejection..."
                value={modalReason}
                onChange={(e) => setModalReason(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-rose-500 focus:outline-none"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={isActionLoading || !modalReason.trim()}
                  className="px-5 py-2 rounded-xl bg-rose-600 disabled:opacity-50 text-white text-xs font-bold hover:bg-rose-700 shadow-md flex items-center gap-1.5"
                >
                  {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Reject Submission'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* REQUEST CHANGES MODAL */}
        {activeModal === 'CHANGES' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4"
            >
              <h3 className="text-lg font-serif font-bold text-slate-900">Request Changes</h3>
              <p className="text-xs text-slate-600">Specify what changes or additional information the applicant must provide:</p>

              <textarea
                rows={3}
                required
                placeholder="Describe required changes..."
                value={modalReason}
                onChange={(e) => setModalReason(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-purple-500 focus:outline-none"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestChanges}
                  disabled={isActionLoading || !modalReason.trim()}
                  className="px-5 py-2 rounded-xl bg-purple-600 disabled:opacity-50 text-white text-xs font-bold hover:bg-purple-700 shadow-md flex items-center gap-1.5"
                >
                  {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Change Request'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* EDIT MODAL */}
        {activeModal === 'EDIT' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4"
            >
              <h3 className="text-lg font-serif font-bold text-slate-900">Edit Submission Details</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={3}
                    value={editForm.message}
                    onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isActionLoading}
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
