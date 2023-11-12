import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import Home from '../../app/pages/Home/Home';
import { act } from 'react-dom/test-utils';

const getAnimeMock = vi.hoisted(() => vi.fn());
vi.mock('../../app/API/AnimeService', () => ({ AnimeService: { getAllAnime: getAnimeMock } }));

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => paramsNavigateMock),
}));

const data = {
  pagination: {
    has_next_page: true,
    items: {
      total: 2,
    },
  },
  data: [
    {
      mal_id: 1,
      rating: 'R - 17+ (violence & profanity)',
      score: 8.75,
      status: 'Finished Airing',
      title: 'Cowboy',
      title_english: 'Cowboy',
      year: 1998,
      episodes: 26,
    },
    {
      mal_id: 2,
      rating: 'R - 17+ (violence & profanity)',
      score: 8.75,
      status: 'Finished Airing',
      title: null,
      title_english: 'Bebop',
      year: 1998,
      episodes: 26,
    },
  ],
};

const notFoundData = {
  pagination: {
    has_next_page: false,
    items: {
      total: 2,
    },
  },
  data: [],
};

localStorage.setItem('search', 'a');

describe('test Home component', () => {
  test('should render items and pagination', async () => {
    getAnimeMock.mockResolvedValue(data);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home pageQuery={2} />
        </MemoryRouter>
      );
    });

    expect(await screen.findByText('Cowboy')).toBeInTheDocument();
    expect(await screen.findByText('Bebop')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('a')).toBeInTheDocument();
    expect(await screen.findByText(2)).toBeInTheDocument();
    expect(await screen.findByText('<')).toBeInTheDocument();
    expect(await screen.findByText('>')).toBeInTheDocument();
  });

  test('should hide pagination if items not found', async () => {
    getAnimeMock.mockResolvedValue(notFoundData);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home pageQuery={1} />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/no anime/)).toBeInTheDocument();
    expect(screen.queryByText('>')).toBeNull();
    expect(screen.queryByText('<')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
  });

  test('should display error message if something went wrong', async () => {
    getAnimeMock.mockRejectedValue(new Error('error 404'));

    await act(async () => {
      render(
        <MemoryRouter>
          <Home pageQuery={1} />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.queryByText('>')).toBeNull();
    expect(screen.queryByText('<')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
  });

  test('should navigate after click', async () => {
    getAnimeMock.mockRejectedValue(new Error('error 404'));

    await act(async () => {
      render(
        <MemoryRouter>
          <Home pageQuery={1} />
        </MemoryRouter>
      );
    });

    const element = screen.getByText(/error/i);
    fireEvent.click(element);

    expect(paramsNavigateMock).toHaveBeenCalledWith(null, 1);
  });
});
