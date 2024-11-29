export const getOne = async ({ execute, request }) => {
  const query = `
    SELECT * FROM near_protocol_networks
    WHERE spaceId = '${request.body.spaceId}' 
      AND networkId = '${request.body.networkId}'
  `;

  const [network] = await execute(query);

  network.activeRpc = JSON.parse(network.activeRpc);
  network.rpcList = JSON.parse(network.rpcList);

  return network;
};
