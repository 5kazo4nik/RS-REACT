/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './Pagination.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useParamsNavigator } from '../../hooks/useNavigator';

export function Pagination() {
  const { result } = useAppSelector((state) => state.search);
  const { page } = useAppSelector((state) => state.query);

  const hasNext = result?.pagination.has_next_page;
  const hasPrev = result?.data.length && page > 1;

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
      <button
        className={`${styles.pagination__button} ${styles.button_prev}`}
        disabled={!hasPrev}
        onClick={getPrevPage}
      >
        {'<'}
      </button>
      <div className={styles.pagination__page}>{page}</div>
      <button
        className={`${styles.pagination__button} ${styles.button_next}`}
        disabled={!hasNext}
        onClick={getNextPage}
      >
        {'>'}
      </button>
    </div>
  );
}
