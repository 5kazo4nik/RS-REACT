import { useParamsNavigator } from '../../hooks/useNavigator';
import styles from './NotFound.module.css';

const NotFound = () => {
  const paramsNavigate = useParamsNavigator();

  const onClickButton = () => {
    paramsNavigate('..', null, null);
  };

  return (
    <div className={styles.notFound}>
      <h6>Page not found...</h6>
      <h5>Page not found...</h5>
      <h4>Page not found...</h4>
      <h3>Page not found...</h3>
      <h2>Page not found...</h2>
      <h1>Page not found...</h1>
      <button className={styles.notFound__button} onClick={onClickButton}>
        Go to main
      </button>
    </div>
  );
};

export default NotFound;
