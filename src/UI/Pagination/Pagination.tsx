/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Pagination.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setIsAnimeLoading } from '../../store/reducers/loaderSlice';

export function Pagination() {
  const { animeData } = useAppSelector((state) => state.data);
  const { page, limit, search } = useAppSelector((state) => state.query);

  const hasNext = animeData?.pagination.has_next_page;
  const hasPrev = animeData?.data.length && page > 1;

  const paramsNavigate = useParamsNavigator();
  const dispatch = useAppDispatch();

  const getNextPage = () => {
    paramsNavigate(null, page + 1, '', search, limit || null);
    dispatch(setIsAnimeLoading(true));
  };

  const getPrevPage = () => {
    paramsNavigate(null, page - 1, '', search, limit || null);
    dispatch(setIsAnimeLoading(true));
  };

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
