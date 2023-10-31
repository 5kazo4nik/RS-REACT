import { Component, ReactNode } from 'react';
import styles from './Search.module.css';

interface ISearchProps {
  getPage: (url: string, page: number) => void;
  getPlanets: (val: string) => void;
  setTestError: () => void;
  value: string;
}

interface ISearchState {
  value: string;
}

export class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  private onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('searchValue', this.state.value);
    this.props.getPlanets(this.state.value);
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, value: e.target.value });
  };

  private onErrorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.setTestError();
  };

  render(): ReactNode {
    return (
      <div className={styles.search}>
        <h1 className={styles.searchHeading}>Find any Star Wars planet!</h1>
        <form className={styles.searchForm} onSubmit={this.onSubmit}>
          <input value={this.state.value} className={styles.searchInput} type='text' onChange={this.onInputChange} />
          <button className={styles.searchButton}>Search</button>
          <button className={styles.searchError} onClick={this.onErrorClick}>
            Error search
          </button>
        </form>
      </div>
    );
  }
}
