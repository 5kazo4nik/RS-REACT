/* eslint-disable react-hooks/exhaustive-deps */
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { PlanetsService } from '../../API/PlanetsService';
import { useFetch } from '../../hooks/useFetch';

import styles from './Details.module.css';
import { IPlanetData } from '../../types/PlanetsData';
import { Loader } from '../../UI/Loader/Loader';
import { useParamsNavigator } from '../../hooks/useNavigator';

type DetailsQuery = {
  detail: string;
};

const Details = () => {
  const location = useLocation();
  const { detail } = queryString.parse(location.search) as DetailsQuery;
  const paramsNavigate = useParamsNavigator();

  const [getPlanet, isLoading, message, searchResult] = useFetch(async () => {
    const res = await PlanetsService.getPlanet(detail);
    return res;
  }) as [(...args: unknown[]) => Promise<void>, boolean, string, IPlanetData | null];

  useEffect(() => {
    const { detail } = queryString.parse(location.search) as DetailsQuery;
    getPlanet(detail);
  }, [location.search]);

  const onButtonClose = () => {
    paramsNavigate('..', null, null, null);
  };

  return (
    <div className={styles.details}>
      {isLoading && <Loader absolute />}
      <div className={styles.details__wrapper}>
        {!message ? (
          <div className={styles.details__info}>
            <h2 className={styles.details__heading}>{searchResult?.name}</h2>
            <p className={styles.details__diam}>
              Diameter of this planet is <strong>{searchResult?.diameter} kilometers.</strong>
            </p>
            <ul className={styles.details__list}>
              <li>
                <strong>Orbital period:</strong> {searchResult?.orbital_period} days.
              </li>
              <li>
                <strong>Population:</strong> {searchResult?.population} units.
              </li>
              <li>
                <strong>Climate:</strong> {searchResult?.climate}.
              </li>
              <li>
                <strong>Terrain:</strong> {searchResult?.terrain}.
              </li>
              <li>
                <strong>Gravity:</strong> {searchResult?.gravity}.
              </li>
              <li>
                <strong>Rotation period:</strong> {searchResult?.rotation_period}.
              </li>
            </ul>
          </div>
        ) : (
          <h2 className='error-message'>Error: {message}</h2>
        )}
        <button className={styles.button__close} onClick={onButtonClose}>
          Close details
        </button>
      </div>
    </div>
  );
};

export default Details;
