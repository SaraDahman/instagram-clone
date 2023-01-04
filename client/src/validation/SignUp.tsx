import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup.string()
    .email('Please enter a valid email')
    .required('email is required'),

  fullName: yup.string().min(1).max(30)
    .required('Full name is required'),

  username: yup.string().min(5).max(30)
    .required('Username is required'),

  password: yup.string().min(6).max(15)
    .required('Password is required'),
});
