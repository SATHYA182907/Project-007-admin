import React, { useState } from 'react';
import { Bell, Database, Save, Check } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [realtimeSync, setRealtimeSync] = useState(true);
  const [autoArchive, setAutoArchive] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Admin System Settings</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Configure operational defaults, notifications and database sync parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Notification Preferences</span>
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Instant Submission Email Alerts</p>
                <p className="text-slate-500">Receive email notification whenever a new community request is submitted.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded-md focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-600" />
              <span>Database & Real-time Synchronization</span>
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Enable Live EventBus Real-time Sync</p>
                <p className="text-slate-500">Automatically push status changes to active user portal sessions without manual refresh.</p>
              </div>
              <input
                type="checkbox"
                checked={realtimeSync}
                onChange={(e) => setRealtimeSync(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded-md focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <p className="font-bold text-slate-900">Auto-Archive Approved Items</p>
                <p className="text-slate-500">Automatically move approved submissions older than 90 days to archives.</p>
              </div>
              <input
                type="checkbox"
                checked={autoArchive}
                onChange={(e) => setAutoArchive(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded-md focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Settings Saved!' : 'Save System Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
