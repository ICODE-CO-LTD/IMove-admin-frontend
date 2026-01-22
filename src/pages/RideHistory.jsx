import RideTable from '../components/rides/RideTable';

export default function RideHistory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Ride History</h2>
          <p className="text-slate-500 mt-1">View and manage all past and current rides</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Export Report
        </button>
      </div>

      <RideTable />
    </div>
  );
}
