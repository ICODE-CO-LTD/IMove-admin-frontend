import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { Loader2, Search, Filter, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function RideTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(''); // Rider or Passenger name
  const [status, setStatus] = useState('');
  
  const { data, isLoading } = useQuery({
    queryKey: ['rides', page, search, status],
    queryFn: () => adminService.getRides({ page, search, status }),
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const { rides, pagination } = data || {};

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search rider or passenger..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="text-slate-400 w-4 h-4" />
          <select 
            className="border border-slate-200 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={handleStatusFilter}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Ride ID</th>
              <th className="px-6 py-4">Passenger & Rider</th>
              <th className="px-6 py-4">Route</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Fare</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rides?.map((ride) => (
              <tr key={ride._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-slate-400">
                  {ride._id.slice(-6).toUpperCase()}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <span className="text-xs bg-blue-100 text-blue-700 px-1.5 rounded">P</span>
                       <span className="font-medium text-slate-900">{ride.passenger_id?.full_name || 'Unknown'}</span>
                    </div>
                    {ride.rider_id && (
                        <div className="flex items-center gap-2">
                           <span className="text-xs bg-orange-100 text-orange-700 px-1.5 rounded">R</span>
                           <span className="text-slate-500">{ride.rider_id?.full_name}</span>
                        </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1 text-slate-500 truncate max-w-[150px]" title={ride.pickup_address}>
                          <MapPin size={12} className="text-green-500 shrink-0" />
                          <span className="truncate">{ride.pickup_address || 'Pickup'}</span>
                      </div>
                      <div className="pl-0.5"><ArrowRight size={10} className="rotate-90 text-slate-300" /></div>
                      <div className="flex items-center gap-1 text-slate-500 truncate max-w-[150px]" title={ride.dropoff_address}>
                          <MapPin size={12} className="text-red-500 shrink-0" />
                          <span className="truncate">{ride.dropoff_address || 'Dropoff'}</span>
                      </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${ride.status === 'completed' ? 'bg-green-100 text-green-800' :
                      ride.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      ride.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {ride.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {ride.estimated_fare?.toLocaleString()} RWF
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 text-slate-500">
                       <Calendar size={14} />
                       {format(new Date(ride.createdAt), 'MMM d, HH:mm')}
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border border-slate-200 rounded-md text-sm disabled:opacity-50 hover:bg-slate-50"
        >
          Previous
        </button>
        <span className="text-sm text-slate-500">
          Page {pagination?.page} of {pagination?.pages}
        </span>
        <button
          disabled={page >= (pagination?.pages || 1)}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border border-slate-200 rounded-md text-sm disabled:opacity-50 hover:bg-slate-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
