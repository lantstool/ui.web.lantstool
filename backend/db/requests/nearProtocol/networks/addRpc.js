import { getOne } from './getOne.js';

export const addRpc = async ({ execute, request }) => {
  try {
    const { spaceId, networkId, rpcType, rpc } = request.body;

    const network = await getOne({ execute, request });
    network.rpcList[rpcType].push(rpc);

    const query = `
      UPDATE near_protocol_networks
      SET rpcList = '${JSON.stringify(network.rpcList)}'
      WHERE spaceId = '${spaceId}'
        AND networkId = '${networkId}'
    `;

    await execute(query);
  } catch (e) {
    console.log(e);
  }
};
