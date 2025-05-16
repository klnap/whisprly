'use client';

import { AuthProvider } from '@/modules/auth/AuthProvider';

export default function Provider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
