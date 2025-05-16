import React from 'react';
import UserMenu from '@/modules/auth/components/UserMenu';
import Footer from '@/components/shared/Footer';
import { AuthProvider } from '@/modules/auth/AuthProvider';
import { verifySession } from '@/modules/auth/actions';

export const metadata = {
  title: {
    template: '%s | Whisprly',
    default: 'Whisprly',
  },
  description: 'Connect and share with Whisprly',
};

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifySession();
  const isEmailVerified = user?.email_verified_at !== null;

  return (
    <AuthProvider user={user}>
      <div className="flex flex-col min-h-screen">
        {isEmailVerified && (
          <div className="relative">
            <UserMenu user={user} />
          </div>
        )}
        <main className="flex-grow flex items-center justify-center py-26 bg-gradient-to-r from-blue-50 to-indigo-50">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
