/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import styles from './Pagination.module.css';
import { SearchContext } from '../../context/SearchContext';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { ISearchData } from '../../types/PlanetsData';

export function Pagination() {
  const { searchResult } = useContext(SearchContext);
  const { previous, next } = searchResult as ISearchData;

  const { page } = useAppSelector((state) => state.query);
  const [p, setP] = useState(page);
  const paramsNavigate = useParamsNavigator();

  const getNextPage = () => {
    setP(p + 1);
  };

  const getPrevPage = () => {
    setP(p - 1);
  };

  useEffect(() => {
    paramsNavigate(null, p);
  }, [p]);

  useEffect(() => {
    setP(page);
  }, [page]);

  return (
    <div className={styles.pagination}>
      <button className={`${styles.pagination__btn} ${styles.btn_prev}`} disabled={!previous} onClick={getPrevPage}>
        {'<'}
      </button>
      <div className={styles.pagination__page}>{page}</div>
      <button className={`${styles.pagination__btn} ${styles.btn_next}`} disabled={!next} onClick={getNextPage}>
        {'>'}
      </button>
    </div>
  );
}
