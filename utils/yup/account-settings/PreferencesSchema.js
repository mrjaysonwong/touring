import * as yup from 'yup';

export const languageSchema = yup.object({
  tourLanguage: yup.string().required('Language is required'),
});

export const specialReqSchema = yup.object({
  specialReq: yup.string().max(500, 'Maximum of 500 characters'),
});
