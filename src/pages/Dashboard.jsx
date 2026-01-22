import { useQuery } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import { Users, Car, DollarSign, Activity, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: adminService.getDashboardStats,
  });

  if (isLoading) {
      return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin" /></div>
  }

  const { stats } = data || {};

  const statCards = [
    { 
      label: 'Total Users', 
      value: stats?.users?.totalPassengers + stats?.users?.totalRiders || 0,
      subtext: `${stats?.users?.totalRiders || 0} Riders`, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      label: 'Active Rides', 
      value: stats?.rides?.today || 0, 
      subtext: `Total: ${stats?.rides?.total || 0}`, 
      icon: Car, 
      color: 'text-purple-600', 
      bg: 'bg-purple-100' 
    },
    { 
      label: 'Revenue (Total)', 
      value: `${(stats?.earnings?.total || 0).toLocaleString()} RWF`, 
      subtext: `Admin: ${(stats?.earnings?.adminRevenue || 0).toLocaleString()} RWF`, 
      icon: DollarSign, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
    { 
      label: 'Active Riders', 
      value: stats?.users?.activeRiders || 0, 
      subtext: 'Online now', 
      icon: Activity, 
      color: 'text-orange-600', 
      bg: 'bg-orange-100' 
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium flex items-center gap-1">
               <ArrowUpRight size={12} className="text-green-500" />
               {stat.subtext}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96 flex items-center justify-center text-slate-400">
          Chart Placeholder 1
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96 flex items-center justify-center text-slate-400">
          Chart Placeholder 2
        </div>
      </div>
    </div>
  );
}
