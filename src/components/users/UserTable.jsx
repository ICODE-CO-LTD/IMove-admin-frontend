import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { Loader2, Search, Filter, MoreVertical, Eye, Ban, CheckCircle, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import AddUserModal from './AddUserModal';
import { useTranslation } from 'react-i18next';

export default function UserTable() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [role, setRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const queryClient = useQueryClient();
  const itemsPerPage = 8;

  const deleteMutation = useMutation({
    mutationFn: adminService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  const handleDelete = (userId) => {
    if (window.confirm(t('common.confirmDelete'))) {
      deleteMutation.mutate(userId);
    }
  };

  const { data: allData, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => adminService.getUsers({ limit: 1000 }), // Fetch a large amount to simulate all
  });

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleRoleFilter = (e) => {
    setRole(e.target.value);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const allUsers = allData?.users || [];

  // Client-side filtering
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = !searchInput || 
      user.full_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase());
    const matchesRole = !role || user.role === role;
    return matchesSearch && matchesRole;
  });

  // Client-side pagination
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const users = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder={t('common.search')}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="text-slate-400 w-4 h-4" />
          <select 
            className="border border-slate-200 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={handleRoleFilter}
          >
            <option value="">{t('users.allRoles')}</option>
            <option value="passenger">{t('users.passenger')}</option>
            <option value="rider">{t('users.rider')}</option>
            <option value="admin">{t('users.admin')}</option>
          </select>
          <button 
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            {t('users.addUser')}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">{t('common.name')}</th>
              <th className="px-6 py-4">{t('common.role')}</th>
              <th className="px-6 py-4">{t('common.status')}</th>
              <th className="px-6 py-4">{t('users.verification')}</th>
              <th className="px-6 py-4">{t('users.joined')}</th>
              <th className="px-6 py-4 text-right">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                      {user.full_name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{user.full_name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'rider' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                    {t(`users.${user.role}`)}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${user.suspension?.is_suspended ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {user.suspension?.is_suspended ? t('users.suspended') : t('users.active')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.role === 'rider' ? (
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${user.approval_status === 'approved' ? 'bg-green-100 text-green-800' :
                        user.approval_status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                      {t(`users.${user.approval_status}`)}
                    </span>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {format(new Date(user.createdAt), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(user._id)}
                    className="text-slate-400 hover:text-red-600 p-2 transition-colors"
                    title={t('common.delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
          {t('common.previous')}
        </button>
        <span className="text-sm text-slate-500">
          {t('common.page')} {page} {t('common.of')} {totalPages || 1}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border border-slate-200 rounded-md text-sm disabled:opacity-50 hover:bg-slate-50"
        >
          {t('common.next')}
        </button>
      </div>
    </div>
    <AddUserModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />
    </>
  );
}
