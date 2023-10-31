import { Component, ReactNode } from 'react';
import { IPlanetData } from '../../types/PlanetsData';

import styles from './PlanetItem.module.css';

interface IPlanetItemProps {
  planet: IPlanetData;
}

export class PlanetItem extends Component<IPlanetItemProps> {
  render(): ReactNode {
    const { name, diameter, orbital_period, population, climate, terrain, surface_water } = this.props.planet;

    return (
      <div className={styles.planet}>
        <h3 className={styles.planet__heading}>{name}</h3>
        <p className={styles.planet__diam}>
          Diameter of this planet is <strong>{diameter} kilometers.</strong>
        </p>
        <ul className={styles.planet__list}>
          <li>
            <strong>Orbital period:</strong> {orbital_period} days.
          </li>
          <li>
            <strong>Population:</strong> {population} units.
          </li>
          <li>
            <strong>Climate:</strong> {climate}.
          </li>
          <li>
            <strong>Terrain:</strong> {terrain}.
          </li>
          <li>
            <strong>Surface water:</strong> {surface_water}%.
          </li>
        </ul>
      </div>
    );
  }
}
