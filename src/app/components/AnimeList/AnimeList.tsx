import { Anime } from '@tutkli/jikan-ts';
import { AnimeItem } from '../AnimeItem/AnimeItem';

import styles from './AnimeList.module.css';

interface IAnimeListProps {
  data: Anime[];
  count: number;
}

export function AnimeList({ data, count }: IAnimeListProps) {
  return (
    <div className={styles.anime__container}>
      {data.length ? (
        <>
          <h2 className={styles.anime__heading}>We found {count} anime!</h2>
          <div className={styles.anime__list}>
            {data.map((anime) => (
              <AnimeItem key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </>
      ) : (
        <h2 className={styles.anime__heading}>There are no anime with that name</h2>
      )}
    </div>
  );
}
