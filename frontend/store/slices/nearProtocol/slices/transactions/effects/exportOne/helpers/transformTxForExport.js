import { cloneDeep } from 'lodash';
import { utils } from '../../../../../helpers/utils.js';
import { AddKey } from './addKey.js';
import { DeployContract } from './deployContract.js';
import { FunctionCall } from './functionCall.js';

const CreateAccount = (formAction) => cloneDeep(formAction);

const Transfer = (formAction) => {
  const action = cloneDeep(formAction);
  action.quantity.unit = utils.getDropdownValueForExport(action.quantity.unit);
  return action;
};

const DeleteKey = (formAction) => ({
  type: formAction.type,
  publicKey: utils.getDropdownValueForExport(formAction.publicKey),
});

const DeleteAccount = (formAction) => ({
  type: formAction.type,
  beneficiaryId: utils.getDropdownValueForExport(formAction.beneficiaryId),
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

const transformActions = (actions, store) =>
  Promise.all(actions.map((action) => transformers[action.type](action, store)));

export const transformTxForExport = async (savedTx, formValues, store) => ({
  blockchain: 'near-protocol',
  networkId: savedTx.networkId,
  transaction: {
    version: '1.1',
    name: savedTx.name,
    signerId: utils.getDropdownValueForExport(formValues.signerId),
    signerKey: utils.getDropdownValueForExport(formValues.signerKey),
    receiverId: utils.getDropdownValueForExport(formValues.receiverId),
    actions: await transformActions(formValues.actions, store),
  },
});
