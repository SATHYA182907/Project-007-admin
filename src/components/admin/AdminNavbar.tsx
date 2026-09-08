import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  User,
  LogOut,
  ExternalLink,
  ChevronDown,
  CheckCheck,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { dbService } from '../../services/db';
import type { Submission, AdminNotification, UserProfile } from '../../services/types';

export const AdminNavbar: React.FC<{ pageTitle?: string }> = ({ pageTitle }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<{ submissions: Submission[]; users: UserProfile[] }>({
    submissions: [],
    users: [],
  });

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifs = async () => {
      const list = await dbService.getNotifications();
      setNotifications(list);
    };
    fetchNotifs();
    const unsub = dbService.subscribe(fetchNotifs);
    return () => unsub();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle global search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ submissions: [], users: [] });
      setIsSearchOpen(false);
      return;
    }

    const performSearch = async () => {
      const q = searchQuery.toLowerCase().trim();
      const subs = await dbService.getSubmissions();
      const users = await dbService.getUsers();

      const matchedSubs = subs.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.full_name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );

      const matchedUsers = users.filter(
        (u) =>
          u.full_name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q)
      );

      setSearchResults({
        submissions: matchedSubs.slice(0, 4),
        users: matchedUsers.slice(0, 3),
      });
      setIsSearchOpen(true);
    };

    const timer = setTimeout(performSearch, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = async () => {
    await dbService.markAllNotificationsRead();
  };

  const getBreadcrumbs = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length <= 1) return 'Dashboard';
    const last = parts[parts.length - 1];
    if (last.startsWith('OSH-')) return `Submission ${last}`;
    if (last.startsWith('USR-')) return `User ${last}`;
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-2xs">
      {/* Left Breadcrumb & Title */}
      <div className="flex items-center gap-3 pl-12 lg:pl-0">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            <span>Admin</span>
            <span>/</span>
            <span className="text-amber-700">{getBreadcrumbs()}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight">
            {pageTitle || getBreadcrumbs()}
          </h2>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Global Search Bar */}
        <div ref={searchRef} className="relative hidden md:block w-64 lg:w-80">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search submissions, users, emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100/80 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* Search Dropdown */}
          <AnimatePresence>
            {isSearchOpen && (searchResults.submissions.length > 0 || searchResults.users.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute top-full right-0 left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden z-50 p-2 space-y-3"
              >
                {searchResults.submissions.length > 0 && (
                  <div>
                    <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Submissions
                    </span>
                    {searchResults.submissions.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                          navigate(`/admin/submissions/${sub.id}`);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 flex items-center justify-between text-xs transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-slate-900 group-hover:text-amber-800 truncate">
                              {sub.id} — {sub.full_name}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">{sub.category}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                          {sub.status}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {searchResults.users.length > 0 && (
                  <div>
                    <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Users
                    </span>
                    {searchResults.users.map((usr) => (
                      <button
                        key={usr.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                          navigate(`/admin/users/${usr.id}`);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between text-xs transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <UserCheck className="w-4 h-4 text-slate-600 shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-slate-900 group-hover:text-slate-800 truncate">
                              {usr.full_name}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">{usr.email}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 shrink-0">
                          {usr.role}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Portal Link */}
        <a
          href="https://offscreenhub-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          title="Open Offscreen Hub User Portal"
        >
          <span>User Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Notifications Bell Button */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">No notifications yet.</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={async () => {
                          await dbService.markNotificationRead(n.id);
                          setIsNotifOpen(false);
                          if (n.target_id) navigate(`/admin/submissions/${n.target_id}`);
                        }}
                        className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                          !n.read ? 'bg-amber-50/40' : ''
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            !n.read ? 'bg-amber-500' : 'bg-slate-300'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900">{n.title}</p>
                          <p className="text-[11px] text-slate-600 leading-snug mt-0.5">{n.description}</p>
                          <span className="text-[10px] text-slate-400 block mt-1">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                  <Link
                    to="/admin/notifications"
                    onClick={() => setIsNotifOpen(false)}
                    className="text-xs font-bold text-amber-800 hover:text-amber-900"
                  >
                    View All Notifications →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
          >
            {admin?.avatar ? (
              <img
                src={admin.avatar}
                alt={admin.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-xs"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm border border-amber-300">
                {admin?.name?.charAt(0) || 'A'}
              </div>
            )}
            <span className="hidden md:block font-bold text-xs text-slate-800 max-w-[120px] truncate">
              {admin?.name || 'Admin'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {/* Profile Dropdown Content */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden z-50 p-2 space-y-1"
              >
                <div className="p-3 border-b border-slate-100">
                  <p className="font-bold text-xs text-slate-900">{admin?.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{admin?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] font-bold">
                    {admin?.role}
                  </span>
                </div>

                <Link
                  to="/admin/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-slate-500" /> My Profile
                </Link>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                    navigate('/admin/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
