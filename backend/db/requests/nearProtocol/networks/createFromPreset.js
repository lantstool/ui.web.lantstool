export const createFromPreset = async ({ execute, request }) => {
  const { spaceId, preset } = request.body;

  const networkId = preset.networkId;
  const activeRpc = JSON.stringify(preset.activeRpc);
  const rpcList = JSON.stringify(preset.rpcList);
  const createdAt = Date.now();

  const query = `
    BEGIN TRANSACTION;

    INSERT INTO near_protocol_networks
      (networkId, spaceId, createdAt, activeRpc, rpcList)
    VALUES('${networkId}', '${spaceId}', ${createdAt}, '${activeRpc}', '${rpcList}')
    RETURNING *;

    INSERT INTO near_protocol_counters
      (spaceId, networkId, transactions, calls)
    VALUES('${spaceId}', '${networkId}', 0, 0);

    COMMIT;
  `;

  const [network] = await execute(query);

  return {
    ...network,
    activeRpc: JSON.parse(network.activeRpc),
    rpcList: JSON.parse(network.rpcList),
  };
};
