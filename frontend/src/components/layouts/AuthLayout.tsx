import React from 'react';
import UserMenu from '@/modules/auth/components/UserMenu';
import Footer from '@/components/shared/Footer';
import { AuthProvider } from '@/modules/auth/AuthProvider';
import type { User } from '@/modules/auth/types';

interface AuthLayoutProps {
  user: User | null;
  children: React.ReactNode;
}

export default function AuthLayout({ user, children }: AuthLayoutProps) {

    const isEmailVerified = user?.email_verified_at !== null;
  return (
    <AuthProvider user={user}>
      <div className="flex flex-col min-h-screen bg-white">
        <header className="relative">
            {isEmailVerified && <UserMenu user={user} />}
        </header>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
