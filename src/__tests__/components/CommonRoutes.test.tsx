import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import CommonRoutes from '../../app/components/Router/CommonRoutes';
import { renderWithProviders } from '../redux/renderWithProviders';

describe('test CommonRoutes component', () => {
  test('should render Main page', () => {
    // render(
    //   <MemoryRouter initialEntries={['/']}>
    //     <CommonRoutes />
    //   </MemoryRouter>
    // );
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <CommonRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Find any anime/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('should render NotFound page if path is not defined', () => {
    render(
      <MemoryRouter initialEntries={['/some/bad/path']}>
        <CommonRoutes />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Page not found/)).toHaveLength(6);
  });
});
