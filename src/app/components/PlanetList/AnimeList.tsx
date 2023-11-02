import { Anime } from '@tutkli/jikan-ts';
import { AnimeItem } from '../PlanetItem/AnimeItem';

import styles from './AnimeList.module.css';

interface IPlanetListProps {
  data: Anime[];
  count: number;
}

export function AnimeList({ data, count }: IPlanetListProps) {
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
        <h2 className={styles.anime__heading}>There are no planets with that name</h2>
      )}
    </div>
  );
}
