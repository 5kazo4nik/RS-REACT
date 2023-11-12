import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SearchContext } from '../../app/context/SearchContext';
import { AnimeList } from '../../app/components/AnimeList/AnimeList';
import { MemoryRouter } from 'react-router-dom';
import { ISearchData } from '../../app/types/AnimeData';

describe('test AnimeList component', () => {
  const data = {
    search: '',
    setSearch: () => {},
    limit: 5,
    changeLimit: () => {},
    searchResult: {
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
    } as unknown as ISearchData,
  };

  const emptyData = {
    search: '',
    setSearch: () => {},
    limit: 5,
    changeLimit: () => {},
    searchResult: {
      pagination: {
        has_next_page: false,
        items: {
          total: 0,
        },
      },
      data: [],
    } as unknown as ISearchData,
  };

  test('should render correct count of items', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={data}>
          <AnimeList />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cowboy/i)).toBeInTheDocument();
    expect(screen.getByText(/Bebop/i)).toBeInTheDocument();
    expect(screen.getByText(/2 anime/i)).toBeInTheDocument();
  });

  test('should render correct message if items not found', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={emptyData}>
          <AnimeList />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/There are no anime with that name/i)).toBeInTheDocument();
  });
});
