import * as yup from 'yup';
import { object, string } from 'yup';

export const schema = object({
  spaceName: yup.string().min(1, 'Min 1 character').max(30, 'Max characters 30'),
  name: string().when('networkCreateType', {
    is: 'addManually',
    then: () => string().required('Mandatory field').max(50, 'Max characters 50'),
  }),
  url: string().when('networkCreateType', {
    is: 'addManually',
    then: () => string().required('Mandatory field'),
  }),
  header: yup
    .object({
      name: yup.string().required('Mandatory field').max(250, 'Max characters 250'),
      value: yup.string().required('Mandatory field').max(250, 'Max characters 250'),
    })
    .nullable()
    .when('networkCreateType', {
      is: 'addManually',
      then: (schema) => schema.required('Header is mandatory for manual creation').nullable(),
    }),
});
