import { cloneDeep } from 'lodash';
import { utils } from '../../../../../helpers/utils.js';

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

export const AddKey = (formAction) => {
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
