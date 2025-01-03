import { object, string } from 'yup';

export const waitUntilSchema = object({
  waitUntil: string()
    .oneOf(['NONE', 'INCLUDED', 'EXECUTED_OPTIMISTIC', 'INCLUDED_FINAL', 'EXECUTED', 'FINAL'])
    .required(),
}).required('Params are required');
