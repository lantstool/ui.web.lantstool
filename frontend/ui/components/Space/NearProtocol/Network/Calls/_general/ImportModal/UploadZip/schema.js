import * as yup from 'yup';

export const schema = yup.object({
  file: yup.mixed().required('Select call file'),
});

