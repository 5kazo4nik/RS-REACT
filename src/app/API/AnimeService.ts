import axios from 'axios';
import { IAnimeData, ISearchData } from '../types/AnimeData';

export const BASE_URL = 'https://api.jikan.moe/v4/anime';

export class AnimeService {
  static async getAllAnime(value?: string, page = 1, limit = '5') {
    const searchValue = value ? `?q=${value}` : '';
    const pageValue = page && value ? `&page=${page}` : `?page=${page}`;
    const limitValue = `&limit=${limit}`;
    const res = await axios.get<ISearchData>(`${BASE_URL}${searchValue}${pageValue}${limitValue}`);
    return res.data;
  }

  static async getAnime(value: string) {
    const res = await axios.get<IAnimeData>(`${BASE_URL}/${value}`);
    return res.data;
  }
}
