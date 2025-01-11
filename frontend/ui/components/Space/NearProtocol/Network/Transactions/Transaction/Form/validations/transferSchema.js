import { string, object } from 'yup';

export const transferSchema = object({
  quantity: object({
    amount: string()
      .required()
      .test(
        'is-amount-a-valid-positive-number',
        'amount must be a positive number',
        (amount) => Number(amount) > 0,
      ),
  }).required(),
});
