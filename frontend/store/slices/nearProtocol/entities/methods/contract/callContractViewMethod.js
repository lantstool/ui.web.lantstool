import { toBase64 } from '../../../../../helpers/toBase64.js';
import { getBlockTarget } from '../utils.js';

// https://docs.near.org/api/rpc/contracts#call-a-contract-function

export async function callContractViewMethod({
  contractId,
  methodName,
  args,
  finality,
  blockId,
  responseNameConvention = 'camelCase',
}) {
  return await this.sendRequest({
    body: {
      method: 'query',
      params: {
        request_type: 'call_function',
        account_id: contractId,
        method_name: methodName,
        args_base64: toBase64(args),
        ...getBlockTarget({ finality, blockId }),
      },
    },
    responseNameConvention,
  });
}
