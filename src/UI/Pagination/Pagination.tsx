/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import styles from './Pagination.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setQuery } from '../../store/reducers/querySlice';

export function Pagination() {
  const { result } = useAppSelector((state) => state.search);
  const { page } = useAppSelector((state) => state.query);

  const hasNext = result?.pagination.has_next_page;
  const hasPrev = result?.data.length && page > 1;

  const dispatch = useAppDispatch();
  const paramsNavigate = useParamsNavigator();

  const getNextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setQuery({ page: page + 1 }));
  };

  const getPrevPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setQuery({ page: page - 1 }));
  };

  useEffect(() => {
    paramsNavigate(null, page);
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
