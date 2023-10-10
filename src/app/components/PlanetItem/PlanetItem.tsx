import { Component, ReactNode } from 'react';
import { IPlanetData } from '../../types/PlanetsData';

import styles from './PlanetItem.module.css';

interface IPlanetItemProps {
  planet: IPlanetData;
}

export class PlanetItem extends Component<IPlanetItemProps> {
  render(): ReactNode {
    const planet = this.props.planet;

    return (
      <div className={styles.planet}>
        <h3 className={styles.planet__heading}>{planet.name}</h3>
        <p className={styles.planet__diam}>
          Diameter of this planet is <strong>{planet.diameter} kilometers.</strong>
        </p>
        <ul className={styles.planet__list}>
          <li>
            <strong>Orbital period:</strong> {planet.orbital_period} days.
          </li>
          <li>
            <strong>Population:</strong> {planet.population} units.
          </li>
          <li>
            <strong>Climate:</strong> {planet.climate}.
          </li>
          <li>
            <strong>Terrain:</strong> {planet.terrain}.
          </li>
          <li>
            <strong>Surface water:</strong> {planet.surface_water}%.
          </li>
        </ul>
      </div>
    );
  }
}
