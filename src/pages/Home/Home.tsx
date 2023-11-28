import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__wrapper}>
        <Link className={styles.home__link} to='/controlled'>
          Controlled form
        </Link>
        <Link className={styles.home__link} to='/uncontrolled'>
          Uncontrolled form
        </Link>
      </div>
    </div>
  );
};

export default Home;
