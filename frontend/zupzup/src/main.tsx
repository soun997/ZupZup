import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/font.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
<<<<<<< HEAD
=======
import { Loading } from 'pages/index.ts';
>>>>>>> c27f15b74edb21b3656a9e0143f8e100066e19d1

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>,
);
