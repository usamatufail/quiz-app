import { object, string } from 'yup';

export const signinValidation = object({
  email: string()
    .trim()
    .email('Please enter a valid email!')
    .required('This field is required!'),
  password: string().trim().required('This field is required!'),
});
