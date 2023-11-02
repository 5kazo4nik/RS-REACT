import { describe, expect, test, vi } from 'vitest';
import { AnimeService, BASE_URL } from '../../app/API/AnimeService';
import axios from 'axios';

describe('test AnimeService', () => {
  describe('test getAllAnime method', () => {
    const usersMock = [{ id: 1 }, { id: 2 }];
    axios.get = vi.fn().mockResolvedValue({
      data: usersMock,
    });

    test('should call correct query with getAllAnime method', () => {
      AnimeService.getAllAnime();
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}?page=1&limit=5`);
      AnimeService.getAllAnime('hello');
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}?q=hello&page=1&limit=5`);
      AnimeService.getAllAnime('', 2);
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}?page=2&limit=5`);
      AnimeService.getAllAnime('hello', 2);
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}?q=hello&page=2&limit=5`);
      AnimeService.getAllAnime('', 2, '10');
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}?page=2&limit=5`);
    });
  });

  describe('test getAnime method', () => {
    const usersMock = { id: 1 };
    axios.get = vi.fn().mockResolvedValue({
      data: usersMock,
    });

    test('should call correct query with getAnime method', () => {
      AnimeService.getAnime('1');
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/1`);
      AnimeService.getAnime('2');
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/1`);
    });
  });
});
