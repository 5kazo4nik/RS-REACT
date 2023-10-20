import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { SearchContext } from '../../app/context/SearchContext';
import { Search } from '../../app/components/Search/Search';

const navigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => navigateMock),
}));

describe('test Search component', () => {
  const data = {
    search: 't',
    searchResult: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should render input with correct value', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={data}>
          <Search />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue('t')).toBeInTheDocument();
  });

  test('should navigate with input value after btn click', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={data}>
          <Search />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith(null, data.search, 1);
  });
});
