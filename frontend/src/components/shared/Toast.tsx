'use client';

import { toast as sonnerToast } from 'sonner';
import { CheckIcon, XIcon, AlertTriangleIcon } from 'lucide-react';

export interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  variant?: 'default' | 'success' | 'error';
  button?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Custom Toast component that provides a consistent and stylized toast notification
 */
export function Toast(props: ToastProps) {
  const { title, description, button, id, variant = 'default' } = props;

  return (
    <div className={`flex w-full  items-center rounded-lg bg-white p-6`}>
   
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-xl font-semibold text-gray-900">{title}</p>
          <p className="mt-2 text-lg text-gray-600">{description}</p>
        </div>
      </div>
      {button && (
        <div className="ml-5 shrink-0">
          <button
            className="rounded-md bg-orange-600 px-5 py-2.5 text-base font-medium text-white hover:bg-orange-700 transition-colors"
            onClick={() => {
              button.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Helper function to create custom toasts with consistent styling
 */
export function customToast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id: string | number) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={toast.button}
      variant={toast.variant}
    />
  ));
}

/**
 * Helper function to create success toasts
 */
export function successToast(options: Omit<Omit<ToastProps, 'id'>, 'variant'>) {
  return customToast({
    ...options,
    variant: 'success'
  });
}

/**
 * Helper function to create error toasts
 */
export function errorToast(options: Omit<Omit<ToastProps, 'id'>, 'variant'>) {
  return customToast({
    ...options,
    variant: 'error'
  });
}

// Eksportujemy funkcje jako obiekt
export const toast = {
  toast: customToast,
  success: successToast,
  error: errorToast
};

export default toast; 