import { useState } from 'react';
import styles from './Search.module.css';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSearchValue } from '../../store/reducers/searchSlice';

export function Search() {
  const { search } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(search);
  const navigate = useParamsNavigator();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchValue(inputValue));
    navigate(null, 1);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.search}>
      <h1 className={styles.searchHeading}>Find any Star Wars planet!</h1>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <input value={inputValue} className={styles.searchInput} type='text' onChange={onInputChange} />
        <button className={styles.searchBtn}>Search</button>
      </form>
    </div>
  );
}
