'use client'

import { useAuthStore } from './store/auth-store';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export const AuthProvider = ({ user, children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  setUser(user as User);
  
  return <>{children}</>;
};