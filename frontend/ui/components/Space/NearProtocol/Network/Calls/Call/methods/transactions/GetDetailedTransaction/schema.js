import { object, string } from 'yup';

export const schema = object({
  transactionHash: string().required('Transaction hash is a mandatory field'),
  signerId: object({
    value: string().required(),
  })
    .nullable()
    .required('Signer Id is a mandatory field'),
});
