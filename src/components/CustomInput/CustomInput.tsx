import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './CustomInput.module.css';

interface ICustomInput {
  head: string;
  inline?: boolean;
}

const CustomInput = (props: PropsWithChildren<ICustomInput>) => {
  const { children, head, inline } = props;

  const labelStyles = classNames(styles.input__head, {
    [styles.input__head_inline]: inline
  });

  return (
    <div className={styles.input}>
      <label className={labelStyles}>
        {head}
        {children}
      </label>
    </div>
  );
};

export default CustomInput;
