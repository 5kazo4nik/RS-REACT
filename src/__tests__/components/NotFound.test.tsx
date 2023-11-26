import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { describe, expect, test } from 'vitest';
import { createMockRouter } from '../testUtils/createMockRouter';
import NotFound from '../../components/NotFound/NotFound';

describe('test NotFound component page', () => {
  test('should display correct message', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <NotFound />
      </RouterContext.Provider>
    );

    expect(screen.getAllByText(/Page not found/)).toHaveLength(6);
  });

  test('should navigate to main after click', () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <NotFound />
      </RouterContext.Provider>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(router.push).toHaveBeenCalledWith('/');
  });
});
