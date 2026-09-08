import React from 'react';
import { ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const AdminProfilePage: React.FC = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Administrator Profile</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Authenticated credentials and security settings.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 max-w-2xl">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          {admin?.avatar ? (
            <img
              src={admin.avatar}
              alt={admin.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-900 font-serif font-bold text-2xl flex items-center justify-center border border-amber-300">
              {admin?.name?.charAt(0) || 'A'}
            </div>
          )}

          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">{admin?.name}</h2>
            <p className="text-xs text-slate-500 font-medium">{admin?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] uppercase tracking-wider">
              {admin?.role}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-500">Admin Account ID:</span>
            <span className="font-mono font-bold text-slate-900">{admin?.id}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-500">Security Clearance:</span>
            <span className="font-bold text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Full Operational Control
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-500">Created At:</span>
            <span className="font-semibold text-slate-800">{new Date(admin?.created_at || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out of Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
};
