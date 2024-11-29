export const updateActiveRpc = async ({ execute, request }) => {
  const { spaceId, networkId, rpcType, autoBalance, rpc } = request.body;

  const query = `
    UPDATE near_protocol_networks
    SET activeRpc = json_set(
      activeRpc, 
      '$.${rpcType}.autoBalance', ${autoBalance},
      '$.${rpcType}.rpc', ${rpc}
    )
    WHERE spaceId = '${spaceId}'
      AND networkId = '${networkId}'
  `;

  await execute(query);
};
