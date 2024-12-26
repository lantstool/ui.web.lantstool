import { object, string, array } from 'yup';

export const schema = object({
  contractIds: array().of(
    object().shape({
      contractId: object({
        value: string().required(),
      })
        .nullable()
        .required('Contract Id is a mandatory field'),
    }),
  ),
  keyPrefix: string(),
  blockId: string().test('mandatory', 'Block Id is a mandatory field', (value, context) => {
    if (context.parent.blockTarget === 'latest') return true;
    return Boolean(value);
  }),
});
