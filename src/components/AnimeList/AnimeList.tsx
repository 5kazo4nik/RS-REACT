import { AnimeItem } from '../AnimeItem/AnimeItem';
import styles from './AnimeList.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';

export function AnimeList() {
  const { animeData: searchResult } = useAppSelector((state) => state.data);

  const data = searchResult?.data || [];
  const count = searchResult?.pagination.items.total || 0;

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
