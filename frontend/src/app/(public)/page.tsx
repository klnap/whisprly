'use client';

import { LoginForm } from '@/modules/auth/components/LoginForm';
import Button from '@/components/shared/Button';
import { useAuthModalStore } from '@/modules/auth/store';
import { toast } from '@/components/shared/Toast';
import { AuthModal } from '@/modules/auth/components/AuthModal';
import { FetchTest } from '@/components/FetchTest';
export default function HomePage() {
  const { openModal } = useAuthModalStore();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      {/* Tło z efektem overlay */}
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-orange-600/30 mix-blend-overlay"></div>
      </div>
      
      {/* Główna zawartość */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            <span className="block mb-2">Whisprly</span>
            <span className="text-4xl md:text-6xl text-gray-800">Your chatting app</span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto">
            Connect, share, and discover through chatting. Whisprly brings people together through the power of chatting online.
          </p>
          
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button 
              className="text-xl py-6 px-12 rounded-full shadow-lg"
              onClick={() => openModal('login')}
            >
              Sign In
            </Button>
          
            <Button 
              variant="outline" 
              className="text-xl bg-white py-6 px-12 rounded-full"
              onClick={() => openModal('register')}
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      <AuthModal onClose={() => {}} />
    </div>
  );
}
