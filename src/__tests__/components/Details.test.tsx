import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Details from '../../components/Details/Details';
import { createMockRouter } from '../testUtils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { IDetailPageProps } from '../../types/ServerSideProps';

const data = {
  detailData: {
    data: {
      mal_id: 1,
      rating: 'R - 17+ (violence & profanity)',
      score: 8.75,
      status: 'Finished Airing',
      title: 'Cowboy',
      title_english: 'Cowboy',
      year: 1998,
      episodes: 26,
    },
  },
  query: { page: '1', limit: '5', search: '', detail: '1' },
} as unknown as IDetailPageProps;

const emptyData = {
  detailData: null,
  detailMessage: 'test error',
  query: { page: '4', limit: '10', search: '', detail: '1' },
} as unknown as IDetailPageProps;

describe('test Details page component', () => {
  test('should display elements with correct data', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Details data={data} />
      </RouterContext.Provider>
    );

    expect(screen.getByText('Cowboy')).toBeInTheDocument();
    expect(screen.getByText(/violence & profanity/i)).toBeInTheDocument();
    expect(screen.getByText('8.75')).toBeInTheDocument();
    expect(screen.getByText(/Finished Airing/i)).toBeInTheDocument();
    expect(screen.getByText(/1998/)).toBeInTheDocument();
    expect(screen.getByText(/episodes/i)).toBeInTheDocument();
  });

  test('should display error message if error', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Details data={emptyData} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/Oops... Something went wrong.../)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should navigate after btn click', async () => {
    const router = createMockRouter({ asPath: '/details?page=4&limit=10' });

    render(
      <RouterContext.Provider value={router}>
        <Details data={emptyData} />
      </RouterContext.Provider>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(router.push).toHaveBeenCalledWith('/?page=4&limit=10');
  });
});
