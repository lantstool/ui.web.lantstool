export const getAll = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_networks
    WHERE spaceId = '${request.body.spaceId}'
    ORDER BY createdAt;
  `;

  const networks = await execute(query);

  return networks.map((network) => ({
    ...network,
    activeRpc: JSON.parse(network.activeRpc),
    rpcList: JSON.parse(network.rpcList),
  }));
};
