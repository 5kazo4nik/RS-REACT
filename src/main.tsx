import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import ErrorBoundary from './app/components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
