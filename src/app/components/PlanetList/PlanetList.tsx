import styles from './PlanetList.module.css';
import { PlanetItem } from '../PlanetItem/PlanetItem';
import { useAppSelector } from '../../hooks/useAppSelector';

export function PlanetList() {
  const { result: searchResult } = useAppSelector((state) => state.search);
  const planets = searchResult?.results || [];
  const count = searchResult?.count || 0;

  return (
    <div className={styles.planets__container}>
      {planets.length ? (
        <>
          <h2 className={styles.planets__heading}>We found {count} planets!</h2>
          <div className={styles.planets__list}>
            {planets.map((planet, index) => (
              <PlanetItem key={index} planet={planet} />
            ))}
          </div>
        </>
      ) : (
        <h2 className={styles.planets__heading}>There are no planets with that name</h2>
      )}
    </div>
  );
}
