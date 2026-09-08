import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import type { AuditLog } from '../../services/types';

export const AdminActivityPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await dbService.getAuditLogs();
      setLogs(data);
    };
    fetchLogs();
    const unsub = dbService.subscribe(fetchLogs);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Activity & Audit History</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Auditable timeline tracking administrator status mutations and user actions.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="space-y-4 relative before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-0.5 before:bg-slate-200 pl-9 text-xs">
          {logs.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No activity recorded yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="relative bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60 space-y-1">
                <div className="absolute -left-9 top-4 w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-2xs" />
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{log.action}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Actor: <span className="font-semibold text-slate-900">{log.actor_name}</span> ({log.actor_email})
                </p>
                {log.previous_value && log.new_value && (
                  <p className="text-[11px] text-amber-800 font-medium pt-1">
                    Value Change: <span className="line-through text-slate-400">{log.previous_value}</span> → <span className="font-bold">{log.new_value}</span>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
