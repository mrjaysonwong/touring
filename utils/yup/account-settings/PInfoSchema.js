import * as yup from 'yup';

export const nameSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
});

export const phoneSchema = yup.object().shape({
  phone: yup.object().shape({
    areaCode: yup.string().required('Phone area code is required'),
    phoneNumber: yup
      .string()
      .min(5, 'Minimum of 5 digits')
      .max(20, 'Maximum of 20 digits')
      .matches(/^[0-9]*$/, 'Phone number can only contain digits')
      .required('Phone number is required'),
  }),
});

export const dateOfBirthSchema = yup.object({
  dateOfBirth: yup.string().required('Date of Birth is required'),
});

export const homeTownSchema = yup.object({
  homeTown: yup.string().required('Home town is required'),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
});

export const newEmailSchema = yup.object().shape({
  newEmail: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email address'),
  emailConfirm: yup
    .string()
    .trim()
    .required('Confirm new email')
    .oneOf([yup.ref('newEmail')], 'Email must match'),
});
