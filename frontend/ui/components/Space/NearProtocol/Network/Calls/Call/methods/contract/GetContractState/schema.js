import { object, string } from 'yup';

export const schema = object({
  contractId: object({
    value: string().required(),
  })
    .nullable()
    .required('Contract Id is a mandatory field'),
  keyPrefix: string().required('State prefix is a mandatory field'),
  blockId: string().test('mandatory', 'Block Id is a mandatory field', (value, context) => {
    if (context.parent.blockTarget === 'latest') return true;
    return Boolean(value);
  }),
});
