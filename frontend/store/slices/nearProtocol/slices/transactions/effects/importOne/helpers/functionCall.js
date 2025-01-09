import { utils } from '../../../../../helpers/utils.js';
import { getFormattedJSON } from '../../../../../../../helpers/utils.js';

const getArgsForImport = (args) => {
  try {
    return getFormattedJSON(args);
  } catch (e) {
    return String(args);
  }
};

export const FunctionCall = ({ action, transactionConfig }) => {
  action.contractId = utils.getDropdownValueForImport(action.contractId);
  action.methodName = utils.getDropdownValueForImport(action.methodName);
  action.args = getArgsForImport(action.args);
  action.gas.unit = transactionConfig.gasUnits[action.gas.unit];
  action.deposit.unit = transactionConfig.nearUnits[action.deposit.unit];

  return action;
};
