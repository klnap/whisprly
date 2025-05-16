import axios from 'axios';
import { config } from '@/modules/auth/config';

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.SERVER_API_URL || 'http://laravel';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
});

const getCSRFToken = async () => {
  try {
    await api.get(config.endpoints.csrfToken);
    return true;
  } catch (error) {
    return false;
  }
};

api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    if (['post', 'put', 'delete'].includes(config.method?.toLowerCase()!)) {
      await getCSRFToken();
      
      const xsrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

      if (xsrfToken) {
        const decodedToken = decodeURIComponent(xsrfToken);
        config.headers['X-XSRF-TOKEN'] = decodedToken;
      }
    }
  }

  if (typeof window === 'undefined' && config.headers['Cookie']) {
    config.withCredentials = false;
  }

  return config;
});

export default api; 