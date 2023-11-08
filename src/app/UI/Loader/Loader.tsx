import classNames from 'classnames';
import styles from './Loader.module.css';

interface ILoaderProps {
  absolute?: boolean;
  details?: boolean;
}

export function Loader({ absolute, details }: ILoaderProps) {
  const loaderClassname = classNames(styles.loader, {
    [styles.loader_absolute]: !!absolute,
  });

  const spinClassname = classNames(styles.loader__spin, {
    [styles.loader__spin_details]: !!details,
  });

  return (
    <div className={loaderClassname}>
      <div className={spinClassname}></div>
    </div>
  );
}
