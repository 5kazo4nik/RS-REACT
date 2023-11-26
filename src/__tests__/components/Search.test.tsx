import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Search } from '../../components/Search/Search';
import { createMockRouter } from '../testUtils/createMockRouter';

describe('test Search component', () => {
  test('should render input with correct search and select value', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Search query={{ limit: '10', search: 't', page: '1', detail: '1' }} />
      </RouterContext.Provider>
    );

    expect(screen.getByDisplayValue('t')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  test('should navigate with input value after btn click', () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Search query={{ limit: '10', search: 't', page: '1', detail: '1' }} />
      </RouterContext.Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(router.push).toHaveBeenCalledWith('/?page=1&search=t&limit=10');
  });
});
