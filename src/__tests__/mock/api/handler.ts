import { http, HttpResponse } from 'msw';

const planet = {
  climate: 'arid',
  created: '1.1.1',
  diameter: '10465',
  edited: '1.1.1',
  films: [],
  gravity: '1 standard',
  name: 'Tatooine',
  orbital_period: '304',
  population: '200000',
  residents: [],
  rotation_period: '23',
  surface_water: '',
  terrain: 'desert',
  url: 'https://swapi.dev/api/planets/1/',
};

export const handlers = [http.get('https://swapi.dev/api/planets/1/', () => HttpResponse.json(planet))];
