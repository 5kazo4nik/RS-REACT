import { ChangeEvent, FocusEventHandler, MouseEvent, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types';
import styles from './AutoInput.module.css';

interface IAutoInputProps {
  link?: (el: HTMLInputElement) => void;
  items: string[];
  reg?: UseFormRegisterReturn;
}

const AutoInput = ({ link, items, reg }: IAutoInputProps) => {
  const [list, setList] = useState(items);
  const [isShown, setIsShown] = useState(false);
  const [value, setValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    reg?.onChange(e);
    const val = e.target.value;
    setValue(val);
    const newList = items.filter((item) => item.includes(val) && item !== val);
    setList(newList);
    setIsShown(true);
  };

  const onFocusHandler: FocusEventHandler = () => {
    setIsShown(true);
  };

  const onBlurHandler: FocusEventHandler = (e) => {
    reg?.onBlur(e);
    setIsShown(false);
  };

  const selectCountry = (e: MouseEvent, val: string) => {
    setIsShown(true);
    e.preventDefault();
    setValue(val);
    setIsShown(false);
    const newList = items.filter((item) => item.includes(val) && item !== val);
    setList(newList);
  };

  return (
    <div className={styles.autoInput}>
      {isShown && (
        <ul className={styles.autoInput__list}>
          {list.map((item, i) => (
            <li onMouseDown={(e) => selectCountry(e, item)} className={styles.autoInput__item} key={i}>
              {item}
            </li>
          ))}
        </ul>
      )}
      <input
        ref={link}
        {...reg}
        value={value}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        className={`input_text ${styles.input_auto}`}
        type='text'
      />
    </div>
  );
};

export default AutoInput;
