'use server';

import { cookies } from "next/headers";
import { cache } from "react";
import { config } from "./config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/lib/axios";
import { AxiosError } from 'axios';

export const getUser = cache(async (sessionCookie: string) => {
  try {
    const response = await api.get('/api/auth/user', {
      headers: {
        Cookie: `${config.session_cookie}=${sessionCookie}`
      },
      withCredentials: true
    });

    return response.data.user;

  } catch (error) {
    if (error instanceof AxiosError) {
      // If we get a 401, the session is invalid
      if (error.response?.status === 401) {
        return null;
      }
    }
    console.error('Error fetching user:', error);
    return null;
  }
});

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(config.session_cookie)?.value;
  const headersList = await headers();

  if (!sessionCookie) {
    return null;
  }

  const user = await getUser(sessionCookie);

  const isHomePath = headersList.get('x-pathname') === '/';
  const isVerifyEmailPath = headersList.get('x-pathname') === '/verify-email';

  if (user && isHomePath) {
    redirect('/dashboard');
  }

  if (user && !isVerifyEmailPath && !user.email_verified_at) {
    redirect('/verify-email');
  }

  return user;
});

export const getProfile = async () => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(config.session_cookie)?.value;
    const response = await api.get(config.endpoints.user, {
      headers: {
        Cookie: `${config.session_cookie}=${sessionCookie}`
      }
    });

    if (response.status !== 200) {
      return null;
    }

    return response.data.user;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const register = async (prevState: any, formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(config.session_cookie)?.value;
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const password_confirmation = formData.get('password_confirmation') as string;
    
    // Get CSRF token first
    await api.get(config.endpoints.csrfToken);
    
    const response = await api.post(config.endpoints.register, {
      name,
      email,
      password,
      password_confirmation
    }, {
      headers: {
        Cookie: sessionCookie ? `${config.session_cookie}=${sessionCookie}` : undefined
      }
    });
    
    if (response.status !== 200) {
      return {
        status: 'error',
        message: response.data.message || 'Registration failed',
        errors: response.data.errors || {},
        data: null
      };
    }
    
    return {
      status: 'success',
      message: 'Registration successful! Please check your email to verify your account.',
      errors: {},
      data: response.data.data
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.',
      errors: {},
      data: null
    };
  }
};

export const logout = async () => {
  try {
    const response = await api.post(config.endpoints.logout);
    
    // Remove cookies
    
    console.log(response);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};