import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  userEmail?: string;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem('demo_user_email');
    if (saved) setUserEmail(saved);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: Boolean(userEmail),
    userEmail,
    login: (email: string) => {
      setUserEmail(email);
      localStorage.setItem('demo_user_email', email);
    },
    logout: () => {
      setUserEmail(undefined);
      localStorage.removeItem('demo_user_email');
    },
  }), [userEmail]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}



