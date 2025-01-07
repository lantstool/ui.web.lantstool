import { cloneDeep } from 'lodash';
import { utils } from '../../../../helpers/utils.js';

const CreateAccount = (formAction) => cloneDeep(formAction);

const getAllowance = (allowance) =>
  allowance.isUnlimited
    ? 'unlimited'
    : {
        amount: allowance.amount,
        unit: utils.getDropdownValueForExport(allowance.unit),
      };

const getMethods = (methods) =>
  methods.onlyCertain
    ? methods.list.map((method) => utils.getDropdownValueForExport(method.methodName))
    : 'all';

const AddKey = (formAction) => {
  const action = cloneDeep(formAction);

  action.publicKey = utils.getDropdownValueForExport(action.publicKey);

  if (action.permission === 'FullAccess') {
    delete action.restrictions;
    return action;
  }

  action.restrictions.contractId = utils.getDropdownValueForExport(action.restrictions.contractId);
  action.restrictions.allowance = getAllowance(action.restrictions.allowance);
  action.restrictions.methods = getMethods(action.restrictions.methods);

  return action;
};

const Transfer = (formAction) => {
  const action = cloneDeep(formAction);
  action.quantity.unit = utils.getDropdownValueForExport(action.quantity.unit);
  return action;
};

const FunctionCall = (formAction) => {
  const action = cloneDeep(formAction);

  action.contractId = utils.getDropdownValueForExport(action.contractId);
  action.methodName = utils.getDropdownValueForExport(action.methodName);
  action.gas.unit = utils.getDropdownValueForExport(action.gas.unit);
  action.deposit.unit = utils.getDropdownValueForExport(action.deposit.unit);

  return action;
};

const DeployContract = (formAction) => {
  return {
    type: formAction.type,
    fileName: formAction.fileName,
    base64File: '',
  };
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

const transformActions = (actions) => actions.map((action) => transformers[action.type](action));

export const transformTxForExport = (savedTx, formValues) => {
  console.log(savedTx);
  return {
    blockchain: 'near-protocol',
    networkId: savedTx.networkId,
    transaction: {
      version: '1.0',
      name: savedTx.name,
      signerId: utils.getDropdownValueForExport(formValues.signerId),
      signerKey: utils.getDropdownValueForExport(formValues.signerKey),
      receiverId: utils.getDropdownValueForExport(formValues.receiverId),
      actions: transformActions(formValues.actions),
    },
  };
};
