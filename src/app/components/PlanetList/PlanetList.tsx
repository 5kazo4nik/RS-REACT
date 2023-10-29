import { v4 as uuidv4 } from 'uuid';
import styles from './PlanetList.module.css';
import { PlanetItem } from '../PlanetItem/PlanetItem';
import { useAppSelector } from '../../hooks/useAppSelector';

export function PlanetList() {
  const { result: searchResult } = useAppSelector((state) => state.search);
  const planets = searchResult?.results || [];
  const count = searchResult?.count || 0;

  return planets.length ? (
    <div className={styles.planets__container}>
      <h2 className={styles.planets__heading}>We found {count} planets!</h2>
      <div className={styles.planets__list}>
        {planets.map((planet) => (
          <PlanetItem key={uuidv4()} planet={planet} />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.planets__container}>
      <h2 className={styles.planets__heading}>There are no planets with that name</h2>
    </div>
  );
}
