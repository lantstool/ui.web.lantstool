import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';
import { getOne } from './getOne.js';

export const addRpc = async ({ execute, request }) => {
  const { spaceId, networkId, rpcType, rpc } = request.body;

  const network = await getOne({ execute, request });
  network.rpcList[rpcType].push(rpc);

  const query = `
      UPDATE near_protocol_networks
      SET rpcList = @rpcList
      WHERE spaceId = @spaceId
        AND networkId = @networkId
    `;

  await execute(
    query,
    addPrefixToObjKeys({
      spaceId,
      networkId,
      rpcList: JSON.stringify(network.rpcList),
    }),
  );
};
