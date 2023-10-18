import { describe, expect, test, vi } from 'vitest';
import { PlanetsService } from '../../app/API/PlanetsService';
import axios from 'axios';

describe('test PlanetService', () => {
  describe('test getPlanets method', () => {
    const usersMock = [{ id: 1 }, { id: 2 }];
    axios.get = vi.fn().mockResolvedValue({
      data: usersMock,
    });

    test('should call correct query with getPlanets method', () => {
      PlanetsService.getPlanets();
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/');
      PlanetsService.getPlanets('hello');
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/?search=hello');
      PlanetsService.getPlanets('', 2);
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/?page=2');
      PlanetsService.getPlanets('hello', 2);
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/?search=hello&page=2');
    });
  });

  describe('test getPlanet method', () => {
    const usersMock = { id: 1 };
    axios.get = vi.fn().mockResolvedValue({
      data: usersMock,
    });

    test('should call correct query with getPlanets method', () => {
      PlanetsService.getPlanet('1');
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/1/');
      PlanetsService.getPlanet('2');
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/2/');
    });
  });
});
