'use client';

import { ReactNode, useState } from 'react';
import { logout } from '@/modules/auth/services';
import { Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';  
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
  className?: string;
  children?: ReactNode;
}

export function LogoutButton({ className, children }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      router.push('/');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(className)}
      disabled={isLoading}
    >
      {children ? (
        <div className="flex items-center">
          {isLoading ? (
            <Loader2 className="w-6 h-6 mr-5 animate-spin" />
          ) : (
            <LogOut className="w-6 h-6 mr-5" />
          )}
          <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
        </div>
      ) : (
        isLoading ? 'Logging out...' : 'Logout'
      )}
    </button>
  );
} 