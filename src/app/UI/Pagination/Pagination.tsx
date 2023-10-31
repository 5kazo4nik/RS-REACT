import { Component } from 'react';

import styles from './Pagination.module.css';

interface IPaginationProps {
  next: string | null;
  previous: string | null;
  getPage: (url: string, page: number) => void;
  page: number;
}

export class Pagination extends Component<IPaginationProps> {
  render() {
    const { next, previous, page } = this.props;

    return (
      <div className={styles.pagination}>
        <button
          className={`${styles.pagination__button} ${styles.button_prev}`}
          disabled={!previous}
          onClick={this.getPrevPage}
        >
          {'<'}
        </button>
        <div className={styles.pagination__page}>{page}</div>
        <button
          className={`${styles.pagination__button} ${styles.button_next}`}
          disabled={!next}
          onClick={this.getNextPage}
        >
          {'>'}
        </button>
      </div>
    );
  }

  getNextPage = () => {
    if (this.props.next) {
      this.props.getPage(this.props.next, 1);
    }
  };

  getPrevPage = () => {
    if (this.props.previous) {
      this.props.getPage(this.props.previous, -1);
    }
  };
}
