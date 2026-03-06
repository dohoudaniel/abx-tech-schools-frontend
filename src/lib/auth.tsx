import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginApi, setTokens, clearTokens, getAccessToken, getRefreshToken } from './api';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  role: 'teacher' | 'student' | 'admin' | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'teacher' | 'student' | 'admin' | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
      // Load user and role from localStorage if available, fallback to basic JWT payload
      const savedUser = localStorage.getItem('abx_user');
      const savedRole = localStorage.getItem('abx_role') as any;

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          if (savedRole) setRole(savedRole);
        } catch {
          // Fallback if JSON is malformed
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ id: payload.user_id, email: payload.email || '' });
        }
      } else {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ id: payload.user_id, email: payload.email || '' });
        } catch { /* Invalid token */ }
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await loginApi(email, password);
    setTokens(data.access, data.refresh);
    setAccessToken(data.access);

    if (data.user) {
      setUser(data.user);
      setRole(data.user.role);
      localStorage.setItem('abx_user', JSON.stringify(data.user));
      localStorage.setItem('abx_role', data.user.role);
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    localStorage.removeItem('abx_user');
    localStorage.removeItem('abx_role');
    setUser(null);
    setRole(null);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      role,
      accessToken,
      isAuthenticated: !!accessToken,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
