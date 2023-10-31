import { useContext } from 'react';
import styles from './Pagination.module.css';
import { SearchContext } from '../../context/SearchContext';

interface IPaginationProps {
  changePage: (page: number) => void;
  page: number;
}

export function Pagination({ page, changePage }: IPaginationProps) {
  const { searchResult } = useContext(SearchContext);
  const previous = searchResult?.previous;
  const next = searchResult?.next;

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
        disabled={!previous}
        onClick={getPrevPage}
      >
        {'<'}
      </button>
      <div className={styles.pagination__page}>{page}</div>
      <button className={`${styles.pagination__button} ${styles.button_next}`} disabled={!next} onClick={getNextPage}>
        {'>'}
      </button>
    </div>
  );
}
