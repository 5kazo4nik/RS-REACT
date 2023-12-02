import React from 'react';
import styles from './PasswordStr.module.css';
import classNames from 'classnames';

interface IPasswordStrProps {
  value: string;
  min: number;
}

const PasswordStr = ({ value, min }: IPasswordStrProps) => {
  if (value.length < min) return <></>;
  const isGood = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/.test(value);
  const isMiddle = !isGood && /^(?=.*[A-Za-z])(?=.*\d).{9,}$/.test(value);
  const isBad = !isMiddle && /^.{6,}$/.test(value);

  const barClassName = classNames(styles.proggress__bar, {
    [styles.proggress__bar_good]: isGood,
    [styles.proggress__bar_middle]: isMiddle,
    [styles.proggress__bar_bad]: isBad
  });

  return (
    <div className={styles.passwordStr}>
      <div className={styles.proggress}>
        <div className={barClassName}></div>
      </div>
      {!isGood && (
        <p className={styles.passwordStr__message}>
          Use capital letters, numbers, and special characters to improve your password. The more characters the better.
        </p>
      )}
    </div>
  );
};

export default PasswordStr;
