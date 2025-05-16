export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  errors: Record<string, string[]> | null;
  data: T | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
} 