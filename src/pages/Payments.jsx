import PaymentTable from '../components/payments/PaymentTable';
import { useTranslation } from 'react-i18next';

export default function Payments() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t('payments.title')}</h2>
          <p className="text-slate-500 mt-1">{t('payments.subtitle')}</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            {t('payments.reconcile')}
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            {t('payments.exportReport')}
            </button>
        </div>
      </div>

      <PaymentTable />
    </div>
  );
}
