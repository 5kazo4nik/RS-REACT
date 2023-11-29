import UncontrolledForm from '../../components/UncontolledForm/UncontrolledForm';
import styles from './UncontrolledPage.module.css';

const UncontrolledPage = () => {
  return (
    <div className={`${styles.uncontrolled} page`}>
      <div className='form-page__wrapper'>
        <h1 className='form__head'>Uncontrolled form</h1>
        <UncontrolledForm />
      </div>
    </div>
  );
};

export default UncontrolledPage;
