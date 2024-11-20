import * as yup from 'yup';

export const schema = yup.object({
  rpcName: yup.string().required('Empty field').max(200, 'Max characters 200'),
  url: yup.string().required('Empty field'),
  header: yup.lazy((value) =>
    value === null
      ? yup.mixed().nullable()
      : yup.object({
          name: yup.string().required('Empty field').max(255),
          value: yup.string().required('Empty field').max(255),
        }),
  ),
});
