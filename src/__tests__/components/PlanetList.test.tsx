import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SearchContext } from '../../app/context/SearchContext';
import { PlanetList } from '../../app/components/PlanetList/PlanetList';
import { MemoryRouter } from 'react-router-dom';

describe('test PlanetList component', () => {
  const data = {
    search: '',
    setSearch: () => {},
    searchResult: {
      count: 2,
      next: null,
      previous: null,
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
    },
  };

  const emptyData = {
    search: '',
    setSearch: () => {},
    searchResult: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  };

  test('should render correct count of planets', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={data}>
          <PlanetList />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Hoth/i)).toBeInTheDocument();
    expect(screen.getByText(/2 planets/i)).toBeInTheDocument();
  });

  test('should render correct message if planets not found', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={emptyData}>
          <PlanetList />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/There are no planets with that name/i)).toBeInTheDocument();
  });
});
