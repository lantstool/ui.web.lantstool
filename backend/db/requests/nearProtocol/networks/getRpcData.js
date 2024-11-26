export const getRpcData = async ({ execute, request }) => {
  const query = `
    SELECT activeRpc, rpcList FROM near_protocol_networks
    WHERE spaceId = '${request.body.spaceId}' 
      AND networkId = '${request.body.networkId}'
  `;

  const [{ activeRpc, rpcList }] = await execute(query);

  return {
    activeRpc: JSON.parse(activeRpc),
    rpcList: JSON.parse(rpcList),
  };
};
