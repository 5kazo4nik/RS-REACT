import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Info from '../../components/Info/Info';

const Home = () => {
  return (
    <div className={`${styles.home} page`}>
      <div className={styles.home__links}>
        <Link className={styles.home__link} to='/controlled'>
          Controlled form
        </Link>
        <Link className={styles.home__link} to='/uncontrolled'>
          Uncontrolled form
        </Link>
      </div>
      <Info />
    </div>
  );
};

export default Home;
