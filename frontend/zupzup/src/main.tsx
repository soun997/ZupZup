import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import './styles/font.css';

import * as hooks from 'hooks';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Loading } from 'pages';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const persistor = persistStore(hooks.store);
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={hooks.store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Suspense>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
);
