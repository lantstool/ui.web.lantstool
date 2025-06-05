import { getFormattedJSON } from '../../../../../../../../helpers/utils.js';
import { getDropdownValueForImport, getFormBlockTarget } from '../../utils.js';

// We want to support all call API versions

const getArgsFromImport = (args) => {
  try {
    if (typeof args === 'object') return getFormattedJSON(args);
    return args;
  } catch (e) {
    console.log(e);
    return ''; // Useless?
  }
};

// v1.0
const importTransformer10 = ({ params }) => ({
  contractId: getDropdownValueForImport(params.contractId),
  methodName: getDropdownValueForImport(params.methodName),
  args: getArgsFromImport(params.args),
  // TODO add abiModel
  ...getFormBlockTarget(params),
});

// v1.1
const importTransformer11 = ({ params }) => ({
  contractId: getDropdownValueForImport(params.contractId),
  methodName: getDropdownValueForImport(params.methodName),
  args: params.args,
  // TODO add abiModel
  ...getFormBlockTarget(params),
});

export const importTransformers = {
  '1.0': importTransformer10,
  '1.1': importTransformer11,
};
