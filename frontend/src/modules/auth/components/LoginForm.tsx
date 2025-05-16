'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import api from '@/lib/axios';
import { config } from '@/modules/auth/config';

interface LoginFormProps {
  onForgotPassword?: () => void;
}

interface FormState {
  isLoading: boolean;
  errors: Record<string, string[]>;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    errors: {}
  });
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isLoading: true, errors: {} }));
    
    try {
      const response = await api.post(config.endpoints.login, formValues);
      
      if (response.status === 200) {
        router.push('/dashboard');
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setFormState(prev => ({ ...prev, errors: error.response.data.errors }));
      } else {
        setFormState(prev => ({ 
          ...prev, 
          errors: {
            email: [error.response?.data?.message || 'An unexpected error occurred']
          }
        }));
      }
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const buttonDisabled = formState.isLoading || !formValues.email || !formValues.password;
  
  return (
    <div>      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            value={formValues.email}
            onChange={handleChange}
            error={formState.errors.email}
            showErrorText={false}
          />
        </div>
        
        <div>
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            value={formValues.password}
            error={formState.errors.email}
            onChange={handleChange}
          />
        </div>

        <input type="hidden" name="remember" value="false" />
                
        {onForgotPassword && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              Forgot your password?
            </button>
          </div>
        )}
        
        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={buttonDisabled}
            isLoading={formState.isLoading}
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}