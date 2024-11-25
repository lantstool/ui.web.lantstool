import { v4 as uuid } from 'uuid';

const getRpcData = (rpc, type) => {
  const rpcList = { regular: [], archival: [] };
  rpcList[type].push({ ...rpc, id: uuid() });

  const activeRpc = { regular: null, archival: null };
  activeRpc[type] = { autoSwitch: true, rpc: null };

  return {
    rpcList: JSON.stringify(rpcList),
    activeRpc: JSON.stringify(activeRpc),
  };
};

export const createManually = async ({ execute, request }) => {
  const { spaceId, networkId, rpc, rpcType } = request.body;

  const { rpcList, activeRpc } = getRpcData(rpc, rpcType);
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

  network.activeRpc = JSON.parse(network.activeRpc);
  network.rpcList = JSON.parse(network.rpcList);

  return network;
};
