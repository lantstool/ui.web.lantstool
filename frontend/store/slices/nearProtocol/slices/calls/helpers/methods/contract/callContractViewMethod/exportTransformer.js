import {
  getBlockTargetParams,
  getDropdownValueForExport,
  transformForExport,
} from '../../utils.js';

/** v1.0 - We transform args into JSON or String
 *  v1.1 - Just a plain string, no conversions
 */
export const exportTransformer = transformForExport({
  version: '1.1',
  paramsExtractor: (params) =>
    getBlockTargetParams({
      contractId: getDropdownValueForExport(params.contractId),
      methodName: getDropdownValueForExport(params.methodName),
      args: params.args,
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});
