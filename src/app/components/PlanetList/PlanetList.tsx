import { Component, ReactNode } from 'react';
import { IPlanetData } from '../../types/PlanetsData';
import { PlanetItem } from '../PlanetItem/PlanetItem';

import styles from './PlanetList.module.css';

interface IPlanetListProps {
  planets: IPlanetData[];
  count: number;
}

export class PlanetList extends Component<IPlanetListProps> {
  render(): ReactNode {
    const quantity = this.props.count;
    const planets = this.props.planets;

    return (
      <div className={styles.planets__container}>
        {planets.length ? (
          <>
            <h2 className={styles.planets__heading}>We found {quantity} planets!</h2>
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
}
