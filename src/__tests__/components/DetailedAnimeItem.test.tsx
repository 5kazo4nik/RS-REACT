import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IAnimeData } from '../../types/AnimeData';
import DetailedAnimeItem from '../../components/DetailedAnimeItem/DetailedAnimeItem';

describe('test DetailedAnimeItem component', () => {
  const data = {
    data: {
      mal_id: 1,
      rating: 'R - 17+ (violence & profanity)',
      score: 8.75,
      status: 'Finished Airing',
      title: 'Bebop',
      title_english: 'Cowboy',
      year: 1998,
      episodes: 26,
      synopsis: 'test synopsis',
    },
  } as unknown as IAnimeData;

  const data1 = {
    data: {
      mal_id: 1,
      rating: null,
      score: null,
      status: null,
      title: 'Bebop',
      title_english: null,
      year: null,
      episodes: null,
    },
  } as unknown as IAnimeData;

  test('should render correct text', () => {
    render(<DetailedAnimeItem anime={data} />);

    expect(screen.getByText(/violence & profanity/i)).toBeInTheDocument();
    expect(screen.getByText(/8\.75/i)).toBeInTheDocument();
    expect(screen.getByText(/Finished Airing/i)).toBeInTheDocument();
    expect(screen.getByText(/Cowboy/i)).toBeInTheDocument();
    expect(screen.getByText(/1998/i)).toBeInTheDocument();
    expect(screen.getByText(/26/i)).toBeInTheDocument();
    expect(screen.getByText(/test synopsis/i)).toBeInTheDocument();
  });

  test('should substitute text if there is no value', () => {
    render(<DetailedAnimeItem anime={data1} />);

    expect(screen.getByText(/Between 1 and infinity/i)).toBeInTheDocument();
    expect(screen.getByText(/Got lost on the way/i)).toBeInTheDocument();
    expect(screen.getByText(/For the whole family... Maybe.../i)).toBeInTheDocument();
    expect(screen.getByText(/Who knows.../i)).toBeInTheDocument();
    expect(screen.getByText(/Underestimated/i)).toBeInTheDocument();
    expect(screen.getByText(/No such thing/i)).toBeInTheDocument();
    expect(screen.getByText(/Bebop/i)).toBeInTheDocument();
  });
});
