'use client';

import { useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { useAuthModalStore } from '../store';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import Button from '@/components/shared/Button';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const { isOpen, currentView, closeModal } = useAuthModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return (
          <>
            <div className="px-6 py-4 flex items-center">
              <p className="text-3xl font-bold text-gray-800 flex-1 text-center">
                Sign In
              </p>
            </div>
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <LoginForm onForgotPassword={() => useAuthModalStore.getState().openModal('forgotPassword')} />
            </div>
            <div className="px-6 py-4">
              <div className="text-center mt-2">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => useAuthModalStore.getState().openModal('register')}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </>
        );
      case 'register':
        return (
          <>
            <div className="px-6 py-4 flex items-center">
              <p className="text-3xl font-bold text-gray-800 flex-1 text-center">
                Create Account
              </p>
            </div>
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <RegisterForm />
            </div>
            <div className="px-6 py-4">
              <div className="text-center mt-2">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button 
                    onClick={() => useAuthModalStore.getState().openModal('login')}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </>
        );
      case 'forgotPassword':
        return (
          <>
            <div className="px-6 py-4 flex items-center">
              <button 
                onClick={() => useAuthModalStore.getState().openModal('login')}
                className="mr-2 text-gray-500 hover:text-gray-700"
                aria-label="Back"
              >
                <ArrowLeft size={20} />
              </button>
              <p className="text-3xl font-bold text-gray-800 flex-1 text-center">
                Reset Password
              </p>
            </div>
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <ForgotPasswordForm />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl px-2 py-6 md:p-4 w-full max-w-md flex flex-col overflow-hidden shadow-xl relative">
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close"
        >
          <X size={34} />
        </button>
        
        {renderContent()}
      </div>
    </div>
  );
} 