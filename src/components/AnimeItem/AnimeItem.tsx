import { Anime } from '@tutkli/jikan-ts';

import styles from './AnimeItem.module.css';
import { useParamsNavigator } from '../../hooks/useNavigator';

interface IAnimeItemProps {
  anime: Anime;
}

export function AnimeItem({ anime }: IAnimeItemProps) {
  const navigate = useParamsNavigator();

  const onClickHandler = () => {
    navigate('details', null, String(anime.mal_id), null, null);
  };

  return (
    <div className={styles.anime} onClick={onClickHandler}>
      <h3 className={styles.anime__heading}>{anime.title_english || anime.title}</h3>
    </div>
  );
}
