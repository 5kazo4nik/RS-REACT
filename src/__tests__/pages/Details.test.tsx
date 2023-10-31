import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Details from '../../app/pages/Details/Details';
import { MemoryRouter } from 'react-router-dom';

const data = {
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

const useFetchMock = vi.hoisted(() => vi.fn());
vi.mock('../../app/hooks/useFetch', () => ({
  useFetch: useFetchMock,
}));

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({ useParamsNavigator: vi.fn(() => paramsNavigateMock) }));

const context = { detail: '1' };
vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return {
    ...actual,
    useOutletContext: () => context,
  };
});

describe('test Details page component', () => {
  test('should display elements with correct data', () => {
    useFetchMock.mockReturnValue([vi.fn(), false, '', data]);
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText(/Diameter/)).toBeInTheDocument();
    expect(screen.getByText('304 days.')).toBeInTheDocument();
    expect(screen.getByText('200000 units.')).toBeInTheDocument();
    expect(screen.getByText(/arid/)).toBeInTheDocument();
    expect(screen.getByText('desert.')).toBeInTheDocument();
    expect(screen.getByText(/Rotation period/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should display error message if error', () => {
    useFetchMock.mockReturnValue([vi.fn(), false, 'error 404', {}]);
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByText(/error 404/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should navigate after btn click', () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(paramsNavigateMock).toHaveBeenCalledWith('..', null, null);
  });
});
