import styles from './Pagination.module.css';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { ISearchData } from '../../types/AnimeData';
import { ServerQueryParams } from '../../utils/getServerSideParams';

export interface IPaginationProps {
  animeData: ISearchData | null;
  query: ServerQueryParams;
}

export function Pagination({ animeData, query }: IPaginationProps) {
  const { page, limit, search } = query;

  const hasNext = animeData?.pagination.has_next_page;
  const hasPrev = animeData?.data.length && +page > 1;

  const paramsNavigate = useParamsNavigator();

  const getNextPage = () => {
    paramsNavigate(null, +page + 1, '', search, limit || null);
  };

  const getPrevPage = () => {
    paramsNavigate(null, +page - 1, '', search, limit || null);
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
