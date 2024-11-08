import { getBlockTargetParams } from '../helpers/getBlockTargetParams.js';

export const getKey = (rpc, params) =>
  rpc.keys.viewAccessKey(
    getBlockTargetParams({
      accountId: params.accountId.value,
      publicKey: params.publicKey.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
    }),
  );
