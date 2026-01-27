import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        
        if (isExpired) {
          logout();
        } else {
          setUser(storedUser ? JSON.parse(storedUser) : decoded);
        }
      } catch (error) {
        console.error("Invalid session", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { tokens, user } = response.data;
    
    if (tokens && tokens.access_token) {
      localStorage.setItem('token', tokens.access_token);
      localStorage.setItem('refreshToken', tokens.refresh_token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    }
    throw new Error('Invalid login response');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
