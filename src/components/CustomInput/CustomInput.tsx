import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './CustomInput.module.css';

interface ICustomInput {
  head: string;
  inline?: boolean;
  isValid?: boolean;
  message: string;
  isFirstSubmit: boolean;
}

const CustomInput = (props: PropsWithChildren<ICustomInput>) => {
  const { children, head, inline, isFirstSubmit, isValid, message } = props;

  const labelStyles = classNames(styles.input__head, {
    [styles.input__head_inline]: inline
  });

  return (
    <div className={styles.input}>
      <label className={labelStyles}>
        {head}
        {children}
      </label>
      {isValid !== undefined && <p className='validation-message'>{!isFirstSubmit && !isValid && message}</p>}
    </div>
  );
};

export default CustomInput;
