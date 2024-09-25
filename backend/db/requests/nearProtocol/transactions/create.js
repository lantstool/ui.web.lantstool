import { v4 as uuid } from 'uuid';

const getNewTransactionOrder = async (execute, spaceId, networkId) => {
  const query = `
    SELECT COUNT(*) as 'order'
    FROM near_protocol_transactions 
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}'
  `;
  const [{ order }] = await execute(query);
  return order;
};

export const create = async ({ execute, request }) => {
  const { spaceId, networkId, name } = request.body;
  const transactionId = uuid();
  const createdAt = Date.now();
  const order = await getNewTransactionOrder(execute, spaceId, networkId);

  const body = JSON.stringify({
    signer: {
      accountId: null,
      publicKey: null,
    },
    receiver: null,
    actions: [],
  });

  const query = `
    BEGIN TRANSACTION;
    
    INSERT INTO near_protocol_transactions
      (transactionId, networkId, spaceId, name, 'order', createdAt, body)
    VALUES(
      '${transactionId}', 
      '${networkId}', 
      '${spaceId}', 
      '${name}', 
       ${order}, 
       ${createdAt}, 
      '${body}'
    )
    RETURNING *;
    
    UPDATE near_protocol_counters
    SET transactions = transactions + 1
    WHERE spaceId = '${spaceId}' AND networkId = '${networkId}';
    
    COMMIT;
  `;

  const [network] = await execute(query);
  return network;
};
