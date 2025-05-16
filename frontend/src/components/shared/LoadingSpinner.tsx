'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number;
  containerClassName?: string;
  spinnerClassName?: string;
}

export function LoadingSpinner({ 
  size = 24, 
  containerClassName = '',
  spinnerClassName = ''
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center', containerClassName)}>
      <Loader2 
        className={cn('animate-spin text-orange-600', spinnerClassName)}
        size={size}
      />
    </div>
  );
} 