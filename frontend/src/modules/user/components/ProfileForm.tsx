'use client';

import { useState } from 'react';
import { User } from '@/modules/auth/types';
// import { updateProfile } from '@/modules/auth/services';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';


interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully');
      
      // Redirect back to profile page after successful update
      setTimeout(() => {
        router.push('/profile');
        router.refresh(); // To ensure the profile page shows updated data
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          disabled
          fullWidth
        />
        
        <p className="text-sm text-gray-500">
          Email cannot be changed. Contact support if you need to update your email.
        </p>
        
        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-2">
            Account created on {new Date(user.created_at).toLocaleDateString()}
          </p>
          
          <div className="flex space-x-4">
            <Button
              type="submit"
              isLoading={isLoading}
              variant="primary"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
} 