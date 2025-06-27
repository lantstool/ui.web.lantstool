import { cloneDeep } from 'lodash';
import { utils } from '../../../../../helpers/utils.js';

export const FunctionCall = (formAction) => {
  const action = cloneDeep(formAction);

  action.contractId = utils.getDropdownValueForExport(action.contractId);
  action.methodName = utils.getDropdownValueForExport(action.methodName);
  action.gas.unit = utils.getDropdownValueForExport(action.gas.unit);
  action.deposit.unit = utils.getDropdownValueForExport(action.deposit.unit);

  return action;
};
