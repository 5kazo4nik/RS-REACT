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

    expect(await screen.findByText('Cowboy')).toBeInTheDocument();
    expect(await screen.findByText(/violence & profanity/i)).toBeInTheDocument();
    expect(await screen.findByText('8.75')).toBeInTheDocument();
    expect(await screen.findByText(/Finished Airing/i)).toBeInTheDocument();
    expect(await screen.findByText(/1998/)).toBeInTheDocument();
    expect(await screen.findByText(/episodes/i)).toBeInTheDocument();
  });

  test('should display error message if error', async () => {
    server.use(http.get('https://api.jikan.moe/v4/anime/1', () => HttpResponse.error()));

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
