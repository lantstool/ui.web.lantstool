import { object, string } from 'yup';
import { accountIdDropdown } from '../../../../_general/validations/accountId.js';

export const functionCallSchema = object({
  contractId: accountIdDropdown('contractId'),
  methodName: object({
    value: string().required(),
  }),
  // args: string()object().json(),
  gas: object({
    amount: string()
      .required()
      .test(
        'is-amount-a-valid-positive-number',
        'amount must be a positive number',
        (amount) => Number(amount) > 0,
      ),
  }),
  deposit: object({
    amount: string().test(
      'is-amount-a-valid-positive-number',
      'amount must be >= 0',
      (amount) => Number(amount) >= 0,
    ),
  }),
});
