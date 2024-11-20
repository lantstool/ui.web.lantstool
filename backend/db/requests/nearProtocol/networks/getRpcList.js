export const getRpcList = async ({ execute, request }) => {
  const query = `
    SELECT rpcList FROM near_protocol_networks
    WHERE spaceId = '${request.body.spaceId}' 
      AND networkId = '${request.body.networkId}'
  `;

  const [{ rpcList }] = await execute(query);

  return JSON.parse(rpcList);
};
