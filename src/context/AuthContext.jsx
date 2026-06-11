import React, { createContext, useContext, useState } from 'react';
import { login as loginApi, adminLogin as adminLoginApi } from '../api/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  // Customer login (email + password)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await loginApi({ email, password });
      setUser({ id: data.id, name: data.name, email: data.email, role: data.role });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role }));
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Admin login (secret key only)
  const adminLogin = async (secretKey) => {
    setLoading(true);
    try {
      const { data } = await adminLoginApi({ secretKey });
      setUser({ id: data.id, name: data.name, email: data.email, role: data.role });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.role }));
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, adminLogin, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
