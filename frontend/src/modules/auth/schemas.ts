// src/modules/auth/schemas.ts
import { z } from 'zod';

// Login schema
export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string()
    .min(1, 'Password is required')
});

// Registration schema
export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name is too long'),
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  password_confirmation: z.string()
    .min(1, 'Password confirmation is required')
}).refine((data: {password: string, password_confirmation: string}) => data.password === data.password_confirmation, {
  message: "Passwords must match",
  path: ["password_confirmation"],
});

// Password reset schema
export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required')
});

// Export types
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;