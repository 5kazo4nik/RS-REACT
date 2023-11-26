import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Pagination } from '../../UI/Pagination/Pagination';
import { createMockRouter } from '../testUtils/createMockRouter';
import { ServerQueryParams } from '../../utils/getServerSideParams';
import { ISearchData } from '../../types/AnimeData';

const animeData = {
  pagination: {
    has_next_page: true,
  },
  data: [, , ,],
} as unknown as ISearchData;

const query1 = {
  page: '1',
  limit: '10',
  search: 't',
  detail: '1',
} as unknown as ServerQueryParams;

const query2 = {
  page: '1',
  limit: '10',
  search: 't',
  detail: '1',
} as unknown as ServerQueryParams;

describe('test Pagination component', () => {
  test('should render pagination if data is exist', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Pagination query={query1} animeData={animeData} />
      </RouterContext.Provider>
    );

    const btnNext = screen.getByText('>') as HTMLButtonElement;
    const btnPrev = screen.getByText('<') as HTMLButtonElement;

    expect(btnNext).toBeInTheDocument();
    expect(btnPrev).toBeInTheDocument();
    expect(btnNext.disabled).toBe(false);
    expect(btnPrev.disabled).toBe(true);
  });

  test('should navigate after btn click', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Pagination query={query2} animeData={animeData} />
      </RouterContext.Provider>
    );

    const btnNext = screen.getByText('>') as HTMLButtonElement;
    const btnPrev = screen.getByText('<') as HTMLButtonElement;
    fireEvent.click(btnNext);
    expect(router.push).toHaveBeenCalledWith('/?page=2&search=t&limit=10');
    fireEvent.click(btnPrev);
    expect(router.push).toHaveBeenCalledWith('/?page=2&search=t&limit=10');
  });
});
