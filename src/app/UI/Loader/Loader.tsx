import styles from './Loader.module.css';

interface ILoaderProps {
  absolute?: boolean;
  details?: boolean;
}

export function Loader({ absolute, details }: ILoaderProps) {
  const loaderClassname = `${styles.loader} ${absolute ? styles.loader_absolute : ''}`;
  const spinClassname = `${styles.loader__spin} ${details ? styles.loader__spin_details : ''}`;

  return (
    <div className={loaderClassname}>
      <div className={spinClassname}></div>
    </div>
  );
}
