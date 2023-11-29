import { FormEvent, useRef, useState } from 'react';
import { countryList } from '../../data/countryList';
import CustomInput from '../CustomInput/CustomInput';
import styles from './UncontrolledForm.module.css';
import { IRefsInputs } from '../../types/RefsInputs';
import { validateUncontrolledForm } from '../../validation/validateUncontrolledForm';
import { messages } from '../../data/validationMessages';

const validInitState = {
  name: false,
  age: false,
  email: false,
  password: false,
  secondPassword: false,
  gender: false,
  picture: false,
  country: false,
  tc: false
};

const UncontrolledForm = () => {
  const inputRefs = useRef<IRefsInputs>({});
  const [validState, setValidState] = useState(validInitState);
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      current: { name, age, country, email, gender, password, picture, secondPassword, tc }
    } = inputRefs;

    const { isAllValid, ...newValidationState } = await validateUncontrolledForm(
      name?.value,
      age?.value,
      email?.value,
      password?.value,
      secondPassword?.value,
      gender?.value,
      !!picture?.files?.length && picture.files[0],
      tc?.checked
    );

    setValidState(newValidationState);

    if (isAllValid) {
      setIsFirstSubmit(true);
    } else {
      setIsFirstSubmit(false);
    }
  };

  return (
    <form className={`${styles.form} form`} onSubmit={handleSubmit}>
      <CustomInput head='Name:' message={messages.email} isValid={validState.name} isFirstSubmit={isFirstSubmit}>
        <input ref={(el) => (inputRefs.current.name = el)} className='input_text' type='text' />
      </CustomInput>

      <CustomInput head='Age:' message={messages.age} isValid={validState.age} isFirstSubmit={isFirstSubmit}>
        <input ref={(el) => (inputRefs.current.age = el)} className='input_text' type='number' min={1} />
      </CustomInput>

      <CustomInput head='Email:' message={messages.email} isValid={validState.email} isFirstSubmit={isFirstSubmit}>
        <input ref={(el) => (inputRefs.current.email = el)} className='input_text' type='text' />
      </CustomInput>

      <CustomInput
        head='Password:'
        message={messages.password}
        isValid={validState.password}
        isFirstSubmit={isFirstSubmit}
      >
        <input ref={(el) => (inputRefs.current.password = el)} className='input_text' type='password' />
      </CustomInput>

      <CustomInput
        head='Repeat password:'
        message={messages.secondPassword}
        isValid={validState.secondPassword}
        isFirstSubmit={isFirstSubmit}
      >
        <input ref={(el) => (inputRefs.current.secondPassword = el)} className='input_text' type='password' />
      </CustomInput>

      <CustomInput head='Gender:' message={messages.gender} isValid={validState.gender} isFirstSubmit={isFirstSubmit}>
        <select ref={(el) => (inputRefs.current.gender = el)} defaultValue='gender' className='input_select'>
          <option disabled value='gender'>
            Gender
          </option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </CustomInput>

      <CustomInput
        head='Picture:'
        message={messages.picture}
        isValid={validState.picture}
        isFirstSubmit={isFirstSubmit}
      >
        <input ref={(el) => (inputRefs.current.picture = el)} type='file' accept='image/jpeg, image/png' />
      </CustomInput>

      <CustomInput
        head='Country:'
        message={messages.country}
        isValid={validState.country}
        isFirstSubmit={isFirstSubmit}
      >
        <select ref={(el) => (inputRefs.current.country = el)} className='input_select' autoComplete='country-name'>
          {countryList.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
      </CustomInput>

      <CustomInput head='Accept T&C' inline message={messages.tc} isValid={validState.tc} isFirstSubmit={isFirstSubmit}>
        <input ref={(el) => (inputRefs.current.tc = el)} type='checkbox' />
      </CustomInput>

      <button className={`${styles.form__button_uncontrolled} form__button`} type='submit'>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
