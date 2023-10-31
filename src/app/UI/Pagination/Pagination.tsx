import styles from './Pagination.module.css';

interface IPaginationProps {
  next: string | null;
  previous: string | null;
  changePage: (page: number) => void;
  page: number;
}

export function Pagination({ next, previous, page, changePage }: IPaginationProps) {
  const getNextPage = () => {
    if (next) {
      changePage(1);
    }
  };

  const getPrevPage = () => {
    if (previous) {
      changePage(-1);
    }
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
