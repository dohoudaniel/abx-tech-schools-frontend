import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginApi, setTokens, clearTokens, getAccessToken, getRefreshToken } from './api';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  role: 'teacher' | 'student' | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: 'teacher' | 'student') => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'teacher' | 'student' | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    const savedRole = localStorage.getItem('abx_role') as 'teacher' | 'student' | null;
    if (token) {
      setAccessToken(token);
      setRole(savedRole);
      // Decode JWT payload for basic user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.user_id, email: payload.email || '' });
      } catch {
        // Token invalid
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await loginApi(email, password);
    setTokens(data.access, data.refresh);
    setAccessToken(data.access);
    try {
      const payload = JSON.parse(atob(data.access.split('.')[1]));
      setUser({ id: payload.user_id, email: payload.email || email });
    } catch {
      setUser({ id: 0, email });
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    localStorage.removeItem('abx_role');
    setUser(null);
    setRole(null);
    setAccessToken(null);
  }, []);

  const handleSetRole = useCallback((r: 'teacher' | 'student') => {
    setRole(r);
    localStorage.setItem('abx_role', r);
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
      setRole: handleSetRole,
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
