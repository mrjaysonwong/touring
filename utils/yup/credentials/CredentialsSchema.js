import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    )
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  passwordConfirm: yup
    .string()
    .trim()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .trim()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    )
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  newPassword: yup
    .string()
    .trim()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    )
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  passwordConfirm: yup
    .string()
    .trim()
    .required('Confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
