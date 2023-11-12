import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AnimeItem } from '../../app/components/AnimeItem/AnimeItem';
import { MemoryRouter } from 'react-router-dom';
import { Anime } from '@tutkli/jikan-ts';

const navigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => navigateMock),
}));

describe('test AnimeItem component', () => {
  const data = {
    mal_id: 1,
    rating: 'R - 17+ (violence & profanity)',
    score: 8.75,
    status: 'Finished Airing',
    title: 'Cowboy',
    title_english: 'Cowboy',
    year: 1998,
    episodes: 26,
  } as unknown as Anime;

  const data2 = {
    mal_id: 1,
    rating: 'R - 17+ (violence & profanity)',
    score: 8.75,
    status: 'Finished Airing',
    title: 'bebop',
    title_english: null,
    year: 1998,
    episodes: 26,
  } as unknown as Anime;

  test('should contain correct name', () => {
    render(
      <MemoryRouter>
        <AnimeItem anime={data} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cowboy/i)).toBeInTheDocument();

    render(
      <MemoryRouter>
        <AnimeItem anime={data2} />
      </MemoryRouter>
    );

    expect(screen.getByText(/bebop/i)).toBeInTheDocument();
  });

  test('should navigate to correct path after click', () => {
    render(
      <MemoryRouter>
        <AnimeItem anime={data} />
      </MemoryRouter>
    );
    const item = screen.getByText(/Cowboy/i);
    fireEvent.click(item);

    expect(navigateMock).toHaveBeenCalledWith('details', null, '1');
  });
});
