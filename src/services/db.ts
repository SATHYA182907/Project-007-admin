import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type {
  Submission,
  SubmissionStatus,
  SubmissionStatusHistory,
  AdminNote,
  AuditLog,
  UserProfile,
  AdminNotification,
  UserRoleCategory,
} from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.warn('Supabase initialization fallback to reactive local DB engine', e);
  }
}

// Storage keys for unified DB engine
const STORAGE_KEYS = {
  SUBMISSIONS: 'offscreen_db_submissions_v1',
  HISTORY: 'offscreen_db_history_v1',
  NOTES: 'offscreen_db_notes_v1',
  AUDIT: 'offscreen_db_audit_v1',
  USERS: 'offscreen_db_users_v1',
  NOTIFICATIONS: 'offscreen_db_notifications_v1',
};

// Default seed data (if database is completely empty) to start initial synchronization
const SEED_USERS: UserProfile[] = [
  {
    id: 'USR-101',
    full_name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'Parent',
    submission_count: 2,
    joined_at: '2026-08-15T10:00:00.000Z',
    status: 'Active',
  },
  {
    id: 'USR-102',
    full_name: 'Dr. Ramesh Kumar',
    email: 'rkumar@coimbatore-academy.edu',
    phone: '+91 94432 10987',
    role: 'School / Partner',
    submission_count: 1,
    joined_at: '2026-08-20T14:30:00.000Z',
    status: 'Active',
  },
  {
    id: 'USR-103',
    full_name: 'Priya Sundaram',
    email: 'priya.s@communityconnect.org',
    phone: '+91 98421 55667',
    role: 'Volunteer',
    submission_count: 1,
    joined_at: '2026-08-28T09:15:00.000Z',
    status: 'Active',
  },
];

const SEED_SUBMISSIONS: Submission[] = [
  {
    id: 'OSH-1001',
    full_name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'Parent',
    category: 'Mom & Me Workshop Series',
    message: 'Interested in enrolling my 8-year-old daughter for the upcoming weekend screen-free storytelling and pottery workshop.',
    status: 'Pending',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    user_id: 'USR-101',
    files: [
      {
        id: 'file-1',
        name: 'student_interest_form.pdf',
        url: 'https://example.com/docs/interest_form.pdf',
        size: '1.2 MB',
        type: 'application/pdf',
        uploaded_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
    ],
  },
  {
    id: 'OSH-1002',
    full_name: 'Dr. Ramesh Kumar',
    email: 'rkumar@coimbatore-academy.edu',
    phone: '+91 94432 10987',
    role: 'School / Partner',
    category: 'School Brain Gym Program',
    message: 'We request Offscreen Hub to conduct a 3-day screen reduction and cognitive agility seminar for 450 middle school students in September.',
    status: 'Under Review',
    assigned_admin: 'Admin Team',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    user_id: 'USR-102',
  },
  {
    id: 'OSH-1003',
    full_name: 'Priya Sundaram',
    email: 'priya.s@communityconnect.org',
    phone: '+91 98421 55667',
    role: 'Volunteer',
    category: 'Community Facilitator Track',
    message: 'Eager to volunteer for weekend outdoor play sessions and Komagal Awards coordination in Coimbatore.',
    status: 'Approved',
    assigned_admin: 'Sarah Jenkins',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    user_id: 'USR-103',
  },
];

const SEED_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'New Community Submission',
    description: 'Ananya Sharma submitted a request for Mom & Me Workshop Series.',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    read: false,
    type: 'submission',
    target_id: 'OSH-1001',
  },
  {
    id: 'notif-2',
    title: 'School Partnership Request',
    description: 'Dr. Ramesh Kumar requested a 3-day School Brain Gym Program.',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    read: false,
    type: 'submission',
    target_id: 'OSH-1002',
  },
];

// Helper to initialize local storage if empty
const initLocalStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(SEED_SUBMISSIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT)) {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify([]));
  }
};

initLocalStorage();

// Broadcast Channel for live cross-tab reactiveness
const broadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('offscreen_hub_db_sync')
  : null;

const listeners: Array<() => void> = [];

const notifyListeners = () => {
  listeners.forEach((l) => l());
  if (broadcastChannel) {
    broadcastChannel.postMessage('sync');
  }
};

