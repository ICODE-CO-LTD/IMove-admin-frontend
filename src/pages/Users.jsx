import UserTable from '../components/users/UserTable';

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 mt-1">Manage riders, passengers, and admins</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Export CSV
        </button>
      </div>

      <UserTable />
    </div>
  );
}
