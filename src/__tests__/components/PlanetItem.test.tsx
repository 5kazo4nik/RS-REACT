import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { PlanetItem } from '../../app/components/PlanetItem/PlanetItem';
import { MemoryRouter } from 'react-router-dom';

const navigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => navigateMock),
}));

describe('test PlanetItem component', () => {
  const planetData = {
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
  };

  test('should contain correct name', () => {
    render(
      <MemoryRouter>
        <PlanetItem planet={planetData} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
  });

  test('should navigate to correct path after click', () => {
    render(
      <MemoryRouter>
        <PlanetItem planet={planetData} />
      </MemoryRouter>
    );
    const planet = screen.getByText(/Tatooine/i);
    fireEvent.click(planet);

    expect(navigateMock).toHaveBeenCalledWith('details', null, '1');
  });
});
