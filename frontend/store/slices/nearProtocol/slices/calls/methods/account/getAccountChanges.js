import { getBlockTargetParams } from '../utils.js';

const defaultFormValues = {
  method: { value: 'getAccountChanges', label: 'Get Account Changes' },
  accountIds: [{ accountId: null }],
  blockTarget: 'specific',
  finality: { value: 'final', label: 'Final' },
  blockId: '',
};

const rpcCaller = (rpc, params) => {
  const accountIds = params.accountIds.map(({ accountId }) => accountId.value);

  return rpc.getAccountChanges(
    getBlockTargetParams({
      accountIds,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
};

export const getAccountChanges = {
  defaultFormValues,
  rpcCaller,
};
