import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup.string().email()
    .required('email name is required'),

  password: yup.string()
    .required('password is required'),

});
