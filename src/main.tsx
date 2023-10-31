import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import ErrorBoundary from './app/components/ErrorBoundary/ErrorBoundary';

import { setupStore } from './app/store/store';
import { Provider } from 'react-redux';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
