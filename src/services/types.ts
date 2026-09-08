export type SubmissionStatus = 'Pending' | 'Under Review' | 'Changes Requested' | 'Approved' | 'Rejected';

export type UserRoleCategory = 'Parent' | 'Volunteer' | 'School / Partner' | 'Brand / Sponsor' | 'Community Member';

export interface SubmissionFile {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploaded_at: string;
}

export interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: UserRoleCategory;
  category: string;
  message: string;
  status: SubmissionStatus;
  rejection_reason?: string;
  changes_requested_note?: string;
  assigned_admin?: string;
  created_at: string;
  updated_at: string;
  files?: SubmissionFile[];
  user_id?: string;
}

export interface SubmissionStatusHistory {
  id: string;
  submission_id: string;
  previous_status: SubmissionStatus;
  new_status: SubmissionStatus;
  changed_by: string;
  timestamp: string;
  notes?: string;
}

export interface AdminNote {
  id: string;
  submission_id: string;
  note_content: string;
  admin_name: string;
  admin_email: string;
  created_at: string;
  is_internal: true;
}

export interface AuditLog {
  id: string;
  action: string;
  actor_name: string;
  actor_email: string;
  resource_type: 'submission' | 'user' | 'system' | 'note';
  resource_id: string;
  previous_value?: string;
  new_value?: string;
  timestamp: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Community Manager' | 'Operations Lead' | 'Moderator';
  avatar: string;
  status: 'Active' | 'Inactive';
  created_at: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: UserRoleCategory;
  submission_count: number;
  joined_at: string;
  status: 'Active' | 'Flagged';
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'submission' | 'user' | 'system';
  target_id?: string;
}
