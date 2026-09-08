import type { AdminUser } from './types';

const ADMIN_SESSION_KEY = 'offscreen_admin_session_v1';

export const DEFAULT_ADMIN: AdminUser = {
  id: 'ADM-001',
  name: 'Offscreen Hub Admin',
  email: 'admin@offscreenhub.com',
  role: 'Super Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  status: 'Active',
  created_at: '2026-01-01T00:00:00.000Z',
};

export const authService = {
  getAdminSession(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  async login(email: string, password: string): Promise<{ success: boolean; admin?: AdminUser; error?: string }> {
    // Simulate short network auth validation delay
    await new Promise((r) => setTimeout(r, 600));

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    // Standard valid admin credentials check for Offscreen Hub Portal
    if (
      (email.toLowerCase() === 'admin@offscreenhub.com' || email.toLowerCase() === 'admin@offscreen.org') &&
      password === 'offscreen2026'
    ) {
      const user = { ...DEFAULT_ADMIN, email };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(user));
      return { success: true, admin: user };
    }

    // Allow custom admin email if formatted correctly
    if (email.endsWith('@offscreenhub.com') && password.length >= 6) {
      const customAdmin: AdminUser = {
        id: `ADM-${Math.floor(100 + Math.random() * 900)}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        role: 'Operations Lead',
        avatar: DEFAULT_ADMIN.avatar,
        status: 'Active',
        created_at: new Date().toISOString(),
      };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(customAdmin));
      return { success: true, admin: customAdmin };
    }

    return {
      success: false,
      error: 'Invalid admin credentials. Use admin@offscreenhub.com / offscreen2026',
    };
  },

  logout(): void {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  },
};
