import axios from 'axios';

export class PlanetsService {
  static async getPlanet(value: string = '') {
    const res = await axios.get(`https://swapi.dev/api/planets/${value ? `?search=${value}` : ''}`);
    return res.data;
  }

  static async getPlanetPage(url: string) {
    const res = await axios.get(url);
    return res.data;
  }
}
