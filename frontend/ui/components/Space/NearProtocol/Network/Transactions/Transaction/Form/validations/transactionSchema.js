import { object, array, lazy } from 'yup';
import { accountIdDropdown } from '../../../../_general/validations/accountId.js';
import { publicKeyDropdown } from '../../../../_general/validations/publicKey.js';
import { createAccountSchema } from './createAccountSchema.js';
import { addKeySchema } from './addKeySchema.js';
import { transferSchema } from './transferSchema.js';
import { deployContractSchema } from './deployContractSchema.js';
import { functionCallSchema } from './functionCallSchema.js';
import { deleteKeySchema } from './deleteKeySchema.js';
import { deleteAccountSchema } from './deleteAccountSchema.js';

export const transactionSchema = object({
  signerId: accountIdDropdown('signerId'),
  signerKey: publicKeyDropdown,
  receiverId: accountIdDropdown('receiverId'),
  actions: array()
    .of(
      lazy((action) => {
        if (action?.type === 'CreateAccount') return createAccountSchema;
        if (action?.type === 'AddKey') return addKeySchema;
        if (action?.type === 'Transfer') return transferSchema;
        if (action?.type === 'DeployContract') return deployContractSchema;
        if (action?.type === 'FunctionCall') return functionCallSchema;
        if (action?.type === 'DeleteKey') return deleteKeySchema;
        if (action?.type === 'DeleteAccount') return deleteAccountSchema;
      }),
    )
    .required(),
});
