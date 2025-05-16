'use client';

import React, { useState } from 'react';
import { User } from '@/modules/auth/types';
import Button from '@/components/shared/Button';
import ResetPasswordButton from './ResetPasswordButton';

interface ProfileContentProps {
  user: User;
}

export default function ProfileContent({ user }: ProfileContentProps) {


  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg">
      {/* Lewa kolumna z gradientem */}
      <div className="bg-gradient-to-b from-orange-400 to-orange-600 md:w-1/3 p-8 flex flex-col items-center text-center text-white">
        <div className="w-32 h-32 rounded-full bg-sky-100 border-4 border-white flex items-center justify-center overflow-hidden mb-4">
          <span className="text-5xl font-bold text-orange-400">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
        </div>
        
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-white text-opacity-80 mb-8">Użytkownik</p>
        
        <div className="mt-auto w-full">
          <ResetPasswordButton />
          
        </div>
      </div>
      
      {/* Prawa kolumna z informacjami */}
      <div className="bg-white md:w-2/3 p-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">Informacje</h3>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h4 className="text-gray-500 font-medium mb-1">Email</h4>
              <p className="text-gray-700">{user.email}</p>
            </div>
            
            <div className="md:w-1/2">
              <h4 className="text-gray-500 font-medium mb-1">Data rejestracji</h4>
              <p className="text-gray-700">{new Date(user.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 