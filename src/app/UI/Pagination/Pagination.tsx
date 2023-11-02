import { useContext } from 'react';
import styles from './Pagination.module.css';
import { SearchContext } from '../../context/SearchContext';

interface IPaginationProps {
  changePage: (page: number) => void;
  page: number;
}

export function Pagination({ page, changePage }: IPaginationProps) {
  const { searchResult } = useContext(SearchContext);
  const hasNext = searchResult?.pagination.has_next_page;
  const hasPrev = searchResult?.data.length && page > 1;

  const getNextPage = () => {
    changePage(1);
  };

  const getPrevPage = () => {
    changePage(-1);
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
