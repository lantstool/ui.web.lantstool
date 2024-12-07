import { getOne } from './getOne.js';

export const removeRpc = async ({ execute, request }) => {
  try {
    const { spaceId, networkId, rpcType, rpcId } = request.body;

    const network = await getOne({ execute, request });
    network.rpcList[rpcType] = network.rpcList[rpcType].filter((rpc) => rpc.id !== rpcId);

    // If we delete the RPC which is currently active - turn on balancer
    if (network.activeRpc[rpcType].rpc?.id === rpcId) {
      network.activeRpc[rpcType] = {
        autoBalance: true,
        rpc: null,
      };
    }

    const query = `
      UPDATE near_protocol_networks
      SET rpcList = '${JSON.stringify(network.rpcList)}'
      WHERE spaceId = '${spaceId}'
        AND networkId = '${networkId}'
    `;

    await execute(query);
    return network;
  } catch (e) {
    console.log(e);
  }
};
