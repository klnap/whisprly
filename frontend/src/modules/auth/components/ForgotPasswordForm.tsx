'use client';

import React, { useState } from 'react';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
 
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Symulacja sukcesu
      setIsSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error instanceof Error ? error.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <p className="mb-6 text-gray-600">
          We've sent a password reset link to <span className="font-medium text-orange-600">{email}</span>.
          Please check your inbox and follow the instructions to reset your password.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-gray-600">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>
        </div>
      </form>
    </div>
  );
} 