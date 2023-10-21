import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { SearchContext } from '../../app/context/SearchContext';
import { Search } from '../../app/components/Search/Search';
import Home from '../../app/pages/Home/Home';

const navigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => navigateMock),
}));

describe('test Search component', () => {
  localStorage.setItem('search', 't');
  const data = {
    search: localStorage.getItem('search') || '',
    searchResult: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    setSearch: () => {},
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should render input with correct value', () => {
    render(
      <MemoryRouter>
        <Home pageQuery={1} />
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

    expect(navigateMock).toHaveBeenCalledWith(null, 1);
  });

  test('should save search value in local storage', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={data}>
          <Search />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    const input = screen.getByDisplayValue('t');
    fireEvent.change(input, { target: { value: 'hoho' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(localStorage.getItem('search')).toBe('hoho');
  });
});
