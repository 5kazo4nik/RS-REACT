import axios from 'axios';
import { IPlanetData, ISearchData } from '../types/PlanetsData';

export class PlanetsService {
  static async getPlanet(value: string = '') {
    const res = await axios.get<ISearchData>(`https://swapi.dev/api/planets/${value ? `?search=${value}` : ''}`);
    return res.data;
  }

  static async getPlanetPage(url: string) {
    const res = await axios.get<IPlanetData>(url);
    return res.data;
  }
}
