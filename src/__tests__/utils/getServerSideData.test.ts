import { describe, expect, test } from 'vitest';
import { IRTKResp } from '../../types/ServerSideProps';
import { getServerSideData } from '../../utils/getServerSideData';

describe('test getServerSideData function', () => {
  test('should return correct data if promise fullfilled', () => {
    const resp = {
      status: 'fullfilled',
      data: 'test data',
    } as unknown as IRTKResp;

    const val = getServerSideData(resp);

    expect(val.data).toBe('test data');
    expect(val.message).toBe('');
  });

  test('should return correct message if promise rejected', () => {
    const resp = {
      status: 'rejected',
      error: {
        data: {
          message: 'test message',
        },
      },
    } as unknown as IRTKResp;

    const val = getServerSideData(resp);

    expect(val.data).toBeNull();
    expect(val.message).toBe('test message');
  });
});
