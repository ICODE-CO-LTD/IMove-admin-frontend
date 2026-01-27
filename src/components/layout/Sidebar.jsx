import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Map, Clock, CreditCard, Settings, FileText, LogOut, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  const navItems = [
    { icon: LayoutDashboard, label: t('sidebar.dashboard'), path: '/dashboard' },
    { icon: Map, label: t('sidebar.liveMap'), path: '/map' },
    { icon: Users, label: t('sidebar.users'), path: '/users' },
    { icon: Clock, label: t('sidebar.rides'), path: '/history' },
    { icon: CreditCard, label: t('sidebar.payments'), path: '/payments' },
    { icon: Settings, label: t('sidebar.settings'), path: '/config' },
    { icon: FileText, label: t('sidebar.auditLogs'), path: '/logs' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          IMove Admin
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="px-4 py-2 bg-slate-800 rounded-lg flex items-center gap-3">
          <Globe size={16} className="text-slate-400" />
          <select 
            value={i18n.language} 
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-transparent text-sm text-white focus:outline-none w-full cursor-pointer uppercase font-medium"
          >
            <option value="rw" className="text-slate-900">Kinyarwanda (RW)</option>
            <option value="en" className="text-slate-900">English (EN)</option>
            <option value="sw" className="text-slate-900">Kiswahili (SW)</option>
            <option value="fr" className="text-slate-900">Français (FR)</option>
          </select>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">{t('sidebar.logout')}</span>
        </button>
      </div>
    </aside>
  );
}
