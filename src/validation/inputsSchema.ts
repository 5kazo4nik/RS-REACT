import * as yup from 'yup';

export const nameSchema = yup
  .string()
  .trim()
  .test('is-uppercase', (name) => {
    if (!name) return false;
    if (/[!@#$%^&*()_+{}\[\]:;<>,.?/~]/.test(name[0])) return false;
    return name[0] === name[0].toUpperCase();
  })
  .required();

export const ageSchema = yup.number().positive().required();

export const emailSchema = yup
  .string()
  .trim()
  .matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  .required();

export const passwordSchema = yup
  .string()
  .trim()
  .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~])/)
  .required();

export const genderSchema = yup.string().test('is-gender-selected', (value) => {
  return value === 'male' || value === 'female';
});

export const pictureSchema = yup
  .mixed()
  .required()
  .test('fileSize', '', (value) => {
    if (!value || !(value as FileList)[0]) return false;
    return (value as FileList)[0].size <= 5000000;
  })
  .test('type', '', (value) => {
    if (!value || !(value as FileList)[0]) return false;
    return ['image/jpeg', 'image/png'].includes((value as FileList)[0].type);
  });

export const countrySchema = yup
  .string()
  .trim()
  .test('is-correct-country', (value = '') => value?.length > 2);

export const formSchema = yup.object({
  name: nameSchema,
  age: ageSchema,
  email: emailSchema,
  password: passwordSchema,
  secondPassword: yup.string().oneOf([yup.ref('password')], ''),
  gender: genderSchema,
  picture: pictureSchema,
  country: countrySchema,
  tc: yup.boolean().isTrue()
});
