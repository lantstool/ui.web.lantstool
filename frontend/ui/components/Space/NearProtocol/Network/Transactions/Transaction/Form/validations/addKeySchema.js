import { object, string, mixed, array } from 'yup';
import { accountIdDropdown } from '../../../../_general/validations/accountId.js';
import { publicKeyDropdown } from '../../../../_general/validations/publicKey.js';

const allowanceSchema = object({
  amount: mixed().when('isUnlimited', {
    is: false,
    then: () =>
      string()
        .required()
        .test(
          'is-amount-a-valid-positive-number',
          'amount must be a positive number',
          (amount) => Number(amount) > 0,
        ),
  }),
});

const methodsSchema = object({
  list: mixed().when('onlyCertain', {
    is: true,
    then: () =>
      array()
        .of(
          object({
            methodName: object({
              value: string().required(),
            }),
          }),
        )
        .required(),
  }),
});

const restrictionsSchema = object({
  contractId: accountIdDropdown('contractId'),
  allowance: allowanceSchema,
  methods: methodsSchema,
});

export const addKeySchema = object({
  publicKey: publicKeyDropdown,
  permission: string().required().oneOf(['FullAccess', 'FunctionCall']),
  restrictions: object().when('permission', {
    is: 'FunctionCall',
    then: () => restrictionsSchema.required(),
  }),
});
