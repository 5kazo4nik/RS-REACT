import { fireEvent, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import Home from '../../app/pages/Home/Home';
import { server } from '../mock/api/server';
import { renderWithProviders } from '../redux/renderWithProviders';
import { HttpResponse, http } from 'msw';

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
      total: 0,
    },
  },
  data: [],
};

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('test Home component', () => {
  test('should render items and pagination', async () => {
    server.use(http.get('https://api.jikan.moe/v4/anime', () => HttpResponse.json(data)));

    renderWithProviders(<Home />, { preloadedState: { search: { result: null, search: 'a', limit: 5 } } });

    expect(await screen.findByText(/Cowboy/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bebop/i)).toBeInTheDocument();
    expect(await screen.findByDisplayValue('a')).toBeInTheDocument();
    expect(await screen.findByText(1)).toBeInTheDocument();
    expect(await screen.findByText('<')).toBeInTheDocument();
    expect(await screen.findByText('>')).toBeInTheDocument();
  });

  test('should hide pagination if items not found', async () => {
    server.use(http.get('https://api.jikan.moe/v4/anime', () => HttpResponse.json(notFoundData)));

    renderWithProviders(<Home />);

    expect(await screen.findByText(/no anime/)).toBeInTheDocument();
    expect(screen.queryByText('>')).toBeNull();
    expect(screen.queryByText('<')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
  });

  test('should display error message if something went wrong', async () => {
    server.use(http.get('https://api.jikan.moe/v4/anime', () => HttpResponse.error()));

    renderWithProviders(<Home />);

    expect(await screen.findByText(/Oops... Something went wrong.../i)).toBeInTheDocument();
    expect(screen.queryByText('>')).toBeNull();
    expect(screen.queryByText('<')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
  });

  test('should navigate after click', async () => {
    server.use(http.get('https://api.jikan.moe/v4/anime', () => HttpResponse.error()));

    renderWithProviders(<Home />);

    const element = await screen.findByText(/Oops... Something went wrong.../i);
    fireEvent.click(element);

    expect(paramsNavigateMock).toHaveBeenCalledWith(null, 1);
  });
});
