import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import './styles/font.css';

import * as hooks from 'hooks';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Loading } from 'pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={hooks.store}>
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Suspense>
  </Provider>,
  // </React.StrictMode>,
);
