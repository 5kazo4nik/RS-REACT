import { http, HttpResponse } from 'msw';

const anime = {
  data: {
    mal_id: 1,
    rating: 'R - 17+ (violence & profanity)',
    score: 8.75,
    status: 'Finished Airing',
    title: 'Cowboy',
    title_english: 'Cowboy',
    year: 1998,
    episodes: 26,
  },
};

export const handlers = [http.get('https://api.jikan.moe/v4/anime/1', () => HttpResponse.json(anime))];
