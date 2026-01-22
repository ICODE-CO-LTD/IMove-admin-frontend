import PaymentTable from '../components/payments/PaymentTable';

export default function Payments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Payment Monitoring</h2>
          <p className="text-slate-500 mt-1">Track all transactions, revenue, and payment statuses</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Reconcile
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Export Report
            </button>
        </div>
      </div>

      <PaymentTable />
    </div>
  );
}
