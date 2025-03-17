import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { getOne } from './getOne.js';

export const updateActiveRpc = async ({ execute, request }) => {
  const { spaceId, networkId, rpcType, autoBalance, rpc } = request.body;

  const network = await getOne({ execute, request });

  network.activeRpc[rpcType].autoBalance = autoBalance;
  network.activeRpc[rpcType].rpc = rpc;

  const query = `
      UPDATE near_protocol_networks
      SET activeRpc = @activeRpc
      WHERE spaceId = @spaceId
        AND networkId = @networkId
    `;

  await execute(
    query,
    addPrefixToObjKeys({
      spaceId,
      networkId,
      activeRpc: JSON.stringify(network.activeRpc),
    }),
  );
};
