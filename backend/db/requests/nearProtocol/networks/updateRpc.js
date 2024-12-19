import { getOne } from './getOne.js';

const updateWhenSameType = (network, rpcType, newRpc) => {
  const index = network.rpcList[rpcType].findIndex((rpc) => rpc.id === newRpc.id);
  network.rpcList[rpcType][index] = newRpc;

  // If we edit the currently selected RPC - we have to update the activeRpc field too.
  if (network.activeRpc[rpcType].rpc?.id === newRpc.id) {
    network.activeRpc[rpcType].rpc = newRpc;
  }
};

const updateWhenOppositeType = (network, rpcType, newRpc, newRpcType) => {
  network.rpcList[rpcType] = network.rpcList[rpcType].filter((rpc) => rpc.id !== newRpc.id);
  network.rpcList[newRpcType].push(newRpc);

  // When we move last RPC to the opposite list - turn balancer on - it will help
  // us to avoid a situation when after adding a new RPC to this list balancer will be off and
  // a new RPC will be off too.
  if (network.rpcList[rpcType].length === 0) {
    network.activeRpc[rpcType].autoBalance = true;
    network.activeRpc[rpcType].rpc = null;
    return;
  }
  // If we edit the currently selected RPC - we have to update the activeRpc field too.
  if (network.activeRpc[rpcType].rpc?.id === newRpc.id) {
    network.activeRpc[rpcType].rpc = newRpc;
  }
};

export const updateRpc = async ({ execute, request }) => {
  const { newRpc, rpcType, newRpcType, spaceId, networkId } = request.body;
  const network = await getOne({ execute, request });

  // If an edited RPC has the same type as the saved one - just update it;
  // Else remove from the current list and add to the opposite list
  rpcType === newRpcType
    ? updateWhenSameType(network, rpcType, newRpc)
    : updateWhenOppositeType(network, rpcType, newRpc, newRpcType);

  const query = `
      UPDATE near_protocol_networks
      SET rpcList = '${JSON.stringify(network.rpcList)}',
          activeRpc = '${JSON.stringify(network.activeRpc)}'
      WHERE spaceId = '${spaceId}'
        AND networkId = '${networkId}'
    `;

  await execute(query);

  return network;
};
