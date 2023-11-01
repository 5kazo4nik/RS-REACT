import styles from './Pagination.module.css';

interface IPaginationProps {
  hasNext: boolean;
  hasPrev: boolean;
  changePage: (page: number) => void;
  page: number;
}

export function Pagination({ hasNext, hasPrev, page, changePage }: IPaginationProps) {
  const getNextPage = () => {
    if (hasNext) {
      changePage(1);
    }
  };

  const getPrevPage = () => {
    if (hasPrev) {
      changePage(-1);
    }
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
