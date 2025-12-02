'use client';

import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-toastify/dist/ReactToastify.css';
import handleError from '@/utils/handleToast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: handleError,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        style={{
          zIndex: 999999,
        }}
      />
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
