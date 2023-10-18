import axios from 'axios';

export class PlanetsService {
  static async getPlanets(value?: string, page?: number) {
    const searchValue = value ? `?search=${value}` : '';
    const pageValue = page && value ? `&page=${page}` : page ? `?page=${page}` : '';
    const res = await axios.get(`https://swapi.dev/api/planets/${searchValue}${pageValue}`);
    return res.data;
  }

  static async getPlanet(value: string) {
    const res = await axios.get(`https://swapi.dev/api/planets/${value}/`);
    return res.data;
  }
}
