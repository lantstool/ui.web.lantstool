export const getAll = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_networks
    WHERE spaceId = '${request.body.spaceId}';
  `;

  const networks = await execute(query);

  return networks.map((network) => ({ ...network, rpcList: JSON.parse(network.rpcList) }));
};
