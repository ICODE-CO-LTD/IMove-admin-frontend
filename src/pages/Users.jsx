import UserTable from '../components/users/UserTable';
import { useTranslation } from 'react-i18next';

export default function Users() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t('users.title')}</h2>
          <p className="text-slate-500 mt-1">{t('users.subtitle')}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          {t('users.exportCSV')}
        </button>
      </div>

      <UserTable />
    </div>
  );
}
