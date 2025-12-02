import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export const baseURL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Log para debug - remova depois
console.log('🔧 API Base URL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição (opcional para debug)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

// Interceptor de resposta para debug
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Response Error:', {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      status: error.response?.status,
    });
    return Promise.reject(error);
  },
);

export default api;
