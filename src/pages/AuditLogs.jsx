import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import { Loader2, FileText, Bell, AlertTriangle, Shield } from 'lucide-react';
import { format } from 'date-fns';

export default function AuditLogs() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['logs', page, type],
    queryFn: () => adminService.getLogs({ page, type }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const { logs, pagination } = data || {};

  const getIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="text-red-500" size={18} />;
      case 'system': return <Shield className="text-blue-500" size={18} />;
      default: return <Bell className="text-slate-500" size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Audit Logs</h2>
          <p className="text-slate-500 mt-1">System activities and important alerts</p>
        </div>
        <div>
            <select 
                className="border border-slate-200 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={type}
                onChange={(e) => { setType(e.target.value); setPage(1); }}
            >
                <option value="">All Types</option>
                <option value="system">System</option>
                <option value="alert">Alerts</option>
            </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {logs?.map((log) => (
            <div key={log._id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
              <div className="p-2 bg-slate-100 rounded-lg">
                {getIcon(log.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                   <h3 className="text-sm font-semibold text-slate-900">{log.title}</h3>
                   <span className="text-xs text-slate-500 whitespace-nowrap">
                       {format(new Date(log.createdAt), 'MMM d, HH:mm:ss')}
                   </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{log.message}</p>
                {log.user_id && (
                     <p className="text-xs text-slate-400 mt-2">
                        Target User: {log.user_id.full_name || 'Associated User'}
                     </p>
                )}
                 {log.data && Object.keys(log.data).length > 0 && (
                     <div className="mt-2 bg-slate-50 p-2 rounded text-xs font-mono text-slate-500 overflow-x-auto">
                         {JSON.stringify(log.data)}
                     </div>
                 )}
              </div>
            </div>
          ))}

          {logs?.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                  No logs found.
              </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
           <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 border border-slate-200 rounded-md text-sm disabled:opacity-50 hover:bg-white"
            >
            Previous
            </button>
            <span className="text-sm text-slate-500">
            Page {pagination?.page} of {pagination?.pages}
            </span>
            <button
            disabled={page >= (pagination?.pages || 1)}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 border border-slate-200 rounded-md text-sm disabled:opacity-50 hover:bg-white"
            >
            Next
            </button>
        </div>
      </div>
    </div>
  );
}
