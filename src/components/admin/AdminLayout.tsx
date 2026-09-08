import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { AdminSidebar } from './AdminSidebar';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout: React.FC<{ pageTitle?: string }> = ({ pageTitle }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans selection:bg-amber-400 selection:text-slate-900 relative overflow-x-hidden">
      {/* Soft Light Atmospheric Ambient Gradient Blobs */}
      <div className="fixed top-[-100px] right-[-100px] w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[700px] h-[700px] bg-indigo-100/40 rounded-full blur-[180px] pointer-events-none" />

      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <AdminNavbar pageTitle={pageTitle} />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};
