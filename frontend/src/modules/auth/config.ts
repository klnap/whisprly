export const config = {
  endpoints: {
    csrfToken: '/sanctum/csrf-cookie',
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    user: '/api/auth/user',
    profile: '/api/auth/profile',
    changePassword: '/api/auth/change-password',
    verifyEmail: '/api/auth/email/verify',
    resendEmailVerification: '/api/auth/email/resend',
  },
  routes: {
    protected: [
      '/dashboard',
      '/verify-email',
      '/profile',
    ],
    urls: {
      home: '/',
      dashboard: '/dashboard',
      verifyEmail: '/verify-email',
      verify: '/verify',
    }
  },
  session_cookie: 'session'
} as const;
