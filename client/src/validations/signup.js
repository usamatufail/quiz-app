import { object, string } from 'yup';

export const signupValidation = object({
  name: string().trim().required('This field is required!'),
  email: string()
    .trim()
    .email('Please enter a valid email!')
    .required('This field is required!'),
  password: string().trim().required('This field is required!'),
});
