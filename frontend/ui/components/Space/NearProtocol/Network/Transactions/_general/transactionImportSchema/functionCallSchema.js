import { lazy, object, string } from 'yup';

const argsSchema = lazy((args) =>
  typeof args === 'string' ? string().defined() : object().required().json(),
);

export const functionCallSchema = object({
  type: string().required(),
  contractId: string().defined(),
  methodName: string().defined(),
  args: argsSchema,
  gas: object({
    amount: string().defined(),
    unit: string().required().oneOf(['gas', 'TGas']),
  }),
  deposit: object({
    amount: string().defined(),
    unit: string().required().oneOf(['NEAR', 'yoctoNEAR']),
  }),
});
