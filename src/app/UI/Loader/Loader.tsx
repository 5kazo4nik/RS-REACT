import styles from './Loader.module.css';

interface ILoaderProps {
  absolute?: boolean;
}

export function Loader({ absolute }: ILoaderProps) {
  const loaderClassname = `${styles.loader} ${absolute ? styles.loader_absolute : ''}`;

  return (
    <div className={loaderClassname}>
      <div className={styles.loader__spin}></div>
    </div>
  );
}
