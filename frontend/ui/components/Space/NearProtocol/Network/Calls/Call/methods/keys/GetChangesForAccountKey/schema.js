import { object, string, array } from 'yup';

export const schema = object({
  accountKeyPairs: array().of(
    object().shape({
      accountId: object({
        value: string().required(),
      })
        .nullable()
        .required('Account Id is a mandatory field'),
      publicKey: object({
        value: string().required(),
      })
        .nullable()
        .required('Public key is a mandatory field'),
    }),
  ),
  blockId: string().test('mandatory', 'Block Id is a mandatory field', (value, context) => {
    if (context.parent.blockTarget === 'latest') return true;
    return Boolean(value);
  }),
});
