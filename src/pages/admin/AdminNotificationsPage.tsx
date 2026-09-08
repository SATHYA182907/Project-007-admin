import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck } from 'lucide-react';
import { dbService } from '../../services/db';
import type { AdminNotification } from '../../services/types';

export const AdminNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  const fetchNotifs = async () => {
    const list = await dbService.getNotifications();
    setNotifications(list);
  };

  useEffect(() => {
    fetchNotifs();
    const unsub = dbService.subscribe(fetchNotifs);
    return () => unsub();
  }, []);

  const handleMarkAll = async () => {
    await dbService.markAllNotificationsRead();
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Notifications Console</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            System and submission alerts requiring team attention.
          </p>
        </div>

        <button
          onClick={handleMarkAll}
          className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
        >
          <CheckCheck className="w-4 h-4" /> Mark All as Read
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No notifications available.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={async () => {
                await dbService.markNotificationRead(n.id);
              }}
              className={`p-5 flex items-start justify-between gap-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                !n.read ? 'bg-amber-50/40' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-2xl ${!n.read ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.description}</p>
                  <span className="text-[10px] text-slate-400 block mt-2">
                    {new Date(n.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              {n.target_id && (
                <Link
                  to={`/admin/submissions/${n.target_id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 font-bold text-xs shrink-0 hover:bg-amber-100"
                >
                  View Submission
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
