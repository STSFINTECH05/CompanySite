import React from 'react';
import { Bell, CheckCheck, Clock, ArrowUpRight, ShieldCheck, DollarSign, FileSpreadsheet, X } from 'lucide-react';

export default function NotificationDropdown({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkAllAsRead, 
  onDismiss 
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#0f1714] border border-emerald-500/25 rounded-2xl shadow-2xl shadow-emerald-950/60 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-900/30 bg-[#131f1a]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Live Notifications</h3>
            <p className="text-[11px] text-slate-400">
              {notifications.filter(n => !n.read).length} unread updates
            </p>
          </div>
        </div>
        <button
          onClick={onMarkAllAsRead}
          className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors px-2 py-1 rounded hover:bg-emerald-500/10"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-emerald-900/20">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Bell className="w-6 h-6 mx-auto mb-2 opacity-40 text-emerald-400" />
            <p className="text-xs">All caught up! No active notifications.</p>
          </div>
        ) : (
          notifications.map((item) => {
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3.5 transition-colors relative group ${
                  item.read ? 'bg-transparent opacity-75' : 'bg-[#15231c]/60'
                } hover:bg-[#182921]`}
              >
                {/* Indicator dot */}
                {!item.read && (
                  <span className="absolute left-2 top-4 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}

                <div className="ml-1 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0 mt-0.5">
                  {item.type === 'report' && <FileSpreadsheet className="w-4 h-4" />}
                  {item.type === 'split' && <DollarSign className="w-4 h-4" />}
                  {item.type === 'security' && <ShieldCheck className="w-4 h-4" />}
                  {item.type === 'reminder' && <Clock className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold ${item.read ? 'text-slate-300' : 'text-slate-100'}`}>
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {/* Dismiss button */}
                <button
                  onClick={() => onDismiss(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-200 p-1"
                  title="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-[#0a0f0d] border-t border-emerald-900/30 text-center">
        <a 
          href="#features" 
          onClick={onClose}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
        >
          <span>View financial activity log</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
