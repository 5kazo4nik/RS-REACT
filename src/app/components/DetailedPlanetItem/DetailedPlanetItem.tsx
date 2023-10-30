import React from 'react';
import styles from './DetailedPlanetItem.module.css';
import { IPlanetData } from '../../types/PlanetsData';

interface IDetailedPlanetItemProps {
  planet: IPlanetData;
}

const DetailedPlanetItem = ({ planet }: IDetailedPlanetItemProps) => {
  return (
    <div>
      <h2 className={styles.item__heading}>{planet?.name}</h2>
      <p className={styles.item__diam}>
        Diameter of this planet is <strong>{planet?.diameter} kilometers.</strong>
      </p>
      <ul className={styles.item__list}>
        <li>
          <strong>Orbital period:</strong> {planet?.orbital_period} days.
        </li>
        <li>
          <strong>Population:</strong> {planet?.population} units.
        </li>
        <li>
          <strong>Climate:</strong> {planet?.climate}.
        </li>
        <li>
          <strong>Terrain:</strong> {planet?.terrain}.
        </li>
        <li>
          <strong>Gravity:</strong> {planet?.gravity}.
        </li>
        <li>
          <strong>Rotation period:</strong> {planet?.rotation_period}.
        </li>
      </ul>
    </div>
  );
};

export default DetailedPlanetItem;
