'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react';
import { LogoutButton } from '@/modules/auth/components/LogoutButton';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import type { User } from '../types';

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  if (!user) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const displayName = user.name || user.email?.split('@')[0] || 'User';
  const firstLetter = displayName.charAt(0).toUpperCase();
  
  const handleCloseMenu = () => setIsOpen(false);
  
  return (
    <div className="absolute top-6 right-10 z-50 group/menu" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 pl-4 transition-all rounded-full",
          isOpen ? "bg-white " : "hover:bg-white"
        )}
      >
        <ChevronDown className={cn(
          "w-8 h-8 text-gray-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />

        <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center">
          <span className="text-2xl text-blue-50">{firstLetter}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute mt-2 right-2 w-72 bg-white rounded-2xl shadow-2xl px-2 space-y-2 z-50">
          <div className="px-6 py-4 border-b border-blue-50">
            <p className="text-xl font-medium text-gray-900">{displayName}</p>
            <p className="text-base text-gray-500 mt-1 truncate">{user.email}</p>
          </div>
          
          <Link
            href={routes.urls.profile}
            className="block px-6 py-4 text-lg text-gray-700 rounded-full hover:bg-blue-50"
            onClick={handleCloseMenu}
          >
            <div className="flex items-center">
              <UserIcon className="w-6 h-6 mr-5" />
              <span>Profile</span>
            </div>
          </Link>
          
          <Link
            href={routes.urls.settings}
            className="block px-6 py-4 text-lg text-gray-700 rounded-full hover:bg-blue-50"
            onClick={handleCloseMenu}
          >
            <div className="flex items-center">
              <Settings className="w-6 h-6 mr-5" />
              <span>Settings</span>
            </div>
          </Link>
          
          <div className="py-2 border-t border-blue-50">
            <LogoutButton
              className="flex px-6 w-full py-4 text-lg text-red-500 rounded-full hover:bg-red-50"
            >
              <div className="flex items-center">
                <LogOut className="w-6 h-6 mr-5" />
                <span>Logout</span>
              </div>
            </LogoutButton>
          </div>
        </div>
      )}
    </div>
  );
} 