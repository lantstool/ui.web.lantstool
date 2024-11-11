import { getBlockTargetParams } from '../utils.js';

export const getChangesForAccountKey = (rpc, params) => {
  const accountKeyPairs = params.accountKeyPairs.map((pair) => ({
    accountId: pair.accountId.value,
    publicKey: pair.publicKey.value,
  }));

  return rpc.getChangesForAccountKey(
    getBlockTargetParams({
      accountKeyPairs,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
};
