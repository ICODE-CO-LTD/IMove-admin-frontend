import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { Loader2, Search, Filter, Calendar, CreditCard, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export default function PaymentTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState('');
  const [status, setStatus] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['payments', page, search, provider, status],
    queryFn: () => adminService.getPayments({ page, search, provider, status }),
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleProviderFilter = (e) => {
    setProvider(e.target.value);
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

  const { payments, pagination } = data || {};

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transaction ref..."
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
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
           <select 
            className="border border-slate-200 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={provider}
            onChange={handleProviderFilter}
          >
            <option value="">All Providers</option>
            <option value="mtn">MTN MoMo</option>
            <option value="airtel">Airtel Money</option>
            <option value="stripe">Stripe</option>
            <option value="flutterwave">Flutterwave</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Ref ID</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Ride</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments?.map((payment) => (
              <tr key={payment._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">
                  {payment.transaction_reference || '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-0.5">
                    <div className="font-medium text-slate-900">{payment.passenger_id?.full_name}</div>
                    <div className="text-xs text-slate-500">{payment.passenger_id?.email}</div>
                  </div>
                </td>
                 <td className="px-6 py-4">
                   {payment.ride_id ? (
                       <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                           {payment.ride_id._id?.slice(-6).toUpperCase()}
                       </span>
                   ) : '-'}
                </td>
                <td className="px-6 py-4 capitalize">
                   <div className="flex items-center gap-1.5">
                       <CreditCard size={14} className="text-slate-400"/>
                       {payment.provider}
                   </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">
                  {payment.amount?.toLocaleString()} RWF
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${payment.status === 'successful' ? 'bg-green-100 text-green-800' :
                      payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 text-slate-500">
                       <Calendar size={14} />
                       {format(new Date(payment.createdAt), 'MMM d, HH:mm')}
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
