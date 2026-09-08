import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';
import type { AdminUser } from '../services/types';

interface AuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = authService.getAdminSession();
    setAdmin(session);
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const result = await authService.login(email, pass);
    if (result.success && result.admin) {
      setAdmin(result.admin);
      return { success: true };
    }
    return { success: false, error: result.error || 'Authentication failed' };
  };

  const logout = () => {
    authService.logout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
