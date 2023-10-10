import { Component, ReactNode } from 'react';
import styles from './Search.module.css';

interface ISearchProps {
  getPlanets: (val: string) => void;
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

  render(): ReactNode {
    return (
      <div className={styles.search}>
        <h1 className={styles.searchHeading}>Find any Star Wars planet!</h1>
        <form className={styles.searchForm} onSubmit={this.onSubmit}>
          <input value={this.state.value} className={styles.searchInput} type='text' onChange={this.onInputChange} />
          <button className={styles.searchBtn}>Search</button>
        </form>
      </div>
    );
  }

  private onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('searchValue', this.state.value);
    this.props.getPlanets(this.state.value);
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, value: e.target.value });
  };
}
