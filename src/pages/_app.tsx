import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { wrapper } from '../store/store';

import '../styles/App.css';
import '../styles/Main.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    </ErrorBoundary>
  );
}
