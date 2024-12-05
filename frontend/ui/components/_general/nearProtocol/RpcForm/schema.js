import * as yup from 'yup';

export const schema = yup.object({
  rpcName: yup.string().required('Mandatory field').max(50, 'Max characters 50'),
  url: yup.string().required('Mandatory field').url('Incorrect URL format'),
  header: yup.lazy((value) =>
    value === null
      ? yup.mixed().nullable()
      : yup.object({
          name: yup.string().required('Mandatory field').max(250),
          value: yup.string().required('Mandatory field').max(250),
        }),
  ),
});
