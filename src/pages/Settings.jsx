import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import { Loader2, Save, RefreshCw } from 'lucide-react';

export default function Settings() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    base_fare: '',
    per_km_rate: '',
    service_fee_percent: '',
    cancellation_fee: '',
    currency: 'RWF', // Default to RWF for now
  });

  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: adminService.getSettings,
  });

  useEffect(() => {
    if (data?.settings) {
      setFormData({
        base_fare: data.settings.base_fare,
        per_km_rate: data.settings.per_km_rate,
        service_fee_percent: data.settings.service_fee_percent,
        cancellation_fee: data.settings.cancellation_fee,
        currency: data.settings.currency || 'RWF',
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: adminService.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      alert('Settings updated successfully!');
    },
    onError: (error) => {
      alert(`Failed to update settings: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
       [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Configuration</h2>
          <p className="text-slate-500 mt-1">Manage global app settings and pricing</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Base Fare ({formData.currency})
              </label>
              <input
                type="number"
                name="base_fare"
                value={formData.base_fare}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-slate-400 mt-1">Starting price for every ride</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price per KM ({formData.currency})
              </label>
              <input
                type="number"
                name="per_km_rate"
                value={formData.per_km_rate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-slate-400 mt-1">Charge per kilometer distance</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Service Fee (%)
              </label>
              <input
                type="number"
                name="service_fee_percent"
                value={formData.service_fee_percent}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                max="100"
              />
               <p className="text-xs text-slate-400 mt-1">Percentage taken by platform</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Cancellation Fee ({formData.currency})
              </label>
              <input
                type="number"
                name="cancellation_fee"
                value={formData.cancellation_fee}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
               <p className="text-xs text-slate-400 mt-1">Fee for cancelling after acceptance</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
