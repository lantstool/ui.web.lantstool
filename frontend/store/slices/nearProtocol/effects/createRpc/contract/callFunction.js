import { toBase64 } from '../../../../../helpers/toBase64.js';
import { toCamelCase } from '../../../../../helpers/toCamelCase.js';
import { getBlockTarget } from '../helpers/getBlockTarget.js';

export const callFunction =
  (provider) =>
  async ({ contractId, methodName, args, finality, blockId }) => {
    const response = await provider.query({
      request_type: 'call_function',
      account_id: contractId,
      method_name: methodName,
      args_base64: toBase64(args),
      ...getBlockTarget({ finality, blockId }),
    });
    return toCamelCase(response);
  };
