import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Anime } from '@tutkli/jikan-ts';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../testUtils/createMockRouter';
import { AnimeItem } from '../../components/AnimeItem/AnimeItem';

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
      <RouterContext.Provider value={createMockRouter({})}>
        <AnimeItem anime={data} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/Cowboy/i)).toBeInTheDocument();

    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <AnimeItem anime={data2} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/bebop/i)).toBeInTheDocument();
  });

  test('should navigate to correct path after click', () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <AnimeItem anime={data} />
      </RouterContext.Provider>
    );
    const item = screen.getByText(/Cowboy/i);
    fireEvent.click(item);

    expect(router.push).toHaveBeenCalledWith('details?page=1&limit=5&detail=1');
  });
});
