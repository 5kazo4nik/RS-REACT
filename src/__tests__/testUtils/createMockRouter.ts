import { NextRouter } from 'next/router';
import { vi } from 'vitest';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: '',
    query: {},
    isFallback: false,
    back: vi.fn(),
    beforePopState: vi.fn(),
    pathname: '/',
    route: '/',
    asPath: '/',
    prefetch: vi.fn(),
    push: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    locale: '',
    forward: vi.fn(),
    ...router,
  };
}
