import { fetchJson } from '../../../../../frontend/store/helpers/fetchJson.js';

// TODO use near-api-js or move this code to utils
const getNetworkId = async (rpc) => {
  const { result, error } = await fetchJson(rpc, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      method: 'status',
      params: [],
    }),
  });

  if (error) throw new Error(error);

  return result.chain_id;
};

const validateSpaceIdHasExist = async (execute, spaceId) => {
  const query = `
    SELECT spaceId FROM spaces WHERE spaceId = '${spaceId}';
  `;
  const [space] = await execute(query);

  if (!space)
    throw new Error(`
      The space ‘${spaceId}’ does not exist. 
      Please verify that you have accessed the correct page
    `);
};

const validateNetworkIdHasNotExist = async (execute, spaceId, networkId) => {
  const query = `
    SELECT networkId FROM near_protocol_networks 
      WHERE spaceId = '${spaceId}' AND networkId = '${networkId}';
  `;
  const [network] = await execute(query);

  if (network)
    throw new Error(`
      The network ‘${network.networkId}’ is already exists in this space. 
      Please make sure you entered the correct URL of RPC provider
    `);
};

export const create = async ({ execute, request }) => {
  const { spaceId } = request.body;
  const { rpc } = request.body.formValues;
  const rpcList = JSON.stringify([rpc]);
  const createdAt = Date.now();

  await validateSpaceIdHasExist(execute, spaceId);

  const networkId = await getNetworkId(rpc);
  await validateNetworkIdHasNotExist(execute, spaceId, networkId);

  const query = `
    BEGIN TRANSACTION;
    
    INSERT INTO near_protocol_networks
      (networkId, spaceId, createdAt, activeRpc, rpcList)
    VALUES('${networkId}', '${spaceId}', ${createdAt}, '${rpc}', '${rpcList}')
    RETURNING *;
    
    INSERT INTO near_protocol_counters
      (spaceId, networkId, transactions, calls)
    VALUES('${spaceId}', '${networkId}', 0, 0);
    
    COMMIT;
  `;

  const [network] = await execute(query);
  return network;
};
