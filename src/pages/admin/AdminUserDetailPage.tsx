import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
import { dbService } from '../../services/db';
import type { UserProfile, Submission } from '../../services/types';

export const AdminUserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      setIsLoading(true);
      const usr = await dbService.getUserById(id);
      const allSubs = await dbService.getSubmissions();

      if (usr) {
        setUser(usr);
        const userSubs = allSubs.filter(
          (s) => s.user_id === id || s.email.toLowerCase() === usr.email.toLowerCase()
        );
        setUserSubmissions(userSubs);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs text-slate-500">Loading user profile...</div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200">
        <h2 className="text-xl font-serif font-bold text-slate-800">User Not Found</h2>
        <Link to="/admin/users" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-white font-bold text-xs">
          <ArrowLeft className="w-4 h-4" /> Return to Directory
        </Link>
      </div>
    );
  }

  const approvedCount = userSubmissions.filter((s) => s.status === 'Approved').length;
  const pendingCount = userSubmissions.filter((s) => s.status === 'Pending' || s.status === 'Under Review').length;
  const rejectedCount = userSubmissions.filter((s) => s.status === 'Rejected').length;

  return (
    <div className="space-y-6 pb-12">
      <button
        onClick={() => navigate('/admin/users')}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Users Directory
      </button>

      {/* User Header Profile Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-md shrink-0">
          {user.full_name.charAt(0)}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900">{user.full_name}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
              {user.role}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-amber-600" /> {user.email}</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-600" /> {user.phone}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-600" /> Joined {new Date(user.joined_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Real User Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Submissions</span>
          <p className="text-2xl font-serif font-bold text-slate-900">{userSubmissions.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Approved</span>
          <p className="text-2xl font-serif font-bold text-emerald-800">{approvedCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Pending / Review</span>
          <p className="text-2xl font-serif font-bold text-blue-800">{pendingCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200/70">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Rejected</span>
          <p className="text-2xl font-serif font-bold text-rose-800">{rejectedCount}</p>
        </div>
      </div>

      {/* User Submission History Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          User Submission History
        </h3>

        {userSubmissions.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No submissions recorded for this user yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Submitted Date</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="py-3 px-2 font-mono font-bold text-slate-900">{sub.id}</td>
                    <td className="py-3 px-2 font-bold text-slate-800">{sub.category}</td>
                    <td className="py-3 px-2 text-slate-500">{new Date(sub.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link to={`/admin/submissions/${sub.id}`} className="px-3 py-1 rounded-lg bg-amber-50 text-amber-800 font-bold text-[11px]">
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
