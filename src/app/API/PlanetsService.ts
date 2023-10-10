import axios from 'axios';

export class PlanetsService {
  static async getAllPlanets(page: string = '') {
    const res = await axios.get(`https://swapi.dev/api/planets${page ? `?page=${page}` : ''}`);
    return res.data;
  }

  static async getPlanet(value: string = '', page: string = '') {
    const res = await axios.get(
      `https://swapi.dev/api/planets/${value ? `?search=${value}` : ''}${page ? `&page=${page}` : ''}`
    );
    return res.data;
  }

  static async getPlanetPage(url: string) {
    const res = await axios.get(url);
    return res.data;
  }
}
