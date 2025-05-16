import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    fullWidth = false, 
    isLoading = false, 
    leftIcon, 
    rightIcon,
    disabled,
    type = 'button',
    ...props 
  }, ref) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors rounded-full relative',
          'text-xl h-14 px-5',
          {
            // Variant styles
            'bg-orange-600 hover:bg-orange-700 text-white': variant === 'primary',
            'bg-gray-200 hover:bg-gray-300 text-gray-800': variant === 'secondary',
            'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800': variant === 'outline',
            'bg-transparent hover:bg-gray-100 text-gray-800': variant === 'ghost',
            'bg-transparent underline-offset-4 hover:underline text-blue-600': variant === 'link',
            
            // Width
            'w-full': fullWidth,
            
            // Disabled state
            'opacity-50 cursor-not-allowed': isDisabled,
          },
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 