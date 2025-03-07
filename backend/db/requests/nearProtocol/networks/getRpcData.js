import { addPrefixToObjKeys } from '../../helpers/addPrefixToObjKeys.js';

export const getRpcData = async ({ execute, request }) => {
  const query = `
    SELECT activeRpc, rpcList FROM near_protocol_networks
    WHERE spaceId = @spaceId 
      AND networkId = @networkId
  `;

  const [{ activeRpc, rpcList }] = await execute(query, addPrefixToObjKeys(request.body));

  return {
    activeRpc: JSON.parse(activeRpc),
    rpcList: JSON.parse(rpcList),
  };
};
