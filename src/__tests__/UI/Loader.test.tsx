import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Loader } from '../../app/UI/Loader/Loader';

describe('test Loader component', () => {
  test('should contain 2 elements', () => {
    render(<Loader />);

    const loader = document.body.firstChild?.firstChild as HTMLElement;
    const spin = loader.firstChild as HTMLElement;
    expect(loader).toBeInTheDocument();
    expect(loader.className.includes('loader')).toBe(true);
    expect(spin).toBeInTheDocument();
    expect(spin.className.includes('spin')).toBe(true);
  });

  test('should add classname to loader if prop passed', () => {
    render(<Loader absolute />);

    const loader = document.body.firstChild?.firstChild as HTMLElement;
    expect(loader.className.includes('loader')).toBe(true);
    expect(loader.className.includes('loader_absolute')).toBe(true);
  });
});
