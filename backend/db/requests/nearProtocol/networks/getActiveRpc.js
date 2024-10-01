export const getActiveRpc = async ({ execute, request }) => {
  const query = `
    SELECT activeRpc FROM near_protocol_networks
    WHERE spaceId = '${request.body.spaceId}' 
      AND networkId = '${request.body.networkId}'
  `;

  const [{ activeRpc }] = await execute(query);
  return activeRpc;
};
