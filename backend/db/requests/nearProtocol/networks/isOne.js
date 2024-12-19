export const isOne = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_networks
    WHERE spaceId = '${request.body.spaceId}' 
      AND networkId = '${request.body.networkId}'
  `;

  const [network] = await execute(query);
  return Boolean(network);
};
