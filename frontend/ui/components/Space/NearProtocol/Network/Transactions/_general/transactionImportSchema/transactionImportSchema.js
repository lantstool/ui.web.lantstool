import { object, string, array, lazy, mixed } from 'yup';
import { createAccountSchema } from './createAccountSchema.js';
import { addKeySchema } from './addKeySchema.js';
import { transferSchema } from './transferSchema.js';
import { deployContractSchema } from './deployContractSchema.js';
import { functionCallSchema } from './functionCallSchema.js';
import { deleteKeySchema } from './deleteKeySchema.js';
import { deleteAccountSchema } from './deleteAccountSchema.js';

export const transactionImportSchema = object({
  json: object({
    blockchain: string().required().oneOf(['near-protocol']),
    networkId: string().required(),
    transaction: object({
      version: string().required(),
      name: string().required().min(1, 'Length 1 symbols').max(100, 'Length 100 symbols'),
      signerId: string().defined(),
      signerKey: string().defined(),
      receiverId: string().defined(),
      actions: array().of(
        lazy((action) => {
          if (action?.type === 'CreateAccount') return createAccountSchema;
          if (action?.type === 'AddKey') return addKeySchema;
          if (action?.type === 'Transfer') return transferSchema;
          if (action?.type === 'DeployContract') return deployContractSchema;
          if (action?.type === 'FunctionCall') return functionCallSchema;
          if (action?.type === 'DeleteKey') return deleteKeySchema;
          if (action?.type === 'DeleteAccount') return deleteAccountSchema;

          return mixed().test({
            name: 'unknown-type',
            message: `Unsupported action type '${action.type}'`,
            test: () => false,
          });
        }),
      ),
    }).required(),
  })
    .json()
    .typeError('Invalid JSON'),
});
