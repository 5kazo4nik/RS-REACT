import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Pagination } from '../../app/UI/Pagination/Pagination';
import { ISearchData } from '../../app/types/AnimeData';
import { renderWithProviders } from '../redux/renderWithProviders';

const getAnimeMock = vi.hoisted(() => vi.fn());
vi.mock('../../app/API/AnimeService', () => ({ AnimeService: { getAllAnime: getAnimeMock } }));

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => paramsNavigateMock),
}));

describe('test Pagination component', () => {
  test('should render pagination if data is exist', () => {
    const page = 1;
    const searchResult = {
      pagination: {
        has_next_page: true,
      },
      data: [, , ,],
    } as unknown as ISearchData;
    renderWithProviders(<Pagination />, {
      preloadedState: { search: { result: searchResult, limit: '', search: '' }, query: { page } },
    });
    const btnNext = screen.getByText('>') as HTMLButtonElement;
    const btnPrev = screen.getByText('<') as HTMLButtonElement;

    expect(btnNext).toBeInTheDocument();
    expect(btnPrev).toBeInTheDocument();
    expect(btnNext.disabled).toBe(false);
    expect(btnPrev.disabled).toBe(true);
  });

  test('should navigate after btn click', async () => {
    const page = 2;
    const searchResult = {
      pagination: {
        has_next_page: true,
      },
      data: [, , ,],
    } as unknown as ISearchData;

    renderWithProviders(<Pagination />, {
      preloadedState: { search: { result: searchResult, limit: '', search: '' }, query: { page } },
    });

    const btnNext = screen.getByText('>') as HTMLButtonElement;
    const btnPrev = screen.getByText('<') as HTMLButtonElement;
    fireEvent.click(btnNext);
    expect(paramsNavigateMock).toHaveBeenCalledWith(null, 3);
    fireEvent.click(btnPrev);
    expect(paramsNavigateMock).toHaveBeenCalledWith(null, 2);
  });
});
