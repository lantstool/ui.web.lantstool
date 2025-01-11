import { object, string, array, lazy } from 'yup';

/**
 * 2. Schema for "AddKey":
 *    - type: "AddKey"
 *    - publicKey: a string (can be empty or any other string)
 *    - permission: "FullAccess" or "FunctionCall"
 *    - restrictions: an object, only if permission = "FullAccess"
 *        -> contractId: a string (can be empty or any other string)
 *        -> allowance: can be "unlimited" or an object { amount, unit }
 *           where amount: a string; unit: "NEAR" or "yoctoNEAR"
 *        -> methods: can be "all" or an array of strings
 */

const allowanceSchema = lazy((allowance) =>
  typeof allowance === 'string'
    ? string().oneOf(['unlimited'])
    : object({
        amount: string().defined(),
        unit: string().required().oneOf(['NEAR', 'yoctoNEAR']),
      }),
);

const methodsSchema = lazy((value) =>
  typeof value === 'string'
    ? string().defined().oneOf(['all'])
    : array().of(string().defined()).defined(),
);

const restrictionsSchema = object({
  contractId: string().defined(),
  allowance: allowanceSchema,
  methods: methodsSchema,
});

export const addKeySchema = object({
  type: string().required(),
  publicKey: string().defined(),
  permission: string().required().oneOf(['FullAccess', 'FunctionCall']),
  // restrictions field is required only when permission = "FullAccess"
  restrictions: object().when('permission', {
    is: 'FunctionCall',
    then: () => restrictionsSchema.required(),
    otherwise: () => object().notRequired().strip(), // strip() removes the field if permission="FunctionCall"
  }),
});
