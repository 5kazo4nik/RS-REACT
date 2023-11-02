import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Details from '../../app/pages/Details/Details';
import { MemoryRouter } from 'react-router-dom';

const data = {
  data: {
    mal_id: 1,
    rating: 'R - 17+ (violence & profanity)',
    score: 8.75,
    status: 'Finished Airing',
    title: 'Cowboy Bebop',
    title_english: 'Cowboy Bebop',
    year: 1998,
    episodes: 26,
  },
};

const useFetchMock = vi.hoisted(() => vi.fn());
vi.mock('../../app/hooks/useFetch', () => ({
  useFetch: useFetchMock,
}));

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({ useParamsNavigator: vi.fn(() => paramsNavigateMock) }));

const context = { detail: '1' };
vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return {
    ...actual,
    useOutletContext: () => context,
  };
});

describe('test Details page component', () => {
  test('should display elements with correct data', () => {
    useFetchMock.mockReturnValue([vi.fn(), false, '', data]);
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByText('Cowboy Bebop')).toBeInTheDocument();
    expect(screen.getByText(/violence & profanity/i)).toBeInTheDocument();
    expect(screen.getByText('8.75')).toBeInTheDocument();
    expect(screen.getByText(/Finished Airing/i)).toBeInTheDocument();
    expect(screen.getByText(/1998/)).toBeInTheDocument();
    expect(screen.getByText(/episodes/i)).toBeInTheDocument();
  });

  test('should display error message if error', () => {
    useFetchMock.mockReturnValue([vi.fn(), false, 'error 404', {}]);
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByText(/error 404/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should navigate after btn click', () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(paramsNavigateMock).toHaveBeenCalledWith('..', null, null);
  });
});
