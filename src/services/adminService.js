import api from './api';

export const adminService = {
  // User Management
  getUsers: async (params) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },
  
  getUserDetails: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },
  
  updateUserStatus: async (userId, action, reason) => {
    const response = await api.put(`/admin/users/${userId}`, { action, reason });
    return response.data;
  },

  // Ride Management
  getRides: async (params) => {
    const response = await api.get('/admin/rides', { params });
    return response.data;
  },

  // Live Map
  getLiveMapData: async () => {
    const response = await api.get('/admin/map/live');
    return response.data;
  },

  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  
  // Payments
  getPayments: async (params) => {
    const response = await api.get('/admin/payments', { params });
    return response.data;
  },

  // Settings
  getSettings: async () => {
    const response = await api.get('/admin/settings');
    return response.data;
  },

  updateSettings: async (data) => {
    const response = await api.put('/admin/settings', data);
    return response.data;
  },

  // Audit Logs
  getLogs: async (params) => {
    const response = await api.get('/admin/logs', { params });
    return response.data;
  }
};
