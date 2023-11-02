import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SearchContext } from '../../app/context/SearchContext';
import { Pagination } from '../../app/UI/Pagination/Pagination';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../app/pages/Home/Home';
import { ISearchData } from '../../app/types/AnimeData';

const getAnimeMock = vi.hoisted(() => vi.fn());
vi.mock('../../app/API/AnimeService', () => ({ AnimeService: { getAllAnime: getAnimeMock } }));

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => paramsNavigateMock),
}));

const searchData = {
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
      title: 'Cowboy Bebop',
      title_english: 'Cowboy Bebop',
      year: 1998,
      episodes: 26,
    },
    {
      mal_id: 2,
      rating: 'R - 17+ (violence & profanity)',
      score: 8.75,
      status: 'Finished Airing',
      title: 'Cowboy Bebop',
      title_english: 'Cowboy Bebop',
      year: 1998,
      episodes: 26,
    },
  ],
};

describe('test Pagination component', () => {
  test('should update page after click', () => {
    const page = 2;
    const changePage = vi.fn();
    const searchResult = {
      pagination: {
        has_next_page: true,
      },
      data: [, , ,],
    } as unknown as ISearchData;

    render(
      <SearchContext.Provider
        value={{ changeLimit: () => {}, search: '', limit: '5', searchResult: searchResult, setSearch: () => {} }}
      >
        <Pagination page={page} changePage={changePage} />
      </SearchContext.Provider>
    );

    const btnNext = screen.getByText('>');
    const btnPrev = screen.getByText('<');

    fireEvent.click(btnNext);
    expect(changePage).toHaveBeenCalledWith(1);

    fireEvent.click(btnPrev);
    expect(changePage).toHaveBeenCalledWith(-1);
  });

  test('should not update page if next page is not exist', () => {
    const page = 1;
    const changePage = vi.fn();
    const searchResult = {
      pagination: {
        has_next_page: false,
      },
      data: [],
    } as unknown as ISearchData;

    render(
      <SearchContext.Provider
        value={{ changeLimit: () => {}, search: '', limit: '5', searchResult: searchResult, setSearch: () => {} }}
      >
        <Pagination page={page} changePage={changePage} />
      </SearchContext.Provider>
    );

    const btnNext = screen.getByText('>') as HTMLButtonElement;
    const btnPrev = screen.getByText('<') as HTMLButtonElement;

    fireEvent.click(btnNext);
    expect(changePage).not.toHaveBeenCalled();
    expect(btnNext.disabled).toBe(true);

    fireEvent.click(btnPrev);
    expect(changePage).not.toHaveBeenCalled();
    expect(btnPrev.disabled).toBe(true);
  });

  test('should navigate after click', async () => {
    getAnimeMock.mockResolvedValue(searchData);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home pageQuery={2} />
        </MemoryRouter>
      );
    });

    const btnNext = await screen.findByText('>');
    const btnPrev = await screen.findByText('<');

    fireEvent.click(btnNext);
    expect(paramsNavigateMock).toHaveBeenCalledWith(null, 3);

    fireEvent.click(btnPrev);
    expect(paramsNavigateMock).toHaveBeenCalledWith(null, 2);
  });
});
