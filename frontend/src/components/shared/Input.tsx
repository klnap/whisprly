import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | string[];
  frontendError?: string;
  backendError?: string;
  fullWidth?: boolean;
  showErrorText?: boolean;
  showFrontendErrorText?: boolean;
  showBackendErrorText?: boolean;
  showGenericError?: boolean;
  showErrorBorder?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error,
    frontendError,
    backendError, 
    fullWidth = false,
    showErrorText = true,
    showFrontendErrorText = true,
    showBackendErrorText = true,
    showGenericError = true,
    showErrorBorder = true,
    onFocus,
    onBlur,
    value,
    defaultValue,
    type,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value || !!defaultValue);
    const [showPassword, setShowPassword] = useState(false);
    
    // Określamy który błąd wyświetlić, z uwzględnieniem priorytetów
    let displayedError: string | undefined;
    
    if (backendError && showBackendErrorText) {
      displayedError = backendError;
    } else if (frontendError && showFrontendErrorText) {
      displayedError = frontendError;
    } else if (error && showGenericError) {
      displayedError = Array.isArray(error) ? error[0] : error;
    }
    
    // Niezależnie od tego, czy pokazujemy tekst błędu,
    // ustawiamy czerwoną ramkę jeśli jakikolwiek błąd istnieje i showErrorBorder jest true
    const hasError = showErrorBorder && (!!backendError || !!frontendError || !!error);
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };
    
    const isLabelFloating = isFocused || hasValue;
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const handleContainerClick = () => {
      const inputElement = document.getElementById(props.id || '');
      if (inputElement) {
        inputElement.focus();
      }
    };
    
    const togglePasswordVisibility = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowPassword(!showPassword);
    };

    return (
      <div className={cn('relative', { 'w-full': fullWidth })}>
        <div 
          className="relative cursor-text h-16"
          onClick={handleContainerClick}
        >
          <input
            ref={ref}
            className={cn(
              'block w-full text-xl h-16 px-8 bg-gray-100 border text-gray-900 rounded-full outline-none transition-colors placeholder-transparent',
              {
                'border-gray-300 focus:border-blue-500': !hasError,
                'border-red-500': hasError,
                'pt-7 pb-1.5': isLabelFloating,
                'pr-12': isPassword,
              },
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            defaultValue={defaultValue}
            type={inputType}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          )}
          
          {label && (
            <label
              className={cn(
                'absolute duration-150 transform pointer-events-none',
                {
                  'text-sm top-2 left-8 text-gray-600': isLabelFloating,
                  'text-base top-1/2 -translate-y-1/2 left-6 text-gray-500': !isLabelFloating,
                  'text-red-500': hasError,
                }
              )}
              htmlFor={props.id}
            >
              {label}
            </label>
          )}
        </div>
        <div className="h-[16px] mt-1.5">
          {/* Pokaż komunikat błędu tylko jeśli showErrorText jest true */}
          {showErrorText && displayedError && (
            <p className="text-sm ml-8 text-red-500">
              {displayedError}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;