'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import api from '@/lib/axios';
import { config } from '@/modules/auth/config';

interface FormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface FormState {
  isLoading: boolean;
  errors: Record<string, string[]>;
}

export function RegisterForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
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
      await api.post(config.endpoints.register, formValues);
    } catch (error: any) {
      const errorData = error.response?.data;
      
      if (errorData?.errors) {
        setFormState(prev => ({ ...prev, errors: errorData.errors }));
      } else {
        setFormState(prev => ({ 
          ...prev, 
          errors: {
            general: [errorData?.message || 'An unexpected error occurred']
          }
        }));
      }
    } finally {
      router.push('/dashboard');
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const buttonDisabled = formState.isLoading || !formValues.name || !formValues.email || 
    !formValues.password || !formValues.password_confirmation;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          id="name"
          name="name"
          type="text"
          label="Name"
          required
          disabled={formState.isLoading}
          value={formValues.name}
          error={formState.errors.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          disabled={formState.isLoading}
          value={formValues.email}
          error={formState.errors.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          disabled={formState.isLoading}
          value={formValues.password}
          error={formState.errors.password}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          label="Confirm Password"
          required
          disabled={formState.isLoading}
          value={formValues.password_confirmation}
          error={formState.errors.password_confirmation}
          onChange={handleChange}
        />
      </div>
      
      <div className="mt-10">
        <Button
          type="submit"
          className="w-full"
          disabled={buttonDisabled}
          isLoading={formState.isLoading}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
}