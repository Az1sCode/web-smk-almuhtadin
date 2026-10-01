import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const DEFAULT_USERS: (AdminUser & { passwordHash: string })[] = [
  {
    id: 1,
    name: 'Super Administrator',
    email: 'admin@smkalmuhtadin.sch.id',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    lastLogin: 'Baru saja',
    passwordHash: 'admin123'
  },
  {
    id: 2,
    name: 'Staff Humas & Konten',
    email: 'editor@smkalmuhtadin.sch.id',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    lastLogin: 'Kemarin, 14:20 WIB',
    passwordHash: 'editor123'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('smk_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulasi delay autentikasi network
    await new Promise((res) => setTimeout(res, 350));

    const matchedUser = DEFAULT_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.passwordHash === password
    );

    if (matchedUser) {
      const { passwordHash: _, ...safeUser } = matchedUser;
      const updatedUser: AdminUser = {
        ...safeUser,
        lastLogin: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) + ' WIB'
      };

      setUser(updatedUser);
      localStorage.setItem('smk_admin_user', JSON.stringify(updatedUser));
      localStorage.setItem('admin_auth', 'true');
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Kombinasi email atau kata sandi tidak valid. Cek kembali kredensial Anda.' 
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smk_admin_user');
    localStorage.removeItem('admin_auth');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
