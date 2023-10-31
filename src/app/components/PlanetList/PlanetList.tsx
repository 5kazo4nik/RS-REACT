import { IPlanetData } from '../../types/PlanetsData';
import { PlanetItem } from '../PlanetItem/PlanetItem';

import styles from './PlanetList.module.css';

interface IPlanetListProps {
  planets: IPlanetData[];
  count: number;
}

export function PlanetList({ planets, count }: IPlanetListProps) {
  return planets.length ? (
    <div className={styles.planets__container}>
      <h2 className={styles.planets__heading}>We found {count} planets!</h2>
      <div className={styles.planets__list}>
        {planets.map((planet, index) => (
          <PlanetItem key={index} planet={planet} />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.planets__container}>
      <h2 className={styles.planets__heading}>There are no planets with that name</h2>
    </div>
  );
}
