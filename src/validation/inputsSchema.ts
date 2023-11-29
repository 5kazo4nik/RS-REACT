import * as yup from 'yup';

export const nameSchema = yup
  .string()
  .test('is-uppercase', (name) => {
    if (!name) return false;
    return name[0] === name[0].toUpperCase();
  })
  .required();

export const ageSchema = yup.number().positive().required();

export const emailSchema = yup
  .string()
  .matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  .required();

export const passwordSchema = yup
  .string()
  .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~])/)
  .required();

export const genderSchema = yup.string().test('is-gender-selected', (value) => {
  return value === 'male' || value === 'female';
});

export const pictureSchema = yup.object().shape({
  size: yup.number().max(5242880),
  type: yup.string().test('is-correct-type', (value) => {
    return value === 'image/jpeg' || value === 'image/png';
  })
});
