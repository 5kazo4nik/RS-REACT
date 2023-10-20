import { describe, expect, test } from 'vitest';
import { parseDetailNumber } from '../../app/utils/parseDetailNumber';

describe('test function parseDetailNumber', () => {
  test('should return correct digit', () => {
    expect(parseDetailNumber('https://swapi.dev/api/planets/1/')).toBe('1');
    expect(parseDetailNumber('https://swapi.dev/api/planets/5/')).toBe('5');
  });
});
