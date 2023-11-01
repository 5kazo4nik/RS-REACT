import { fireEvent, screen } from '@testing-library/react';
import { afterEach, afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import Details from '../../app/pages/Details/Details';
import { http, HttpResponse } from 'msw';
import { server } from '../mock/api/server';
import { renderWithProviders } from '../redux/renderWithProviders';

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({ useParamsNavigator: vi.fn(() => paramsNavigateMock) }));

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('test Details page component', () => {
  test('should display elements with correct data', async () => {
    renderWithProviders(<Details />, { preloadedState: { query: { detail: '1', page: 1 } } });

    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
    expect(await screen.findByText(/Diameter/)).toBeInTheDocument();
    expect(await screen.findByText('304 days.')).toBeInTheDocument();
    expect(await screen.findByText('200000 units.')).toBeInTheDocument();
    expect(await screen.findByText(/arid/)).toBeInTheDocument();
    expect(await screen.findByText('desert.')).toBeInTheDocument();
    expect(await screen.findByText(/Rotation period/)).toBeInTheDocument();
    expect(await screen.findByRole('button')).toBeInTheDocument();
  });

  test('should display error message if error', async () => {
    server.use(http.get('https://swapi.dev/api/planets/1/', () => HttpResponse.error()));

    renderWithProviders(<Details />, { preloadedState: { query: { detail: '1', page: 1 } } });

    expect(await screen.findByText(/Oops... Something went wrong.../)).toBeInTheDocument();
    expect(await screen.findByRole('button')).toBeInTheDocument();
  });

  test('should navigate after btn click', async () => {
    renderWithProviders(<Details />, { preloadedState: { query: { detail: '1', page: 1 } } });

    const btn = await screen.findByRole('button');
    fireEvent.click(btn);

    expect(paramsNavigateMock).toHaveBeenCalledWith('..', null, null);
  });
});
