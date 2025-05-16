export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  notifications_enabled?: boolean;
  theme?: 'light' | 'dark' | 'system';
  language?: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
}

// Typ dla stanu formularza
export type LoginFormState = {
  success: boolean;
  errors: Record<string, string>;
  message?: string;
}

// Domyślny stan formularza
export const initialState: LoginFormState = {
  success: false,
  errors: {},
  message: undefined
};
