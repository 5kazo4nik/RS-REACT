import { GetServerSidePropsContext } from 'next';
import { describe, expect, test } from 'vitest';
import { getServerSideParams } from '../../utils/getServerSideParams';

const ctx1 = {
  query: {},
} as unknown as GetServerSidePropsContext;

const ctx2 = {
  query: {
    page: '3',
    limit: '15',
    detail: '5',
    search: 'fa',
  },
} as unknown as GetServerSidePropsContext;

describe('test getServerSideParams', () => {
  test('should set default values if query is not provide params', () => {
    const params = getServerSideParams(ctx1);

    expect(params.detail).toBe('1');
    expect(params.limit).toBe('5');
    expect(params.page).toBe('1');
    expect(params.search).toBe('');
  });

  test('should set correct values if query provide params', () => {
    const params = getServerSideParams(ctx2);

    expect(params.detail).toBe('5');
    expect(params.limit).toBe('15');
    expect(params.page).toBe('3');
    expect(params.search).toBe('fa');
  });
});
