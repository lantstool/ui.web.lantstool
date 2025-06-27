import { utils } from '../../../../../helpers/utils.js';
import { getFormattedJSON } from '../../../../../../../helpers/utils.js';

const getArgsFromImportV10 = (args) => {
  try {
    if (typeof args === 'object') return getFormattedJSON(args);
    return args;
  } catch (e) {
    console.log(e);
    return ''; // Useless?
  }
};

// in v1.0 we tried to convert args to object when it is possible for better readability.
// in v1.1 we just export a string since we move to json5 args format instead of json
const transformArgs = (args, version) => {
  if (version === '1.0') return getArgsFromImportV10(args);
  if (version === '1.1') return args;
}

export const FunctionCall = ({ action, transactionConfig, version }) => {
  action.contractId = utils.getDropdownValueForImport(action.contractId);
  action.methodName = utils.getDropdownValueForImport(action.methodName);
  action.args = transformArgs(action.args, version);
  action.gas.unit = transactionConfig.gasUnits[action.gas.unit];
  action.deposit.unit = transactionConfig.nearUnits[action.deposit.unit];

  return action;
};
