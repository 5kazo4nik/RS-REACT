import axios from 'axios';
import { IAnimeData, ISearchData } from '../types/AnimeData';

export class AnimeService {
  static async getAllAnime(value?: string, page?: number) {
    const searchValue = value ? `?q=${value}` : '';
    const pageValue = page && value ? `&page=${page}` : page ? `?page=${page}` : '';

    const res = await axios.get<ISearchData>(`https://api.jikan.moe/v4/anime${searchValue}${pageValue}`);
    return res.data;
  }

  static async getPlanet(value: string) {
    const res = await axios.get<IAnimeData>(`https://api.jikan.moe/v4/anime/${value}`);
    return res.data;
  }
}
