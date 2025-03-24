import { v4 as uuid } from 'uuid';
import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { createNetwork } from './queries/createNetwork.js';

const getRpcData = (rpc, type) => {
  const rpcList = { regular: [], archival: [] };
  rpcList[type].push({ ...rpc, id: uuid() });

  const activeRpc = {
    regular: { autoBalance: true, rpc: null },
    archival: { autoBalance: true, rpc: null },
  };

  return {
    rpcList: JSON.stringify(rpcList),
    activeRpc: JSON.stringify(activeRpc),
  };
};

export const createManually = async ({ execute, request }) => {
  const { spaceId, networkId, rpc, rpcType } = request.body;

  const { rpcList, activeRpc } = getRpcData(rpc, rpcType);
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

  network.activeRpc = JSON.parse(network.activeRpc);
  network.rpcList = JSON.parse(network.rpcList);

  return network;
};
