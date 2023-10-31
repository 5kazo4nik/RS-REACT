import { IPlanetData } from '../../types/PlanetsData';
import { PlanetItem } from '../PlanetItem/PlanetItem';

import styles from './PlanetList.module.css';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

export function PlanetList() {
  const { searchResult } = useContext(SearchContext);
  const planets = searchResult?.results || [];
  const count = searchResult?.count || 0;

  return planets.length ? (
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
