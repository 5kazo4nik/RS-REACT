import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { IHomePageProps } from '../../types/ServerSideProps';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../testUtils/createMockRouter';
import Home from '../../components/Home/Home';

const data = {
  animeData: {
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
  },
  animeMessage: '',
  query: {
    page: '1',
    limit: '10',
    search: 'a',
  },
} as unknown as IHomePageProps;

const emptyData = {
  animeData: {
    pagination: {
      has_next_page: false,
      items: {
        total: 0,
      },
    },
    data: [],
  },
  animeMessage: '',
  query: {
    page: '1',
    limit: '10',
    search: 'a',
  },
} as unknown as IHomePageProps;

const errorData = {
  animeData: null,
  animeMessage: 'test error',
  query: {
    page: '1',
    limit: '10',
    search: 'a',
  },
} as unknown as IHomePageProps;

describe('test Home component', () => {
  test('should render items and pagination', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home data={data} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/Cowboy/i)).toBeInTheDocument();
    expect(screen.getByText(/Bebop/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('a')).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  test('should hide pagination if items not found', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home data={emptyData} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/no anime/)).toBeInTheDocument();
    expect(screen.queryByText('>')).toBeNull();
    expect(screen.queryByText('<')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
  });

  test('should display error message if something went wrong', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home data={errorData} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/Oops... Something went wrong.../i)).toBeInTheDocument();
    expect(screen.queryByText('>')).toBeNull();
    expect(screen.queryByText('<')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
  });
});
