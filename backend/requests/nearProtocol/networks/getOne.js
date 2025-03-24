import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getOne = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_networks
    WHERE spaceId = @spaceId 
      AND networkId = @networkId
  `;

  const [network] = await execute(query, addPrefixToObjKeys(request.body));

  network.activeRpc = JSON.parse(network.activeRpc);
  network.rpcList = JSON.parse(network.rpcList);

  return network;
};
