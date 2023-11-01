/* eslint-disable react-hooks/exhaustive-deps */
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimeService } from '../../API/AnimeService';
import { useFetch } from '../../hooks/useFetch';

import styles from './Details.module.css';
import { Loader } from '../../UI/Loader/Loader';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { IAnimeData } from '../../types/AnimeData';

type DetailsQuery = {
  detail: string;
};

const Details = () => {
  const location = useLocation();
  const { detail } = queryString.parse(location.search) as DetailsQuery;
  const paramsNavigate = useParamsNavigator();

  const [getPlanet, isLoading, message, searchResult] = useFetch(async () => {
    const res = await AnimeService.getPlanet(detail);
    return res;
  }) as [(...args: unknown[]) => Promise<void>, boolean, string, IAnimeData | null];

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
            <h2 className={styles.details__heading}>{searchResult?.data.title_english}</h2>
            <p className={styles.details__score}>
              Score of this anime is <strong>{searchResult?.data.score}</strong>
            </p>
            <ul className={styles.details__list}>
              <li>
                <strong>Episodes:</strong> {searchResult?.data.episodes}.
              </li>
              <li>
                <strong>Status:</strong> {searchResult?.data.status}.
              </li>
              <li>
                <strong>Rating:</strong> {searchResult?.data.rating}.
              </li>
              <li>
                <strong>Year:</strong> {searchResult?.data.year}.
              </li>
            </ul>
            <h2 className={styles.details__heading}>Synopsis</h2>
            <p className={styles.details__sinopsis}>{searchResult?.data.synopsis}</p>
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
