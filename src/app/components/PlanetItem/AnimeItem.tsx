import { Anime } from '@tutkli/jikan-ts';
import { useParamsNavigator } from '../../hooks/useNavigator';

import styles from './AnimeItem.module.css';

interface IPlanetItemProps {
  anime: Anime;
}

export function AnimeItem({ anime }: IPlanetItemProps) {
  const navigate = useParamsNavigator();

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('details', null, String(anime.mal_id));
  };

  return (
    <div className={styles.anime} onClick={onClickHandler}>
      <h3 className={styles.anime__heading}>{anime.title_english || anime.title}</h3>
    </div>
  );
}
