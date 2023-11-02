import { useState } from 'react';
import styles from './Search.module.css';
import { useParamsNavigator } from '../../hooks/useNavigator';

interface ISearchProps {
  value: string;
  limit: string;
  changeLimit: (limit: string) => void;
}

export function Search({ value, limit, changeLimit }: ISearchProps) {
  const [searchValue, setSearchValue] = useState(value);
  const navigate = useParamsNavigator();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(null, searchValue, 1);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLimit(e.target.value);
  };

  return (
    <div className={styles.search}>
      <h1 className={styles.searchHeading}>Find any anime!</h1>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <select defaultValue={limit} onChange={onSelectChange}>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
        <input value={searchValue} className={styles.searchInput} type='text' onChange={onInputChange} />
        <button className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
}
