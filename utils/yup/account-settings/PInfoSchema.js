import * as yup from 'yup';

export const nameSchema = yup.object({
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
