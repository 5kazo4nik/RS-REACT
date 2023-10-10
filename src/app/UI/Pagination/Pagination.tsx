import { Component } from 'react';

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
      <div>
        <button disabled={!previous} onClick={this.getPrevPage}>
          Назад
        </button>
        <div>{page}</div>
        <button disabled={!next} onClick={this.getNextPage}>
          Вперед
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
