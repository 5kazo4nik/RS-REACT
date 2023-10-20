import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SearchContext } from '../../app/context/SearchContext';
import { Pagination } from '../../app/UI/Pagination/Pagination';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../app/pages/Home/Home';

const getPlanetsMock = vi.hoisted(() => vi.fn());
vi.mock('../../app/API/PlanetsService', () => ({ PlanetsService: { getPlanets: getPlanetsMock } }));

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => paramsNavigateMock),
}));

const searchData = {
  count: 60,
  next: 'https://swapi.dev/api/planets/?page=3',
  previous: 'https://swapi.dev/api/planets/?page=1',
  results: [
    {
      climate: 'arid',
      created: '1.1.1',
      diameter: '10465',
      edited: '1.1.1',
      films: [],
      gravity: '1 standard',
      name: 'Tatooine',
      orbital_period: '304',
      population: '200000',
      residents: [],
      rotation_period: '23',
      surface_water: '',
      terrain: 'desert',
      url: 'https://swapi.dev/api/planets/1/',
    },
    {
      climate: 'arid',
      created: '1.1.1',
      diameter: '12465',
      edited: '1.1.1',
      films: [],
      gravity: '2 standard',
      name: 'Hoth',
      orbital_period: '304',
      population: '200000',
      residents: [],
      rotation_period: '23',
      surface_water: '',
      terrain: 'desert',
      url: 'https://swapi.dev/api/planets/1/',
    },
  ],
};

describe('test Pagination component', () => {
  test('should update page after click', () => {
    const page = 1;
    const changePage = vi.fn();
    const searchResult = {
      count: 0,
      next: '1',
      previous: '1',
      results: [],
    };

    render(
      <SearchContext.Provider value={{ search: '', searchResult: searchResult }}>
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
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    render(
      <SearchContext.Provider value={{ search: '', searchResult: searchResult }}>
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
    getPlanetsMock.mockResolvedValue(searchData);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home searchQuery='' pageQuery={2} />
        </MemoryRouter>
      );
    });

    const btnNext = screen.getByText('>');
    const btnPrev = screen.getByText('<');

    fireEvent.click(btnNext);
    expect(paramsNavigateMock).toHaveBeenCalledWith(null, '', 3);

    fireEvent.click(btnPrev);
    expect(paramsNavigateMock).toHaveBeenCalledWith(null, '', 2);
  });
});
