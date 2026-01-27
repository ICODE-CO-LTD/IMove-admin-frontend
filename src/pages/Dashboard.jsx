import { useQuery } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import { Users, Car, DollarSign, Activity, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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
                <p className="text-xl font-bold text-slate-900 mt-1 truncate max-w-[150px]" title={String(stat.value)}>{stat.value}</p>
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats?.chartData?.revenue || []}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(value) => `${value/1000}k`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`${value.toLocaleString()} RWF`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Ride Activity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats?.chartData?.rides || []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#F1F5F9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="rides" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
