import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { dbService } from '../../services/db';
import type { UserProfile } from '../../services/types';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const fetchUsers = async () => {
    const data = await dbService.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
    const unsub = dbService.subscribe(fetchUsers);
    return () => unsub();
  }, []);

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return (
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">User Management Directory</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          View registered community members, parents, volunteers and organizational partners.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-60">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="Parent">Parent</option>
            <option value="Volunteer">Volunteer</option>
            <option value="School / Partner">School / Partner</option>
            <option value="Brand / Sponsor">Brand / Sponsor</option>
            <option value="Community Member">Community Member</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">User ID</th>
                <th className="py-3.5 px-3">Name</th>
                <th className="py-3.5 px-3">Contact</th>
                <th className="py-3.5 px-3">Role</th>
                <th className="py-3.5 px-3">Submissions</th>
                <th className="py-3.5 px-3">Joined Date</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-slate-400">
                    No users found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">{usr.id}</td>
                    <td className="py-4 px-3 font-bold text-slate-900">{usr.full_name}</td>
                    <td className="py-4 px-3">
                      <p className="text-slate-700 font-medium">{usr.email}</p>
                      <p className="text-[10px] text-slate-400">{usr.phone}</p>
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                        {usr.role}
                      </span>
                    </td>
                    <td className="py-4 px-3 font-bold text-slate-900">{usr.submission_count}</td>
                    <td className="py-4 px-3 text-slate-500">
                      {new Date(usr.joined_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {usr.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to={`/admin/users/${usr.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-colors"
                      >
                        View User
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
