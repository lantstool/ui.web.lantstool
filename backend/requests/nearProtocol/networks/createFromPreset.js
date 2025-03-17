import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { createNetwork } from './queries/createNetwork.js';

export const createFromPreset = async ({ execute, request }) => {
  const { spaceId, preset } = request.body;

  const networkId = preset.networkId;
  const activeRpc = JSON.stringify(preset.activeRpc);
  const rpcList = JSON.stringify(preset.rpcList);
  const createdAt = Date.now();

  const [network] = await execute(
    createNetwork,
    addPrefixToObjKeys({
      networkId,
      spaceId,
      createdAt,
      activeRpc,
      rpcList,
    }),
  );

  return {
    ...network,
    activeRpc: JSON.parse(network.activeRpc),
    rpcList: JSON.parse(network.rpcList),
  };
};
