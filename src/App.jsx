import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import LiveMap from './pages/LiveMap';
import RideHistory from './pages/RideHistory';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import AuditLogs from './pages/AuditLogs';
import LandingPage from './pages/LandingPage';
import Layout from './components/layout/Layout';

// Placeholder pages for routes not yet implemented
const Placeholder = ({ title }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    <p className="text-slate-500 mt-2">Coming soon...</p>
  </div>
);

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<LiveMap />} />
          <Route path="/users" element={<Users />} />
          <Route path="/history" element={<RideHistory />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/config" element={<Settings />} />
          <Route path="/logs" element={<AuditLogs />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
