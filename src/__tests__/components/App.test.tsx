import { expect, test } from 'vitest';

import { render } from '@testing-library/react';
import App from '../../app/App';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
