import { utils } from '../../../../../helpers/utils.js';
import { AddKey } from './addKey.js';
import { FunctionCall } from './functionCall.js';

const CreateAccount = ({ action }) => action;

const Transfer = ({ action, transactionConfig }) => {
  action.quantity.unit = transactionConfig.nearUnits[action.quantity.unit];
  return action;
};

const DeployContract = ({ action }) => action;

const DeleteKey = ({ action }) => ({
  type: action.type,
  publicKey: utils.getDropdownValueForImport(action.publicKey),
});

const DeleteAccount = ({ action }) => ({
  type: action.type,
  beneficiaryId: utils.getDropdownValueForImport(action.beneficiaryId),
});

const transformers = {
  CreateAccount,
  AddKey,
  Transfer,
  FunctionCall,
  DeployContract,
  DeleteKey,
  DeleteAccount,
};

const transformActions = (actions, store, transactionConfig) =>
  Promise.all(
    actions.map((action) =>
      transformers[action.type]({
        action,
        store,
        transactionConfig,
      }),
    ),
  );

export const transformBodyForImport = async (transaction, store, transactionConfig) => {
  const { signerId, signerKey, receiverId, actions } = transaction;
  return {
    signerId: utils.getDropdownValueForImport(signerId),
    signerKey: utils.getDropdownValueForImport(signerKey),
    receiverId: utils.getDropdownValueForImport(receiverId),
    actions: await transformActions(actions, store, transactionConfig),
  };
};