if (broadcastChannel) {
  broadcastChannel.onmessage = (event) => {
    if (event.data === 'sync') {
      listeners.forEach((l) => l());
    }
  };
}

export const dbService = {
  subscribe(callback: () => void) {
    listeners.push(callback);
    return () => {
      const idx = listeners.indexOf(callback);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  },

  // 1. SUBMISSIONS MANAGEMENT
  async getSubmissions(): Promise<Submission[]> {
    if (supabase) {
      const { data, error } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Submission[];
    }
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return raw ? JSON.parse(raw) : [];
  },

  async getSubmissionById(id: string): Promise<Submission | null> {
    const subs = await this.getSubmissions();
    return subs.find((s) => s.id === id) || null;
  },

  async createSubmission(payload: {
    full_name: string;
    email: string;
    phone: string;
    role: UserRoleCategory;
    category?: string;
    message: string;
    files?: { name: string; url: string; size: string; type: string }[];
  }): Promise<Submission> {
    const subs = await this.getSubmissions();
    const idNum = 1000 + subs.length + 1;
    const newId = `OSH-${idNum}`;
    const now = new Date().toISOString();

    const newSub: Submission = {
      id: newId,
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      category: payload.category || `${payload.role} Engagement`,
      message: payload.message,
      status: 'Pending',
      created_at: now,
      updated_at: now,
      files: payload.files?.map((f, i) => ({
        ...f,
        id: `file-${Date.now()}-${i}`,
        uploaded_at: now,
      })),
    };

    if (supabase) {
      await supabase.from('submissions').insert([newSub]);
    }

    const updated = [newSub, ...subs];
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));

    // Update or create user profile
    await this.registerOrUpdateUser(payload.full_name, payload.email, payload.phone, payload.role);

    // Create Notification
    const notifs = await this.getNotifications();
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      title: `New Submission (${newSub.role})`,
      description: `${newSub.full_name} submitted a new request: "${newSub.category}".`,
      timestamp: now,
      read: false,
      type: 'submission',
      target_id: newId,
    };
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([newNotif, ...notifs]));

    // Audit log
    await this.logAudit({
      action: 'USER_SUBMITTED',
      actor_name: payload.full_name,
      actor_email: payload.email,
      resource_type: 'submission',
      resource_id: newId,
      new_value: 'Pending',
    });

    notifyListeners();
    return newSub;
  },

  async updateSubmissionStatus(
    id: string,
    newStatus: SubmissionStatus,
    adminName: string,
    adminEmail: string,
    notes?: string
  ): Promise<Submission | null> {
    const subs = await this.getSubmissions();
    const index = subs.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const oldSub = subs[index];
    const prevStatus = oldSub.status;
    const now = new Date().toISOString();

    const updatedSub: Submission = {
      ...oldSub,
      status: newStatus,
      updated_at: now,
      rejection_reason: newStatus === 'Rejected' ? notes : oldSub.rejection_reason,
      changes_requested_note: newStatus === 'Changes Requested' ? notes : oldSub.changes_requested_note,
      assigned_admin: adminName,
    };

    subs[index] = updatedSub;
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));

    if (supabase) {
      await supabase.from('submissions').update(updatedSub).eq('id', id);
    }

    // Record Status History
    const newHistory: SubmissionStatusHistory = {
      id: `hist-${Date.now()}`,
      submission_id: id,
      previous_status: prevStatus,
      new_status: newStatus,
      changed_by: `${adminName} (${adminEmail})`,
      timestamp: now,
      notes: notes || undefined,
    };
    const allHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([newHistory, ...allHistory]));

    // Audit log
    await this.logAudit({
      action: `STATUS_CHANGED_${newStatus.toUpperCase().replace(' ', '_')}`,
      actor_name: adminName,
      actor_email: adminEmail,
      resource_type: 'submission',
      resource_id: id,
      previous_value: prevStatus,
      new_value: newStatus,
    });

    notifyListeners();
    return updatedSub;
  },

  async editSubmission(
    id: string,
    fields: Partial<Submission>,
    adminName: string,
    adminEmail: string
  ): Promise<Submission | null> {
    const subs = await this.getSubmissions();
    const index = subs.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const oldSub = subs[index];
    const updatedSub: Submission = {
      ...oldSub,
      ...fields,
      updated_at: new Date().toISOString(),
    };

    subs[index] = updatedSub;
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));

    await this.logAudit({
      action: 'SUBMISSION_EDITED',
      actor_name: adminName,
      actor_email: adminEmail,
      resource_type: 'submission',
      resource_id: id,
    });

    notifyListeners();
    return updatedSub;
  },

  // 2. ADMIN INTERNAL NOTES
  async getAdminNotes(submissionId: string): Promise<AdminNote[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    const all: AdminNote[] = raw ? JSON.parse(raw) : [];
    return all.filter((n) => n.submission_id === submissionId);
  },

  async addAdminNote(
    submissionId: string,
    content: string,
    adminName: string,
    adminEmail: string
  ): Promise<AdminNote> {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    const all: AdminNote[] = raw ? JSON.parse(raw) : [];
    const now = new Date().toISOString();

    const newNote: AdminNote = {
      id: `note-${Date.now()}`,
      submission_id: submissionId,
      note_content: content,
      admin_name: adminName,
      admin_email: adminEmail,
      created_at: now,
      is_internal: true,
    };

    const updated = [newNote, ...all];
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updated));

    await this.logAudit({
      action: 'ADD_INTERNAL_NOTE',
      actor_name: adminName,
      actor_email: adminEmail,
      resource_type: 'note',
      resource_id: submissionId,
    });

    notifyListeners();
    return newNote;
  },

  // 3. STATUS HISTORY
  async getStatusHistory(submissionId: string): Promise<SubmissionStatusHistory[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    const all: SubmissionStatusHistory[] = raw ? JSON.parse(raw) : [];
    return all.filter((h) => h.submission_id === submissionId);
  },

  // 4. USERS MANAGEMENT
  async getUsers(): Promise<UserProfile[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [];
  },

  async getUserById(id: string): Promise<UserProfile | null> {
    const users = await this.getUsers();
    return users.find((u) => u.id === id) || null;
  },

  async registerOrUpdateUser(
    name: string,
    email: string,
    phone: string,
    role: UserRoleCategory
  ): Promise<UserProfile> {
    const users = await this.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      existing.submission_count += 1;
      existing.full_name = name || existing.full_name;
      existing.phone = phone || existing.phone;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return existing;
    }

    const newUser: UserProfile = {
      id: `USR-${100 + users.length + 1}`,
      full_name: name,
      email: email,
      phone: phone,
      role: role,
      submission_count: 1,
      joined_at: new Date().toISOString(),
      status: 'Active',
    };

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([newUser, ...users]));
    return newUser;
  },

  // 5. AUDIT LOGS
  async getAuditLogs(): Promise<AuditLog[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT);
    return raw ? JSON.parse(raw) : [];
  },

  async logAudit(payload: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const logs = await this.getAuditLogs();
    const newLog: AuditLog = {
      ...payload,
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify([newLog, ...logs]));
    return newLog;
  },

  // 6. NOTIFICATIONS
  async getNotifications(): Promise<AdminNotification[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : [];
  },

  async markNotificationRead(id: string): Promise<void> {
    const notifs = await this.getNotifications();
    const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifyListeners();
  },

  async markAllNotificationsRead(): Promise<void> {
    const notifs = await this.getNotifications();
    const updated = notifs.map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    notifyListeners();
  },

  // 7. BULK ACTIONS
  async bulkUpdateSubmissions(
    ids: string[],
    newStatus: SubmissionStatus,
    adminName: string,
    adminEmail: string
  ): Promise<number> {
    let count = 0;
    for (const id of ids) {
      const res = await this.updateSubmissionStatus(id, newStatus, adminName, adminEmail, `Bulk action by ${adminName}`);
      if (res) count++;
    }
    return count;
  },

  // 8. CSV EXPORT
  async exportSubmissionsCSV(filteredSubmissions?: Submission[]): Promise<string> {
    const data = filteredSubmissions || (await this.getSubmissions());
    const headers = ['Submission ID', 'Full Name', 'Email', 'Phone', 'Role', 'Category', 'Status', 'Submitted Date', 'Assigned Admin', 'Message'];
    const rows = data.map((s) => [
      `"${s.id}"`,
      `"${s.full_name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.phone.replace(/"/g, '""')}"`,
      `"${s.role}"`,
      `"${s.category.replace(/"/g, '""')}"`,
      `"${s.status}"`,
      `"${s.created_at}"`,
      `"${s.assigned_admin || ''}"`,
      `"${s.message.replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
