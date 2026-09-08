import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Activity,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { dbService } from '../../services/db';
import logoImg from '../../assets/logo/offscreen_logo.jpg';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      const notifs = await dbService.getNotifications();
      setUnreadCount(notifs.filter((n) => !n.read).length);
    };

    fetchUnread();
    const unsubscribe = dbService.subscribe(fetchUnread);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Submissions', path: '/admin/submissions', icon: ClipboardList },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Activity', path: '/admin/activity', icon: Activity },
    {
      label: 'Notifications',
      path: '/admin/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 rounded-xl bg-white/90 shadow-md border border-slate-200 text-slate-700 hover:text-amber-600 focus:outline-none"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Collapsible Sidebar */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40 bg-white border-r border-slate-200 shadow-xs text-slate-700"
      >
        {/* Header / Brand */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/60 shadow-sm shrink-0">
              <img src={logoImg} alt="Offscreen Hub" className="w-full h-full object-cover" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                <div className="flex items-center gap-1">
                  <h1 className="font-serif font-bold text-sm tracking-wider text-slate-900 uppercase">
                    OFFSCREEN HUB
                  </h1>
                </div>
                <span className="text-[11px] font-medium text-amber-700 tracking-wide block">
                  Admin Portal
                </span>
              </motion.div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent text-amber-800 border-l-4 border-amber-600 shadow-sm font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <div className="relative shrink-0">
                  <Icon className="w-5 h-5" />
                  {item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Profile & Logout */}
        <div className="p-3 border-t border-slate-100 space-y-1 bg-slate-50/50">
          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isActive ? 'bg-amber-100/60 text-amber-900' : 'text-slate-700 hover:bg-white'
              }`
            }
          >
            {admin?.avatar ? (
              <img
                src={admin.avatar}
                alt={admin.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-400 shrink-0"
              />
            ) : (
              <UserCircle className="w-8 h-8 text-amber-600 shrink-0" />
            )}
            {!isCollapsed && (
              <div className="truncate text-left">
                <p className="font-bold text-xs text-slate-900 truncate">{admin?.name || 'Admin User'}</p>
                <p className="text-[10px] text-slate-500 truncate">{admin?.role || 'Super Admin'}</p>
              </div>
            )}
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 z-50 bg-white shadow-2xl flex flex-col"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={logoImg} alt="Offscreen Hub" className="w-9 h-9 rounded-lg object-cover border border-amber-400" />
                  <div>
                    <h2 className="font-serif font-bold text-xs tracking-wider text-slate-900 uppercase">OFFSCREEN HUB</h2>
                    <span className="text-[10px] font-semibold text-amber-700">Admin Operations</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-amber-500/10 text-amber-900 font-bold border-l-4 border-amber-600'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
                  {admin?.avatar ? (
                    <img src={admin.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-amber-400" />
                  ) : (
                    <UserCircle className="w-9 h-9 text-amber-600" />
                  )}
                  <div className="truncate">
                    <p className="font-bold text-xs text-slate-900 truncate">{admin?.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{admin?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-50 text-rose-700 font-semibold text-xs"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
