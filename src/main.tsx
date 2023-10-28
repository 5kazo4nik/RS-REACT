import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { setupStore } from './app/store/store';
import { Provider } from 'react-redux';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
