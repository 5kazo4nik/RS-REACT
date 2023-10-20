import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import Home from '../../app/pages/Home/Home';
import { act } from 'react-dom/test-utils';

const getPlanetsMock = vi.hoisted(() => vi.fn());
vi.mock('../../app/API/PlanetsService', () => ({ PlanetsService: { getPlanets: getPlanetsMock } }));

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => paramsNavigateMock),
}));

const data = {
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
};

const notFoundData = {
  count: 2,
  next: null,
  previous: null,
  results: [],
};

describe('test Home component', () => {
  test('should render planets and pagination', async () => {
    getPlanetsMock.mockResolvedValue(data);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home searchQuery='a' pageQuery={1} />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Hoth')).toBeInTheDocument();
    expect(screen.getByDisplayValue('a')).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  test('should hide pagination if planets not found', async () => {
    getPlanetsMock.mockResolvedValue(notFoundData);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home searchQuery='a' pageQuery={1} />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/no planets/)).toBeInTheDocument();
    expect(screen.queryByText('>')).toBeNull();
    expect(screen.queryByText('<')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
  });

  test('should display error message if something went wrong', async () => {
    getPlanetsMock.mockRejectedValue(new Error('error 404'));

    await act(async () => {
      render(
        <MemoryRouter>
          <Home searchQuery='a' pageQuery={1} />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.queryByText('>')).toBeNull();
    expect(screen.queryByText('<')).toBeNull();
    expect(screen.queryByText('1')).toBeNull();
  });

  test('should navigate after click', async () => {
    getPlanetsMock.mockRejectedValue(new Error('error 404'));

    await act(async () => {
      render(
        <MemoryRouter>
          <Home searchQuery='a' pageQuery={1} />
        </MemoryRouter>
      );
    });

    const element = screen.getByText(/error/i);
    fireEvent.click(element);

    expect(paramsNavigateMock).toHaveBeenCalledWith(null, 'a', 1);
  });
});
